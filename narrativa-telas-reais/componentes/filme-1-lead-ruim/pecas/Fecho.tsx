// Fecho em 1920×1080: as duas frases e a cartela. Texto só parado (GUIA.md, seção 4): entra por foco, nunca viajando.
// As entradas caem nas notas do instrumento que fica sozinho no fim da música (medidas no arquivo de áudio).
import React from "react";
import { Easing, Img, interpolate, useCurrentFrame } from "remotion";
import { C, FONTE } from "../marca";
import { M } from "../midia";
import { CHEGA, QUADRO, trava } from "../geometria";
import { T } from "../roteiro";
import { LogoPiscando } from "./LogoPiscando";

export const Frase = ({ inicio = 0 }: { inicio?: number;
}) => {
  const f = useCurrentFrame() + inicio;
  const sai = interpolate(f, [T.cartela, T.cartela + 9], [0, 1], { easing: Easing.in(Easing.quad), ...trava });
  if (sai >= 1) return null;
  const a = interpolate(f, [T.frase1, T.frase1 + 9], [0, 1], CHEGA);
  const b = interpolate(f, [T.frase2, T.frase2 + 8], [0, 1], CHEGA);
  return (<div name="Frase final" style={{ position: "absolute", inset: 0, opacity: 1 - sai, filter: sai > 0 ? `blur(${18 * sai}px)` : undefined, fontFamily: FONTE }}>
      <div name="O mercado só acelera." style={{ position: "absolute", left: 0, top: 416, width: QUADRO.w, textAlign: "center", fontSize: 96, lineHeight: "116px", fontWeight: 700, letterSpacing: "-0.025em", color: C.branco, opacity: a, filter: a < 1 ? `blur(${(1 - a) * 12}px)` : undefined }}>O mercado só acelera.</div>
      <div name="Com o Tintim você dá conta." style={{ position: "absolute", left: 0, top: 536, width: QUADRO.w, textAlign: "center", fontSize: 96, lineHeight: "116px", fontWeight: 700, letterSpacing: "-0.025em", color: C.lima, opacity: b, filter: b < 1 ? `blur(${(1 - b) * 12}px)` : undefined }}>Com o Tintim você dá conta.</div>
    </div>);
};

// Cartela: a marca nasce do desfoque (estudo de 20/11, item 6.10), a frase vem depois, e o mascote pisca na última nota.
export const Cartela = ({ inicio = 0 }: { inicio?: number;
}) => {
  const f = useCurrentFrame() + inicio;
  if (f < T.logo) return null;
  const desfoque = interpolate(f, [T.logo, T.logo + 16], [24, 0], { easing: Easing.out(Easing.quad), ...trava });
  const escala = interpolate(f, [T.logo, T.logo + 44], [1.22, 1], { easing: Easing.out(Easing.cubic), ...trava });
  const luz = interpolate(f, [T.logo, T.logo + 16], [0, 1], trava);
  const frase = interpolate(f, [T.frase3, T.frase3 + 12], [0, 1], CHEGA);
  const icones = interpolate(f, [T.icones, T.icones + 12], [0, 1], CHEGA);
  // Piscadela: fecha em 3 quadros e abre em 5, como no GUIA.md (seção 8), mas segura o olho fechado por 8 quadros em vez de 2.
  // Com 2, a piscada inteira durava 0,3 s em um mascote pequeno na tela e ninguém via. O mascote dá um pulinho junto, para chamar o olhar.
  const olho = interpolate(f, [T.piscada, T.piscada + 3, T.piscada + 11, T.piscada + 16], [1, 0.08, 0.08, 1], { easing: Easing.inOut(Easing.quad), ...trava });
  const pulo = interpolate(f, [T.piscada - 2, T.piscada + 3, T.piscada + 11, T.piscada + 18], [1, 1.07, 1.07, 1], { easing: Easing.inOut(Easing.quad), ...trava });
  const LOGO = 680;
  return (<div name="Cartela" style={{ position: "absolute", inset: 0, fontFamily: FONTE, color: C.branco }}>
      <div name="Marca do Tintim" style={{ position: "absolute", left: QUADRO.w / 2 - LOGO / 2, top: 296, opacity: luz, filter: desfoque > 0.05 ? `blur(${desfoque}px)` : undefined, scale: String(escala * pulo) }}>
        <LogoPiscando largura={LOGO} s={olho} />
      </div>
      <div name="As vendas do WhatsApp dentro da sua IA." style={{ position: "absolute", left: 0, top: 560, width: QUADRO.w, textAlign: "center", fontSize: 60, lineHeight: "78px", fontWeight: 500, letterSpacing: "-0.015em", opacity: frase, filter: frase < 1 ? `blur(${(1 - frase) * 10}px)` : undefined }}>
        As vendas do WhatsApp dentro da sua IA.
      </div>
      <div name="Claude e ChatGPT" style={{ position: "absolute", left: QUADRO.w / 2 - 124, top: 688, display: "flex", gap: 40, opacity: icones }}>
        <Img src={M.claude} style={{ width: 104, height: 104, display: "block" }} />
        <Img src={M.chatgpt} style={{ width: 104, height: 104, display: "block" }} />
      </div>
    </div>);
};
