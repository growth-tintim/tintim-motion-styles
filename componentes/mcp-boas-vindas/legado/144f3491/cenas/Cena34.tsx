// Cenas 3 e 4 em coordenadas de tela (1920x1080): lista com tarjas, lupa, revelação do item 1 e janela de diagnóstico.
// Mesma linguagem do card e da conversa das cenas 1 e 2. Nenhum corte: tudo troca dentro do mesmo enquadramento.
import { useEffect, useState } from "react";
import { Easing, interpolate, useCurrentFrame, useDelayRender } from "remotion";
import { loadFont as carregaSans } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as carregaSerifa } from "@remotion/google-fonts/SourceSerif4";
import { MarcaClaude } from "../componentes/MarcaClaude";
import { C, FONTE } from "../marca";
import { T } from "../gatilhos";

// Fontes substitutas, porque as do Claude são proprietárias: nada foi extraído do app nem do site.
const { fontFamily: SANS, waitUntilDone: esperaSans } = carregaSans("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
const { fontFamily: SERIFA, waitUntilDone: esperaSerifa } = carregaSerifa("normal", { weights: ["400", "600"], subsets: ["latin", "latin-ext"] });
// Cores medidas nos prints oficiais da App Store e no filme "Claude for Google Workspace".
const CL = { fundo: "#FAF9F5", balao: "#F0EEE6", texto: "#141413", cinza: "#73726C", borda: "#E4E2D9", coral: "#D97757" };

const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
const SOMBRA = "0 1px 1px rgba(5,12,30,.25), 0 15px 30px -9px rgba(5,12,30,.35), 0 51px 105px -27px rgba(5,12,30,.6)";
const INK = "#0E1525";
const SEC = "#5A6170";
const TER = "#7B818D";

// Lista
const CARD = { x: 460, y: 288, w: 1000, h: 504, r: 44, p: 56 };
const BARRA = { x: CARD.x + CARD.p + 56, w: CARD.w - 2 * CARD.p - 56, h: 56 };
const linhaY = (i: number) => CARD.y + CARD.p + 60 + 32 + 50 + i * 100;

// Lupa
const R = 78; // raio externo
const VIDRO = 69;
const PARADA = { x: BARRA.x + 96, y: linhaY(0) };
const FIM_PASSAGEM = { x: BARRA.x + BARRA.w - 90, y: linhaY(0) };

// Janela
const JANELA = { x: 180, y: 101, w: 1560, h: 878, r: 45, p: 42 };

const mensagem = (frame: number, inicio: number) => {
  const p = interpolate(frame, [inicio, inicio + 12], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
  return { opacity: p, translate: `0px ${(1 - p) * 12}px` };
};

const Tarja = ({ y, p, opacidade = 1, furo = null, frame, desloc }: { y: number; p: number; opacidade?: number; furo?: { x: number; y: number } | null; frame: number; desloc: number }) => {
  const mascara = furo ? `radial-gradient(circle ${VIDRO}px at ${furo.x - BARRA.x}px ${furo.y - (y - BARRA.h / 2)}px, transparent ${VIDRO - 1}px, black ${VIDRO}px)` : undefined;
  const ciclo = ((frame + desloc) % 66) / 66;
  return (
    <div
      name="Tarja"
      style={{
        position: "absolute",
        left: BARRA.x,
        top: y - BARRA.h / 2,
        width: BARRA.w,
        height: BARRA.h,
        borderRadius: 14,
        overflow: "hidden",
        background: C.azul,
        opacity: opacidade * Math.min(1, p * 2),
        translate: `${(1 - p) * -28}px 0px`,
        clipPath: `inset(0 ${(1 - p) * 100}% 0 0 round 14px)`,
        maskImage: mascara,
        WebkitMaskImage: mascara,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: -280 + ciclo * (BARRA.w + 280),
          width: 280,
          background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.42) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
};

export const Cena34 = () => {
  const frame = useCurrentFrame();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [espera] = useState(() => delayRender("fontes da tela do Claude"));
  useEffect(() => {
    Promise.all([esperaSans(), esperaSerifa()]).then(() => continueRender(espera)).catch(cancelRender);
  }, []);
  if (frame < T.separei) return null;

  // Cena 3
  const entradaCard = interpolate(frame, [T.separei + 6, T.separei + 24], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
  const tarjas = [T.tres + 4, T.coisas, T.coisas + 8].map((f) => interpolate(frame, [f, f + 14], [0, 1], { easing: Easing.out(Easing.cubic), ...trava }));
  const chegaLupa = interpolate(frame, [T.sao, T.sao + 48], [0, 1], SUAVE);

  // Cena 4
  const passagem = interpolate(frame, [T.primeira + 6, T.diagnostico + 12], [0, 1], SUAVE);
  const fimPassagem = T.diagnostico + 12;
  const dissolve = interpolate(frame, [fimPassagem, fimPassagem + 14], [1, 0], { easing: Easing.inOut(Easing.quad), ...trava });
  const morfa = interpolate(frame, [T.peca - 6, T.peca + 36], [0, 1], SUAVE);
  const aproxima = interpolate(frame, [T.prova - 12, T.prova + 36], [0, 1], SUAVE);

  // Lupa
  const lx = frame < T.primeira ? 2060 + (PARADA.x - 2060) * chegaLupa : PARADA.x + (FIM_PASSAGEM.x - PARADA.x) * passagem;
  const ly = frame < T.primeira ? 900 + (PARADA.y - 900) * chegaLupa : PARADA.y;
  const furo = chegaLupa > 0 && dissolve > 0 && Math.abs(ly - linhaY(0)) < VIDRO + BARRA.h / 2 && morfa === 0 ? { x: lx, y: ly } : null;

  // A lente vira a janela
  const mix = (a: number, b: number) => a + (b - a) * morfa;
  const rx = mix(lx - R, JANELA.x);
  const ry = mix(ly - R, JANELA.y);
  const rw = mix(2 * R, JANELA.w);
  const rh = mix(2 * R, JANELA.h);
  const rr = mix(R, JANELA.r);
  const corpo = Math.min(1, morfa * 3);
  const conteudo = interpolate(morfa, [0.7, 1], [0, 1], trava);
  const s = 1 + 0.15 * aproxima;

  // Blocos da conversa
  const q = mensagem(frame, T.peca + 34);
  const surge = (inicio: number) => ({ opacity: interpolate(frame, [inicio, inicio + 8], [0, 1], trava) });
  const ferramenta = frame < T.ele - 12 ? "Tintim: contar conversas" : frame < T.ele ? "Tintim: listar conversas" : "Tintim: ler mensagens (48 conversas)";
  const ferramentaEntra = surge(T.ele - 24);
  const trabalhando = frame >= T.peca + 46 && frame < T.ele + 12;
  // Faixa de luz que corre pelo texto enquanto o Claude trabalha, como no filme oficial
  const faixaBrilho = ((frame * 4) % 160) - 30;
  const brilho = trabalhando
    ? { backgroundImage: `linear-gradient(90deg, ${CL.cinza} ${faixaBrilho - 18}%, #C9C7BE ${faixaBrilho}%, ${CL.cinza} ${faixaBrilho + 18}%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : { color: CL.cinza };
  const titulo = surge(T.ele + 12);
  const i1 = surge(T.chegaram);
  const i2 = surge(T.ficaram);
  const i3 = surge(T.lead);
  const i4 = surge(T.venda);
  const prova = surge(T.trecho);
  const marcaFinal = frame >= T.trecho + 12;

  const item = { marginTop: 6, textWrap: "balance" } as const;

  return (
    <div name="Cenas 3 e 4" style={{ position: "absolute", inset: 0, fontFamily: FONTE, color: INK, wordSpacing: "0.06em" }}>
      {morfa < 0.5 ? (
        <div
          name="Lista: 3 coisas"
          style={{
            position: "absolute",
            inset: 0,
            opacity: entradaCard * (1 - morfa * 2),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: CARD.x,
              top: CARD.y,
              width: CARD.w,
              height: CARD.h,
              borderRadius: CARD.r,
              background: C.branco,
              boxShadow: SOMBRA,
              translate: `0px ${(1 - entradaCard) * 12}px`,
            }}
          />
          <div style={{ position: "absolute", left: CARD.x + CARD.p, top: CARD.y + CARD.p, fontSize: 44, lineHeight: "60px", fontWeight: 700, letterSpacing: "-0.01em" }}>
            3 coisas para pedir ao Claude
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ position: "absolute", left: CARD.x + CARD.p, top: linhaY(i) - 24, fontSize: 36, lineHeight: "48px", fontWeight: 700, opacity: Math.min(1, tarjas[i] * 2) }}>
              {i + 1}.
            </div>
          ))}
          <div style={{ position: "absolute", left: BARRA.x, top: linhaY(0) - 24, fontSize: 36, lineHeight: "48px", fontWeight: 700, whiteSpace: "nowrap", opacity: tarjas[0] > 0 ? 1 : 0 }}>
            Diagnóstico do atendimento
          </div>
          <Tarja y={linhaY(0)} p={tarjas[0]} opacidade={dissolve} furo={furo} frame={frame} desloc={0} />
          <Tarja y={linhaY(1)} p={tarjas[1]} frame={frame} desloc={22} />
          <Tarja y={linhaY(2)} p={tarjas[2]} frame={frame} desloc={44} />
        </div>
      ) : null}

      {chegaLupa > 0 ? (
        <div name="Lupa e janela" style={{ position: "absolute", inset: 0, scale: s, transformOrigin: "50% 50%" }}>
          {morfa < 0.3 ? (
            <div
              name="Cabo da lupa"
              style={{
                position: "absolute",
                left: lx + R * 0.68,
                top: ly + R * 0.68,
                width: 92,
                height: 20,
                borderRadius: 10,
                background: C.navy,
                rotate: "45deg",
                transformOrigin: "0 50%",
                opacity: 1 - morfa * 4,
              }}
            />
          ) : null}
          <div
            name="Lente e janela de conversa"
            style={{
              position: "absolute",
              left: rx,
              top: ry,
              width: rw,
              height: rh,
              borderRadius: rr,
              overflow: "hidden",
              background: `rgba(250,249,245,${0.06 + 0.94 * corpo})`,
              boxShadow: `inset 0 0 0 ${9 * (1 - corpo)}px ${C.navy}, ${morfa > 0 ? SOMBRA : "0 18px 36px -10px rgba(5,12,30,.45)"}`,
            }}
          >
            {morfa > 0.6 ? (
              <div
                style={{
                  position: "absolute",
                  left: (JANELA.w - 1368) / 2,
                  top: 26,
                  width: 1368,
                  height: JANELA.h - 26 - 24,
                  display: "flex",
                  flexDirection: "column",
                  opacity: conteudo,
                  color: CL.texto,
                  wordSpacing: 0,
                }}
              >
                <div name="Mensagem do usuário" style={{ alignSelf: "flex-end", width: 1020, background: CL.balao, borderRadius: 30, padding: "16px 28px", fontFamily: SANS, fontSize: 28.5, lineHeight: "40px", fontWeight: 400, ...q }}>
                  No Tintim, quero preparar a reunião com meu cliente Ótica Central sobre o atendimento das conversas dos últimos 7 dias. Leia as conversas e me diga o que aconteceu depois que cada uma chegou.
                </div>
                <div name="Chamada de ferramenta" style={{ marginTop: 14, height: 36, display: "flex", alignItems: "center", gap: 12, fontFamily: SANS, fontSize: 26, lineHeight: "36px", fontWeight: 400, color: CL.cinza, ...ferramentaEntra }}>
                  <span style={brilho}>{ferramenta}</span>
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M8 4.5 14.5 11 8 17.5" stroke={CL.cinza} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div name="Resposta" style={{ marginTop: 14, fontFamily: SERIFA, fontSize: 28.5, lineHeight: "40px", fontWeight: 400 }}>
                  <div style={{ fontWeight: 600, ...titulo }}>Diagnóstico · Ótica Central · 30/10 a 05/11</div>
                  <div style={{ ...item, ...i1 }}>Chegaram 212 conversas: 128 do Meta, 51 do Google e 33 sem rastreio.</div>
                  <div style={{ ...item, ...i2 }}>41 não foram respondidas no mesmo dia, e 9 seguem sem resposta.</div>
                  <div style={{ ...item, ...i3 }}>Quem foi respondido esperou, em média, 52 minutos. Segunda-feira concentra mais conversas e mais espera.</div>
                  <div style={{ ...item, ...i4 }}>A falha que mais se repete: o preço vai antes de qualquer pergunta, em 34 dos 97 atendimentos de venda.</div>
                  <div name="Trecho de prova" style={{ marginTop: 14, borderLeft: `4px solid ${CL.borda}`, paddingLeft: 24, ...prova }}>
                    <div><span style={{ fontWeight: 600 }}>Lead:</span> “Vocês têm lente multifocal?”</div>
                    <div><span style={{ fontWeight: 600 }}>Atendente:</span> “Temos, a partir de R$ 980.”</div>
                    <div style={{ color: CL.cinza }}>(o lead não respondeu mais)</div>
                  </div>
                </div>
                {trabalhando || marcaFinal ? (
                  <div name="Símbolo do Claude" style={{ marginTop: 8, ...surge(T.peca + 46) }}>
                    <MarcaClaude tamanho={30} />
                  </div>
                ) : null}
                <div
                  name="Caixa de mensagem"
                  style={{
                    marginTop: "auto",
                    flexShrink: 0,
                    background: "#FFFFFF",
                    borderRadius: 32,
                    boxShadow: `0 0 0 1.5px ${CL.borda}, 0 6px 22px rgba(20,20,19,.05)`,
                    padding: "14px 16px 12px 28px",
                    fontFamily: SANS,
                  }}
                >
                  <div style={{ fontSize: 26, lineHeight: "36px", color: CL.cinza }}>Responder ao Claude…</div>
                  <div style={{ marginTop: 4, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                      <path d="M12 4.5v15M4.5 12h15" stroke={CL.texto} strokeWidth={1.7} strokeLinecap="round" />
                    </svg>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, lineHeight: "32px" }}>
                      <span style={{ color: CL.texto }}>Opus 5.5</span>
                      <span style={{ color: CL.cinza }}>Medium</span>
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                        <path d="M4.5 7.5 10 13l5.5-5.5" stroke={CL.cinza} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div style={{ width: 46, height: 46, marginLeft: 6, borderRadius: 13, background: CL.coral, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width={26} height={26} viewBox="0 0 18 18" fill="none">
                          <path d="M9 14.5V3.8M4.4 8.2 9 3.6l4.6 4.6" stroke="#FFFFFF" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
