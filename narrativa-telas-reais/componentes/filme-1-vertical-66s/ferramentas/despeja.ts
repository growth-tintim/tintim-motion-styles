// Despeja a lista de sons do filme vertical de 1 min em out/sons-v66.json, para o gera-efeitos.py montar a faixa de efeitos.
// npx esbuild src/v66/ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja-v66.cjs --log-level=error && node out/despeja-v66.cjs
import { AVISOS, CHATS, DIG, NAV, T, TROCAS } from "../tempos";
import { writeFileSync } from "node:fs";
const s: { f: number; som: string; v: number }[] = [];
for (const d of Object.values(DIG)) for (const k of d) s.push({ f: k.f, som: k.som, v: 1 });
s.push({ f: T.quebra, som: "enter", v: 1 });
// toques na tela: caixa do Claude, enviar, selecionar, copiar, colar, a linha da lista
const toques = [T.toque2, T.envia - 1, T.aperta, T.copia, T.toque3, T.cola - 1, T.toque4, T.envia2 - 1, T.copia2, T.toque5, T.cola2 - 1,
  T.enviaAmor - 1, T.toqueBarao, T.toqueB, T.enviaB - 1, T.toqueP, T.enviaP - 1, T.enviaBR - 1, T.enviaEq - 1, T.toque6, T.envia3 - 1, T.envio3 - 1];
for (const f of toques) s.push({ f, som: "toque", v: 1 });
for (const a of AVISOS) if (a.toque) s.push({ f: a.ate - 1, som: "toque", v: 1 });
// enviadas tocam o som de envio; as que chegam na conversa aberta tocam baixo; avisos tocam normal
const aberta = (f: number) => NAV.filter((a) => a.f <= f).pop()!.tela;
const avisoEm = new Set(AVISOS.map((a) => a.f));
for (const chat of CHATS) for (const m of chat.msgs) {
  if (m.f < 0) continue;
  if (m.lado === "d") s.push({ f: m.f, som: "enviada", v: 1 });
  else if (!avisoEm.has(m.f) && aberta(m.f) === chat) s.push({ f: m.f, som: "aviso", v: 0.75 });
}
for (const a of AVISOS) s.push({ f: a.f, som: "aviso", v: 1 });
for (const t of TROCAS) s.push({ f: t.de, som: "chicote", v: 1 });
s.sort((a, b) => a.f - b.f);
writeFileSync("out/sons-v66.json", JSON.stringify({ T, sons: s }));
console.log(s.length, "sons", JSON.stringify(s.filter((x) => x.som !== "tecla" && x.som !== "espaco" && x.som !== "apaga")));
