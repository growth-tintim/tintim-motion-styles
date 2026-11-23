// Despeja a lista de sons do filme vertical v2 em out/sons-v45.json, para o gera-efeitos.py montar a faixa de efeitos.
// npx esbuild src/v45/ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja-v45.cjs --log-level=error && node out/despeja-v45.cjs
import { ABERTAS, AVISOS, DIG, T, TROCAS } from "../tempos";
import { writeFileSync } from "node:fs";
const s: { f: number; som: string; v: number }[] = [];
for (const d of Object.values(DIG)) for (const k of d) s.push({ f: k.f, som: k.som, v: 1 });
s.push({ f: T.quebra, som: "enter", v: 1 });
// toques na tela
for (const f of [T.toque2, T.envia - 1, T.aperta, T.copia, T.toque3, T.cola - 1, T.toque4, T.envia2 - 1, T.copia2, T.toque5, T.cola2 - 1]) s.push({ f, som: "toque", v: 1 });
for (const a of AVISOS) if (a.toque) s.push({ f: a.ate + 3, som: "toque", v: 1 });
// mensagens enviadas tocam o som de envio; as que chegam na conversa aberta tocam baixo; avisos tocam normal
const aberta = (f: number) => ABERTAS.filter((a) => a.f <= f).pop()!.chat;
for (const { chat } of ABERTAS) for (const m of chat.msgs) if (m.f >= 0 && m.lado === "d" && !s.some((x) => x.f === m.f && x.som === "enviada")) s.push({ f: m.f, som: "enviada", v: 1 });
const avisoEm = new Set(AVISOS.map((a) => a.f));
for (const { chat } of ABERTAS) for (const m of chat.msgs) if (m.f >= 0 && m.lado === "e" && !avisoEm.has(m.f) && aberta(m.f) === chat && !s.some((x) => x.f === m.f && x.som === "aviso")) s.push({ f: m.f, som: "aviso", v: 0.75 });
for (const a of AVISOS) s.push({ f: a.f, som: "aviso", v: 1 });
for (const t of TROCAS) s.push({ f: t.de, som: "chicote", v: 1 });
s.sort((a, b) => a.f - b.f);
writeFileSync("out/sons-v45.json", JSON.stringify({ T, sons: s }));
console.log(s.length, "sons", JSON.stringify(s.filter((x) => x.som !== "tecla" && x.som !== "espaco" && x.som !== "apaga")));
