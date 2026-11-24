// Filme 1, "Lead ruim", versão vertical de 1 min (1080×1920, 30 qps, 66 s). Um só lugar para mexer em tempo, texto e câmera.
// Pedido do Jorge em 24/11: "uma versão de 1 min, normal, como a outra, só transformada pra mobile". A outra é o filme de 66 s:
// mesma música (le-jazz_short-03_66sec.wav, inteira), mesmo elenco e o mesmo fecho, nos quadros do filme de 66 s.
// Regras da versão vertical que continuam valendo: tela inteira no quadro, um aviso de cada vez puxando a ação seguinte, sem tempo parado.
// Montagem: os primeiros 26 s são os da versão de 45 s (a música é a mesma até o compasso 16); no meio voltam os compassos 17 a 28
// com a esposa, o Seu Barão, a Imobiliária Porto e a equipe; o fim (Marcela e Renato) é o da versão de 45 s, 48 tempos depois.
// Grade: 135,2 bpm, um tempo = 13,314 quadros, primeiro tempo em 2,25. A banda entra no quadro 215; último ataque no 1706.
// Todos os nomes, conversas e números são fictícios.
import type { Chave } from "./geometria";

export const TEMPO = 13.314;
export const bt = (k: number) => Math.round(2.25 + TEMPO * k);

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
  // ── Meio (compassos 17 a 28, os que a versão de 45 s tirou) ──
  // A esposa: o aviso cai logo depois que ele responde a Paula; ele abre, começa a se defender, apaga e pede desculpa.
  avisoAmor: bt(59) + 4,
  toqueAvisoAmor: bt(60) + 10,
  abreAmor: bt(60) + 15,
  digAmor: bt(61) + 14,
  enviaAmor: bt(69),
  // Volta para a lista de conversas: a fila que ele não viu. Toca no Seu Barão.
  popLista: bt(69) + 8,
  toqueBarao: bt(71) + 7,
  abreBarao: bt(71) + 10,
  // Claude: as conversas do Barão hoje
  deslizaB: bt(74) - 1,
  trocaB: bt(75),
  toqueB: bt(75) + 4,
  digB: bt(75) + 10,
  enviaB: bt(80),
  ferrB: bt(80) + 8,
  d1: bt(82),
  d2: bt(83),
  amor2: bt(77), // "Acho bom.", em aviso enquanto ele digita
  // A Imobiliária Porto cobra em aviso enquanto ele lê; ele pergunta ali mesmo
  avisoPorto: bt(83) + 8,
  toqueP: bt(85),
  digP: bt(85) + 8,
  enviaP: bt(88),
  ferrP: bt(88) + 8,
  p1: bt(90),
  // Volta e responde o Barão (a Porto fica sem resposta: a Bia chama)
  voltaB: bt(92) - 4,
  trocaVoltaB: bt(93) - 1,
  digBR: bt(93) + 3,
  enviaBR: bt(97),
  avisoBia: bt(97) + 6,
  toqueBia: bt(99) + 2,
  abreEquipe: bt(99) + 7,
  digEq: bt(100) + 5,
  enviaEq: bt(104),
  beto2: bt(104) + 6, // "300 já ajuda": ele tira o aviso da frente
  tiraBeto2: bt(106),
  // ── Fim: o bloco da Marcela e do Renato da versão de 45 s, 48 tempos depois ──
  aviso7: bt(106) + 12,
  toqueAviso7: bt(107) + 6,
  abreMarcela: bt(108),
  desliza3: bt(109),
  troca3: bt(110),
  toque6: bt(110) + 4,
  dig6: bt(110) + 10,
  envia3: bt(114),
  ferr4: bt(114) + 8,
  ferr5: bt(114) + 16,
  t1: bt(115) + 6,
  volta3: bt(116) + 2,
  trocaVolta3: bt(117) + 4,
  dig7: bt(117) + 8,
  envio3: bt(121),
  paula2: bt(111) + 8, // "Perfeito. Sobe a verba no vídeo.", chega em aviso enquanto ele está no Claude
  beto3: bt(118), // "100?"
  fimMarcela: bt(121) + 9, // "Ufa!! Obrigada 🙌", na conversa aberta
  // O Renato volta e fecha na parada da banda
  aviso6: bt(120),
  toqueAviso6: bt(122) + 6,
  abreRenato: bt(123) + 4,
  fimRenato: 1706 - 3, // "Você tinha razão. Valeu, Lucas! 🙏", três quadros antes do último ataque da banda, como no filme de 66 s
  // Fecho: os mesmos quadros do filme de 66 s
  some: 1756,
  someFim: 1768,
  frase1: 1768,
  frase2: 1808,
  cartela: 1868,
  logo: 1874,
  frase3: 1888,
  icones: 1900,
  piscada: 1914,
  fim: 1980, // a música de 66 s inteira
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
// Perguntas e respostas do meio, com os textos e números do filme de 66 s.
export const PERGUNTA_B = "Quantas conversas a Auto Center Barão recebeu hoje?";
export const PERGUNTA_P = "E a Imobiliária Porto, hoje?";
const RESPOSTA_BARAO = "Tocou: 9 conversas hoje. 3 sem resposta.";
const RESPOSTA_EQUIPE = "Pausa o carrossel: só 4 vendas.";
const DESCULPA = "Desculpa amor, não vai acontecer mais! ❤️";
// Ele para no meio da palavra e apaga (Jorge, 24/11: "parar em \"o problema é o atendimen\" e aí deletar").
const DEFESA = "Mas o custo por conversa caiu. O problema é o atendimen";
export const DIG = {
  defesa: digitaEntre(T.dig1, T.desliza - 6, [DEFESA, { pausa: 8 }, { apaga: Array.from(DEFESA).length, ritmo: 0.3 }], 11),
  pergunta: digitaEntre(T.dig2, T.envia - 4, ["Por que a Ótica Central não vendeu ontme", { pausa: 4 }, { apaga: 2, ritmo: 2 }, "em?"], 23),
  abre: digitaEntre(T.dig3, T.quebra - 4, ["Olhei as conversas de ontem:"], 5),
  pergunta2: digitaEntre(T.dig5, T.envia2 - 3, [PERGUNTA2], 31),
  amor: digitaEntre(T.digAmor, T.enviaAmor - 4, ["Mas foi um sonh", { pausa: 22 }, { apaga: 15, ritmo: 0.9 }, { pausa: 4 }, DESCULPA], 13),
  perguntaB: digitaEntre(T.digB, T.enviaB - 3, [PERGUNTA_B], 47),
  perguntaP: digitaEntre(T.digP, T.enviaP - 3, [PERGUNTA_P], 53),
  barao: digitaEntre(T.digBR, T.enviaBR - 3, [RESPOSTA_BARAO], 59),
  equipe: digitaEntre(T.digEq, T.enviaEq - 3, [RESPOSTA_EQUIPE], 61),
  pergunta3: digitaEntre(T.dig6, T.envia3 - 3, [PERGUNTA3], 37),
  marcela: digitaEntre(T.dig7, T.envio3 - 3, [RESPOSTA_MARCELA], 43),
};
// Quando a caixa da esposa fica vazia de novo, depois de apagar "Mas foi um sonh".
export const AMOR_LIMPO = DIG.amor.find((k) => k.som === "apaga" && k.texto === "")!.f;

// ───────────── Relógio ─────────────
export const HORAS: [number, string][] = [
  [0, "08:47"], [T.troca, "08:48"], [T.volta, "08:51"], [T.envio1, "08:52"], [T.troca2, "08:53"], [T.envio2, "08:54"], [T.enviaAmor, "08:55"],
  [T.trocaB, "08:56"], [T.trocaVoltaB, "08:57"], [T.avisoBia, "08:58"], [T.aviso7, "08:59"], [T.troca3, "09:00"], [T.envio3, "09:01"], [T.aviso6, "09:02"], [T.fimRenato, "09:03"],
];
export const horaEm = (f: number) => HORAS.filter((h) => h[0] <= f).pop()![1];

// ───────────── WhatsApp: conversas ─────────────
// "autor": quem escreveu, nas conversas de grupo.
export type Msg = { f: number; lado: "e" | "d"; t: string; hora: string; dia?: string; lida?: number; autor?: string };
export type Foto = { sigla?: string; cor: string; oculos?: boolean; grupo?: boolean };
export type Chat = { id: string; nome: string; foto: Foto; sub?: string; digitando?: [number, number][]; msgs: Msg[] };
const A = -1; // mensagem que já estava lá antes do filme
// Mensagem de hoje: a hora sai do relógio do filme no quadro em que ela chega.
const M = (f: number, lado: "e" | "d", t: string, extra: Partial<Msg> = {}): Msg => ({ f, lado, t, hora: horaEm(f), ...extra });

const F_PAULA: Foto = { sigla: "VS", cor: "#0E7C86" };
const F_MARCELA: Foto = { sigla: "SP", cor: "#7A4FB5" };
const F_AMOR: Foto = { sigla: "C", cor: "#B5476B" };
const F_BARAO: Foto = { sigla: "AB", cor: "#7A3E12" };
const F_BETO: Foto = { sigla: "B", cor: "#5B5F66" };
const F_PORTO: Foto = { sigla: "IP", cor: "#3B4A8C" };
const F_EQUIPE: Foto = { grupo: true, cor: "#8E9AA6" };

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
    M(T.chega, "e", "Esses leads que você manda são muito ruins. Ninguém compra.", { dia: "Hoje" }),
    M(T.envio1, "d", ["Olhei as conversas de ontem:", ...PROVA].join("\n"), { lida: T.envio1 + 24 }),
    M(T.aviso6, "e", "Falei com a equipe."),
    // Texto do Jorge, palavra por palavra (23/11), o mesmo do filme de 66 s.
    M(T.fimRenato, "e", "Você tinha razão. Valeu, Lucas! 🙏"),
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
  msgs: [
    { f: A, lado: "d", t: "Bom dia! Relatório da semana enviado.", hora: "08:12", dia: "Hoje", lida: A },
    M(bt(11), "e", PAULA_1),
    M(bt(12), "e", PAULA_2),
    M(bt(38), "e", "Lucas??"),
    M(T.aviso5, "e", "Lucas???"),
    M(T.envio2, "d", [RESPOSTA2[0], "", ...RESPOSTA2.slice(1)].join("\n"), { lida: T.envio2 + 9 }),
    M(T.paula2, "e", "Perfeito. Sobe a verba no vídeo."),
  ],
};
export const MARCELA: Chat = {
  id: "marcela",
  nome: "Marcela · Studio Pilates",
  foto: F_MARCELA,
  msgs: [
    { f: A, lado: "e", t: "Dá pra aumentar a verba esse mês?", hora: "19:10", dia: "Ontem" },
    { f: A, lado: "d", t: "Dá, sim. Amanhã cedo te mando a proposta.", hora: "19:25", lida: A },
    M(T.r3, "e", MARCELA_1, { dia: "Hoje" }),
    M(T.aviso7, "e", "Perdi tudo?"),
    M(T.envio3, "d", RESPOSTA_MARCELA, { lida: T.envio3 + 6 }),
    M(T.fimMarcela, "e", "Ufa!! Obrigada 🙌"),
  ],
};
export const AMOR: Chat = {
  id: "amor",
  nome: "Amor ❤️",
  foto: F_AMOR,
  digitando: [[T.enviaAmor + 14, T.amor2]],
  msgs: [
    { f: A, lado: "e", t: "Compra pão na volta?", hora: "17:40", dia: "Ontem" },
    { f: A, lado: "d", t: "Compro ❤️", hora: "17:41", lida: A },
    { f: A, lado: "e", t: "Cadê o pão", hora: "19:02" },
    M(T.avisoAmor, "e", "Sonhei que você me traiu. Tô chateada.", { dia: "Hoje" }),
    M(T.enviaAmor, "d", DESCULPA, { lida: T.enviaAmor + 8 }),
    M(T.amor2, "e", "Acho bom."),
  ],
};
export const BARAO: Chat = {
  id: "barao",
  nome: "Seu Barão · Auto Center",
  foto: F_BARAO,
  msgs: [
    { f: A, lado: "d", t: "Campanha de alinhamento no ar, Seu Barão.", hora: "11:20", dia: "quarta-feira", lida: A },
    { f: A, lado: "e", t: "Combinado, obrigado!", hora: "11:42" },
    M(bt(64), "e", "Meu filho, o telefone não tocou hoje. Esse anúncio tá ligado?", { dia: "Hoje" }),
    M(T.enviaBR, "d", RESPOSTA_BARAO, { lida: T.enviaBR + 14 }),
  ],
};
export const BETO: Chat = {
  id: "beto",
  nome: "Beto do futebol",
  foto: F_BETO,
  msgs: [
    { f: A, lado: "e", t: "Me salva com 200? Te pago semana que vem", hora: "21:03", dia: "sábado" },
    { f: A, lado: "d", t: "Fiz o Pix", hora: "21:10", lida: A },
    { f: A, lado: "e", t: "Valeu, campeão!!", hora: "21:11" },
    M(bt(38) + 6, "e", "E aí, campeão! Consegue me emprestar 500 até sexta? 🙏", { dia: "Hoje" }),
    M(T.beto2, "e", "300 já ajuda"),
    M(T.beto3, "e", "100?"),
  ],
};
export const PORTO: Chat = {
  id: "porto",
  nome: "Imobiliária Porto",
  foto: F_PORTO,
  msgs: [
    { f: A, lado: "d", t: "Segue a proposta de dezembro", hora: "17:30", dia: "Ontem", lida: A },
    M(T.avisoPorto, "e", "Quantas conversas vieram hoje do anúncio do Jardins?", { dia: "Hoje" }),
  ],
};
export const EQUIPE: Chat = {
  id: "equipe",
  nome: "Equipe de tráfego",
  foto: F_EQUIPE,
  sub: "Bia, Caio, Você",
  msgs: [
    { f: A, lado: "e", autor: "Bia", t: "subi os criativos novos da Viva", hora: "08:31", dia: "Hoje" },
    M(T.avisoBia, "e", "qual criativo da Viva eu pauso?", { autor: "Bia" }),
    M(T.enviaEq, "d", RESPOSTA_EQUIPE, { lida: T.enviaEq + 10 }),
  ],
};
const LUCIA: Chat = { id: "lucia", nome: "Dona Lúcia · Doceria", foto: { sigla: "DL", cor: "#B07A2A" }, msgs: [{ f: A, lado: "e", t: "Obrigada!!", hora: "21:40", dia: "Ontem" }] };
const PEDRO: Chat = { id: "pedro", nome: "Pedro · Contabilidade", foto: { sigla: "P", cor: "#4F7A5A" }, msgs: [{ f: A, lado: "e", t: "Nota fiscal enviada no e-mail", hora: "10:05", dia: "quinta-feira" }] };
// Todas as conversas, na ordem em que estavam na lista antes do filme (da mais recente para a mais antiga).
export const CHATS: Chat[] = [RENATO, PAULA, EQUIPE, MARCELA, AMOR, PORTO, LUCIA, BETO, BARAO, PEDRO];

// Avisos que caem do topo, um de cada vez, e cada um puxa a ação seguinte dele (Jorge: "tá numa tela, aparece outra [...] ele vai reagindo ao fluxo").
// "ate": quando ele some. "toque": ele toca no aviso (para abrir a conversa, ou para tirá-lo da frente, no caso do Beto).
export type Aviso = { f: number; ate: number; de: string; t: string; foto: Foto; toque?: boolean };
export const AVISOS: Aviso[] = [
  { f: bt(11), ate: T.desliza + 2, de: PAULA.nome, t: PAULA_1, foto: F_PAULA }, // ele para a resposta atravessada, apaga e vai buscar a prova
  { f: T.r3, ate: T.r3 + 44, de: MARCELA.nome, t: MARCELA_1, foto: F_MARCELA }, // chega enquanto o Claude responde: a fila cresce
  { f: T.aviso5, ate: T.toqueAviso5 + 3, de: PAULA.nome, t: "Lucas???", foto: F_PAULA, toque: true }, // mal manda a prova, a Paula cobra: ele abre
  { f: T.avisoAmor, ate: T.toqueAvisoAmor + 3, de: AMOR.nome, t: "Sonhei que você me traiu. Tô chateada.", foto: F_AMOR, toque: true }, // mal responde a Paula, a esposa: ele abre
  { f: T.amor2, ate: T.amor2 + 36, de: AMOR.nome, t: "Acho bom.", foto: F_AMOR }, // ele segue digitando para o Claude
  { f: T.avisoPorto, ate: T.toqueP + 28, de: PORTO.nome, t: "Quantas conversas vieram hoje do anúncio do Jardins?", foto: F_PORTO }, // ele pergunta ao Claude ali mesmo
  { f: T.avisoBia, ate: T.toqueBia + 3, de: EQUIPE.nome, t: "Bia: qual criativo da Viva eu pauso?", foto: F_EQUIPE, toque: true }, // mal responde o Barão, a Bia: ele abre
  { f: T.beto2, ate: T.tiraBeto2, de: BETO.nome, t: "300 já ajuda", foto: F_BETO, toque: true }, // ele tira da frente
  { f: T.aviso7, ate: T.toqueAviso7 + 3, de: MARCELA.nome, t: "Perdi tudo?", foto: F_MARCELA, toque: true }, // a Marcela: ele abre
  { f: T.paula2, ate: T.paula2 + 40, de: PAULA.nome, t: "Perfeito. Sobe a verba no vídeo.", foto: F_PAULA }, // o retorno da Paula, enquanto ele já está no próximo
  { f: T.beto3, ate: T.beto3 + 26, de: BETO.nome, t: "100?", foto: F_BETO }, // o Beto não desiste
  { f: T.aviso6, ate: T.toqueAviso6 + 3, de: RENATO.nome, t: "Falei com a equipe.", foto: RENATO.foto, toque: true }, // o Renato: ele abre
];

// O que está aberto no WhatsApp, e desde quando. Ir para a lista é voltar (a conversa sai pela direita);
// abrir uma conversa, pela lista ou pelo aviso, é empurrar (ela entra pela direita), como no iOS.
export const NAV: { f: number; tela: Chat | "lista" }[] = [
  { f: 0, tela: RENATO },
  { f: T.abrePaula, tela: PAULA },
  { f: T.abreAmor, tela: AMOR },
  { f: T.popLista, tela: "lista" },
  { f: T.abreBarao, tela: BARAO },
  { f: T.abreEquipe, tela: EQUIPE },
  { f: T.abreMarcela, tela: MARCELA },
  { f: T.abreRenato, tela: RENATO },
];
// Trocas de app pela barra de início: o app que sai vai para a direita, o que entra vem da esquerda.
export const TROCAS: { de: number; ate: number; para: "claude" | "whatsapp" }[] = [
  { de: T.desliza, ate: T.troca, para: "claude" },
  { de: T.volta, ate: T.trocaVolta, para: "whatsapp" },
  { de: T.desliza2, ate: T.troca2, para: "claude" },
  { de: T.volta2, ate: T.trocaVolta2, para: "whatsapp" },
  { de: T.deslizaB, ate: T.trocaB, para: "claude" },
  { de: T.voltaB, ate: T.trocaVoltaB, para: "whatsapp" },
  { de: T.desliza3, ate: T.troca3, para: "claude" },
  { de: T.volta3, ate: T.trocaVolta3, para: "whatsapp" },
];

// ───────────── Câmera ─────────────
// A tela ocupa o quadro inteiro o tempo todo, como numa gravação de tela (Jorge, 23/11: "Nada aparece assim num celular").
// Ampliação fixa de 2,75; a câmera só sobe e desce, entre y = 349,1 e 502,9. Sem arredondar nada (GUIA.md, 7.6).
const MC = 2.75;
const Y = (y: number) => ({ x: 196.5, y, m: MC });
export const CAMERA: Chave[] = [
  { f: 0, ...Y(420) }, // a reclamação no centro do quadro
  { f: bt(9), ...Y(416), e: "linear" },
  { f: bt(11) - 2, ...Y(349.4) }, // sobe para o topo antes do aviso
  { f: T.ferr1 - 4, ...Y(349.4), e: "linear" },
  { f: T.r1 + 4, ...Y(400) }, // a resposta do Claude
  { f: T.volta - 2, ...Y(402), e: "linear" },
  { f: T.trocaVolta + 2, ...Y(349.4) },
  { f: T.abreRenato, ...Y(349.4), e: "linear" },
  { f: T.abreRenato + 24, ...Y(404) }, // o fim do Renato
  { f: T.some, ...Y(406), e: "linear" },
];
