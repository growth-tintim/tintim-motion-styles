// Avisos de mensagem que chegam enquanto ele está no Claude. Ficam no canto do quadro, como legenda de filme:
// é um recurso de montagem, desenhado por observação dos avisos do macOS, e não uma cópia de tela.
import React from "react";
import { Easing, interpolate } from "remotion";
import { IC } from "../icones";
import { SISTEMA } from "../marca";
import { CHEGA, QUADRO, trava } from "../geometria";
import { AVISO_DURA, AVISOS } from "../roteiro";

const dura = (a: { dura?: number }) => a.dura ?? AVISO_DURA;

const L = 560;
const alturaDe = (t: string) => (t.length > 40 ? 126 : 98);

export const Avisos = ({ f }: { f: number }) => (
  <div name="Avisos de mensagem" style={{ position: "absolute", left: 0, top: 0, width: QUADRO.w, height: QUADRO.h, fontFamily: SISTEMA, pointerEvents: "none" }}>
    {AVISOS.map((a, i) => {
      if (f < a.f || f > a.f + dura(a) + 10) return null;
      const entra = interpolate(f, [a.f, a.f + 10], [0, 1], CHEGA);
      const sai = interpolate(f, [a.f + dura(a), a.f + dura(a) + 9], [0, 1], { easing: Easing.in(Easing.cubic), ...trava });
      // aviso mais novo entra em cima e empurra os anteriores para baixo
      let y = 44;
      for (const b of AVISOS) if (b.f > a.f && f >= b.f && f <= b.f + dura(b) + 10) y += (alturaDe(b.t) + 12) * interpolate(f, [b.f, b.f + 10], [0, 1], CHEGA) * (1 - interpolate(f, [b.f + dura(b), b.f + dura(b) + 9], [0, 1], trava));
      return (
        <div key={i} name={`Aviso de ${a.de}`} style={{ position: "absolute", left: QUADRO.w - L - 44, top: y, width: L, height: alturaDe(a.t), boxSizing: "border-box", borderRadius: 26, background: "rgba(34,35,38,.94)", boxShadow: "0 0 0 1px rgba(255,255,255,.13) inset, 0 18px 50px rgba(0,0,0,.45), 0 2px 8px rgba(0,0,0,.3)", padding: "18px 22px 18px 18px", display: "flex", gap: 16, alignItems: "flex-start", color: "#FFFFFF", translate: `${(1 - entra) * (L + 80) + sai * (L + 80)}px 0px`, opacity: Math.min(1, entra * 2) }}>
          <svg name="WhatsApp" width={58} height={58} viewBox="0 0 58 58" style={{ display: "block", flexShrink: 0, marginTop: 2 }}>
            <rect width={58} height={58} rx={14} fill="#25D366" />
            <g transform="translate(11 11) scale(1.5)" fill="#FFFFFF">
              <path d={IC.whatsapp.p[0].d} />
              <path d={IC.whatsapp.p[1].d} />
            </g>
          </svg>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontSize: 22, lineHeight: "28px", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.de}</div>
              <div style={{ fontSize: 17, lineHeight: "28px", color: "rgba(255,255,255,.5)", flexShrink: 0 }}>agora</div>
            </div>
            <div style={{ fontSize: 21, lineHeight: "28px", color: "rgba(255,255,255,.86)", marginTop: 2 }}>{a.t}</div>
          </div>
        </div>
      );
    })}
  </div>
);
