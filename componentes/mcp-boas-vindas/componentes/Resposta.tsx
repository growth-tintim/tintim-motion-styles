// Pergunta e resposta nas três direções de estilo. Texto parado: só entra uma vez, sem quique.
import { interpolateColors } from "remotion";
import type { CSSProperties } from "react";
import { C, FONTE } from "../marca";
import { DIRECAO } from "../direcao";

type Props = { entradaJ?: number; entradaQ: number; entradaA: number; acende: number };

const entra = (e: number, origem: string): CSSProperties => ({
  opacity: e,
  scale: 0.96 + 0.04 * e,
  translate: `0px ${(1 - e) * 4}px`,
  transformOrigin: origem,
});

const coluna = (left: number, width: number, gap: number): CSSProperties => ({
  position: "absolute",
  left,
  top: 0,
  width,
  height: 1080,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap,
  color: C.branco,
  fontFamily: FONTE,
});

const CaudaDireita = ({ cor }: { cor: string }) => (
  <svg style={{ position: "absolute", right: -5, bottom: 0 }} width={20} height={20} viewBox="0 0 20 20">
    <path d="M2 0 V20 H20 C14 20 11 15 11 0 Z" fill={cor} />
  </svg>
);
const CaudaEsquerda = ({ cor }: { cor: string }) => (
  <svg style={{ position: "absolute", left: -5, bottom: 0 }} width={20} height={20} viewBox="0 0 20 20">
    <path d="M18 0 V20 H0 C6 20 9 15 9 0 Z" fill={cor} />
  </svg>
);

// Janela de conversa. A resposta precisa de 465 de largura para caber em 2 linhas; KC mantém a janela e o card no mesmo quadro.
// Pergunta e resposta com 19 px viram 41 px no enquadramento da conversa (zoom 2,8) e 28,5 px no final (zoom 1,95).
const KC = 0.77;
const JANELA = { x: 976, largura: 521, altura: 254 };

const ChatNativo = ({ entradaJ = 1, entradaQ, entradaA, acende }: Props) => (
  <div name="Pergunta e resposta" style={{ position: "absolute", left: JANELA.x, top: 540, width: JANELA.largura * KC, height: 0 }}>
    <div
      name="Janela de conversa"
      style={{
        position: "absolute",
        left: 0,
        top: (-JANELA.altura * KC) / 2,
        width: JANELA.largura,
        height: JANELA.altura,
        scale: KC * (0.96 + 0.04 * entradaJ),
        transformOrigin: "0 0",
        opacity: entradaJ,
        background: C.branco,
        borderRadius: 30,
        padding: 28,
        fontFamily: FONTE,
        color: "#0E1525",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 1px 1px rgba(5,12,30,.25), 0 10px 20px -6px rgba(5,12,30,.35), 0 34px 70px -18px rgba(5,12,30,.6)",
      }}
    >
      <div
        name="Pergunta"
        style={{
          alignSelf: "flex-end",
          whiteSpace: "nowrap", // cabe em uma linha; o balão acompanha o texto
          opacity: entradaQ,
          translate: `0px ${(1 - entradaQ) * 6}px`, // cerca de 12 px na tela
          background: "#F0F1F4",
          borderRadius: 22,
          padding: "11px 16px",
          fontSize: 19,
          lineHeight: "26.6px",
          fontWeight: 400,
          wordSpacing: "0.06em",
        }}
      >
        Como foram as vendas desta semana?
      </div>
      <div name="Resposta" style={{ marginTop: 20, fontSize: 19, lineHeight: "26.6px", fontWeight: 400, wordSpacing: "0.06em", textWrap: "balance", opacity: entradaA, translate: `0px ${(1 - entradaA) * 8}px` }}>
        Foram <span style={{ fontWeight: 700 }}>27 vendas</span> nesta semana, somando <span style={{ fontWeight: 700, whiteSpace: "nowrap" }}>R$ 21.460</span>,{" "}
        <span style={{ color: interpolateColors(acende, [0, 1], ["#5A6170", "#0E1525"]) }}>
          com base nas <span style={{ fontWeight: 700 }}>212 conversas</span> da conta.
        </span>
      </div>
      <div
        name="Campo de digitação"
        style={{
          marginTop: 20,
          height: 56,
          borderRadius: 28,
          boxShadow: "inset 0 0 0 1px #E3E5EA",
          padding: "0 9px 0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 17,
          lineHeight: "22px",
          fontWeight: 400,
          color: "#7B818D",
        }}
      >
        Pergunte sobre as suas contas
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#0E1525", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <path d="M9 14.5V3.8M4.4 8.2 9 3.6l4.6 4.6" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const TipografiaKeynote = ({ entradaQ, entradaA, acende }: Props) => (
  <div name="Pergunta e resposta" style={coluna(984, 340, 0)}>
    <div
      name="Pergunta"
      style={{ fontSize: 15, lineHeight: "20px", fontWeight: 500, color: "rgba(255,255,255,0.56)", marginBottom: 14, whiteSpace: "nowrap", ...entra(entradaQ, "0% 50%") }}
    >
      Como foram as vendas desta semana?
    </div>
    <div name="Resposta" style={{ whiteSpace: "nowrap", ...entra(entradaA, "0% 50%") }}>
      <div style={{ fontSize: 42, lineHeight: "46px", fontWeight: 700, letterSpacing: "-0.022em" }}>27 vendas</div>
      <div style={{ fontSize: 42, lineHeight: "46px", fontWeight: 700, letterSpacing: "-0.022em" }}>R$ 21.460</div>
      <div style={{ fontSize: 18, lineHeight: "24px", fontWeight: 500, letterSpacing: "-0.008em", color: "rgba(255,255,255,0.72)", marginTop: 8 }}>nesta semana</div>
      <div style={{ fontSize: 13, lineHeight: "18px", fontWeight: 500, marginTop: 14, color: interpolateColors(acende, [0, 1], ["rgba(255,255,255,0.5)", C.lima]) }}>
        com base nas 212 conversas da conta
      </div>
    </div>
  </div>
);

const Indicador = ({ valor, rotulo, cor, flexivel = false, destaque = 0 }: { valor: string; rotulo: string; cor: string; flexivel?: boolean; destaque?: number }) => (
  <div
    style={{
      flex: flexivel ? 1 : undefined,
      borderRadius: 8,
      padding: "9px 10px",
      boxShadow: `inset 0 0 0 1px ${interpolateColors(destaque, [0, 1], ["#EBEFF4", "#1670CB"])}`,
    }}
  >
    <div style={{ fontSize: 20, lineHeight: "26px", fontWeight: 700, letterSpacing: "-0.012em", color: cor, whiteSpace: "nowrap" }}>{valor}</div>
    <div style={{ fontSize: 11.5, lineHeight: "16px", fontWeight: 500, color: "rgba(1,27,61,0.6)", whiteSpace: "nowrap" }}>{rotulo}</div>
  </div>
);

const CartaoDados = ({ entradaQ, entradaA, acende }: Props) => (
  <div name="Pergunta e resposta" style={coluna(976, 344, 10)}>
    <div
      name="Pergunta"
      style={{
        alignSelf: "flex-start",
        background: "rgba(255,255,255,0.08)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "8px 12px",
        fontSize: 15,
        lineHeight: "20px",
        fontWeight: 500,
        color: "rgba(255,255,255,0.92)",
        whiteSpace: "nowrap",
        ...entra(entradaQ, "0% 50%"),
      }}
    >
      Como foram as vendas desta semana?
    </div>
    <div
      name="Resposta"
      style={{
        background: C.branco,
        color: "#011B3D",
        borderRadius: 12,
        padding: 14,
        boxShadow: "0 1px 2px rgba(2,8,20,0.4), 0 10px 28px rgba(2,8,20,0.38)",
        ...entra(entradaA, "0% 50%"),
      }}
    >
      <div style={{ fontSize: 13, lineHeight: "18px", fontWeight: 700, marginBottom: 10 }}>Nesta semana</div>
      <div style={{ display: "flex", gap: 8 }}>
        <Indicador valor="27" rotulo="vendas" cor="#1957A1" />
        <Indicador valor="R$ 21.460" rotulo="faturamento" cor="#1F9D57" flexivel />
        <Indicador valor="212" rotulo="conversas" cor="#011B3D" destaque={acende} />
      </div>
    </div>
  </div>
);

export const Resposta = (props: Props) =>
  DIRECAO === 1 ? <ChatNativo {...props} /> : DIRECAO === 2 ? <TipografiaKeynote {...props} /> : <CartaoDados {...props} />;

// Pose de leitura da câmera em cada direção: centro do quadro no mundo e zoom.
export const POSE_LEITURA = { x: DIRECAO === 2 ? 1076 : 1092, y: 540, escala: 2.5 };
