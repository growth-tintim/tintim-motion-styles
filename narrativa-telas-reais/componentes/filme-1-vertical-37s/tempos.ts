// Filme 1, "Lead ruim", versão vertical de 37 s (1080×1920, 30 qps). Um só lugar para mexer em tempo, texto e câmera.
// Roteiro aprovado pelo Jorge em 23/11: videos-motion-mcp/filme-1-lead-ruim/vertical/2026-11-23-roteiro-vertical-37s-v1.md.
// Grade da música (le-jazz_short-02_37sec.wav, medida em 23/11): 135,2 bpm, um tempo = 13,314 quadros, primeiro tempo no quadro 0.
// A banda entra no quadro 213 (compasso 5); último ataque da banda no 853; depois, um instrumento sozinho até o floreio de 1059 a 1072.
// Todos os nomes, conversas e números são fictícios.
import type { Chave } from "./geometria";

export const TEMPO = 13.314;
export const bt = (k: number) => Math.round(0.12 + TEMPO * k);

// ───────────── Marcos ─────────────
export const T = {
  // Introdução (só o baixo): a reclamação chega, ele começa a se defender e desiste; a fila de outros clientes aparece em aviso
  chega: 13,
  dig1: 50, // primeira tecla da defesa que ele apaga
  aviso1: 133, // "Lucas??", da Dra. Paula
  aviso2: 160, // "Perdi tudo?", da Marcela
  desliza: 195, // desliza a barra de início: troca para o Claude
  troca: 213, // a banda entra
  toque2: 218, // toca na caixa de pedidos do Claude
  dig2: 229,
  envia: bt(25), // 333
  frase0: bt(26),
  ferr1: bt(27),
  ferr2: bt(28),
  lido: bt(29) - 6,
  r1: bt(29),
  r2: bt(30),
  r3: bt(31),
  r4: bt(32),
  r5: bt(33),
  aperta: bt(34), // pressiona a prova
  sel: bt(34) + 8, // a seleção aparece
  menu: bt(34) + 10,
  copia: bt(36), // toca em Copiar
  volta: bt(37) - 4, // desliza de volta para o WhatsApp
  trocaVolta: bt(37) + 12,
  dig3: bt(38) + 2,
  quebra: bt(41) + 3, // tecla de retorno: linha nova
  toque3: bt(41) + 7, // toca na caixa: aparece "Colar"
  cola: bt(42),
  envio1: bt(43), // 573
  // A esposa interrompe
  aviso3: bt(46), // 613
  toqueAviso3: bt(47) + 8,
  abreAmor: bt(48), // 639
  dig4: bt(48) + 9,
  mandaAmor: bt(55), // 732
  aviso4: bt(57), // 759, "Falei com a equipe.", do Renato
  amor2: bt(58), // 772, "Acho bom."
  toqueAviso4: bt(59) + 2,
  abreRenato: bt(60), // 799
  fimRenato: 850, // "Você tinha razão. Valeu, Lucas! 🙏": três quadros antes do último ataque da banda (853), a mesma regra do filme de 66 s
  // Fecho: o mesmo do filme de 66 s, 853 quadros antes (o corte de 37 s é o de 66 s sem os compassos 17 a 32)
  some: 903,
  someFim: 915,
  frase1: 915,
  frase2: 955,
  cartela: 1015,
  logo: 1021,
  frase3: 1035,
  icones: 1047,
  piscada: 1061,
  fim: 1110,
};

// ───────────── Digitação (mesmo motor do filme de 66 s) ─────────────
// Gente digita em rajadas, com pausa depois de pontuação. O sorteio é fixo (mesma semente, mesmo ritmo).
const sorteio = (s: number) => () => {
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export type Tecla = { f: number; texto: string; som: "tecla" | "espaco" | "apaga" | "enter"; c: string };
type Passo = string | { pausa: number } | { apaga: number; ritmo?: number };
const digita = (inicio: number, passos: Passo[], ritmo = 1.9, semente = 7, texto0 = ""): Tecla[] => {
  const r = sorteio(semente);
  let t = inicio;
  let texto = texto0;
  const teclas: Tecla[] = [];
  let rajada = 3 + Math.floor(r() * 4);
  for (const p of passos) {
    if (typeof p === "string") {
      for (const letra of Array.from(p)) {
        texto += letra;
        teclas.push({ f: Math.round(t), texto, som: letra === " " ? "espaco" : letra === "\n" ? "enter" : "tecla", c: letra === "\n" ? "⏎" : letra });
        let d = ritmo * (0.55 + r() * 0.9);
        if (letra === " ") d += ritmo * 0.35;
        if (/[.,:?!]/.test(letra)) d += ritmo * 1.6;
        if (--rajada <= 0) {
          d += ritmo * (0.8 + r() * 1.6);
          rajada = 3 + Math.floor(r() * 5);
        }
        t += d;
      }
    } else if ("pausa" in p) t += p.pausa;
    else {
      for (let i = 0; i < p.apaga; i++) {
        const a = Array.from(texto);
        a.pop();
        texto = a.join("");
        teclas.push({ f: Math.round(t), texto, som: "apaga", c: "⌫" });
        t += p.ritmo ?? 1.1;
      }
    }
  }
  return teclas;
};
// Encaixa a digitação entre dois quadros: o ritmo é o que couber.
const digitaEntre = (inicio: number, fim: number, passos: Passo[], semente = 7): Tecla[] => {
  let a = 0.2;
  let b = 6;
  for (let i = 0; i < 30; i++) {
    const r = (a + b) / 2;
    const k = digita(inicio, passos, r, semente);
    if (k[k.length - 1].f > fim) b = r;
    else a = r;
  }
  return digita(inicio, passos, a, semente);
};
export const textoEm = (teclas: Tecla[], f: number) => {
  let s = "";
  for (const k of teclas) {
    if (k.f <= f) s = k.texto;
    else break;
  }
  return s;
};

export const PROVA = ["Diego, 9h04: “Qual o valor do multifocal?”", "Primeira resposta: 15h40."];
export const PERGUNTA = "Por que a Ótica Central não vendeu ontem?";
export const DIG = {
  defesa: digitaEntre(T.dig1, T.aviso1 - 8, ["Mas o custo por conv", { pausa: 12 }, "ersa", { pausa: 18 }, { apaga: 24, ritmo: 0.55 }], 11),
  pergunta: digitaEntre(T.dig2, T.envia - 4, ["Por que a Ótica Central não vendeu ontme", { pausa: 4 }, { apaga: 2, ritmo: 2 }, "em?"], 23),
  abre: digitaEntre(T.dig3, T.quebra - 4, ["Olhei as conversas de ontem:"], 5),
  amor: digitaEntre(T.dig4, T.mandaAmor - 4, ["Mas foi um sonh", { pausa: 10 }, { apaga: 15, ritmo: 0.6 }, { pausa: 4 }, "Desculpa amor, não vai acontecer mais! ❤️"], 17),
};

// ───────────── WhatsApp: conversas ─────────────
export type Msg = { f: number; lado: "e" | "d"; t: string; hora: string; dia?: string; lida?: number };
export type Chat = { id: string; nome: string; foto: { sigla?: string; cor: string; oculos?: boolean }; digitando?: [number, number][]; msgs: Msg[] };
const A = -1; // mensagem que já estava lá antes do filme

export const RENATO: Chat = {
  id: "renato",
  nome: "Renato · Ótica Central",
  foto: { oculos: true, cor: "#12324F" },
  digitando: [[T.abreRenato + 7, T.fimRenato]],
  msgs: [
    { f: A, lado: "e", t: "A campanha nova já está rodando?", hora: "16:05", dia: "sexta-feira" },
    { f: A, lado: "d", t: "Já está no ar desde cedo. Amanhã te mando os primeiros números.", hora: "16:11", lida: A },
    { f: A, lado: "e", t: "Show", hora: "16:12" },
    { f: A, lado: "e", t: "Bom dia! Como estão os anúncios essa semana?", hora: "09:12", dia: "Ontem" },
    { f: A, lado: "d", t: "Bom dia, Renato! Rodando bem, o custo por conversa caiu de novo.", hora: "09:30", lida: A },
    { f: A, lado: "e", t: "Beleza", hora: "09:31" },
    { f: A, lado: "d", t: "Fechamos o dia com 38 conversas pelos anúncios.", hora: "18:02", lida: A },
    { f: A, lado: "e", t: "E quantas viraram venda?", hora: "18:20" },
    { f: T.chega, lado: "e", t: "Esses leads que você manda são muito ruins. Ninguém compra.", hora: "08:47", dia: "Hoje" },
    { f: T.envio1, lado: "d", t: ["Olhei as conversas de ontem:", ...PROVA].join("\n"), hora: "08:52", lida: T.envio1 + 24 },
    { f: T.aviso4, lado: "e", t: "Falei com a equipe.", hora: "08:57" },
    // Texto do Jorge, palavra por palavra (23/11), o mesmo do filme de 66 s.
    { f: T.fimRenato, lado: "e", t: "Você tinha razão. Valeu, Lucas! 🙏", hora: "08:58" },
  ],
};
export const AMOR: Chat = {
  id: "amor",
  nome: "Amor ❤️",
  foto: { sigla: "C", cor: "#B5476B" },
  digitando: [[T.mandaAmor + 14, T.amor2]],
  msgs: [
    { f: A, lado: "d", t: "Hoje chego umas 20h.", hora: "17:48", dia: "Ontem", lida: A },
    { f: A, lado: "e", t: "Tá. Compra pão?", hora: "17:51" },
    { f: A, lado: "d", t: "Compro 👍", hora: "17:51", lida: A },
    { f: T.aviso3, lado: "e", t: "Sonhei que você me traiu. Tô chateada.", hora: "08:53", dia: "Hoje" },
    { f: T.mandaAmor, lado: "d", t: "Desculpa amor, não vai acontecer mais! ❤️", hora: "08:54", lida: T.mandaAmor + 8 },
    { f: T.amor2, lado: "e", t: "Acho bom.", hora: "08:54" },
  ],
};

// Avisos que caem do topo dentro do WhatsApp, de outras conversas. Cada um some quando chega o próximo ou quando ele toca nele.
export const AVISOS: { f: number; ate: number; de: string; t: string; foto: { sigla?: string; cor: string; oculos?: boolean } }[] = [
  { f: T.aviso1, ate: T.aviso2, de: "Dra. Paula · Viva Sorriso", t: "Lucas??", foto: { sigla: "VS", cor: "#0E7C86" } },
  { f: T.aviso2, ate: T.desliza + 2, de: "Marcela · Studio Pilates", t: "Perdi tudo?", foto: { sigla: "SP", cor: "#7A4FB5" } },
  { f: T.aviso3, ate: T.toqueAviso3 + 3, de: "Amor ❤️", t: "Sonhei que você me traiu. Tô chateada.", foto: AMOR.foto },
  { f: T.aviso4, ate: T.toqueAviso4 + 3, de: "Renato · Ótica Central", t: "Falei com a equipe.", foto: RENATO.foto },
];

// Qual conversa está aberta em cada momento, e quando a troca começa (empurra da direita, como no iOS).
export const ABERTAS: { f: number; chat: Chat }[] = [
  { f: 0, chat: RENATO },
  { f: T.abreAmor, chat: AMOR },
  { f: T.abreRenato, chat: RENATO },
];

// Hora na barra de status
export const HORAS: [number, string][] = [[0, "08:47"], [T.troca, "08:48"], [T.volta, "08:51"], [T.envio1, "08:52"], [T.aviso3, "08:53"], [T.mandaAmor, "08:54"], [T.aviso4, "08:57"], [T.fimRenato, "08:58"]];
export const horaEm = (f: number) => HORAS.filter((h) => h[0] <= f).pop()![1];

// ───────────── Câmera ─────────────
// Ponto da tela do iPhone (em pontos) que fica no centro do quadro, e ampliação (pixels por ponto).
// Com 2,75 a tela ocupa a largura toda (393 pt × 2,75 = 1080 px). Acima disso, x precisa ficar entre 540/m e 393 − 540/m;
// y, entre 960/m e 852 − 960/m, para a tela cobrir o quadro inteiro.
// Sem arredondar nada (GUIA.md, 7.6: arredondar a posição a cada quadro é o que deixava a versão antiga trêmula).
const BASE = { x: 196.5, y: 349.4, m: 2.75 };
export const CAMERA: Chave[] = [
  { f: 0, x: 170, y: 412, m: 3.4 }, // a reclamação, de perto (pedido do Jorge: "O q precisa de mais zoom e tempo é a primeira tela")
  { f: 104, x: 172, y: 414, m: 3.5, e: "linear" },
  { f: 128, ...BASE },
  { f: T.desliza, ...BASE, e: "linear" },
  { f: T.ferr1 - 6, ...BASE, e: "linear" },
  { f: T.r1 + 4, x: 196.5, y: 430, m: 3.0 }, // a resposta do Claude, com os botões do topo fora do quadro
  { f: T.volta - 2, x: 196.5, y: 436, m: 3.06, e: "linear" },
  { f: T.trocaVolta + 2, ...BASE },
  { f: T.abreRenato, ...BASE, e: "linear" },
  { f: T.abreRenato + 30, x: 176, y: 404, m: 3.1 }, // o fim do Renato, de perto
  { f: T.some, x: 176, y: 406, m: 3.16, e: "linear" },
];
