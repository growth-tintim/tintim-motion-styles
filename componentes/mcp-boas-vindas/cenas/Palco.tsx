// Cenas 1 e 2 num palco único: peças na escala de interface; quem dá a leitura é a câmera.
// Ordem: o que o cliente já tem, a peça nova, a ponte até a IA dele e o que ele ganha.
// Tempos em gatilhos.ts. Texto só parado: o que viaja nas linhas é luz.
import { Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, M } from "../marca";
import { T } from "../gatilhos";
import { uiCamera } from "../componentes/camera";
import { pontoEm } from "../componentes/caminhos";
import { ConnectionLine } from "../componentes/ConnectionLine";
import { BrandIcon } from "../componentes/BrandIcon";
import { PAINEL, TintimCard } from "../componentes/TintimCard";
import { PORTA, PortMCP, SOBREPOSICAO } from "../componentes/PortMCP";
import { Resposta } from "../componentes/Resposta";
import { Cena34 } from "./Cena34";
import { Final } from "./Final";
import { ALTERNATIVA } from "../alternativa";

// ── Mapa do palco ───────────────────────────────────────────────────────
const CENTRO_Y = 541;
const META = { x: 376, y: 478 };
const GOOGLE = { x: 376, y: 602 };
const CLAUDE = { x: 930, y: 456 };
const CHATGPT = { x: 930, y: 624 };
const PORTA_X = PAINEL.x + PAINEL.largura - SOBREPOSICAO;
const SOQUETE_X = PORTA_X + PORTA.largura;
const RAMAL_X = 842;
const CENTRO_PAINEL = { x: PAINEL.x + PAINEL.largura / 2, y: PAINEL.y + PAINEL.altura / 2 };

// Logo: grande no centro da cena 1; pequeno no cabeçalho do painel na cena 2.
const LOGO_RAZAO = 1523 / 498;
const LOGO_GRANDE = 240;
const LOGO_PEQUENO = PAINEL.alturaLogo * LOGO_RAZAO;
const LOGO_FIM = { x: PAINEL.x + PAINEL.recuo + LOGO_PEQUENO / 2, y: PAINEL.y + PAINEL.recuo + PAINEL.alturaLogo / 2 };
const CORTE_EMBLEMA = 0.325;
const CENTRO_EMBLEMA = 0.17;

const L_META = `M ${META.x} ${META.y} L 398 ${META.y} C 434 ${META.y}, 432 500, ${PAINEL.x} 500 L ${PAINEL.x + 30} 500`;
const L_GOOGLE = `M ${GOOGLE.x} ${GOOGLE.y} L 398 ${GOOGLE.y} C 434 ${GOOGLE.y}, 432 580, ${PAINEL.x} 580 L ${PAINEL.x + 30} 580`;
const ramo = (y: number) => `C 878 ${CENTRO_Y}, 862 ${y}, 908 ${y} L ${CLAUDE.x} ${y}`;
const L_TRONCO_CLAUDE = `M ${SOQUETE_X} ${CENTRO_Y} L ${RAMAL_X} ${CENTRO_Y} ${ramo(CLAUDE.y)}`;
const L_RAMO_CHATGPT = `M ${RAMAL_X} ${CENTRO_Y} ${ramo(CHATGPT.y)}`;
const DA_IA = (y: number) => `M ${CLAUDE.x} ${y} L 908 ${y} C 862 ${y}, 878 ${CENTRO_Y}, ${RAMAL_X} ${CENTRO_Y} L ${PAINEL.x + 200} ${CENTRO_Y}`;
const PARA_IA = (y: number) => `M ${PAINEL.x + 200} ${CENTRO_Y} L ${RAMAL_X} ${CENTRO_Y} ${ramo(y)}`;

const SUAVE = Easing.bezier(0.45, 0, 0.2, 1);
const TRAJETO = Easing.bezier(0.42, 0, 0.3, 1);
const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// Pulso de luz: nunca leva texto.
const Cometa = ({ d, t, cor = C.lima }: { d: string; t: number; cor?: string }) => {
  if (t <= 0 || t >= 1) return null;
  const fade = interpolate(t, [0, 0.05, 0.95, 1], [0, 1, 1, 0], trava);
  const rastro = [];
  for (let k = 6; k >= 1; k--) {
    const p = pontoEm(d, t - k * 0.012);
    rastro.push(<circle key={k} cx={p.x} cy={p.y} r={2.2 - k * 0.25} fill={cor} opacity={0.55 * (1 - k / 7)} />);
  }
  const p = pontoEm(d, t);
  return (
    <g opacity={fade}>
      {rastro}
      <circle cx={p.x} cy={p.y} r={8} fill={cor} opacity={0.12} />
      <circle cx={p.x} cy={p.y} r={4.5} fill={cor} opacity={0.26} />
      <circle cx={p.x} cy={p.y} r={2.2} fill={C.branco} />
    </g>
  );
};

export const Palco = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const mola = { damping: 14, stiffness: 120, mass: 0.8 };
  const macio = { damping: 200 };
  const janela = (inicio: number, duracao: number) =>
    frame < inicio ? 0 : interpolate(frame, [inicio, inicio + duracao], [1, 0], { easing: Easing.out(Easing.cubic), ...trava });

  // ── Tempos derivados ────────────────────────────────────────────────
  const NASCE_PERGUNTA = T.pergunta - 5;
  // O pulso sai com a pergunta assentada; o Tintim lê entrando em quadro; a resposta vem depois e fica cerca de 4,5 s
  const SAI_PULSO = T.voce + 14;
  const CHEGA_TINTIM = T.fimContas - 2;
  const FIM_LEITURA = CHEGA_TINTIM + 20;
  const CHEGA_IA = FIM_LEITURA + 12;

  // ── Câmera: os quatro enquadramentos aprovados, ligados por um trajeto contínuo de 1,6 s. Parada entre eles. ─
  const POSES = [
    { x: 600, e: 2.7 }, // logo, depois card, campanhas e pílula MCP
    { x: 646, e: 2 }, // card, linha, Claude e ChatGPT
    { x: 1176.5, e: 2.8 }, // conversa centrada
    { x: 918, e: 1.95 }, // o Tintim lendo e a conversa, juntos
  ];
  const DUR_MOV = 48;
  const INICIOS = [T.conecta - 12, T.eAi - 12, T.doJeito - 12];
  const curvaMov = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
  const trecho = frame < INICIOS[1] ? 0 : frame < INICIOS[2] ? 1 : 2;
  const mov = interpolate(frame, [INICIOS[trecho], INICIOS[trecho] + DUR_MOV], [0, 1], curvaMov);
  const de = POSES[trecho];
  const para = POSES[trecho + 1];
  const camX = de.x + (para.x - de.x) * mov;
  const camY = CENTRO_Y;
  const camE = Math.exp(Math.log(de.e) + (Math.log(para.e) - Math.log(de.e)) * mov);
  const cameraParada = mov === 0 || mov === 1;
  const camera = uiCamera({ x: camX, y: camY, scale: camE }, { width, height }, false);
  const fundo = uiCamera({ x: camX, y: camY, scale: camE * 0.5 }, { width, height }, false);

  // Profundidade de campo: o painel desfoca quando a câmera deixa de olhar para ele.
  const foco = interpolate(frame, [INICIOS[2] + DUR_MOV, INICIOS[2] + DUR_MOV + 20], [0, 1], { easing: Easing.inOut(Easing.quad), ...trava });

  const focoCampanhas = interpolate(frame, [INICIOS[1], INICIOS[1] + 24], [1, 0], trava); // somem no caminho para a conversa

  // A câmera desliza para a direita, da conversa ao quadro seguinte, no mesmo plano. O fundo anda menos: paralaxe de 25%.
  const desliza = interpolate(frame, [T.separei - 6, T.separei + 42], [0, 1], curvaMov);
  const desliza2 = ALTERNATIVA === "C" ? interpolate(frame, [T.peca - 12, T.peca + 36], [0, 1], curvaMov) : 0;

  // ── Cena 1: "Oi!" traz o emblema; o logo se monta e assenta em "Tintim" ─
  const emblema = spring({ frame: frame - T.oi, fps, config: { damping: 13, stiffness: 120 } });
  const montagem = interpolate(frame, [Math.min(52, T.tintim - 16), T.tintim], [0, 1], { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava });
  const montado = montagem >= 1;

  // ── "Junto com a sua": o logo encolhe, vira o cabeçalho, e o painel nasce em volta ─
  const encolhe = spring({ frame: frame - T.junto, fps, config: macio, durationInFrames: 24 });
  const entradaPainel = spring({ frame: frame - (T.junto + 2), fps, config: macio, durationInFrames: 20 });
  const entradaLinhas = [0, 1, 2, 3, 4].map((i) => spring({ frame: frame - (T.junto + 10 + i * 3), fps, config: macio, durationInFrames: 16 }));
  const logoLargura = interpolate(encolhe, [0, 1], [LOGO_GRANDE, LOGO_PEQUENO]);
  const logoX = interpolate(encolhe, [0, 1], [600, LOGO_FIM.x]); // nasce no centro do primeiro enquadramento
  const logoY = interpolate(encolhe, [0, 1], [CENTRO_PAINEL.y, LOGO_FIM.y]);
  const logoAltura = logoLargura / LOGO_RAZAO;
  const deslocEmblema = (1 - montagem) * (0.5 - CENTRO_EMBLEMA) * logoLargura;
  const logoAzul = Math.min(1, entradaPainel * 1.4);

  // ── "compra da Black Friday": o que o cliente já tem ─
  const metaEntrada = spring({ frame: frame - (T.compra - 8), fps, config: mola });
  const googleEntrada = spring({ frame: frame - (T.compra - 5), fps, config: mola });
  const metaRotulo = spring({ frame: frame - (T.compra - 5), fps, config: macio });
  const googleRotulo = spring({ frame: frame - (T.compra - 2), fps, config: macio });
  const linhaMeta = interpolate(frame, [T.compra - 2, T.black + 4], [0, 1], { easing: SUAVE, ...trava });
  const linhaGoogle = interpolate(frame, [T.compra + 1, T.black + 7], [0, 1], { easing: SUAVE, ...trava });

  // ── "veio o nosso MCP": entra pela direita, recua e encaixa em "MCP" ─
  const surge = spring({ frame: frame - (T.veio + 2), fps, config: { damping: 18, stiffness: 120 } });
  const antecipa = interpolate(frame, [T.mcp - 14, T.mcp - 8], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
  const encaixe = spring({ frame: frame - (T.mcp - 8), fps, config: mola });
  const afastamento = (1 + 0.1 * antecipa) * (1 - encaixe);
  const recuo = frame >= T.mcp ? -3 * Math.exp(-(frame - T.mcp) / 5) * Math.cos((frame - T.mcp) * 0.9) : 0;
  const reflexo = interpolate(frame, [T.mcp + 1, T.mcp + 25], [0, 1], { easing: SUAVE, ...trava });

  // ── "conecta o Tintim ao seu Claude ou ChatGPT": chegam no próprio nome ─
  const linhaClaude = interpolate(frame, [T.conecta, T.claude + 2], [0, 1], { easing: SUAVE, ...trava });
  const ramoChatgpt = interpolate(frame, [T.conecta + 6, T.chatgpt + 2], [0, 1], { easing: SUAVE, ...trava });
  const claudeEntrada = spring({ frame: frame - (T.claude - 8), fps, config: mola });
  const chatgptEntrada = spring({ frame: frame - (T.chatgpt - 8), fps, config: mola });

  // ── Pergunta, leitura e resposta ─
  const saidaSuave = { easing: Easing.out(Easing.cubic), ...trava };
  const entradaJ = interpolate(frame, [T.eAi - 6, T.eAi + 6], [0, 1], saidaSuave); // a janela chega vazia
  const entradaQ = interpolate(frame, [T.voce, T.voce + 12], [0, 1], saidaSuave);
  const entradaA = interpolate(frame, [CHEGA_IA - 2, CHEGA_IA + 10], [0, 1], saidaSuave);
  const acende = interpolate(frame, [T.cada, T.cada + 8], [0, 1], trava);
  const tIda = interpolate(frame, [SAI_PULSO, CHEGA_TINTIM], [0, 1], { easing: TRAJETO, ...trava });
  const tVolta = interpolate(frame, [FIM_LEITURA, CHEGA_IA], [0, 1], { easing: TRAJETO, ...trava });
  const leitura = frame >= CHEGA_TINTIM && frame <= FIM_LEITURA ? interpolate(frame, [CHEGA_TINTIM, FIM_LEITURA], [0, 1], { easing: Easing.inOut(Easing.quad), ...trava }) : null;
  const contador = Math.round(interpolate(frame, [CHEGA_TINTIM, FIM_LEITURA], [0, 212], { easing: Easing.out(Easing.cubic), ...trava }));
  const opacContador = interpolate(frame, [CHEGA_TINTIM - 4, CHEGA_TINTIM + 2], [0, 1], trava);
  const chegada = interpolate(frame, [CHEGA_TINTIM - 2, CHEGA_TINTIM + 4, FIM_LEITURA], [0, 1, 0], trava);
  const flash = Math.max(janela(T.mcp, 18), janela(T.mcp + 26, 16) * 0.8, janela(CHEGA_TINTIM - 7, 14) * 0.8, janela(FIM_LEITURA + 1, 10) * 0.8);
  const pulsoIA = (chegou: number) => Math.max(janela(chegou, 20), janela(CHEGA_IA - 1, 18));

  return (
    <div
      name="Sistema"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "radial-gradient(1500px 1000px at 50% 46%, #10294A 0%, #0A1C33 56%, #071527 100%)",
      }}
    >
      <div name="Luz de fundo (parallax)" style={{ ...fundo.style, translate: `${-480 * (desliza + desliza2 + interpolate(frame, [T.slideF, T.slideF + 48], [0, 1], curvaMov) + interpolate(frame, [T.slideLogo, T.slideLogo + 48], [0, 1], curvaMov))}px 0px` }}>
        <div
          style={{
            position: "absolute",
            left: CENTRO_PAINEL.x - 700,
            top: CENTRO_PAINEL.y - 700,
            width: 1400,
            height: 1400,
            background: "radial-gradient(closest-side, rgba(22,112,203,0.3) 0%, rgba(22,112,203,0) 100%)",
            opacity: Math.min(1, emblema),
          }}
        />
      </div>

      <div
        name="Palco inclinado"
        style={{
          position: "absolute",
          inset: 0,
          translate: `${-1920 * desliza}px 0px`,
          display: desliza < 1 ? "block" : "none",
        }}
      >
        <div name="Mundo" style={camera.style}>
          <svg name="Linhas" viewBox="0 0 1920 1080" style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, overflow: "visible" }}>
            <g opacity={focoCampanhas}>
              <ConnectionLine d={L_META} progresso={linhaMeta} frame={frame} largura={1} cor="rgba(255,255,255,0.22)" brilho={false} pulsos={frame >= T.black ? 2 : 0} periodoPulso={46} corPulso={C.whatsapp} />
              <ConnectionLine d={L_GOOGLE} progresso={linhaGoogle} frame={frame + 12} largura={1} cor="rgba(255,255,255,0.22)" brilho={false} pulsos={frame >= T.black ? 2 : 0} periodoPulso={52} corPulso={C.whatsapp} />
            </g>
            <ConnectionLine d={L_TRONCO_CLAUDE} progresso={linhaClaude} frame={frame} largura={1} cor="rgba(255,255,255,0.3)" brilho={false} />
            <ConnectionLine d={L_RAMO_CHATGPT} progresso={ramoChatgpt} frame={frame} largura={1} cor="rgba(255,255,255,0.3)" brilho={false} />
            <Cometa d={DA_IA(CLAUDE.y)} t={tIda} />
            <Cometa d={DA_IA(CHATGPT.y)} t={tIda} />
            <Cometa d={PARA_IA(CLAUDE.y)} t={tVolta} />
            <Cometa d={PARA_IA(CHATGPT.y)} t={tVolta} />
          </svg>

          <div name="Foco do painel" style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, filter: foco > 0.01 ? `blur(${2.2 * foco}px)` : undefined, opacity: 1 - 0.28 * foco }}>
            <TintimCard entrada={entradaPainel} entradaLinhas={entradaLinhas} recuo={recuo} chegada={chegada} leitura={leitura} contador={contador} opacidadeContador={opacContador} escalaCamera={camE} cameraY={camY} alinhar={cameraParada} />
            <div
              name="Logo do Tintim"
              style={{ position: "absolute", left: logoX - logoLargura / 2, top: logoY - logoAltura / 2, width: logoLargura, height: logoAltura }}
            >
              <Img
                src={M.logoBranco}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  opacity: 1 - logoAzul,
                  clipPath: montado ? "none" : `inset(-10% ${(1 - CORTE_EMBLEMA) * 100}% -10% -10%)`,
                  transformOrigin: `${CENTRO_EMBLEMA * 100}% 50%`,
                  translate: `${deslocEmblema}px 0px`,
                  scale: montado ? 1 : emblema * (1 + 0.5 * (1 - montagem)),
                }}
              />
              {montado ? null : (
                <Img
                  src={M.logoBranco}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    clipPath: `inset(-10% ${(1 - CORTE_EMBLEMA) * (1 - montagem) * 100}% -10% ${CORTE_EMBLEMA * 100}%)`,
                    translate: `${deslocEmblema}px 0px`,
                  }}
                />
              )}
              {frame >= T.junto ? (
                <Img src={M.logoAzul} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: logoAzul }} />
              ) : null}
            </div>
          </div>

          <PortMCP
            x={PORTA_X}
            y={CENTRO_Y}
            opacidade={Math.min(1, surge * 2)}
            escala={0.88 + 0.12 * surge}
            deslocX={afastamento * 150 + (1 - surge) * 30}
            deslocY={afastamento * -16}
            rotacao={afastamento * 6}
            flash={flash}
            reflexo={reflexo}
          />

          <div name="Campanhas" style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: focoCampanhas }}>
            <BrandIcon x={META.x} y={META.y} src={M.meta} rotulo="Meta Ads" entrada={metaEntrada} entradaRotulo={metaRotulo} />
            <BrandIcon x={GOOGLE.x} y={GOOGLE.y} src={M.googleAds} rotulo="Google Ads" entrada={googleEntrada} entradaRotulo={googleRotulo} />
          </div>
          <BrandIcon x={CLAUDE.x} y={CLAUDE.y} src={M.claude} app entrada={claudeEntrada} pulso={pulsoIA(T.claude)} />
          <BrandIcon x={CHATGPT.x} y={CHATGPT.y} src={M.chatgpt} app entrada={chatgptEntrada} pulso={pulsoIA(T.chatgpt)} />

          <Resposta entradaJ={entradaJ} entradaQ={entradaQ} entradaA={entradaA} acende={acende} />
        </div>
      </div>
      <Cena34 />
      <Final />
    </div>
  );
};
