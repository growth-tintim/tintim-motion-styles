// Linha de dados desenhada com evolvePath: traço fino com glow, ponta luminosa e pulsos de luz.
// Vai dentro de um <svg> no sistema de coordenadas do mundo.
import { evolvePath } from "@remotion/paths";
import { C } from "../marca";
import { comprimentoDe, pontoEm } from "./caminhos";

export const ConnectionLine = ({
  d,
  progresso,
  frame,
  cor = "rgba(255,255,255,0.55)",
  largura = 2.5,
  brilho = true,
  pulsos = 0,
  periodoPulso = 54,
  corPulso = C.lima,
  invertido = false,
}: {
  d: string;
  progresso: number; // 0 a 1: quanto da linha já foi desenhado
  frame: number;
  cor?: string;
  largura?: number;
  brilho?: boolean;
  pulsos?: number; // quantos pulsos correm ao mesmo tempo
  periodoPulso?: number; // quadros para um pulso percorrer a linha
  corPulso?: string;
  invertido?: boolean; // pulsos no sentido contrário
}) => {
  if (progresso <= 0) return null;
  const { strokeDasharray, strokeDashoffset } = evolvePath(progresso, d);
  const L = comprimentoDe(d);
  const desenhando = progresso < 1;
  const ponta = pontoEm(d, progresso);
  const tamanhoPulso = Math.min(110, L * 0.2);
  const lista = [];
  for (let i = 0; i < pulsos; i++) {
    const fase = ((frame / periodoPulso + i / pulsos) % 1 + 1) % 1;
    const t = invertido ? 1 - fase : fase;
    const pos = t * (L + tamanhoPulso) - tamanhoPulso;
    const fade = Math.sin(Math.PI * fase);
    lista.push(
      <g key={i} opacity={fade}>
        <path d={d} fill="none" stroke={corPulso} strokeOpacity={0.16} strokeWidth={largura * 5} strokeLinecap="round" strokeDasharray={`${tamanhoPulso} ${L * 2}`} strokeDashoffset={-pos} />
        <path d={d} fill="none" stroke={corPulso} strokeWidth={largura + 1} strokeLinecap="round" strokeDasharray={`${tamanhoPulso} ${L * 2}`} strokeDashoffset={-pos} />
      </g>,
    );
  }
  return (
    <g>
      {brilho ? (
        <>
          <path d={d} fill="none" stroke={C.halftone} strokeOpacity={0.025} strokeWidth={largura * 12} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
          <path d={d} fill="none" stroke={C.halftone} strokeOpacity={0.04} strokeWidth={largura * 8} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
          <path d={d} fill="none" stroke={C.halftone} strokeOpacity={0.07} strokeWidth={largura * 5} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
          <path d={d} fill="none" stroke={C.halftone} strokeOpacity={0.14} strokeWidth={largura * 2.6} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
        </>
      ) : null}
      <path d={d} fill="none" stroke={cor} strokeWidth={largura} strokeLinecap="round" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} />
      {lista}
      {desenhando ? (
        <g>
          <circle cx={ponta.x} cy={ponta.y} r={largura * 6} fill={C.lima} opacity={0.18} />
          <circle cx={ponta.x} cy={ponta.y} r={largura * 3} fill={C.lima} opacity={0.35} />
          <circle cx={ponta.x} cy={ponta.y} r={largura * 1.4} fill={C.branco} />
        </g>
      ) : null}
    </g>
  );
};
