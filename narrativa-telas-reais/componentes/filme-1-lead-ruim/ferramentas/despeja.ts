// Despeja a lista de sons do roteiro em out/sons.json, para o gera-efeitos.py montar a faixa de efeitos.
// Rode a partir da pasta do filme, num lugar onde o pacote "remotion" esteja instalado (o roteiro importa geometria.ts, que usa o Remotion):
//   npx esbuild ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja.cjs --log-level=error && node out/despeja.cjs
import { T, SONS, DIG, CHICOTES, SOLO } from "../roteiro";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("out", { recursive: true });
writeFileSync("out/sons.json", JSON.stringify({ T, sons: SONS(), CHICOTES, SOLO }));
console.log(JSON.stringify(T));
console.log(Object.entries(DIG).map(([k, v]) => `${k}:${v[0].f}-${v[v.length - 1].f}`).join(" "));
