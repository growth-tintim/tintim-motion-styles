// Palco escuro da marca (GUIA.md, seção 8): degradê navy, luz azul atrás do painel e o pontilhado da marca bem baixo.
// A luz verde acompanha o WhatsApp e se apaga quando o Claude assume a cena.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SUAVE, trava } from "../geometria";
import { T } from "../tempos";

export const Palco = ({ inicio }: { inicio: number }) => {
  const f = useCurrentFrame() + inicio;
  const claude = interpolate(f, [T.desliza, T.troca], [0, 1], SUAVE) - interpolate(f, [T.volta, T.trocaVolta], [0, 1], SUAVE);
  const fecho = interpolate(f, [T.some, T.someFim], [0, 1], trava);
  const verde = (1 - claude) * (1 - fecho);
  const deriva = f / T.fim;
  return (
    <AbsoluteFill name="Palco" style={{ background: "radial-gradient(120% 78% at 50% 44%, #10294A 0%, #0A1C33 50%, #071527 100%)", overflow: "hidden" }}>
      <div name="Pontilhado" style={{ position: "absolute", inset: -40, backgroundImage: "radial-gradient(rgba(74,155,232,.34) 1.7px, rgba(74,155,232,0) 2.3px)", backgroundSize: "34px 34px", translate: `${-18 * deriva}px ${-30 * deriva}px`, WebkitMaskImage: "radial-gradient(90% 60% at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 100%)", maskImage: "radial-gradient(90% 60% at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 100%)" }} />
      <div name="Luz azul" style={{ position: "absolute", left: -160, top: 240 - 40 * deriva, width: 1400, height: 1400, borderRadius: 700, background: "radial-gradient(closest-side, rgba(22,112,203,.36) 0%, rgba(22,112,203,.12) 55%, rgba(22,112,203,0) 100%)" }} />
      <div name="Luz verde" style={{ position: "absolute", left: -380, top: 980, width: 1100, height: 1100, borderRadius: 550, opacity: verde, background: "radial-gradient(closest-side, rgba(37,211,102,.17) 0%, rgba(37,211,102,0) 100%)" }} />
      <div name="Luz clara" style={{ position: "absolute", left: 140, top: 520, width: 800, height: 800, borderRadius: 400, opacity: claude, background: "radial-gradient(closest-side, rgba(250,249,245,.10) 0%, rgba(250,249,245,0) 100%)" }} />
      <AbsoluteFill name="Queda de luz" style={{ background: "radial-gradient(110% 75% at 50% 46%, rgba(3,9,20,0) 55%, rgba(3,9,20,.55) 100%)" }} />
    </AbsoluteFill>
  );
};
