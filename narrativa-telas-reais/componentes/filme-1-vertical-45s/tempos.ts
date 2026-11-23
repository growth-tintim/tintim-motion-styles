// Filme 1, "Lead ruim", versão vertical v2 (1080×1920, 30 qps, 44,9 s). Um só lugar para mexer em tempo, texto e câmera.
// Pedidos do Jorge em 23/11 sobre a v1 de 37 s: take mais aberto, 40 a 50 s com mais desespero.
// Sobre a v2: a esposa sai inteira ("é pra remover o tempo de tela perdido com isso").
// Sobre o ritmo: "tem q ser correria [...] Pra um lado e pro outro, sem ficar mto parado num lugar só". Os avisos chegam
// enquanto ele faz alguma coisa, e cada tela fica só o tempo de ler. Três clientes: Renato, Dra. Paula e Marcela.
// Música: le-jazz_short-03_66sec.wav sem os compassos 17 a 28 (emenda no ataque do compasso 17 com o do 29, ferramentas/corta-musica.py).
// Grade: 135,2 bpm, um tempo = 13,314 quadros, primeiro tempo em 2,25 (a mesma do filme de 66 s). Depois da emenda, tudo anda 640 quadros.
// A banda entra no compasso 5 (quadro 215). Último ataque da banda no 1066; depois, o instrumento sozinho e o fecho do filme de 66 s.
// Todos os nomes, conversas e números são fictícios.
import type { Chave } from "./geometria";

export const TEMPO = 13.314;
export const bt = (k: number) => Math.round(2.25 + TEMPO * k - (k >= 64 ? 0.93 : 0));
const DESLOCA = 640; // quadros tirados da música: o fecho do filme de 66 s entra igual, 640 quadros antes

// ───────────── Marcos ─────────────
export const T = {
  // Introdução (só o baixo): a reclamação; ele escreve uma resposta atravessada enquanto os outros clientes caem em aviso, e apaga
  chega: bt(1),
  dig1: bt(2) + 6,
  // A banda entra: primeira ida ao Claude, a prova do Renato
  desliza: bt(15) - 6,
  troca: bt(16),
  toque2: bt(16) + 5,
  dig2: bt(16) + 15,
  envia: bt(25),
  frase0: bt(26),
  ferr1: bt(27),
  ferr2: bt(28),
  lido: bt(29) - 6,
  r1: bt(29),
  r2: bt(30),
  r3: bt(31),
  r4: bt(32),
  r5: bt(33),
  aperta: bt(34),
  sel: bt(34) + 8,
  menu: bt(34) + 10,
  copia: bt(36),
  volta: bt(37) - 4,
  trocaVolta: bt(37) + 12,
  dig3: bt(38) + 2,
  quebra: bt(41) + 3,
  toque3: bt(41) + 7,
  cola: bt(42),
  envio1: bt(43),
  // Dra. Paula, sem parar: abre, vai ao Claude, copia, cola
  aviso5: bt(43) + 6,
  toqueAviso5: bt(44) + 6,
  abrePaula: bt(45),
  desliza2: bt(46) - 2,
  troca2: bt(47),
  toque4: bt(47) + 4,
  dig5: bt(47) + 10,
  envia2: bt(52),
  ferr3: bt(52) + 9,
  s1: bt(53),
  s2: bt(53) + 7,
  s3: bt(54),
  s4: bt(54) + 6,
  copia2: bt(55) + 4,
  volta2: bt(56) - 2,
  trocaVolta2: bt(57),
  toque5: bt(57) + 3,
  cola2: bt(58) - 1,
  envio2: bt(58) + 6,
  // Marcela: abre, pede ao Claude para mover os leads, volta e responde
  aviso7: bt(58) + 12,
  toqueAviso7: bt(59) + 6,
  abreMarcela: bt(60),
  desliza3: bt(61),
  troca3: bt(62),
  toque6: bt(62) + 4,
  dig6: bt(62) + 10,
  envia3: bt(66),
  ferr4: bt(66) + 8,
  ferr5: bt(66) + 16,
  t1: bt(67) + 6,
  volta3: bt(68) + 2,
  trocaVolta3: bt(69) + 4,
  dig7: bt(69) + 8,
  envio3: bt(73),
  paula2: bt(63) + 8, // "Perfeito. Sobe a verba no vídeo.", chega em aviso enquanto ele está no Claude
  // O Renato volta e fecha na parada da banda
  aviso6: bt(72),
  toqueAviso6: bt(74) + 6,
  abreRenato: bt(75) + 4,
  fimRenato: 1706 - 3 - DESLOCA, // 1063: "Você tinha razão. Valeu, Lucas! 🙏", três quadros antes do último ataque da banda, como no filme de 66 s
  // Fecho: os quadros do filme de 66 s menos 640
  some: 1756 - DESLOCA,
  someFim: 1768 - DESLOCA,
  frase1: 1768 - DESLOCA,
  frase2: 1808 - DESLOCA,
  cartela: 1868 - DESLOCA,
  logo: 1874 - DESLOCA,
  frase3: 1888 - DESLOCA,
  icones: 1900 - DESLOCA,
  piscada: 1914 - DESLOCA,
  fim: 1346, // a música editada tem 44,89 s
};

// ───────────── Digitação (mesmo motor do filme de 66 s) ─────────────
const sorteio = (s: number) => () => {
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export type Tecla = { f: number; texto: string; som: "tecla" | "espaco" | "apaga" | "enter"; c: string };
type Passo = string | { pausa: number } | { apaga: number; ritmo?: number };
const digita = (inicio: number, passos: Passo[], ritmo = 1.9, semente = 7): Tecla[] => {
  const r = sorteio(semente);
  let t = inicio;
  let texto = "";
  const teclas: Tecla[] = [];
  let rajada = 3 + Math.floor(r() * 4);
  for (const p of passos) {
    if (typeof p === "string") {
      for (const letra of Array.from(p)) {
        texto += letra;
        teclas.push({ f: Math.round(t), texto, som: letra === " " ? "espaco" : "tecla", c: letra });
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
export const PERGUNTA2 = "Qual anúncio da Viva Sorriso mais vendeu?";
// A resposta da segunda pergunta, como vai para a área de transferência quando ele toca em copiar.
export const RESPOSTA2 = ["Em novembro, por vendas confirmadas:", "1. Vídeo do clareamento: 23 vendas", "2. Carrossel do aparelho: 4 vendas", "3. Avaliação grátis: 1 venda"];
export const PERGUNTA3 = "Move pra Negociação quem pediu preço ontem.";
export const RESPOSTA_MARCELA = "Não perdeu: os 7 já estão em Negociação.";
const DEFESA = "Mas o custo por conversa caiu. O problema é o atendimento de vocês";
export const DIG = {
  defesa: digitaEntre(T.dig1, T.desliza - 6, [DEFESA, { pausa: 8 }, { apaga: Array.from(DEFESA).length, ritmo: 0.3 }], 11),
  pergunta: digitaEntre(T.dig2, T.envia - 4, ["Por que a Ótica Central não vendeu ontme", { pausa: 4 }, { apaga: 2, ritmo: 2 }, "em?"], 23),
  abre: digitaEntre(T.dig3, T.quebra - 4, ["Olhei as conversas de ontem:"], 5),
  pergunta2: digitaEntre(T.dig5, T.envia2 - 3, [PERGUNTA2], 31),
  pergunta3: digitaEntre(T.dig6, T.envia3 - 3, [PERGUNTA3], 37),
  marcela: digitaEntre(T.dig7, T.envio3 - 3, [RESPOSTA_MARCELA], 43),
};

// ───────────── WhatsApp: conversas ─────────────
export type Msg = { f: number; lado: "e" | "d"; t: string; hora: string; dia?: string; lida?: number };
export type Foto = { sigla?: string; cor: string; oculos?: boolean };
export type Chat = { id: string; nome: string; foto: Foto; digitando?: [number, number][]; msgs: Msg[] };
const A = -1; // mensagem que já estava lá antes do filme

const F_PAULA: Foto = { sigla: "VS", cor: "#0E7C86" };
const F_MARCELA: Foto = { sigla: "SP", cor: "#7A4FB5" };
const F_BARAO: Foto = { sigla: "AB", cor: "#7A3E12" };
const F_BETO: Foto = { sigla: "B", cor: "#5B5F66" };

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
    { f: T.aviso6, lado: "e", t: "Falei com a equipe.", hora: "08:56" },
    // Texto do Jorge, palavra por palavra (23/11), o mesmo do filme de 66 s.
    { f: T.fimRenato, lado: "e", t: "Você tinha razão. Valeu, Lucas! 🙏", hora: "08:58" },
  ],
};
// Os textos da Dra. Paula são os do filme de 66 s.
const PAULA_1 = "Lucas, qual anúncio trouxe mais paciente esse mês?";
const PAULA_2 = "Preciso decidir a verba até as 10h";
const MARCELA_1 = "5 pessoas pediram preço ontem e ninguém aqui anotou 😩";
export const PAULA: Chat = {
  id: "paula",
  nome: "Dra. Paula · Viva Sorriso",
  foto: F_PAULA,
  digitando: [[T.envio2 + 10, T.paula2]],
  msgs: [
    { f: A, lado: "d", t: "Bom dia! Relatório da semana enviado.", hora: "08:12", dia: "Hoje", lida: A },
    { f: bt(8), lado: "e", t: PAULA_1, hora: "08:48" },
    { f: bt(10), lado: "e", t: PAULA_2, hora: "08:48" },
    { f: T.r3, lado: "e", t: "Lucas??", hora: "08:50" },
    { f: T.aviso5, lado: "e", t: "Lucas???", hora: "08:52" },
    { f: T.envio2, lado: "d", t: [RESPOSTA2[0], "", ...RESPOSTA2.slice(1)].join("\n"), hora: "08:54", lida: T.envio2 + 9 },
    { f: T.paula2, lado: "e", t: "Perfeito. Sobe a verba no vídeo.", hora: "08:54" },
  ],
};
export const MARCELA: Chat = {
  id: "marcela",
  nome: "Marcela · Studio Pilates",
  foto: F_MARCELA,
  msgs: [
    { f: A, lado: "e", t: "Dá pra aumentar a verba esse mês?", hora: "19:10", dia: "Ontem" },
    { f: A, lado: "d", t: "Dá, sim. Amanhã cedo te mando a proposta.", hora: "19:25", lida: A },
    { f: bt(9), lado: "e", t: MARCELA_1, hora: "08:48", dia: "Hoje" },
    { f: T.aviso7, lado: "e", t: "Perdi tudo?", hora: "08:54" },
    { f: T.envio3, lado: "d", t: RESPOSTA_MARCELA, hora: "08:56", lida: T.envio3 + 10 },
  ],
};

// Avisos que caem do topo. Os novos entram em cima e empurram os outros para baixo (no máximo três à vista).
// "ate": quando ele some (troca de app, ou ele toca nele). "toque": ele toca no aviso para abrir a conversa.
export type Aviso = { f: number; ate: number; de: string; t: string; foto: Foto; toque?: boolean };
export const AVISOS: Aviso[] = [
  { f: bt(8), ate: T.desliza + 2, de: "Dra. Paula · Viva Sorriso", t: PAULA_1, foto: F_PAULA },
  { f: bt(9), ate: T.desliza + 2, de: "Marcela · Studio Pilates", t: MARCELA_1, foto: F_MARCELA },
  { f: bt(10), ate: T.desliza + 2, de: "Dra. Paula · Viva Sorriso", t: PAULA_2, foto: F_PAULA },
  { f: bt(11), ate: T.desliza + 2, de: "Seu Barão · Auto Center", t: "Meu filho, o telefone não tocou hoje. Esse anúncio tá ligado?", foto: F_BARAO },
  { f: bt(13), ate: T.desliza + 2, de: "Beto do futebol", t: "E aí, campeão! Consegue me emprestar 500 até sexta? 🙏", foto: F_BETO },
  { f: T.r3, ate: T.r3 + 44, de: "Dra. Paula · Viva Sorriso", t: "Lucas??", foto: F_PAULA },
  { f: T.aviso5, ate: T.toqueAviso5 + 3, de: "Dra. Paula · Viva Sorriso", t: "Lucas???", foto: F_PAULA, toque: true },
  { f: bt(49) + 5, ate: bt(51) + 4, de: "Beto do futebol", t: "300 já ajuda", foto: F_BETO },
  { f: T.aviso7, ate: T.toqueAviso7 + 3, de: "Marcela · Studio Pilates", t: "Perdi tudo?", foto: F_MARCELA, toque: true },
  { f: T.paula2, ate: T.paula2 + 40, de: "Dra. Paula · Viva Sorriso", t: "Perfeito. Sobe a verba no vídeo.", foto: F_PAULA },
  { f: T.aviso6, ate: T.toqueAviso6 + 3, de: "Renato · Ótica Central", t: "Falei com a equipe.", foto: RENATO.foto, toque: true },
];

// Qual conversa está aberta e quando a troca começa (empurra da direita, como no iOS).
export const ABERTAS: { f: number; chat: Chat }[] = [
  { f: 0, chat: RENATO },
  { f: T.abrePaula, chat: PAULA },
  { f: T.abreMarcela, chat: MARCELA },
  { f: T.abreRenato, chat: RENATO },
];
// Trocas de app pela barra de início: o app que sai vai para a direita, o que entra vem da esquerda.
export const TROCAS: { de: number; ate: number; para: "claude" | "whatsapp" }[] = [
  { de: T.desliza, ate: T.troca, para: "claude" },
  { de: T.volta, ate: T.trocaVolta, para: "whatsapp" },
  { de: T.desliza2, ate: T.troca2, para: "claude" },
  { de: T.volta2, ate: T.trocaVolta2, para: "whatsapp" },
  { de: T.desliza3, ate: T.troca3, para: "claude" },
  { de: T.volta3, ate: T.trocaVolta3, para: "whatsapp" },
];

export const HORAS: [number, string][] = [[0, "08:47"], [T.troca, "08:48"], [T.volta, "08:51"], [T.envio1, "08:52"], [T.troca2, "08:53"], [T.envio2, "08:54"], [T.troca3, "08:55"], [T.envio3, "08:56"], [T.aviso6, "08:57"], [T.fimRenato, "08:58"]];
export const horaEm = (f: number) => HORAS.filter((h) => h[0] <= f).pop()![1];

// ───────────── Câmera ─────────────
// Ponto da tela (em pontos) no centro do quadro e ampliação (pixels por ponto). Pedido do Jorge: "pode ser um pouco mais aberto".
// A v1 ia até 3,5. Agora o máximo é 2,75 (a tela na largura do quadro) e a base é 2,6: a tela inteira na largura, com um respiro
// azul dos lados. Abaixo de 2,6 o texto das mensagens (17 pt) ficaria com menos de 44 px no quadro.
// Sem arredondar nada (GUIA.md, 7.6).
const BASE = { x: 196.5, y: 369.3, m: 2.6 };
const PERTO = (y: number) => ({ x: 196.5, y, m: 2.75 });
export const CAMERA: Chave[] = [
  { f: 0, ...PERTO(424) }, // a reclamação, mais de perto
  { f: bt(7), ...PERTO(420), e: "linear" },
  { f: bt(8) + 4, ...BASE }, // abre para os avisos que se empilham
  { f: T.ferr1 - 4, ...BASE, e: "linear" },
  { f: T.r1 + 4, ...PERTO(400) }, // a resposta do Claude
  { f: T.volta - 2, ...PERTO(402), e: "linear" },
  { f: T.trocaVolta + 2, ...BASE },
  { f: T.abreRenato, ...BASE, e: "linear" },
  { f: T.abreRenato + 24, ...PERTO(404) }, // o fim do Renato
  { f: T.some, ...PERTO(406), e: "linear" },
];
