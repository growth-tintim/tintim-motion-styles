// Teclado do iOS, claro. Medidas tiradas das imagens do guia do iPhone da Apple (iOS 26/27):
// painel de 334 pt com os cantos de cima arredondados, teclas de 32,6 × 42,3 pt, vão de 6,2 pt, fileiras a cada 54 pt,
// emoji e ditado embaixo. O balão que amplia a letra tocada e as sugestões são desenho por estimativa.
import React from "react";
import { TEC, SISTEMA } from "../marca";
import { TECLADO as K, TELA } from "../geometria";

export type Tecla = { q: number; c: string }; // c: o caractere; "⌫" apaga, "⏎" quebra a linha
const SEM_ACENTO: Record<string, string> = { á: "a", ã: "a", â: "a", à: "a", é: "e", ê: "e", í: "i", ó: "o", ô: "o", õ: "o", ú: "u", ç: "c" };
const base = (c: string) => SEM_ACENTO[c.toLowerCase()] ?? c.toLowerCase();
const maiuscula = (c: string) => c.length === 1 && c !== c.toLowerCase();
const SIMBOLO = "?:";

const L = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
const N1 = "1234567890".split("");
const N2 = ["-", "/", ":", ";", "(", ")", "R$", "&", "@", "\""];
const N3 = [".", ",", "?", "!", "'"];
const X2 = 25.5;
const X3 = 64.3;
const passo = K.tecla + K.vao;
const y = (l: number) => K.topo + l * K.passo;

const Tra = ({ d, t = 24, l = 1.7 }: { d: string; t?: number; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
    <path d={d} stroke="#000000" strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Botao = ({ x, l, w, apertada, children, tam = 23 }: { x: number; l: number; w: number; apertada: boolean; children: React.ReactNode; tam?: number }) => (
  <div style={{ position: "absolute", left: x, top: y(l), width: w, height: K.alt, borderRadius: 8.5, background: apertada ? TEC.apertada : TEC.tecla, boxShadow: "0 1px 0 rgba(0,0,0,.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: tam, lineHeight: "28px", color: TEC.texto }}>{children}</div>
);
// Tecla de letra: quando tocada, mostra a letra ampliada num balão acima dela.
const Letra = ({ x, l, w = K.tecla, rotulo, apertada }: { x: number; l: number; w?: number; rotulo: string; apertada: boolean }) => (
  <>
    <Botao x={x} l={l} w={w} apertada={false}><span style={{ translate: "0 -1.5px" }}>{rotulo}</span></Botao>
    {apertada ? (
      <div style={{ position: "absolute", left: x - 7, top: y(l) - 50, width: w + 14, height: 50 + K.alt, borderRadius: "12px 12px 9px 9px", background: TEC.tecla, boxShadow: "0 3px 14px rgba(0,0,0,.2), 0 0 0 .5px rgba(0,0,0,.08)", display: "flex", justifyContent: "center", fontSize: 34, lineHeight: "50px", color: TEC.texto, zIndex: 3 }}>{rotulo}</div>
    ) : null}
  </>
);

export const Teclado = ({ f, k, teclas, vazio, sugestoes }: { f: number; k: number; teclas: Tecla[]; vazio: boolean; sugestoes: string[] }) => {
  if (k <= 0) return null;
  const agora = teclas.find((t) => f >= t.q && f < t.q + 2);
  const numeros = teclas.some((t) => SIMBOLO.includes(t.c) && f >= t.q - 5 && f < t.q + 3);
  const apertou123 = teclas.some((t) => SIMBOLO.includes(t.c) && f >= t.q - 5 && f < t.q - 3);
  const proxima = teclas.find((t) => t.q + 2 > f);
  const alta = vazio || (proxima !== undefined && maiuscula(proxima.c) && f >= proxima.q - 4);
  const apertouShift = proxima !== undefined && maiuscula(proxima.c) && !vazio && f >= proxima.q - 4 && f < proxima.q - 2;
  const tocada = agora ? base(agora.c) : "";
  const rot = (c: string) => (alta ? c.toUpperCase() : c);
  return (
    <div name="Teclado" style={{ position: "absolute", left: 0, top: TELA.h - K.h, width: TELA.w, height: K.h, translate: `0px ${(1 - k) * K.h}px`, borderRadius: "27px 27px 0 0", background: TEC.painel, boxShadow: "0 -.5px 0 rgba(0,0,0,.1)", fontFamily: SISTEMA, zIndex: 5 }}>
      <div name="Sugestões" style={{ position: "absolute", left: 0, top: 6, width: TELA.w, height: 40, display: "flex", alignItems: "center", fontSize: 16, lineHeight: "21px", color: "#000000" }}>
        <div style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden" }}>{sugestoes[0]}</div>
        <div style={{ width: 1, height: 22, background: "rgba(0,0,0,.12)" }} />
        <div style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden" }}>{sugestoes[1]}</div>
        <div style={{ width: 1, height: 22, background: "rgba(0,0,0,.12)" }} />
        <div style={{ flex: 1, textAlign: "center", whiteSpace: "nowrap", overflow: "hidden" }}>{sugestoes[2]}</div>
      </div>
      {numeros ? (
        <>
          {N1.map((c, i) => <Letra key={c} x={K.vao + i * passo} l={0} rotulo={c} apertada={tocada === c} />)}
          {N2.map((c, i) => <Letra key={c} x={K.vao + i * passo} l={1} rotulo={c} apertada={tocada === c} />)}
          <Botao x={K.vao} l={2} w={43} apertada={false} tam={15}>#+=</Botao>
          {N3.map((c, i) => <Letra key={c} x={X3 + i * (48 + K.vao)} l={2} w={48} rotulo={c} apertada={tocada === c} />)}
        </>
      ) : (
        <>
          {L[0].split("").map((c, i) => <Letra key={c} x={K.vao + i * passo} l={0} rotulo={rot(c)} apertada={tocada === c} />)}
          {L[1].split("").map((c, i) => <Letra key={c} x={X2 + i * passo} l={1} rotulo={rot(c)} apertada={tocada === c} />)}
          <Botao x={K.vao} l={2} w={43} apertada={apertouShift}>
            <svg width={24} height={24} viewBox="0 0 24 24" style={{ display: "block" }}><path d="M12 4.2 4.2 12.6h4.1v6.2h7.4v-6.2h4.1Z" fill={alta ? "#000000" : "none"} stroke="#000000" strokeWidth={1.7} strokeLinejoin="round" /></svg>
          </Botao>
          {L[2].split("").map((c, i) => <Letra key={c} x={X3 + i * passo} l={2} rotulo={rot(c)} apertada={tocada === c} />)}
        </>
      )}
      <Botao x={TELA.w - K.vao - 43.2} l={2} w={43.2} apertada={tocada === "⌫"}>
        <Tra d="M9.2 5.6h9.6a2.2 2.2 0 0 1 2.2 2.2v8.4a2.2 2.2 0 0 1-2.2 2.2H9.2L3 12ZM12.2 9.4l5 5.2M17.2 9.4l-5 5.2" t={26} />
      </Botao>
      <Botao x={K.vao} l={3} w={89} apertada={apertou123} tam={16}>{numeros ? "ABC" : "123"}</Botao>
      <Botao x={102.2} l={3} w={187.4} apertada={tocada === " "}>{null}</Botao>
      <Botao x={296} l={3} w={90.8} apertada={tocada === "⏎"}>
        <Tra d="M19 6.5v5a1.8 1.8 0 0 1-1.8 1.8H5.5M9 9.6l-3.6 3.7L9 17" t={25} l={1.8} />
      </Botao>
      <div name="Emoji" style={{ position: "absolute", left: 40.5 - 14, top: 293 - 14 }}>
        <svg width={28} height={28} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
          <circle cx={12} cy={12} r={9.2} stroke="#000000" strokeWidth={1.6} />
          <circle cx={8.9} cy={10} r={1.15} fill="#000000" />
          <circle cx={15.1} cy={10} r={1.15} fill="#000000" />
          <path d="M7.6 13.6a4.6 4.6 0 0 0 8.8 0Z" fill="#000000" />
        </svg>
      </div>
      <div name="Ditado" style={{ position: "absolute", left: 350 - 14, top: 293 - 14 }}>
        <Tra d="M12 3.2a3 3 0 0 1 3 3v5.2a3 3 0 0 1-6 0V6.2a3 3 0 0 1 3-3ZM6.2 11.2a5.8 5.8 0 0 0 11.6 0M12 17v3.6M8.8 20.6h6.4" t={28} l={1.6} />
      </div>
    </div>
  );
};

// Sugestões do teclado para o texto digitado até agora.
export const sugerir = (inteiro: string, n: number, tabela: { alt: string[]; prox: string[][] }, vazias: string[]) => {
  const digitado = inteiro.slice(0, n);
  if (n === 0) return vazias;
  const palavras = inteiro.split(" ");
  const i = digitado.split(" ").length - 1;
  const parcial = digitado.split(" ")[i];
  if (parcial === "") return tabela.prox[i - 1] ?? ["", "", ""];
  const alvo = palavras[i].replace(/[?:]/g, "");
  if (parcial.replace(/[?:]/g, "") === alvo) return n === inteiro.length && i === palavras.length - 1 && /[?:]$/.test(inteiro) ? ["", "", ""] : [`“${alvo}”`, tabela.alt[i] ?? "", tabela.prox[i]?.[0] ?? ""];
  return [`“${parcial}”`, alvo.length > 2 ? alvo : tabela.alt[i] ?? "", alvo.length > 2 ? tabela.alt[i] ?? "" : alvo];
};
