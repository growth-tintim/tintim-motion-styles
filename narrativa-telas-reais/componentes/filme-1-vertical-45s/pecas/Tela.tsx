// A tela do iPhone no palco: a câmera, as trocas de app pela barra de início e o dedo que desliza.
// v2: a tela aparece inteira na largura (pedido do Jorge: take mais aberto), com cantos arredondados e um respiro azul dos lados.
// Tudo é desenhado Z vezes maior e só reduzido pela câmera (escala sempre ≤ 1), sem arredondar a posição (GUIA.md, 7.6).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { IOS, percurso, QUADRO, SUAVE, TELA, trava, Z } from "../geometria";
import { CAMERA, horaEm, T, TROCAS } from "../tempos";
import { Avisos } from "./Avisos";
import { ClaudeIOS } from "./ClaudeIOS";
import { Inicio, Status } from "./Sistema";
import { WhatsAppIOS } from "./WhatsAppIOS";

const PASSO = TELA.w + 22; // distância entre os dois apps durante a troca

const Cartao = ({ x, e, children }: { x: number; e: number; children: React.ReactNode }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: TELA.h, translate: `${x}px 0px`, scale: String(1 - 0.075 * e), borderRadius: e > 0 ? 40 * Math.min(1, e * 4) : 0, overflow: "hidden" }}>{children}</div>
);

type App = "whatsapp" | "claude";
export const appEm = (f: number): App => TROCAS.reduce<App>((a, s) => (f >= s.ate ? s.para : a), "whatsapp");

export const Tela = ({ inicio = 0 }: { inicio?: number }) => {
  const f = useCurrentFrame() + inicio;
  const cam = percurso(CAMERA, f);
  const s = cam.m / Z;
  const some = interpolate(f, [T.some, T.someFim], [0, 1], trava);
  if (some >= 1) return null;
  const tx = QUADRO.w / 2 - cam.x * cam.m;
  const ty = QUADRO.h / 2 - cam.y * cam.m;
  const troca = TROCAS.find((t) => f >= t.de + 2 && f < t.ate);
  const p = troca ? interpolate(f, [troca.de + 2, troca.ate], [0, 1], SUAVE) : 1;
  const e = troca ? Math.sin(Math.PI * p) : 0;
  const agora = appEm(f);
  const x = (app: App) => (!troca ? (app === agora ? 0 : PASSO * 2) : app === troca.para ? -(1 - p) * PASSO : p * PASSO);
  const dedo = TROCAS.map((t) => ({ p: interpolate(f, [t.de - 3, t.de + 11], [0, 1], trava), x: interpolate(f, [t.de, t.de + 10], [128, 300], IOS) })).find((d) => d.p > 0 && d.p < 1);
  return (
    <div name="Tela do iPhone" style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 1 - some, filter: some > 0 ? `blur(${22 * some}px)` : undefined }}>
      <div name="Câmera" style={{ position: "absolute", left: 0, top: 0, width: TELA.w * Z, height: TELA.h * Z, transformOrigin: "0 0", translate: `${tx}px ${ty}px`, scale: String(s), willChange: "transform" }}>
        <div name="Sombra da tela" style={{ position: "absolute", inset: 0, borderRadius: TELA.raio * Z, boxShadow: `0 ${24 * Z}px ${70 * Z}px ${-10 * Z}px rgba(2,8,20,.75), 0 ${6 * Z}px ${18 * Z}px rgba(2,8,20,.35)` }} />
        <div name="Tela em tamanho real" style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: TELA.h, zoom: Z, overflow: "hidden", borderRadius: TELA.raio, background: "#0A1C33" }}>
          {Math.abs(x("whatsapp")) < PASSO ? <Cartao x={x("whatsapp")} e={e}><WhatsAppIOS f={f} /></Cartao> : null}
          {Math.abs(x("claude")) < PASSO ? <Cartao x={x("claude")} e={e}><ClaudeIOS f={f} /></Cartao> : null}
          <Status hora={horaEm(f)} />
          <Avisos f={f} />
          <Inicio />
          {dedo ? (
            <div name="Dedo" style={{ position: "absolute", left: dedo.x - 17, top: TELA.h - 28, width: 34, height: 34, borderRadius: 17, background: "rgba(120,124,134,.34)", boxShadow: "0 0 0 1px rgba(255,255,255,.55), 0 2px 8px rgba(0,0,0,.18)", opacity: Math.min(1, dedo.p * 5, (1 - dedo.p) * 3), zIndex: 30 }} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
