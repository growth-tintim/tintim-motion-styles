// Imprime o mapa de tempos do roteiro: cada marco em quadros, segundos e compasso:tempo, o intervalo entre chicotes,
// a velocidade de cada digitação e o tempo de leitura que cada mensagem pede pela régua de 17 caracteres por segundo.
// Serve para conferir o filme em números antes de olhar um quadro. Rode a partir da pasta do filme:
//   npx esbuild ferramentas/tabela-de-tempos.ts --bundle --platform=node --outfile=out/tabela.cjs --log-level=error && node out/tabela.cjs
import { TEMPO } from "../geometria";
import { CHATS, CHICOTES, DIG, T } from "../roteiro";

const QPS = 30;
const REGUA = 17; // caracteres por segundo: norma de legendas da Netflix para português do Brasil, programas adultos
const seg = (f: number) => (f / QPS).toFixed(2).padStart(6);
// Compasso (do 1) e tempo (do 1) em que o quadro cai, e quantos quadros ele está longe do tempo cheio mais próximo.
const naGrade = (f: number) => {
  const k = Math.round((f - 2.25) / TEMPO);
  const fora = f - Math.round(2.25 + TEMPO * k);
  return `${String(Math.floor(k / 4) + 1).padStart(2)}:${(k % 4) + 1}${fora === 0 ? "   " : (fora > 0 ? " +" : " ") + fora}`;
};

console.log("MARCOS (quadro, segundo, compasso:tempo e desvio em quadros)");
for (const [nome, f] of Object.entries(T).sort((a, b) => a[1] - b[1])) console.log(`${nome.padEnd(14)} ${String(f).padStart(5)} ${seg(f)} s  ${naGrade(f)}`);

console.log("\nCHICOTES (intervalo até o seguinte)");
CHICOTES.forEach((c, i) => {
  const prox = CHICOTES[i + 1];
  console.log(`ch${i + 1} ${String(c).padStart(5)} ${seg(c)} s` + (prox ? `  fica ${((prox - c) / QPS).toFixed(2)} s (${((prox - c) / TEMPO).toFixed(1)} tempos)` : "  pouso final"));
});

console.log("\nDIGITAÇÕES (texto final, duração e caracteres por segundo)");
for (const [nome, teclas] of Object.entries(DIG)) {
  const fim = teclas[teclas.length - 1];
  const dur = (fim.f - teclas[0].f) / QPS;
  const n = Array.from(fim.texto).length || teclas.length;
  console.log(`${nome.padEnd(7)} ${String(teclas[0].f).padStart(5)} a ${String(fim.f).padStart(5)}  ${dur.toFixed(2)} s  ${(n / Math.max(dur, 0.01)).toFixed(1)} c/s  "${fim.texto}"`);
}

console.log(`\nMENSAGENS QUE CHEGAM OU SAEM DURANTE O FILME (tempo de leitura pela régua de ${REGUA} c/s)`);
const linhas = CHATS.flatMap((c) => c.msgs.filter((m) => m.f >= 0).map((m) => ({ f: m.f, quem: c.nome, lado: m.lado, texto: m.t.join(" / ") })));
for (const m of linhas.sort((a, b) => a.f - b.f)) {
  const n = Array.from(m.texto).length;
  console.log(`${String(m.f).padStart(5)} ${seg(m.f)} s  ${m.lado === "d" ? "envia " : "recebe"}  ${String(n).padStart(3)} car.  pede ${(n / REGUA).toFixed(1)} s  ${m.quem}: ${m.texto}`);
}
