// Despeja a lista de sons do filme vertical em out/sons-v37.json, para o gera-efeitos.py montar a faixa de efeitos.
// npx esbuild src/v37/ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja-v37.cjs --log-level=error && node out/despeja-v37.cjs
import { AMOR, AVISOS, DIG, RENATO, T } from "../tempos";
import { writeFileSync } from "node:fs";
const s: { f: number; som: string; v: number }[] = [];
for (const d of Object.values(DIG)) for (const k of d) s.push({ f: k.f, som: k.som, v: 1 });
s.push({ f: T.quebra, som: "enter", v: 1 });
// toques na tela: caixa do Claude, enviar do Claude, segurar a prova, Copiar, caixa do WhatsApp, Colar, avisos
for (const f of [T.toque2, T.envia - 1, T.aperta, T.copia, T.toque3, T.cola - 1, T.toqueAviso3 + 3, T.toqueAviso4 + 3]) s.push({ f, som: "toque", v: 1 });
// mensagens: as que chegam na conversa aberta tocam baixo; as de outras conversas, com o aviso, tocam normal
for (const c of [RENATO, AMOR]) for (const m of c.msgs) if (m.f >= 0 && m.lado === "d") s.push({ f: m.f, som: "enviada", v: 1 });
for (const f of [T.chega, T.amor2, T.fimRenato]) s.push({ f, som: "aviso", v: 0.75 });
for (const a of AVISOS) s.push({ f: a.f, som: "aviso", v: 1 });
for (const f of [T.desliza, T.volta]) s.push({ f, som: "chicote", v: 1 });
s.sort((a, b) => a.f - b.f);
writeFileSync("out/sons-v37.json", JSON.stringify({ T, sons: s }));
console.log(s.length, "sons");
