// Helper de câmera do guia ui-camera do Kino. x e y = ponto do mundo no centro do quadro.
import type { CSSProperties } from "react";

export const uiCamera = (
  camera: { x: number; y: number; scale: number },
  viewport: { width: number; height: number },
  snapTranslation: boolean,
) => {
  const { scale } = camera;
  const x = viewport.width / 2 - camera.x * scale;
  const y = viewport.height / 2 - camera.y * scale;
  const offset = {
    x: snapTranslation ? Math.round(x) : x,
    y: snapTranslation ? Math.round(y) : y,
  };
  const style: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 0,
    width: viewport.width,
    height: viewport.height,
    transformOrigin: "0 0",
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
    textRendering: "geometricPrecision",
  };
  return { offset, style };
};

// Curva suave por chaves (Hermite monotônica): a câmera passa pelas poses sem parar em cada uma
// e sem ultrapassar os valores, como faria um keyframe com easy-ease contínuo.
export const curvaSuave = (frame: number, quadros: number[], valores: number[]) => {
  const n = quadros.length;
  if (frame <= quadros[0]) return valores[0];
  if (frame >= quadros[n - 1]) return valores[n - 1];
  const inclinacoes: number[] = [];
  for (let i = 0; i < n - 1; i++) inclinacoes.push((valores[i + 1] - valores[i]) / (quadros[i + 1] - quadros[i]));
  const tangentes: number[] = [inclinacoes[0]];
  for (let i = 1; i < n - 1; i++) {
    const a = inclinacoes[i - 1];
    const b = inclinacoes[i];
    tangentes.push(a * b <= 0 ? 0 : (2 * a * b) / (a + b));
  }
  tangentes.push(inclinacoes[n - 2]);
  let i = 0;
  while (frame > quadros[i + 1]) i++;
  const h = quadros[i + 1] - quadros[i];
  const t = (frame - quadros[i]) / h;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * t3 - 3 * t2 + 1) * valores[i] +
    (t3 - 2 * t2 + t) * h * tangentes[i] +
    (-2 * t3 + 3 * t2) * valores[i + 1] +
    (t3 - t2) * h * tangentes[i + 1]
  );
};
