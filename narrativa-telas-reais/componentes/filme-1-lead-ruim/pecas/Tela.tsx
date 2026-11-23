// A tela do computador: a janela do Chrome, o cursor do mouse e a câmera.
// Tudo é desenhado em Z vezes o tamanho de tela e reduzido pela câmera (regra ui-camera do Kino).
// A posição da câmera NÃO é arredondada: arredondar a translação enquanto a escala muda era a causa do tremor da versão 2.
// No solo da música existem duas janelas lado a lado (WhatsApp em 0, Claude em DIST) e a câmera chicoteia entre elas,
// com borrão de movimento proporcional à velocidade.
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { DIST, JANELA, percurso, QUADRO, trava, Z } from "../geometria";
import { CAMERA, CLIQUES, cursorEm, noClaude, SOLO, T } from "../roteiro";
import { Navegador } from "./Navegador";
import { WhatsAppWeb } from "./WhatsAppWeb";
import { ClaudeWeb } from "./ClaudeWeb";
import { Avisos } from "./Avisos";

// Cursor do macOS: seta preta com contorno branco; vira a barra de texto sobre texto. Desenho por observação.
const Ponteiro = ({ f, pagina }: { f: number; pagina: "wa" | "cl" }) => {
  const c = cursorEm(f);
  const barra = pagina === "cl" ? c.y > JANELA.topo + 140 && c.x > 300 : c.y > 744 && c.x > 610 && c.x < 1370;
  let aperta = 0;
  for (const q of CLIQUES) aperta = Math.max(aperta, interpolate(f, [q - 2, q, q + 4], [0, 1, 0], trava));
  return (
    <div name="Cursor do mouse" style={{ position: "absolute", left: c.x, top: c.y, width: 0, height: 0, zIndex: 50 }}>
      {barra ? (
        <svg width={18} height={22} viewBox="0 0 18 22" style={{ position: "absolute", left: -9, top: -11, display: "block", filter: "drop-shadow(0 1px 1px rgba(0,0,0,.25))" }}>
          <path d="M5 2.5c2.2 0 4 .8 4 2.6 0-1.8 1.8-2.6 4-2.6M9 5.1v11.8M5 19.5c2.2 0 4-.8 4-2.6 0 1.8 1.8 2.6 4 2.6M7 11h4" stroke="#FFFFFF" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M5 2.5c2.2 0 4 .8 4 2.6 0-1.8 1.8-2.6 4-2.6M9 5.1v11.8M5 19.5c2.2 0 4-.8 4-2.6 0 1.8 1.8 2.6 4 2.6M7 11h4" stroke="#141413" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ) : (
        <svg width={20} height={26} viewBox="0 0 20 26" style={{ position: "absolute", left: -3, top: -2, display: "block", scale: String(1 - 0.12 * aperta), transformOrigin: "3px 2px", filter: "drop-shadow(0 1.5px 2px rgba(0,0,0,.35))" }}>
          <path d="M3 2v18.2l4.5-4.1 3 7 3-1.3-3-6.9 6.3-.4Z" fill="#141413" stroke="#FFFFFF" strokeWidth={1.4} strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
};

// Folga em volta do quadro, para o borrão ter imagem de verdade além da borda.
const FX = 640;
const FY = 160;

const Janela = ({ f, ox, pagina, cam, comCursor, foco }: { f: number; ox: number; pagina: "wa" | "cl"; cam: { x: number; y: number; m: number }; comCursor: boolean; foco: boolean }) => {
  const tx = FX + QUADRO.w / 2 - (cam.x - ox) * cam.m;
  const ty = FY + QUADRO.h / 2 - cam.y * cam.m;
  const cursor = comCursor ? cursorEm(f) : null;
  return (
    <div name={pagina === "cl" ? "Câmera · janela do Claude" : "Câmera · janela do WhatsApp"} style={{ position: "absolute", left: 0, top: 0, width: JANELA.w * Z, height: JANELA.h * Z, transformOrigin: "0 0", translate: `${tx}px ${ty}px`, scale: String(cam.m / Z), willChange: "transform" }}>
      <div name="Sombra da janela" style={{ position: "absolute", inset: 0, borderRadius: 10 * Z, boxShadow: `0 ${24 * Z}px ${70 * Z}px ${-10 * Z}px rgba(2,8,20,.75), 0 ${6 * Z}px ${18 * Z}px rgba(2,8,20,.35)` }} />
      <div name="Tela em tamanho real" style={{ position: "absolute", left: 0, top: 0, width: JANELA.w, height: JANELA.h, zoom: Z }}>
        <Navegador f={f} pagina={pagina} cursor={cursor}>
          {pagina === "cl" ? <ClaudeWeb f={f} foco={foco} /> : <WhatsAppWeb f={f} cursor={cursor} foco={foco} />}
        </Navegador>
        {comCursor ? <Ponteiro f={f} pagina={pagina} /> : null}
      </div>
    </div>
  );
};

export const Tela = ({ inicio = 0 }: { inicio?: number }) => {
  const f = useCurrentFrame() + inicio;
  // Cada cena tem o seu filtro: no Kino a cena seguinte é montada antes de entrar, e dois filtros com o mesmo id se confundiriam.
  const idBorrao = "borrao-da-camera-" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const cam = percurso(CAMERA, f);
  const some = interpolate(f, [T.some, T.someFim], [0, 1], trava);
  if (some >= 1) return null;
  // Velocidade da câmera em pixels do quadro por quadro: vira borrão de obturador (metade do deslocamento, em desvio-padrão).
  const antes = percurso(CAMERA, f - 0.5);
  const depois = percurso(CAMERA, f + 0.5);
  const bx = Math.min(210, Math.max(0, Math.abs(depois.x - antes.x) * cam.m - 36) * 0.13);
  const by = Math.min(40, Math.max(0, Math.abs(depois.y - antes.y) * cam.m - 36) * 0.13);
  const borra = bx > 0.4 || by > 0.4;
  const solo = f >= SOLO.de && f <= SOLO.ate;
  const meiaVista = QUADRO.w / 2 / cam.m + FX / cam.m;
  const veA = cam.x - meiaVista < JANELA.w + 120;
  const veB = solo && cam.x + meiaVista > DIST - 120;
  const noB = solo && cam.x > DIST / 2;
  const filtros = [borra ? `url(#${idBorrao})` : "", some > 0 ? `blur(${22 * some}px)` : ""].join(" ").trim();
  return (
    <>
      <svg name="Filtro de borrão" width={0} height={0} style={{ position: "absolute" }}>
        <defs>
          <filter id={idBorrao} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation={`${bx.toFixed(2)} ${by.toFixed(2)}`} />
          </filter>
        </defs>
      </svg>
      <div name="Tela do computador" style={{ position: "absolute", left: -FX, top: -FY, width: QUADRO.w + 2 * FX, height: QUADRO.h + 2 * FY, overflow: "hidden", opacity: 1 - some, filter: filtros || undefined }}>
        {veA ? <Janela f={f} ox={0} pagina={solo ? "wa" : noClaude(f) ? "cl" : "wa"} cam={cam} comCursor foco={!noB} /> : null}
        {veB ? <Janela f={f} ox={DIST} pagina="cl" cam={cam} comCursor={false} foco={noB} /> : null}
        <div name="Avisos no quadro" style={{ position: "absolute", left: FX, top: FY, width: QUADRO.w, height: QUADRO.h }}>
          <Avisos f={f} />
        </div>
      </div>
    </>
  );
};
