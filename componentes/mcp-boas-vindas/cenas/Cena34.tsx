// Cenas 3 e 4 em coordenadas de tela (1920x1080). A abstração das 3 coisas fica em Tres.tsx e é escolhida em alternativa.ts.
// O quadro chega deslizando pela direita e a passagem para a tela do Claude é sempre um movimento suave. Nenhum corte.
import React, { useEffect, useState } from "react";
import { Easing, Img, interpolate, useCurrentFrame, useDelayRender } from "remotion";
import { MarcaClaude } from "../componentes/MarcaClaude";
import { ALTERNATIVA } from "../alternativa";
import { A_H, A_L, A_REVELA, A_TOPO, B_CAIXA, B_FONTE, entradaFrenteA, FrenteA, FUNDO_A, Pergunta, Tres, VOLTA } from "./Tres";
import { CL, esperaSans, esperaSerifa, Marca, RespostaInspetor, RespostaRelatorio, SANS, SERIFA } from "./Partes23";
import { C, FONTE, M } from "../marca";
import { T } from "../gatilhos";

// As três perguntas e a largura do balão de cada uma
const PERGUNTAS = ["O que aconteceu nas conversas da Ótica Central nesta semana?", "Me dá o resumo da semana da Ótica Central: origem, funil e vendas.", "Quais vendas o Inspetor de Vendas encontrou na Ótica Central?"];
const LARGURAS = [1020, 1100, 1020];

const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
const SOMBRA = "0 1px 1px rgba(5,12,30,.25), 0 15px 30px -9px rgba(5,12,30,.35), 0 51px 105px -27px rgba(5,12,30,.6)";
const INK = "#0E1525";
const SEC = "#5A6170";
const TER = "#7B818D";

// Janela
const JANELA = { x: 180, y: 101, w: 1560, h: 878, r: 45, p: 42 };

const mensagem = (frame: number, inicio: number) => {
  const p = interpolate(frame, [inicio, inicio + 12], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
  return { opacity: p, translate: `0px ${(1 - p) * 12}px` };
};

// Linha da tabela no estilo de resposta do Claude: fios horizontais finos, sem colunas marcadas.
const LinhaTabela = ({ rotulo, valor, cabecalho = false, estilo, destaque = 0 }: { rotulo: string; valor: React.ReactNode; cabecalho?: boolean; estilo: React.CSSProperties; destaque?: number }) => (
  <div style={{ position: "relative", display: "flex", height: 44, alignItems: "center", boxShadow: `inset 0 -1.5px 0 ${CL.borda}`, fontWeight: cabecalho ? 600 : 400, ...estilo }}>
    <Marca d={destaque} />
    <div style={{ width: 520, flexShrink: 0 }}>{rotulo}</div>
    <div>{valor}</div>
  </div>
);

export const Cena34 = () => {
  const frame = useCurrentFrame();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [espera] = useState(() => delayRender("fontes da tela do Claude"));
  useEffect(() => {
    Promise.all([esperaSans(), esperaSerifa()]).then(() => continueRender(espera)).catch(cancelRender);
  }, []);
  if (frame < T.separei - 6) return null;

  // Mesmo trajeto do deslize do palco, para os dois andarem juntos
  const desliza = interpolate(frame, [T.separei - 6, T.separei + 42], [0, 1], SUAVE);

  // Cena 4: A e B crescem até virar a janela; C desliza de novo para a direita
  // Volta à lista: a janela encolhe pelo mesmo caminho da expansão, e a parte seguinte só começa quando ela chega
  const v2 = interpolate(frame, [T.volta2, T.volta2 + VOLTA], [0, 1], SUAVE);
  const v3 = interpolate(frame, [T.volta3, T.volta3 + VOLTA], [0, 1], SUAVE);
  const v4 = interpolate(frame, [T.volta4, T.volta4 + VOLTA], [0, 1], SUAVE);
  const dF = interpolate(frame, [T.slideF, T.slideF + 48], [0, 1], SUAVE); // a lista sai para a esquerda quando o Tintim chega
  if (dF >= 1) return null;
  const parte = frame < T.volta2 + VOLTA ? 0 : frame < T.volta3 + VOLTA ? 1 : 2;
  const envio = [T.peca, T.envio2, T.envio3][parte];
  const sai = parte === 0 ? v2 : parte === 1 ? v3 : v4;
  const morfa = interpolate(frame, [envio - 6, envio + 36], [0, 1], SUAVE) * (1 - sai);
  const desliza2 = ALTERNATIVA === "C" ? interpolate(frame, [T.peca - 12, T.peca + 36], [0, 1], SUAVE) : 0;
  const aproxima = interpolate(frame, [T.prova - 12, T.prova + 36], [0, 1], SUAVE);
  const mix = (a: number, b: number) => a + (b - a) * morfa;
  const revelaA = A_REVELA(frame);
  const ORIGEM =
    ALTERNATIVA === "A"
      ? { x: 960 - (A_L * (1 + 0.08 * revelaA)) / 2, y: A_TOPO + 220 + 34 * revelaA, w: A_L * (1 + 0.08 * revelaA), h: A_H * (1 + 0.08 * revelaA), r: 36 * (1 + 0.08 * revelaA) }
      : ALTERNATIVA === "B"
        ? { x: B_CAIXA.x, y: B_CAIXA.y, w: B_CAIXA.w, h: 0, r: B_CAIXA.r }
        : { x: JANELA.x, y: JANELA.y, w: JANELA.w, h: JANELA.h, r: JANELA.r };
  // B: a caixa cresce quando a pergunta entra nela
  const iniInsercao = [T.diagnostico + 10, T.ins2, T.ins3][parte];
  const insercao = ALTERNATIVA === "B" ? interpolate(frame, [iniInsercao, iniInsercao + 24], [0, 1], SUAVE) * (1 - sai) : 0;
  const h0 = ALTERNATIVA === "B" ? B_CAIXA.h0 + (B_CAIXA.h1 - B_CAIXA.h0) * insercao : ORIGEM.h;
  const rx = mix(ORIGEM.x, JANELA.x);
  const ry = mix(ORIGEM.y, JANELA.y);
  const rw = mix(ORIGEM.w, JANELA.w);
  const rh = mix(h0, JANELA.h);
  const rr = mix(ORIGEM.r, JANELA.r);
  const abre = ALTERNATIVA === "C" ? 1 : morfa; // em C a janela já está pronta à direita
  const conteudo = interpolate(abre, [0.88, 1], [0, 1], trava);
  const s = 1 + 0.15 * aproxima * (1 - v2);
  const entradaA = entradaFrenteA(frame);

  // Blocos da conversa
  const q = ALTERNATIVA === "B" ? { opacity: 1 } : mensagem(frame, T.peca + 34);
  // B: a mesma pergunta voa da caixa até o balão; o balão só ganha o fundo durante o caminho
  const balaoFundo = ALTERNATIVA === "B" ? interpolate(morfa, [0.6, 1], [0, 1], trava) : 1;
  const textoBalao = ALTERNATIVA === "B" ? (morfa >= 1 || sai > 0 ? 1 : 0) : 1;
  const aperto = ALTERNATIVA === "B" ? interpolate(frame, [envio - 6, envio, envio + 6], [1, 0.86, 1], trava) : 1;
  const surge = (inicio: number) => ({ opacity: interpolate(frame, [inicio, inicio + 8], [0, 1], trava) });
  // Nomes reais das ferramentas do prompt de Diagnóstico; ao terminar, a linha assenta no resumo, como no filme oficial
  const ferramenta =
    parte === 0
      ? frame < T.ele - 16 ? "Tintim: accounts_list" : frame < T.ele - 8 ? "Tintim: leads_counts" : frame < T.ele ? "Tintim: leads_list" : frame < T.ele + 12 ? "Tintim: leads_messages" : "Usou 4 ferramentas do Tintim"
      : parte === 1
        ? frame < T.ferr2 + 12 ? "Tintim: metrics_origin" : frame < T.ferr2 + 24 ? "Tintim: metrics_funnel" : frame < T.assenta2 ? "Tintim: metrics_sales" : "Usou 3 ferramentas do Tintim"
        : frame < T.troca3 ? "Tintim: identified_conversions_list" : frame < T.assenta3 ? "Tintim: identified_conversions_get" : "Usou 2 ferramentas do Tintim";
  const ferramentaEntra = surge([T.ele - 24, T.ferr2, T.ferr3][parte]);
  const fraseEntra = surge([T.ele - 40, T.frase2, T.frase3][parte]);
  const trabalhando = frame >= envio + 46 && frame < [T.ele + 12, T.assenta2, T.assenta3][parte];
  // Faixa de luz que corre pelo texto enquanto o Claude trabalha, como no filme oficial
  const faixaBrilho = ((frame * 4) % 160) - 30;
  const brilho = trabalhando
    ? { backgroundImage: `linear-gradient(90deg, ${CL.cinza} ${faixaBrilho - 18}%, #C9C7BE ${faixaBrilho}%, ${CL.cinza} ${faixaBrilho + 18}%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : { color: CL.cinza };
  const titulo = surge(T.ele + 12);
  // Cada item entra junto com o fim da palavra, medido na forma de onda
  const ITEM = [T.fimChegaram, T.fimResposta, T.fimEsperou, T.fimPerdeu, T.fimTrecho];
  const i1 = surge(ITEM[0]);
  const i2 = surge(ITEM[1]);
  const i3 = surge(ITEM[2]);
  const i3b = surge(ITEM[2]);
  const i4 = surge(ITEM[3]);
  const prova = surge(ITEM[4]);
  const marca = (ini: number, fim = 99999) => interpolate(frame, [ini, ini + 9, fim, fim + 9], [0, 1, 1, 0], { easing: Easing.inOut(Easing.quad), ...trava });


  return (
    <div name="Cenas 3 e 4" style={{ position: "absolute", inset: 0, fontFamily: FONTE, color: INK, wordSpacing: "0.06em", translate: `${-1920 * dF}px 0px` }}>
      <div name="Três coisas" style={{ position: "absolute", inset: 0, translate: `${1920 * (1 - desliza) - 1920 * desliza2}px 0px`, display: morfa < 1 ? "block" : "none" }}>
        <Tres alt={ALTERNATIVA} frame={frame} morfa={morfa} />
      </div>
      <div
        name="Janela do Claude"
        style={{
          position: "absolute",
          inset: 0,
          translate: `${ALTERNATIVA === "C" ? 1920 * (1 - desliza2) : 1920 * (1 - desliza)}px 0px`,
          scale: s,
          transformOrigin: "50% 50%",
          opacity: ALTERNATIVA === "A" ? (entradaA.opacity as number) : 1,
        }}
      >
          <div
            name="Janela de conversa"
            style={{
              position: "absolute",
              left: rx,
              top: ry,
              width: rw,
              height: rh,
              borderRadius: rr,
              overflow: "hidden",
              background: ALTERNATIVA === "A" ? FUNDO_A : ALTERNATIVA === "B" ? `rgb(${255 - 5 * morfa},${255 - 6 * morfa},${255 - 10 * morfa})` : CL.fundo,
              boxShadow: SOMBRA,
              translate: ALTERNATIVA === "A" ? entradaA.translate : undefined,
            }}
          >
            {ALTERNATIVA === "A" ? <div style={{ position: "absolute", inset: 0, background: CL.fundo, opacity: Math.min(1, morfa * 2.2) }} /> : null}
            {ALTERNATIVA === "A" && morfa < 0.4 ? (
              <div style={{ position: "absolute", left: 0, top: 0, scale: rw / A_L, transformOrigin: "0 0", opacity: 1 - morfa * 2.5, fontFamily: FONTE }}>
                <FrenteA frame={frame} />
              </div>
            ) : null}
            {ALTERNATIVA === "B" && morfa < 0.5 ? (
              <div name="Caixa dos pedidos" style={{ position: "absolute", inset: 0, padding: "14px 16px 12px 28px", fontFamily: SANS, opacity: 1 - morfa * 2, color: CL.texto }}>
                <div style={{ fontSize: 26, lineHeight: "36px", color: CL.cinza, opacity: 1 - insercao, height: insercao > 0.99 ? 0 : undefined }}>Responder ao Claude…</div>
                <div style={{ position: "absolute", left: 16, right: 16, bottom: 12, paddingLeft: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <svg width={30} height={30} viewBox="0 0 24 24" fill="none">
                    <path d="M12 4.5v15M4.5 12h15" stroke={CL.texto} strokeWidth={1.7} strokeLinecap="round" />
                  </svg>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, lineHeight: "32px" }}>
                    <span>Opus 5.5</span>
                    <span style={{ color: CL.cinza }}>Medium</span>
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <path d="M4.5 7.5 10 13l5.5-5.5" stroke={CL.cinza} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div style={{ width: 46, height: 46, marginLeft: 6, borderRadius: 13, background: CL.coral, display: "flex", alignItems: "center", justifyContent: "center", scale: aperto }}>
                      <svg width={26} height={26} viewBox="0 0 18 18" fill="none">
                        <path d="M9 14.5V3.8M4.4 8.2 9 3.6l4.6 4.6" stroke="#FFFFFF" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {abre > 0.8 ? (
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
                <div name="Mensagem do usuário" style={{ alignSelf: "flex-end", width: LARGURAS[parte], background: ALTERNATIVA === "B" ? `rgba(240,238,230,${balaoFundo})` : CL.balao, borderRadius: 30, padding: "16px 28px", fontFamily: SANS, fontSize: 28.5, lineHeight: "40px", fontWeight: 400, ...q }}>
                  <span style={{ opacity: textoBalao }}><Pergunta texto={PERGUNTAS[parte]} /></span>
                </div>
                <div name="Frase antes das ferramentas" style={{ marginTop: 14, fontFamily: SERIFA, fontSize: 28.5, lineHeight: "40px", ...fraseEntra }}>Verificando o conector do Tintim.</div>
                <div name="Chamada de ferramenta" style={{ marginTop: 6, height: 36, display: "flex", alignItems: "center", gap: 12, fontFamily: SANS, fontSize: 26, lineHeight: "36px", fontWeight: 400, color: CL.cinza, ...ferramentaEntra }}>
                  <div name="Emblema do Tintim" style={{ width: 30, height: 30, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                    <Img src={M.logoAzul} style={{ position: "absolute", left: 0, top: 0, height: 30, width: "auto", maxWidth: "none" }} />
                  </div>
                  <span style={brilho}>{ferramenta}</span>
                  <svg width={22} height={22} viewBox="0 0 22 22" fill="none">
                    <path d="M8 4.5 14.5 11 8 17.5" stroke={CL.cinza} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {parte === 1 ? <RespostaRelatorio frame={frame} /> : null}
                {parte === 2 ? <RespostaInspetor frame={frame} /> : null}
                {parte === 0 ? <div name="Resposta" style={{ marginTop: 14, isolation: "isolate", fontFamily: SERIFA, fontSize: 28.5, lineHeight: "40px", fontWeight: 400 }}>
                  <div name="Título" style={{ fontSize: 34, lineHeight: "44px", fontWeight: 600, letterSpacing: "-0.005em", ...titulo }}>Diagnóstico · Ótica Central · 30/10 a 05/11</div>
                  <div name="Tabela" style={{ marginTop: 10, width: 1240 }}>
                    <LinhaTabela rotulo="Métrica" valor="Resultado" cabecalho estilo={titulo} />
                    <LinhaTabela rotulo="Conversas recebidas" valor={<><b style={{ fontWeight: 600 }}>212</b> · 128 do Meta, 51 do Google, 33 sem rastreio</>} estilo={i1} destaque={marca(ITEM[0], ITEM[1])} />
                    <LinhaTabela rotulo="Sem resposta no mesmo dia" valor={<><b style={{ fontWeight: 600 }}>41</b> · 9 seguem sem resposta</>} estilo={i2} destaque={marca(ITEM[1], ITEM[2])} />
                    <LinhaTabela rotulo="Espera média" valor={<b style={{ fontWeight: 600 }}>52 minutos</b>} estilo={i3} destaque={marca(ITEM[2], ITEM[3])} />
                    <LinhaTabela rotulo="Pico de conversas e de espera" valor={<b style={{ fontWeight: 600 }}>Segunda-feira</b>} estilo={i3b} destaque={marca(ITEM[2], ITEM[3])} />
                  </div>
                  <div name="Falha" style={{ position: "relative", marginTop: 16, ...i4 }}>
                    <Marca d={marca(ITEM[3], ITEM[4])} />
                    <div style={{ fontWeight: 600 }}>A falha que mais se repete</div>
                    <div>O preço vai antes de qualquer pergunta, em <b style={{ fontWeight: 600 }}>34 dos 97</b> atendimentos de venda.</div>
                  </div>
                  <div name="Trecho de prova" style={{ position: "relative", marginTop: 10, borderLeft: `4px solid ${CL.borda}`, paddingLeft: 24, lineHeight: "38px", ...prova }}>
                    <Marca d={marca(ITEM[4])} />
                    <div><span style={{ fontWeight: 600 }}>Lead:</span> “Vocês têm lente multifocal?”</div>
                    <div><span style={{ fontWeight: 600 }}>Atendente:</span> “Temos, a partir de R$ 980.”</div>
                    <div style={{ color: CL.cinza }}>(o lead não respondeu mais)</div>
                  </div>
                </div> : null}
                {trabalhando ? (
                  <div name="Símbolo do Claude" style={{ position: "absolute", left: 0, top: 208, ...surge(envio + 46) }}>
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
          {ALTERNATIVA === "B" && insercao > 0 && morfa < 1 && sai === 0 ? (
            <div
              name="Pergunta em trânsito"
              style={{
                position: "absolute",
                width: 1312,
                left: mix(B_CAIXA.x + 28, JANELA.x + (JANELA.w - 1368) / 2 + 1368 - LARGURAS[parte] + 28),
                top: mix(B_CAIXA.y + 14, JANELA.y + 26 + 16),
                fontFamily: SANS,
                fontSize: B_FONTE,
                wordSpacing: 0,
                whiteSpace: "nowrap",
                lineHeight: `${(B_FONTE * 40) / 28.5}px`,
                color: CL.texto,
                transformOrigin: "0 0",
                scale: mix(1, 28.5 / B_FONTE) * (0.3 + 0.7 * insercao), // nasce do tamanho do cartão e cresce até a caixa
                translate: `${(1 - insercao) * 4}px ${(1 - insercao) * -138}px`,
                opacity: Math.min(1, insercao * 2.5),
              }}
            >
              <Pergunta texto={PERGUNTAS[parte]} />
            </div>
          ) : null}
      </div>
    </div>
  );
};
