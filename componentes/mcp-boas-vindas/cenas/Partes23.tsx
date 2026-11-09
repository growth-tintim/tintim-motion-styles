// Respostas das partes 2 e 3 na tela do Claude. Mesma coluna e mesma tipografia da cena 4.
// O visual da parte 2 é o cartão que o Claude desenha dentro da resposta; o desenho é estimativa a partir da descrição pública do recurso.
import React from "react";
import { Easing, Img, interpolate } from "remotion";
import { loadFont as carregaSans } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as carregaSerifa } from "@remotion/google-fonts/SourceSerif4";
import { M } from "../marca";
import { T } from "../gatilhos";

// Fontes substitutas, porque as do Claude são proprietárias: nada foi extraído do app nem do site.
export const { fontFamily: SANS, waitUntilDone: esperaSans } = carregaSans("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
export const { fontFamily: SERIFA, waitUntilDone: esperaSerifa } = carregaSerifa("normal", { weights: ["400", "600"], subsets: ["latin", "latin-ext"] });
// Cores medidas nos prints oficiais da App Store e no filme "Claude for Google Workspace".
export const CL = { fundo: "#FAF9F5", balao: "#F0EEE6", texto: "#141413", cinza: "#73726C", borda: "#E4E2D9", coral: "#D97757" };

const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
const surge = (frame: number, inicio: number) => ({ opacity: interpolate(frame, [inicio, inicio + 8], [0, 1], trava) });
const marca = (frame: number, ini: number, fim = 99999) => interpolate(frame, [ini, ini + 9, fim, fim + 9], [0, 1, 1, 0], { easing: Easing.inOut(Easing.quad), ...trava });

// Realce atrás do texto, igual ao da cena 4
export const Marca = ({ d, folga = 14 }: { d: number; folga?: number }) => (d > 0 ? <div style={{ position: "absolute", top: 0, bottom: 0, left: -folga, right: -folga, borderRadius: 10, background: `rgba(232,240,79,${0.38 * d})`, zIndex: -1 }} /> : null);
// Realce por cima do visual, como caneta sobre o papel: o lima não faz parte do desenho do Claude
const MarcaSobre = ({ d, altura }: { d: number; altura?: number }) => (d > 0 ? <div style={{ position: "absolute", top: -8, bottom: altura === undefined ? -8 : undefined, height: altura, left: -14, right: -14, borderRadius: 10, background: `rgba(232,240,79,${0.5 * d})`, mixBlendMode: "multiply" }} /> : null);

const SEG = [
  { nome: "Meta", n: 128, p: "60%", cor: CL.coral },
  { nome: "Google", n: 51, p: "24%", cor: "#E9B8A4" },
  { nome: "Sem rastreio", n: 33, p: "16%", cor: "#CFCBBF" },
];
const FUNIL = [
  { nome: "Conversas", n: 212, c: "" },
  { nome: "Qualificado", n: 118, c: "56% da anterior" },
  { nome: "Orçamento enviado", n: 64, c: "54% da anterior" },
  { nome: "Venda", n: 27, c: "42% da anterior" },
];

export const RespostaRelatorio = ({ frame }: { frame: number }) => {
  const titulo = surge(frame, T.assenta2 + 4);
  const visual = surge(frame, T.visual2);
  const funil = surge(frame, T.funil2);
  const parteVendas = surge(frame, T.vendas2);
  const parteReceita = surge(frame, T.receita2);
  return (
    <div name="Resposta" style={{ marginTop: 14, isolation: "isolate", fontFamily: SERIFA, fontSize: 28.5, lineHeight: "40px", fontWeight: 400 }}>
      <div name="Título" style={{ fontSize: 34, lineHeight: "44px", fontWeight: 600, letterSpacing: "-0.005em", ...titulo }}>Resumo da semana · Ótica Central · 30/10 a 05/11</div>
      <div name="Visual do Claude" style={{ position: "relative", marginTop: 14, width: 1240, height: 388, padding: "22px 28px", boxSizing: "border-box", background: "#FFFFFF", borderRadius: 18, boxShadow: `inset 0 0 0 1.5px ${CL.borda}`, fontFamily: SANS, fontSize: 25, lineHeight: "32px", color: CL.texto, ...visual }}>
        <div name="De onde vieram" style={{ position: "relative" }}>
          <div style={{ fontWeight: 500, fontSize: 26, lineHeight: "34px" }}>De onde vieram</div>
          <div style={{ marginTop: 8, display: "flex", gap: 3, height: 34 }}>
            {SEG.map((s, i) => (
              <div key={s.nome} style={{ width: `${(s.n / 212) * 100}%`, background: s.cor, borderRadius: i === 0 ? "7px 0 0 7px" : i === 2 ? "0 7px 7px 0" : 0 }} />
            ))}
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 44, fontSize: 24 }}>
            {SEG.map((s) => (
              <div key={s.nome} style={{ display: "flex", alignItems: "center", gap: 11 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: s.cor }} />
                <span>{s.nome} <span style={{ fontWeight: 500 }}>{s.n}</span> <span style={{ color: CL.cinza }}>({s.p})</span></span>
              </div>
            ))}
          </div>
          <MarcaSobre d={marca(frame, T.visual2, T.funil2)} />
        </div>
        <div name="Funil" style={{ position: "relative", marginTop: 20 }}>
          <div style={{ fontWeight: 500, fontSize: 26, lineHeight: "34px", ...funil }}>Funil</div>
          <div style={{ marginTop: 6 }}>
            {FUNIL.map((e, i) => {
              const ini = T.barras2 + i * 11;
              const cresce = interpolate(frame, [ini, ini + 14], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
              return (
                <div key={e.nome} style={{ display: "flex", alignItems: "center", height: 42, opacity: interpolate(frame, [ini, ini + 6], [0, 1], trava) }}>
                  <div style={{ width: 270, flexShrink: 0 }}>{e.nome}</div>
                  <div style={{ width: 620, flexShrink: 0, height: 26 }}>
                    <div style={{ width: `${(e.n / 212) * 100 * cresce}%`, height: "100%", background: CL.coral, borderRadius: 6 }} />
                  </div>
                  <div style={{ marginLeft: 22, whiteSpace: "nowrap", fontSize: 24 }}>
                    <span style={{ fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{e.n}</span>
                    {e.c ? <span style={{ color: CL.cinza }}> · {e.c}</span> : null}
                  </div>
                </div>
              );
            })}
          </div>
          {/* O realce desce junto com as barras: nunca acende área vazia */}
          <MarcaSobre d={marca(frame, T.funil2, T.vendas2)} altura={interpolate(frame, [T.barras2, T.barras2 + 3 * 11 + 6], [58, 58 + 3 * 42 + 42], SUAVE)} />
        </div>
      </div>
      <div name="Totais" style={{ marginTop: 14 }}>
        <span style={{ position: "relative", ...parteVendas }}>
          <Marca d={marca(frame, T.vendas2, T.receita2)} folga={5} />
          <b style={{ fontWeight: 600 }}>27 vendas</b>
        </span>
        <span style={parteVendas}> · conversão de 12,7%</span>
        <span style={parteReceita}> · receita de </span>
        <span style={{ position: "relative", ...parteReceita }}>
          <Marca d={marca(frame, T.receita2)} folga={5} />
          <b style={{ fontWeight: 600 }}>R$ 21.460</b>
        </span>
      </div>
    </div>
  );
};

// O mesmo cursor nas cenas 6 e 7
export const Cursor = ({ x, y, opacidade, aperta }: { x: number; y: number; opacidade: number; aperta: number }) => (
  <svg name="Cursor" width={38} height={38} viewBox="0 0 24 24" style={{ position: "absolute", left: x - 8, top: y - 5, opacity: opacidade, scale: 1 - 0.1 * aperta, transformOrigin: "20% 15%", filter: "drop-shadow(0 2px 3px rgba(20,20,19,.35))", zIndex: 5 }}>
    <path d="M5 2.5v16.2l4.2-3.9 2.7 6.3 2.9-1.2-2.7-6.2 5.8-.3Z" fill="#141413" stroke="#FFFFFF" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

// O alvo do cursor é o centro do botão "Permitir uma vez"
const PEDIDO = { largura: 1240, altura: 138, botaoL: 262 };
const CURSOR = { x: PEDIDO.largura - 24 - PEDIDO.botaoL / 2, y: 94 };

export const RespostaInspetor = ({ frame }: { frame: number }) => {
  const entrada = surge(frame, T.abertura3);
  const item = surge(frame, T.item3);
  const cita = surge(frame, T.cita3);
  const valor = surge(frame, T.valor3);
  const balao = surge(frame, T.aprova3);
  const pedido = surge(frame, T.aprova3 + 12);
  const confirma = surge(frame, T.confirma3);
  // O pedido de permissão recolhe depois do clique e vira a linha da ferramenta
  const recolhe = interpolate(frame, [T.clique3 + 6, T.clique3 + 22], [0, 1], SUAVE);
  // Cursor: aproximação lenta e contínua, sem salto. Só o clique dá retorno.
  const iniCursor = T.aprova3 + 20;
  const anda = interpolate(frame, [iniCursor, T.clique3], [0, 1], SUAVE);
  const curva = interpolate(frame, [iniCursor, T.clique3], [0, 1], { easing: Easing.bezier(0.3, 0, 0.3, 1), ...trava });
  const cx = CURSOR.x - 440 * (1 - anda);
  const cy = CURSOR.y + 150 * (1 - curva);
  const opCursor = interpolate(frame, [iniCursor, iniCursor + 6, T.clique3 + 10, T.clique3 + 20], [0, 1, 1, 0], trava);
  const aperta = interpolate(frame, [T.clique3 - 2, T.clique3 + 1, T.clique3 + 6], [0, 1, 0], { easing: Easing.inOut(Easing.quad), ...trava });
  return (
    <div name="Resposta" style={{ marginTop: 14, isolation: "isolate", fontFamily: SERIFA, fontSize: 28.5, lineHeight: "40px", fontWeight: 400, display: "flex", flexDirection: "column" }}>
      <div name="Abertura" style={entrada}>Encontrei <b style={{ fontWeight: 600 }}>6 vendas</b> esperando a sua decisão. Vamos uma por uma.</div>
      <div name="Item" style={{ marginTop: 10, ...item }}>
        <span style={{ position: "relative", fontWeight: 600 }}>
          <Marca d={marca(frame, T.item3, T.cita3)} folga={8} />
          1 de 6
        </span>
        <span style={{ fontWeight: 600 }}> · Mariana S. · 02/11</span>
      </div>
      <div name="Prova" style={{ position: "relative", marginTop: 10, borderLeft: `4px solid ${CL.borda}`, paddingLeft: 24, lineHeight: "38px", ...cita }}>
        <Marca d={marca(frame, T.cita3, T.aprova3)} />
        <div><span style={{ fontWeight: 600 }}>Lead:</span> “Fechado, pode separar as duas armações. Mando o Pix agora.”</div>
        <div><span style={{ fontWeight: 600 }}>Atendente:</span> “Separado! Fica R$ 1.240.”</div>
      </div>
      <div name="Valor" style={{ marginTop: 10, ...valor }}>Valor: R$ 1.240 · Sugestão: <b style={{ fontWeight: 600 }}>aprovar</b>, porque o lead confirmou a compra e o pagamento.</div>
      <div name="Balão de aprovação" style={{ alignSelf: "flex-end", marginTop: 12, background: CL.balao, borderRadius: 30, padding: "12px 28px", fontFamily: SANS, fontSize: 28.5, lineHeight: "40px", ...balao }}>Pode aprovar.</div>
      <div name="Permissão" style={{ position: "relative", marginTop: 12, width: PEDIDO.largura, height: PEDIDO.altura + (36 - PEDIDO.altura) * recolhe, ...pedido }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: `rgba(255,255,255,${1 - recolhe})`, borderRadius: 20, boxShadow: `inset 0 0 0 1.5px rgba(228,226,217,${1 - recolhe})`, fontFamily: SANS }}>
          <div name="Pedido" style={{ position: "absolute", left: 24, right: 24, top: 18, opacity: interpolate(recolhe, [0, 0.4], [1, 0], trava) }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, lineHeight: "36px" }}>
              <div style={{ width: 30, height: 30, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                <Img src={M.logoAzul} style={{ position: "absolute", left: 0, top: 0, height: 30, width: "auto", maxWidth: "none" }} />
              </div>
              <span>O Claude quer usar <span style={{ fontWeight: 500 }}>identified_conversions_approve</span> do Tintim</span>
            </div>
            <div style={{ position: "absolute", right: 0, top: 50, display: "flex", gap: 12, fontSize: 24, lineHeight: "32px", fontWeight: 500 }}>
              <div style={{ width: 232, height: 52, borderRadius: 13, boxShadow: `inset 0 0 0 1.5px ${CL.borda}`, display: "flex", alignItems: "center", justifyContent: "center" }}>Sempre permitir</div>
              <div style={{ width: PEDIDO.botaoL, height: 52, borderRadius: 13, background: aperta > 0 ? "#3A3A37" : CL.texto, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", scale: 1 - 0.03 * aperta }}>Permitir uma vez</div>
            </div>
          </div>
          <div name="Linha da ferramenta" style={{ position: "absolute", left: 0, top: 0, height: 36, display: "flex", alignItems: "center", gap: 12, fontSize: 26, lineHeight: "36px", color: CL.cinza, opacity: interpolate(recolhe, [0.6, 1], [0, 1], trava) }}>
            <div style={{ width: 30, height: 30, overflow: "hidden", flexShrink: 0, position: "relative" }}>
              <Img src={M.logoAzul} style={{ position: "absolute", left: 0, top: 0, height: 30, width: "auto", maxWidth: "none" }} />
            </div>
            Tintim: identified_conversions_approve
          </div>
        </div>
        {opCursor > 0 ? <Cursor x={cx} y={cy} opacidade={opCursor} aperta={aperta} /> : null}
      </div>
      <div name="Confirmação" style={{ position: "relative", alignSelf: "flex-start", marginTop: 12, ...confirma }}>
        <Marca d={marca(frame, T.confirma3)} />
        Aprovada como venda de R$ 1.240 em 02/11. Vamos para a 2 de 6?
      </div>
    </div>
  );
};
