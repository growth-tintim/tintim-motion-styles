import { Easing, interpolate } from "remotion";

export const QUADRO = { w: 1080, h: 1920 };
// Tela do iPhone em pontos (393×852, a mesma proporção das imagens do guia do iPhone da Apple).
// Tudo é desenhado Z vezes maior e reduzido pela câmera, para o texto nunca ser ampliado (regra ui-camera do Kino).
export const TELA = { w: 393, h: 852, raio: 55, moldura: 9 };
export const Z = 3.5; // maior que a maior ampliação da câmera (3,4): a câmera só reduz (GUIA.md, 7.6)
// Áreas do sistema: barra de status com a Dynamic Island em cima, indicador de início embaixo.
export const SEGURA = { topo: 59, base: 34 };
// Teclado do iOS, medido nas imagens do guia da Apple (support.apple.com/pt-br/guide/iphone/iph3c50f96e/ios).
export const TECLADO = { h: 334, tecla: 32.6, vao: 6.2, alt: 42.3, passo: 54, topo: 51 };

export const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
export const CHEGA = { easing: Easing.out(Easing.cubic), ...trava };
// Curva das transições do iOS (teclado, troca de app): sai rápido e pousa devagar.
export const IOS = { easing: Easing.bezier(0.2, 0.9, 0.25, 1), ...trava };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const surge = (f: number, inicio: number, dur = 8) => interpolate(f, [inicio, inicio + dur], [0, 1], trava);

export type Chave = { f: number; x: number; y: number; m?: number; e?: "linear" | "suave" | "chega" };
const curva = { linear: (t: number) => t, suave: Easing.bezier(0.45, 0, 0.15, 1), chega: Easing.out(Easing.cubic) };
export const percurso = (chaves: Chave[], f: number) => {
  if (f <= chaves[0].f) return { x: chaves[0].x, y: chaves[0].y, m: chaves[0].m ?? 1 };
  const u = chaves[chaves.length - 1];
  if (f >= u.f) return { x: u.x, y: u.y, m: u.m ?? 1 };
  let i = 0;
  while (chaves[i + 1].f <= f) i++;
  const a = chaves[i];
  const b = chaves[i + 1];
  const t = curva[b.e ?? "suave"]((f - a.f) / (b.f - a.f));
  return { x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), m: (a.m ?? 1) * Math.pow((b.m ?? 1) / (a.m ?? 1), t) };
};
