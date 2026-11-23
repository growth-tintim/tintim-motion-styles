import { Easing, interpolate } from "remotion";

export const QUADRO = { w: 1920, h: 1080 };
// Janela do navegador em pixels de tela de verdade (1440×810), desenhada 3 vezes maior e reduzida pela câmera,
// para o texto nunca ser ampliado (regra ui-camera do Kino: escala no máximo 1).
export const JANELA = { w: 1440, h: 810, topo: 86 };
export const Z = 3;
export const PAGINA = { w: JANELA.w, h: JANELA.h - JANELA.topo };
// No trecho de chicote, o WhatsApp fica na posição 0 e o Claude a DIST pixels de janela para a direita.
export const DIST = 2200;

// WhatsApp Web a 1440 de largura: trilho de 64, painel de conversas com 30% e a conversa no resto (WAWebMain.react).
export const W = { trilho: 64, lista: 432, cabecalho: 64, margem: 0.09 };
export const CONVERSA = { x: W.trilho + W.lista, w: JANELA.w - W.trilho - W.lista };

// Música: "le-jazz_short-03_66sec.wav", 135,2 bpm medidos. Um tempo dura 13,314 quadros; o primeiro cai no quadro 2.
export const TEMPO = 13.314;
export const bt = (k: number) => Math.round(2.25 + TEMPO * k); // k-ésimo tempo, contado do zero
export const bar = (n: number, t = 0) => bt((n - 1) * 4 + t); // compasso n (do 1), tempo t (0 a 3)

export const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };
export const CHEGA = { easing: Easing.out(Easing.cubic), ...trava };
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const surge = (f: number, inicio: number, dur = 8) => interpolate(f, [inicio, inicio + dur], [0, 1], trava);
// Movimento de mão: parte e chega parado, sem tranco (perfil de mínimo solavanco).
export const mao = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * t * (10 - 15 * t + 6 * t * t));

// Percurso por chaves: cada chave diz onde estar no quadro f. "linear" é deriva lenta, "chicote" é a panorâmica veloz.
export type Chave = { f: number; x: number; y: number; m?: number; e?: "linear" | "suave" | "chega" | "chicote" };
const curva = { linear: (t: number) => t, suave: Easing.bezier(0.45, 0, 0.15, 1), chega: Easing.out(Easing.cubic), chicote: Easing.bezier(0.8, 0, 0.2, 1) };
export const percurso = (chaves: Chave[], f: number) => {
  if (f <= chaves[0].f) return { x: chaves[0].x, y: chaves[0].y, m: chaves[0].m ?? 1 };
  const u = chaves[chaves.length - 1];
  if (f >= u.f) return { x: u.x, y: u.y, m: u.m ?? 1 };
  let i = 0;
  while (chaves[i + 1].f <= f) i++;
  const a = chaves[i];
  const b = chaves[i + 1];
  const t = curva[b.e ?? "suave"]((f - a.f) / (b.f - a.f));
  // o zoom anda em escala geométrica, para a aproximação parecer constante
  return { x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), m: (a.m ?? 1) * Math.pow((b.m ?? 1) / (a.m ?? 1), t) };
};
