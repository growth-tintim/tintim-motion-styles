// Trocar de áudio: mude VERSAO em versao.ts e o src da narração em App.tsx. A composição é a mesma.
// Fabíola: kino:386221dd-9a97-42aa-80b7-07711fe9aefb · Marcio: kino:e94419ef-5e1c-43d1-ad40-645889fd95c3
import { VERSAO } from "./versao";
import { ORIGINAL } from "./gatilhos-original";
import { MARCIO } from "./gatilhos-marcio";

export const T = VERSAO === "marcio" ? MARCIO : ORIGINAL;
