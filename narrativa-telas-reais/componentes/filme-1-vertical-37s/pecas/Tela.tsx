// A tela do iPhone ocupando o quadro: a câmera, a troca de app pela barra de início e o dedo que desliza.
// Tudo é desenhado Z vezes maior e só reduzido pela câmera (escala sempre ≤ 1), sem arredondar a posição:
// o Math.round da versão anterior fazia a tela pular meio pixel por quadro, o tremor que o Jorge viu (GUIA.md, 7.6).
import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { IOS, percurso, QUADRO, SUAVE, TELA, trava, Z } from "../geometria";
import { CAMERA, horaEm, T } from "../tempos";
import { ClaudeIOS } from "./ClaudeIOS";
import { Inicio, Status } from "./Sistema";
import { WhatsAppIOS } from "./WhatsAppIOS";

const PASSO = TELA.w + 22; // distância entre os dois apps durante a troca

const Cartao = ({ x, e, children }: { x: number; e: number; children: React.ReactNode }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: TELA.h, translate: `${x}px 0px`, scale: String(1 - 0.075 * e), borderRadius: e > 0 ? 40 * Math.min(1, e * 4) : 0, overflow: "hidden" }}>{children}</div>
);

export const Tela = ({ inicio = 0 }: { inicio?: number }) => {
  const f = useCurrentFrame() + inicio;
  const cam = percurso(CAMERA, f);
  const s = cam.m / Z;
  const some = interpolate(f, [T.some, T.someFim], [0, 1], trava);
  if (some >= 1) return null;
  const tx = QUADRO.w / 2 - cam.x * cam.m;
  const ty = QUADRO.h / 2 - cam.y * cam.m;
  const p1 = interpolate(f, [T.desliza + 2, T.troca], [0, 1], SUAVE);
  const p2 = interpolate(f, [T.volta + 2, T.trocaVolta], [0, 1], SUAVE);
  const e = Math.sin(Math.PI * (p1 > 0 && p1 < 1 ? p1 : p2 > 0 && p2 < 1 ? p2 : 0));
  const xWa = f < T.troca ? p1 * PASSO : -(1 - p2) * PASSO;
  const xCl = f < T.volta ? -(1 - p1) * PASSO : p2 * PASSO;
  // o dedo na barra de início, nas duas trocas
  const dedo = (de: number) => ({ p: interpolate(f, [de - 3, de + 11], [0, 1], trava), x: interpolate(f, [de, de + 10], [128, 300], IOS) });
  const d1 = dedo(T.desliza);
  const d2 = dedo(T.volta);
  const d = d1.p > 0 && d1.p < 1 ? d1 : d2;
  return (
    <div name="Tela do iPhone" style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 1 - some, filter: some > 0 ? `blur(${22 * some}px)` : undefined }}>
      <div name="Câmera" style={{ position: "absolute", left: 0, top: 0, width: TELA.w * Z, height: TELA.h * Z, transformOrigin: "0 0", translate: `${tx}px ${ty}px`, scale: String(s), willChange: "transform" }}>
        <div name="Tela em tamanho real" style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: TELA.h, zoom: Z, overflow: "hidden" }}>
          {Math.abs(xWa) < PASSO ? <Cartao x={xWa} e={e}><WhatsAppIOS f={f} /></Cartao> : null}
          {Math.abs(xCl) < PASSO ? <Cartao x={xCl} e={e}><ClaudeIOS f={f} /></Cartao> : null}
          <Status hora={horaEm(f)} />
          <Inicio />
          {d.p > 0 && d.p < 1 ? (
            <div name="Dedo" style={{ position: "absolute", left: d.x - 17, top: TELA.h - 28, width: 34, height: 34, borderRadius: 17, background: "rgba(120,124,134,.34)", boxShadow: "0 0 0 1px rgba(255,255,255,.55), 0 2px 8px rgba(0,0,0,.18)", opacity: Math.min(1, d.p * 5, (1 - d.p) * 3), zIndex: 30 }} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
