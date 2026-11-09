// As três abstrações das "3 coisas", em coordenadas de tela (1920x1080). Texto em Eudoxus Sans, pesos 700 e 500.
import type { CSSProperties } from "react";
import { Easing, Img, interpolate } from "remotion";
import { C, M } from "../marca";
import { T } from "../gatilhos";

export const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
export const SOMBRA3 = "0 1px 1px rgba(5,12,30,.25), 0 15px 30px -9px rgba(5,12,30,.35), 0 51px 105px -27px rgba(5,12,30,.6)";
const INK = "#0E1525";
const LIMA = "#E8F04F";

export const TITULO_ITEM = "Diagnóstico do atendimento";
// Mensagem com o conector miniaturizado. Tudo em em: o desenho é o mesmo na caixa e no balão, em qualquer tamanho.
export const Pergunta = ({ texto }: { texto: string }) => (
  <>
    <span
      name="Conector Tintim"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.24em",
        padding: "0.06em 0.42em 0.06em 0.14em",
        marginRight: "0.32em",
        borderRadius: "0.46em",
        background: "rgba(20,20,19,.07)",
        verticalAlign: "-0.17em",
        lineHeight: 1.2,
        fontWeight: 500,
      }}
    >
      <span style={{ width: "1em", height: "1em", overflow: "hidden", position: "relative", display: "inline-block", flexShrink: 0 }}>
        <Img src={M.logoAzul} style={{ position: "absolute", left: 0, top: 0, height: "1em", width: "auto", maxWidth: "none" }} />
      </span>
      Tintim
    </span>
    {texto}
  </>
);

// Itens entram um a um em "três coisas": sobem 16 px com fade, 0,25 s entre eles
const entrada = (frame: number, i: number): CSSProperties => {
  const p = interpolate(frame, [T.tres + i * 8, T.tres + i * 8 + 12], [0, 1], { easing: Easing.out(Easing.cubic), ...trava });
  return { opacity: p, translate: `0px ${(1 - p) * 16}px` };
};

const Esqueleto = ({ w, h = 18, cor, brilho, frame, desloc = 0 }: { w: number | string; h?: number; cor: string; brilho: string; frame: number; desloc?: number }) => {
  const ciclo = ((frame + desloc) % 66) / 66;
  return (
    <div style={{ position: "relative", width: w, height: h, borderRadius: h / 2, background: cor, overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, width: "45%", left: `${-45 + ciclo * 145}%`, background: `linear-gradient(90deg, transparent 0%, ${brilho} 50%, transparent 100%)` }} />
    </div>
  );
};

// Ícones de traço: diagnóstico, relatório e vendas encontradas
const Icone = ({ i, cor, tam }: { i: number; cor: string; tam: number }) => {
  const traco = { stroke: cor, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24">
      {i === 0 ? (
        <>
          <path d="M4 5.5h16a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H10.5L6 21v-3.5H4A1.5 1.5 0 0 1 2.5 16V7A1.5 1.5 0 0 1 4 5.5Z" {...traco} />
          <path d="M6 11.5h3l1.5-3 2.5 6 1.6-3H18" {...traco} />
        </>
      ) : i === 1 ? (
        <>
          <path d="M6 2.8h8.5L19 7.3V20a1.2 1.2 0 0 1-1.2 1.2H6A1.2 1.2 0 0 1 4.8 20V4A1.2 1.2 0 0 1 6 2.8Z" {...traco} />
          <path d="M14.3 3v4.5H19M8.5 17.5v-3M12 17.5v-6M15.5 17.5v-4" {...traco} />
        </>
      ) : (
        <>
          <path d="M3 11.5V4.2A1.2 1.2 0 0 1 4.2 3h7.3l9.2 9.2a1.5 1.5 0 0 1 0 2.1l-6.4 6.4a1.5 1.5 0 0 1-2.1 0Z" {...traco} />
          <path d="M7.6 6.2v3M6.1 7.7h3" {...traco} />
        </>
      )}
    </svg>
  );
};

// ─ A · Pilha de cartões ─────────────────────────────────────────
const PILHA = [
  { fundo: "linear-gradient(160deg, #4A82CC 0%, #2F5FA6 100%)", texto: "#FFFFFF", q: "rgba(255,255,255,.18)", ic: "#FFFFFF", bar: "rgba(255,255,255,.26)", bri: "rgba(255,255,255,.55)", e: 1 },
  { fundo: "linear-gradient(160deg, #FFFFFF 0%, #F1F3F7 100%)", texto: INK, q: "#E7EEF8", ic: "#2F5FA6", bar: "#E2E5EB", bri: "rgba(255,255,255,.95)", e: 0.95 },
  { fundo: "linear-gradient(160deg, #F2F6C4 0%, #E8F04F 100%)", texto: INK, q: "rgba(10,28,51,.1)", ic: C.navy, bar: "rgba(10,28,51,.14)", bri: "rgba(255,255,255,.7)", e: 0.9 },
];
export const A_TOPO = 262;
export const A_L = 860;
export const A_H = 300;
const A_X = (1920 - A_L) / 2;
export const A_REVELA = (frame: number) => interpolate(frame, [T.primeira, T.primeira + 24], [0, 1], SUAVE);

const CabecaCartao = ({ i, frame }: { i: number; frame: number }) => {
  const c = PILHA[i];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ width: 64, height: 64, borderRadius: 18, background: c.q, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icone i={i} cor={c.ic} tam={36} />
      </div>
      <div style={{ fontSize: 30, lineHeight: "36px", fontWeight: 700, color: c.texto }}>{i + 1}</div>
      {i > 0 ? (
        <div style={{ marginLeft: 12 }}>
          <Esqueleto w={520} cor={c.bar} brilho={c.bri} frame={frame} desloc={i * 22} />
        </div>
      ) : null}
    </div>
  );
};

// Conteúdo do cartão da frente, usado também enquanto ele cresce
export const FrenteA = ({ frame }: { frame: number }) => {
  const c = PILHA[0];
  const r = A_REVELA(frame);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: A_L, height: A_H, padding: 30, color: c.texto }}>
      <CabecaCartao i={0} frame={frame} />
      <div style={{ position: "absolute", left: 30, top: 118, display: "flex", flexDirection: "column", gap: 16, opacity: 1 - r }}>
        <Esqueleto w={620} h={22} cor={c.bar} brilho={c.bri} frame={frame} />
        <Esqueleto w={420} h={22} cor={c.bar} brilho={c.bri} frame={frame} desloc={10} />
      </div>
      <div style={{ position: "absolute", left: 30, right: 30, top: 108, opacity: r, translate: `0px ${(1 - r) * 10}px` }}>
        <div style={{ fontSize: 46, lineHeight: "56px", fontWeight: 700, letterSpacing: "-0.01em" }}>{TITULO_ITEM}</div>
        <div style={{ marginTop: 8, fontSize: 26, lineHeight: "35px", fontWeight: 500, opacity: 0.78 }}>Leia as conversas da semana e me diga onde a venda se perdeu.</div>
      </div>
    </div>
  );
};
export const entradaFrenteA = (frame: number) => entrada(frame, 0);
export const FUNDO_A = PILHA[0].fundo;

const AltA = ({ frame, morfa }: { frame: number; morfa: number }) => {
  const r = A_REVELA(frame);
  return (
    <>
      <div name="Título" style={{ position: "absolute", left: 0, right: 0, top: 128, textAlign: "center", fontSize: 64, lineHeight: "80px", fontWeight: 700, letterSpacing: "-0.015em", color: "#FFFFFF", opacity: 1 - morfa * 2 }}>
        3 coisas para pedir ao Claude
      </div>
      {[2, 1].map((i) => (
        <div
          key={i}
          name={`Cartão ${i + 1}`}
          style={{
            position: "absolute",
            left: A_X,
            top: A_TOPO + (2 - i) * 110,
            width: A_L,
            height: A_H,
            borderRadius: 36,
            background: PILHA[i].fundo,
            boxShadow: SOMBRA3,
            padding: "23px 30px",
            scale: PILHA[i].e * (1 - 0.03 * r),
            transformOrigin: "50% 0%",
            ...entrada(frame, i),
            opacity: Math.max(0, 1 - morfa * 2) * (1 - 0.5 * r) * (entrada(frame, i).opacity as number),
          }}
        >
          <CabecaCartao i={i} frame={frame} />
        </div>
      ))}
    </>
  );
};

// ─ B · Pedidos prontos ──────────────────────────────────────────
// Grade única de 1368 px: título, cartões e caixa de mensagem nas mesmas margens.
export const B_CAIXA = { x: 276, y: 700, w: 1368, h0: 112, h1: 128, r: 32 };
export const B_FONTE = 36; // a pergunta cabe em uma linha, na caixa e no balão
const B_CARTOES = { y: 372, w: 437, h: 270, gap: 28.5 };
const B_X = (i: number) => 276 + i * (B_CARTOES.w + B_CARTOES.gap);
const B_TITULOS = [TITULO_ITEM, "Relatório para o cliente", "Vendas que o Inspetor encontrou"];
export const VOLTA = 50; // quadros da volta da tela do Claude para a lista
const SEGURA3 = 15; // o card 3 segura 0,5 s desfocado antes de se revelar

const AltB = ({ frame, morfa }: { frame: number; morfa: number }) => {
  const r = interpolate(frame, [T.primeira, T.primeira + 20], [0, 1], SUAVE);
  const r2 = interpolate(frame, [T.palSegunda, T.palSegunda + 20], [0, 1], SUAVE);
  const r3 = interpolate(frame, [T.palTerceira + SEGURA3, T.palTerceira + SEGURA3 + 20], [0, 1], SUAVE);
  const v2 = interpolate(frame, [T.volta2, T.volta2 + VOLTA], [0, 1], SUAVE);
  const v3 = interpolate(frame, [T.volta3, T.volta3 + VOLTA], [0, 1], SUAVE);
  // Revelado fica com título e sem anel; o que falta segue desfocado. O card em destaque tem anel; os outros vão a 55%.
  const revela = [r, r2, r3];
  const v4 = interpolate(frame, [T.volta4, T.volta4 + VOLTA], [0, 1], SUAVE);
  const anel = [r * (1 - v2), r2 * (1 - v3), r3 * (1 - v4)];
  const opac = [
    1 - 0.45 * Math.max(r2 * (1 - v3), r3 * (1 - v4)),
    (1 - 0.5 * r + 0.5 * r * r2) * (1 - 0.45 * r3 * (1 - v4)),
    1 - 0.5 * r + 0.05 * r2 + (0.5 * r - 0.05 * r2) * r3,
  ];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - morfa * 1.6 }}>
      <div name="Título" style={{ position: "absolute", left: 276, top: 124, fontSize: 72, lineHeight: "84px", fontWeight: 700, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
        3 coisas para pedir ao Claude
        <br />
        com o MCP
      </div>
      {[0, 1, 2].map((i) => {
        const e = entrada(frame, i);
        const desfoque = 16 * (1 - revela[i]); // os pedidos ficam escondidos até a vez de cada um
        return (
          <div
            key={i}
            name={`Pedido ${i + 1}`}
            style={{
              position: "absolute",
              left: B_X(i),
              top: B_CARTOES.y,
              width: B_CARTOES.w,
              height: B_CARTOES.h,
              borderRadius: 30,
              background: C.branco,
              boxShadow: "0 1px 1px rgba(5,12,30,.25), 0 26px 36px -26px rgba(5,12,30,.7)", // sem espalhar para o lado: a sombra de um cartão não suja o vizinho
              color: INK,
              ...e,
              opacity: (e.opacity as number) * opac[i],
              outline: anel[i] > 0 ? `4px solid rgba(232,240,79,${anel[i]})` : undefined,
              outlineOffset: 6,
            }}
          >
            <div style={{ position: "absolute", left: 32, top: 32, width: 72, height: 72, borderRadius: 20, background: "#EAF1FB", display: "flex", alignItems: "center", justifyContent: "center", filter: `blur(${desfoque * 0.6}px)` }}>
              <Icone i={i} cor="#1670CB" tam={40} />
            </div>
            <div style={{ position: "absolute", right: 32, top: 32, fontSize: 34, lineHeight: "40px", fontWeight: 700, color: "#A9AFBA", fontVariantNumeric: "tabular-nums" }}>{i + 1}</div>
            <div style={{ position: "absolute", left: 32, right: 32, bottom: 30, fontSize: 38, lineHeight: "46px", fontWeight: 700, letterSpacing: "-0.012em", textWrap: "balance", filter: desfoque > 0.05 ? `blur(${desfoque}px)` : undefined }}>
              {B_TITULOS[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─ C · Números grandes ──────────────────────────────────────────
const C_X = (i: number) => 180 + i * 560;

const AltC = ({ frame }: { frame: number }) => {
  const r = interpolate(frame, [T.primeira, T.primeira + 24], [0, 1], SUAVE);
  return (
    <>
      <div name="Subtítulo" style={{ position: "absolute", left: 0, right: 0, top: 196, textAlign: "center", fontSize: 44, lineHeight: "56px", fontWeight: 500, color: "rgba(255,255,255,.72)" }}>
        3 coisas para pedir já hoje
      </div>
      {[0, 1, 2].map((i) => {
        const e = entrada(frame, i);
        const cheio = i === 0 ? r : 0;
        return (
          <div key={i} name={`Coluna ${i + 1}`} style={{ position: "absolute", left: C_X(i), top: 280, width: 440, ...e, opacity: (e.opacity as number) * (i === 0 ? 1 : 1 - 0.62 * r) }}>
            <div
              style={{
                fontSize: 300,
                lineHeight: "330px",
                fontWeight: 800,
                color: `rgba(232,240,79,${cheio})`,
                WebkitTextStroke: `4px ${i === 0 ? `rgba(${255 - 23 * r},${255 - 15 * r},${255 - 176 * r},${0.6 + 0.4 * r})` : "rgba(255,255,255,.6)"}`,
              }}
            >
              {i + 1}
            </div>
            <div style={{ marginTop: 22, position: "relative", height: 4, background: "rgba(255,255,255,.18)" }}>
              {i === 0 ? <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${r * 100}%`, background: LIMA }} /> : null}
            </div>
            <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 18, opacity: i === 0 ? 1 - r : 1 }}>
              <Icone i={i} cor="rgba(255,255,255,.7)" tam={48} />
              <Esqueleto w={330} h={22} cor="rgba(255,255,255,.16)" brilho="rgba(255,255,255,.5)" frame={frame} desloc={i * 22} />
            </div>
            {i === 0 ? (
              <div style={{ position: "absolute", left: 0, right: 0, top: 380, fontSize: 44, lineHeight: "54px", fontWeight: 700, letterSpacing: "-0.01em", color: "#FFFFFF", opacity: r }}>
                {TITULO_ITEM}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export const Tres = ({ alt, frame, morfa }: { alt: "A" | "B" | "C"; frame: number; morfa: number }) =>
  alt === "A" ? <AltA frame={frame} morfa={morfa} /> : alt === "B" ? <AltB frame={frame} morfa={morfa} /> : <AltC frame={frame} />;
