// Palco escuro da marca (GUIA.md, seção 8), em 1920×1080: degradê navy, luz azul e o pontilhado bem baixo.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { DIST, percurso, trava } from "../geometria";
import { CAMERA, noClaude, T } from "../roteiro";

export const Palco = ({ inicio = 0 }: { inicio?: number }) => {
  const f = useCurrentFrame() + inicio;
  // a luz verde acompanha o WhatsApp: some quando a tela do Claude está em cena
  const claude = Math.max(noClaude(f) ? 1 : 0, interpolate(percurso(CAMERA, f).x, [DIST * 0.35, DIST * 0.65], [0, 1], trava));
  const fecho = interpolate(f, [T.some, T.someFim], [0, 1], trava);
  const deriva = f / T.fim;
  return (
    <AbsoluteFill name="Palco" style={{ background: "radial-gradient(90% 100% at 50% 46%, #10294A 0%, #0A1C33 52%, #071527 100%)", overflow: "hidden" }}>
      <div name="Pontilhado" style={{ position: "absolute", inset: -40, backgroundImage: "radial-gradient(rgba(74,155,232,.34) 1.7px, rgba(74,155,232,0) 2.3px)", backgroundSize: "34px 34px", translate: `${-24 * deriva}px ${-14 * deriva}px`, WebkitMaskImage: "radial-gradient(70% 80% at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 100%)", maskImage: "radial-gradient(70% 80% at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,.55) 100%)" }} />
      <div name="Luz azul" style={{ position: "absolute", left: 260, top: -160, width: 1400, height: 1400, borderRadius: 700, background: "radial-gradient(closest-side, rgba(22,112,203,.34) 0%, rgba(22,112,203,.11) 55%, rgba(22,112,203,0) 100%)" }} />
      <div name="Luz verde" style={{ position: "absolute", left: -320, top: 420, width: 1100, height: 1100, borderRadius: 550, opacity: (1 - claude) * (1 - fecho), background: "radial-gradient(closest-side, rgba(37,211,102,.15) 0%, rgba(37,211,102,0) 100%)" }} />
      <AbsoluteFill name="Queda de luz" style={{ background: "radial-gradient(85% 95% at 50% 48%, rgba(3,9,20,0) 55%, rgba(3,9,20,.55) 100%)" }} />
    </AbsoluteFill>
  );
};
