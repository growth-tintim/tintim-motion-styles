// Avisos que caem do topo, por cima de qualquer app: foto do contato com o selo do WhatsApp, como os avisos de comunicação do iOS.
// Os novos entram em cima e empurram os anteriores para baixo; à vista ficam no máximo três (desenho meu, para mostrar a fila crescendo).
import React from "react";
import { interpolate } from "remotion";
import { IC } from "../icones";
import { SISTEMA } from "../marca";
import { IOS, TELA, trava } from "../geometria";
import { Aviso, AVISOS } from "../tempos";
import { Foto, Toque } from "./Sistema";

const VERDE = "#25D366";
const linhas = (t: string) => (t.length > 40 ? 2 : 1);
const altura = (a: Aviso) => 50 + 20 * linhas(a.t);
const VAO = 8;
const presenca = (a: Aviso, f: number) => interpolate(f, [a.f, a.f + 11], [0, 1], IOS) * (1 - interpolate(f, [a.ate, a.ate + 8], [0, 1], IOS));

const Cartao = ({ a, f, y, p, fundo }: { a: Aviso; f: number; y: number; p: number; fundo: number }) => (
  <div name={`Aviso de ${a.de}`} style={{ position: "absolute", left: 9, top: 0, width: TELA.w - 18, height: altura(a), boxSizing: "border-box", borderRadius: 22, background: "rgba(248,248,248,.97)", boxShadow: "0 10px 34px rgba(0,0,0,.22), 0 0 0 .5px rgba(0,0,0,.07)", padding: "13px 16px 0 64px", fontFamily: SISTEMA, color: "#000000", translate: `0px ${y}px`, opacity: Math.min(1, p * 2.5) * (1 - fundo), scale: String(1 - 0.04 * fundo) }}>
    <div style={{ position: "absolute", left: 13, top: (altura(a) - 40) / 2 }}>
      <Foto foto={a.foto} t={40} />
      <div name="Selo do WhatsApp" style={{ position: "absolute", right: -4, bottom: -3, width: 19, height: 19, borderRadius: 9.5, background: VERDE, boxShadow: "0 0 0 2px rgba(248,248,248,1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={12} height={12} viewBox={IC.whatsapp.vb} style={{ display: "block", color: "#FFFFFF" }}>
          {IC.whatsapp.p.map((q, i) => <path key={i} d={q.d} fill="currentColor" fillRule={q.e ? "evenodd" : undefined} />)}
        </svg>
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
      <div style={{ flex: 1, fontSize: 15, lineHeight: "20px", fontWeight: 600, letterSpacing: "-0.015em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.de}</div>
      <div style={{ fontSize: 13, lineHeight: "20px", color: "rgba(0,0,0,.45)" }}>agora</div>
    </div>
    <div style={{ fontSize: 15, lineHeight: "20px", letterSpacing: "-0.01em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.t}</div>
    {a.toque ? <Toque p={interpolate(f, [a.ate - 6, a.ate + 4], [0, 1], trava)} /> : null}
  </div>
);

// Um aviso de cada vez: o novo substitui o anterior, como no iOS.
export const Avisos = ({ f }: { f: number }) => (
  <div name="Avisos" style={{ position: "absolute", left: 0, top: 50, width: TELA.w, height: 0, zIndex: 26 }}>
    {AVISOS.map((a, i) => {
      const prox = AVISOS[i + 1];
      const b = { ...a, ate: prox ? Math.min(a.ate, prox.f) : a.ate };
      const p = presenca(b, f);
      if (p <= 0) return null;
      const y = -(1 - interpolate(f, [a.f, a.f + 11], [0, 1], IOS)) * 140 - interpolate(f, [b.ate, b.ate + 8], [0, 1], IOS) * 140;
      return <Cartao key={a.f} a={a} f={f} y={y} p={p} fundo={0} />;
    })}
  </div>
);
