// Posição ao longo de um path SVG, com tabela em cache para não recalcular a cada quadro.
import { getLength, getPointAtLength } from "@remotion/paths";

type Tabela = { comprimento: number; pontos: { x: number; y: number }[] };
const cache = new Map<string, Tabela>();
const AMOSTRAS = 240;

const tabela = (d: string): Tabela => {
  const existente = cache.get(d);
  if (existente) return existente;
  const comprimento = getLength(d);
  const pontos = [];
  for (let i = 0; i <= AMOSTRAS; i++) pontos.push(getPointAtLength(d, (comprimento * i) / AMOSTRAS));
  const nova = { comprimento, pontos };
  cache.set(d, nova);
  return nova;
};

export const comprimentoDe = (d: string) => tabela(d).comprimento;

export const pontoEm = (d: string, t: number) => {
  const { pontos } = tabela(d);
  const pos = Math.max(0, Math.min(1, t)) * AMOSTRAS;
  const i = Math.floor(pos);
  const a = pontos[i];
  const b = pontos[Math.min(i + 1, AMOSTRAS)];
  const f = pos - i;
  return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
};
