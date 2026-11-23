// Roteiro do filme 1, versão 3.4 de computador (1920×1080, 30 qps, 66 s). Um só lugar para mexer em tempo, texto, câmera e cursor.
// Os tempos saem dos compassos da música (bar e bt, em geometria.ts): a banda entra no compasso 5, o solo vai do 21 ao 28,
// a banda para no 33 e a última nota cai no 37. Todos os nomes, conversas e números são fictícios.
import { bar, bt, Chave, CONVERSA, DIST, JANELA, mao, percurso } from "./geometria";

// ───────────── Digitação ─────────────
// Gente digita em rajadas, com pausa depois de pontuação e erro de vez em quando. O sorteio é fixo (mesma semente, mesmo ritmo).
const sorteio = (s: number) => () => {
  s = (s + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
export type Tecla = { f: number; texto: string; som: "tecla" | "espaco" | "apaga" };
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
        teclas.push({ f: Math.round(t), texto, som: letra === " " ? "espaco" : "tecla" });
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
        teclas.push({ f: Math.round(t), texto, som: "apaga" });
        t += p.ritmo ?? 1.1;
      }
    }
  }
  return teclas;
};
// Mesma digitação, mas terminando no quadro pedido (para o Enter cair no tempo da música).
const digitaAte = (fim: number, passos: Passo[], ritmo = 1.9, semente = 7): Tecla[] => {
  const base = digita(0, passos, ritmo, semente);
  const desloca = fim - base[base.length - 1].f;
  return base.map((k) => ({ ...k, f: k.f + desloca }));
};
// Mesma digitação, mas encaixada entre dois quadros: o ritmo é o que couber.
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

// ───────────── Marcos do filme ─────────────
export const T = {
  // Introdução, compassos 1 a 4 (só o baixo): a reclamação chega e a fila cresce
  renato1: bt(1),
  paula1: bt(8), // a reclamação fica sozinha em cena por 3 segundos antes de a fila começar
  marcela1: bt(9),
  paula2: bt(10),
  barao1: bt(11),
  beto1: bt(13),
  // Caso 1, compassos 5 a 11 (a banda entra): Renato, com tudo à mostra
  aba1: bar(5), // clique na aba do Claude
  envia1: bt(25), // Enter da pergunta 1
  paula3: bt(33), // "Lucas??", em aviso
  sel: bt(34) + 8, // começa a arrastar para selecionar a prova
  selFim: bt(35) + 10,
  abaVolta1: bt(37),
  cola1: bt(42),
  manda1: bt(43), // resposta para o Renato
  marcela2: bt(44),
  abrePaula: bt(46),
  // Caso 2: Dra. Paula, com tempo para ler a pergunta e a resposta, e a esposa no meio
  aba2: bt(51),
  beto2: bt(53) + 6,
  envia2: bt(58),
  amor1: bt(65), // "Sonhei que você me traiu.": chega 1,4 s depois de a resposta ficar completa (0,4 s era pouco; 2,7 s, parado demais)
  abaVolta2: bt(68),
  abreAmor: bt(69),
  mandaAmor: bt(76),
  amor2: bt(79), // "Acho bom.": 1,3 s depois do envio (com 0,4 s parecia instantâneo)
  abrePaula2: bt(81),
  mandaPaula: bt(86),
  abreMarcela: bt(87),
  // Solo: as visitas encurtam (11, 9 e 7 tempos, todas legíveis) e depois viram um vai e vem de 1 a 2 tempos, sem intenção de leitura
  ch1: bt(91), // W → C (um tempo mais cedo desde a 3.5: a parada na conversa da Marcela era longa demais)
  beto3: bt(93) + 6,
  envia3: bt(95) + 6,
  ch2: bt(101) + 7, // C → W (um tempo e meio mais cedo desde a 3.5: a resposta ficava parada demais)
  mandaMarcela: bt(105),
  abreBarao: bt(106),
  bia1: bt(108), // chegam com o WhatsApp em foco: sem aviso
  porto1: bt(109),
  ch3: bt(111), // W → C
  envia4: bt(111) + 9,
  beto4: bt(114) + 6, // "E 50?", em aviso: a piada do Beto fica de fundo e não fecha o filme
  ch4: bt(118), // C → W
  mandaBarao: bt(119) + 3,
  // O vai e vem: pressa pura. As boas notícias dos outros clientes passam em aviso
  envia5: bt(120) + 2,
  ch5: bt(120) + 7, // W → C
  fimMarcela: bt(121),
  ch6: bt(122) + 7, // C → W
  mandaEquipe: bt(122) + 12,
  fimRenato1: bt(123),
  envia6: bt(123) + 6,
  ch7: bt(124), // W → C
  fimPaula: bt(124) + 5,
  ch8: bt(125) + 7, // C → W: pousa na conversa do Renato, o cliente que abriu o filme reclamando
  fimRenato: bar(33) - 3, // "Você tinha razão.", colado na parada da banda
  fimRenato2: bar(33) - 3 + 37, // "A menina que atende...": 1,2 s depois, ritmo normal de quem digita
  fimRenato3: bar(33) - 3 + 77, // "Será que na outra loja...": cai depois de a tela sumir, não aparece
  fimRenato4: bar(33) - 3 + 112, // "Vamo fazer uma call mais tarde?": idem
  // Fecho: a banda para e fica um instrumento sozinho
  // Medido na música: último ataque da banda no quadro 1706; depois, frases de duas notas que caem em 1759, 1813, 1865 e 1913 a 1920.
  some: 1756, // a tela some com as mensagens ainda chegando
  someFim: 1768,
  frase1: 1768,
  frase2: 1808,
  cartela: 1868,
  logo: 1874,
  frase3: 1888,
  icones: 1900,
  piscada: 1914, // fecha o olho na última frase do instrumento
  fim: 1980,
};

// ───────────── Digitações ─────────────
export const DIG = {
  defesa: digita(bt(4) + 2, ["Mas o custo por conv", { pausa: 14 }, "ersa", { pausa: 30 }, { apaga: 24, ritmo: 0.55 }], 2.0, 11),
  p1: digitaEntre(T.aba1 + 21, T.envia1 - 4, ["Por que a Ótica Central não vendeu ontme", { pausa: 4 }, { apaga: 2, ritmo: 2 }, "em?"], 23),
  r1: digitaEntre(T.abaVolta1 + 17, T.cola1 - 3, ["Olhei as conversas de ontem:"], 5),
  p2: digitaEntre(T.aba2 + 17, T.envia2 - 4, ["Qual anúncio da Viva Sorriso vendeu mais em novembro?"], 31),
  amor: digitaEntre(T.abreAmor + 10, T.mandaAmor - 4, ["Mas foi um sonh", { pausa: 10 }, { apaga: 15, ritmo: 0.6 }, { pausa: 4 }, "Desculpa amor, não vai acontecer mais! ❤️"], 17),
  r2: digitaEntre(T.abrePaula2 + 9, T.mandaPaula - 3, ["O vídeo do clareamento: 23 vendas."], 41),
  // No solo a digitação acelera de propósito, e parte dela acontece fora de cena (o tempo aperta, como na música).
  p3: digitaEntre(T.ch1 + 5, T.envia3 - 3, ["Move pra Negociação quem pediu preço na Studio Pilates."], 13),
  r3: digitaEntre(T.ch2 + 6, T.mandaMarcela - 3, ["Não perdeu nada: as 7 já estão em Negociação."], 19),
  p4: digitaAte(T.envia4 - 4, ["Quantas conversas a Auto Center Barão recebeu hoje?"], 0.75, 29),
  r4: digitaAte(T.mandaBarao - 3, ["Tocou: 9 conversas hoje. 3 sem resposta."], 0.75, 37),
  p5: digitaAte(T.envia5 - 2, ["Qual criativo da Viva eu pauso?"], 0.7, 43),
  r5: digitaAte(T.mandaEquipe - 2, ["Pausa o carrossel: só 4 vendas."], 0.8, 47),
  p6: digitaAte(T.envia6 - 2, ["Conversas da Imobiliária Porto hoje?"], 0.6, 53),
};
const inicioDe = (t: Tecla[]) => t[0].f;

// ───────────── WhatsApp: conversas ─────────────
export type Msg = { f: number; lado: "e" | "d"; t: string[]; hora: string; lida?: number; dia?: string; autor?: string; estado?: "enviada" | "entregue" | "lida" };
export type Foto = { sigla?: string; cor?: string; grupo?: boolean; oculos?: boolean };
export type Chat = { id: string; nome: string; foto: Foto; sub: string; ord0: number; msgs: Msg[]; digitando?: [number, number][] };
const A = -1; // mensagem que já estava lá antes do filme

export const CHATS: Chat[] = [
  {
    id: "renato", nome: "Renato · Ótica Central", foto: { oculos: true, cor: "#12324F" }, sub: "online", ord0: 4,
    digitando: [[T.ch8 + 6, T.fimRenato], [T.fimRenato + 8, T.fimRenato2], [T.fimRenato2 + 6, T.fimRenato3], [T.fimRenato3 + 6, T.fimRenato4]],
    msgs: [
      { f: A, lado: "e", t: ["A campanha nova já está rodando?"], hora: "16:05", dia: "sexta-feira" },
      { f: A, lado: "d", t: ["Já está no ar desde cedo. Amanhã te mando os primeiros números."], hora: "16:11", estado: "lida" },
      { f: A, lado: "e", t: ["Show"], hora: "16:12" },
      { f: A, lado: "e", t: ["Bom dia! Como estão os anúncios essa semana?"], hora: "09:12", dia: "Ontem" },
      { f: A, lado: "d", t: ["Bom dia, Renato! Rodando bem, o custo por conversa caiu de novo. Te mando o fechamento no fim do dia."], hora: "09:30", estado: "lida" },
      { f: A, lado: "e", t: ["Beleza"], hora: "09:31" },
      { f: A, lado: "d", t: ["Fechamos o dia com 38 conversas pelos anúncios."], hora: "18:02", estado: "lida" },
      { f: A, lado: "e", t: ["E quantas viraram venda?"], hora: "18:20" },
      { f: T.renato1, lado: "e", t: ["Esses leads que você manda são muito ruins. Ninguém compra."], hora: "08:47", dia: "Hoje" },
      { f: T.manda1, lado: "d", t: ["Olhei as conversas de ontem:", "Diego, 9h04: “Qual o valor do multifocal?”", "Primeira resposta: 15h40."], hora: "08:52", lida: T.manda1 + 40 },
      { f: T.fimRenato1, lado: "e", t: ["Falei com a equipe."], hora: "09:04" },
      // Texto do Jorge, palavra por palavra (23/11).
      { f: T.fimRenato, lado: "e", t: ["Você tinha razão. Valeu, Lucas! 🙏"], hora: "09:04" },
      { f: T.fimRenato2, lado: "e", t: ["A menina que atende não olhou o número direito ontem pq disse que tava doente."], hora: "09:05" },
      { f: T.fimRenato3, lado: "e", t: ["Será que na outra loja tá assim tbm o atendimento?"], hora: "09:06" },
      { f: T.fimRenato4, lado: "e", t: ["Vamo fazer uma call mais tarde?"], hora: "09:07" },
    ],
  },
  {
    id: "paula", nome: "Dra. Paula · Viva Sorriso", foto: { sigla: "VS", cor: "#0E7C86" }, sub: "online", ord0: 1,
    msgs: [
      { f: A, lado: "d", t: ["Fechamento de outubro enviado no seu e-mail, doutora."], hora: "17:40", dia: "Ontem", estado: "lida" },
      { f: A, lado: "e", t: ["Recebi, obrigada!"], hora: "17:52" },
      { f: A, lado: "d", t: ["Bom dia! Relatório da semana enviado."], hora: "08:12", dia: "Hoje", estado: "lida" },
      { f: T.paula1, lado: "e", t: ["Lucas, qual anúncio trouxe mais paciente esse mês?"], hora: "08:48" },
      { f: T.paula2, lado: "e", t: ["Preciso decidir a verba até as 10h"], hora: "08:48" },
      { f: T.paula3, lado: "e", t: ["Lucas??"], hora: "08:50" },
      { f: T.mandaPaula, lado: "d", t: ["O vídeo do clareamento: 23 vendas."], hora: "08:56", lida: T.mandaPaula + 60 },
      { f: T.fimPaula, lado: "e", t: ["Perfeito. Sobe a verba no vídeo."], hora: "09:04" },
    ],
  },
  {
    id: "marcela", nome: "Marcela · Studio Pilates", foto: {}, sub: "online", ord0: 2,
    msgs: [
      { f: A, lado: "e", t: ["Dá pra aumentar a verba esse mês?"], hora: "19:10", dia: "Ontem" },
      { f: A, lado: "d", t: ["Dá, sim. Amanhã cedo te mando a proposta."], hora: "19:25", estado: "lida" },
      { f: T.marcela1, lado: "e", t: ["5 pessoas pediram preço ontem e ninguém aqui anotou 😩"], hora: "08:48", dia: "Hoje" },
      { f: T.marcela2, lado: "e", t: ["Perdi tudo?"], hora: "08:52" },
      { f: T.mandaMarcela, lado: "d", t: ["Não perdeu nada: as 7 já estão em Negociação."], hora: "08:58", lida: T.mandaMarcela + 50 },
      { f: T.fimMarcela, lado: "e", t: ["Ufa!! Obrigada 🙌"], hora: "09:05" },
    ],
  },
  {
    id: "barao", nome: "Seu Barão · Auto Center", foto: { sigla: "AB", cor: "#7A3E12" }, sub: "online", ord0: 6,
    msgs: [
      { f: A, lado: "d", t: ["Campanha de alinhamento no ar, Seu Barão."], hora: "10:02", dia: "Ontem", estado: "lida" },
      { f: A, lado: "e", t: ["Combinado, obrigado!"], hora: "10:15" },
      { f: T.barao1, lado: "e", t: ["Meu filho, o telefone não tocou hoje. Esse anúncio tá ligado?"], hora: "08:49", dia: "Hoje" },
      { f: T.mandaBarao, lado: "d", t: ["Tocou: 9 conversas hoje. 3 sem resposta."], hora: "09:00", lida: T.mandaBarao + 50 },
    ],
  },
  {
    id: "amor", nome: "Amor ❤️", foto: { sigla: "C", cor: "#B5476B" }, sub: "online", ord0: 3,
    digitando: [[T.mandaAmor + 13, T.amor2]],
    msgs: [
      { f: A, lado: "e", t: ["Compra pão na volta?"], hora: "18:31", dia: "Ontem" },
      { f: A, lado: "d", t: ["Compro ❤️"], hora: "18:33", estado: "lida" },
      { f: A, lado: "e", t: ["Cadê o pão"], hora: "20:47" },
      { f: T.amor1, lado: "e", t: ["Sonhei que você me traiu. Tô chateada."], hora: "08:53", dia: "Hoje" },
      { f: T.mandaAmor, lado: "d", t: ["Desculpa amor, não vai acontecer mais! ❤️"], hora: "08:54", lida: T.mandaAmor + 7 },
      { f: T.amor2, lado: "e", t: ["Acho bom."], hora: "08:54" },
    ],
  },
  {
    id: "beto", nome: "Beto do futebol", foto: { sigla: "B", cor: "#5B5F66" }, sub: "online", ord0: 9,
    msgs: [
      { f: A, lado: "e", t: ["Me salva com 200? Te pago semana que vem"], hora: "11:20", dia: "3 de setembro" },
      { f: A, lado: "d", t: ["Fiz o Pix"], hora: "11:42", estado: "lida" },
      { f: A, lado: "e", t: ["Valeu, campeão!!"], hora: "11:43" },
      { f: T.beto1, lado: "e", t: ["E aí, campeão! Consegue me emprestar 500 até sexta? 🙏"], hora: "08:49", dia: "Hoje" },
      { f: T.beto2, lado: "e", t: ["300 já ajuda"], hora: "08:54" },
      { f: T.beto3, lado: "e", t: ["100?"], hora: "08:59" },
      { f: T.beto4, lado: "e", t: ["E 50?"], hora: "09:06" },
    ],
  },
  {
    id: "equipe", nome: "Equipe de tráfego", foto: { grupo: true }, sub: "Bia, Caio, Você", ord0: 0,
    msgs: [
      { f: A, lado: "e", autor: "Bia", t: ["subi os criativos novos da Viva"], hora: "08:31", dia: "Hoje" },
      { f: T.bia1, lado: "e", autor: "Bia", t: ["qual criativo da Viva eu pauso?"], hora: "08:59" },
      { f: T.mandaEquipe, lado: "d", t: ["Pausa o carrossel: só 4 vendas."], hora: "09:02", lida: T.mandaEquipe + 40 },
    ],
  },
  {
    id: "porto", nome: "Imobiliária Porto", foto: { sigla: "IP", cor: "#3B4A8C" }, sub: "online", ord0: 7,
    msgs: [
      { f: A, lado: "d", t: ["Segue a proposta de dezembro"], hora: "15:14", dia: "sexta-feira", estado: "lida" },
      { f: T.porto1, lado: "e", t: ["Quantas conversas vieram hoje do anúncio do Jardins?"], hora: "09:00", dia: "Hoje" },
    ],
  },
  { id: "lucia", nome: "Dona Lúcia · Doceria", foto: {}, sub: "online", ord0: 5, msgs: [{ f: A, lado: "e", t: ["Obrigada!!"], hora: "Ontem" }] },
  { id: "pedro", nome: "Pedro · Contabilidade", foto: {}, sub: "online", ord0: 8, msgs: [{ f: A, lado: "e", t: ["Nota fiscal enviada no e-mail"], hora: "quinta-feira" }] },
];
export const chat = (id: string) => CHATS.find((c) => c.id === id) as Chat;

// Conversa aberta em cada momento.
export const ABRE: { f: number; id: string }[] = [
  { f: 0, id: "renato" },
  { f: T.abrePaula, id: "paula" },
  { f: T.abreAmor, id: "amor" },
  { f: T.abrePaula2, id: "paula" },
  { f: T.abreMarcela, id: "marcela" },
  { f: T.abreBarao, id: "barao" },
  { f: T.ch5, id: "equipe" }, // no meio do chicote, sem ninguém ver
  { f: T.ch7, id: "renato" },
];
export const abertaEm = (f: number) => {
  let id = ABRE[0].id;
  for (const a of ABRE) if (a.f <= f) id = a.id;
  return id;
};
// Última vez, até o quadro f, em que a conversa esteve aberta.
const vistaAte = (id: string, f: number) => {
  let visto = -9999;
  for (let i = 0; i < ABRE.length; i++) {
    if (ABRE[i].f > f || ABRE[i].id !== id) continue;
    const fim = i + 1 < ABRE.length ? ABRE[i + 1].f : 99999;
    visto = Math.min(f, fim);
  }
  return visto;
};
export const naoLidas = (c: Chat, f: number) => {
  const v = vistaAte(c.id, f);
  return c.msgs.filter((m) => m.lado === "e" && m.f > v && m.f <= f && m.f >= 0).length;
};
export const conversasNaoLidas = (f: number) => CHATS.filter((c) => naoLidas(c, f) > 0).length;
const ultimaAtividade = (c: Chat, f: number) => {
  let u = -1000 - c.ord0;
  for (const m of c.msgs) if (m.f >= 0 && m.f <= f) u = m.f;
  return u;
};
// Ordem da lista: a conversa com a mensagem mais recente sobe para o topo.
export const ordem = (f: number) => [...CHATS].sort((a, b) => ultimaAtividade(b, f) - ultimaAtividade(a, f)).map((c) => c.id);
const EVENTOS = CHATS.flatMap((c) => c.msgs.filter((m) => m.f >= 0).map((m) => m.f)).sort((a, b) => a - b);
// Posição de cada conversa na lista, com 8 quadros de deslize quando a ordem muda.
export const posicaoNaLista = (id: string, f: number) => {
  let ev = -100;
  for (const e of EVENTOS) if (e <= f) ev = e;
  const agora = ordem(f).indexOf(id);
  if (f - ev >= 8) return agora;
  const antes = ordem(ev - 1).indexOf(id);
  return antes + (agora - antes) * mao((f - ev) / 8);
};
export const CELULA = { x: 300, y0: JANELA.topo + 155 + 36, passo: 74 };
const yDaCelula = (id: string, f: number) => CELULA.y0 + CELULA.passo * ordem(f).indexOf(id);

// O que está na caixa de mensagem do WhatsApp: digitação em andamento ou texto colado, por conversa.
export const RASCUNHOS: { id: string; teclas: Tecla[]; ate: number; colado?: { f: number; t: string[] } }[] = [
  { id: "renato", teclas: DIG.defesa, ate: T.aba1 + 200 },
  { id: "renato", teclas: DIG.r1, ate: T.manda1, colado: { f: T.cola1, t: ["Diego, 9h04: “Qual o valor do multifocal?”", "Primeira resposta: 15h40."] } },
  { id: "amor", teclas: DIG.amor, ate: T.mandaAmor },
  { id: "paula", teclas: DIG.r2, ate: T.mandaPaula },
  { id: "marcela", teclas: DIG.r3, ate: T.mandaMarcela },
  { id: "barao", teclas: DIG.r4, ate: T.mandaBarao },
  { id: "equipe", teclas: DIG.r5, ate: T.mandaEquipe },
];

// ───────────── Claude: perguntas e respostas ─────────────
// Cada item da resposta tem o quadro em que aparece e a altura que ocupa na coluna.
export type Item =
  | { tipo: "frase"; f: number; h: number; t: string }
  | { tipo: "ferramenta"; f: number; h: number; nome: string; fim: number }
  | { tipo: "linha"; f: number; h: number; id: string };
export type Turno = { teclas: Tecla[]; envia: number; itens: Item[]; pronto: number; alto: number };
const turno = (teclas: Tecla[], envia: number, itens: Item[]): Turno => {
  const pronto = itens[itens.length - 1].f + 10;
  return { teclas, envia, itens, pronto, alto: 148 + itens.reduce((s, i) => s + i.h, 0) + 86 };
};
const e1 = T.envia1;
const e2 = T.envia2;
const e3 = T.envia3;
const e4 = T.envia4;
const e5 = T.envia5;
const e6 = T.envia6;
export const TURNOS: Turno[] = [
  turno(DIG.p1, e1, [
    { tipo: "frase", f: e1 + 9, h: 36, t: "Vou olhar as conversas de ontem no Tintim." },
    { tipo: "ferramenta", f: e1 + 18, h: 36, nome: "leads_list", fim: e1 + 30 },
    { tipo: "ferramenta", f: e1 + 30, h: 48, nome: "leads_messages", fim: e1 + 46 },
    { tipo: "linha", f: bt(29), h: 40, id: "a1" },
    { tipo: "linha", f: bt(30), h: 40, id: "a2" },
    { tipo: "linha", f: bt(31), h: 44, id: "a3" },
    { tipo: "linha", f: bt(32), h: 28, id: "a4" },
    { tipo: "linha", f: bt(32) + 8, h: 28, id: "a5" },
  ]),
  turno(DIG.p2, e2, [
    { tipo: "ferramenta", f: e2 + 9, h: 48, nome: "creatives_list", fim: e2 + 24 },
    { tipo: "linha", f: e2 + 26, h: 40, id: "b1" },
    { tipo: "linha", f: e2 + 33, h: 34, id: "b2" },
    { tipo: "linha", f: e2 + 39, h: 34, id: "b3" },
    { tipo: "linha", f: e2 + 45, h: 34, id: "b4" },
  ]),
  turno(DIG.p3, e3, [
    { tipo: "ferramenta", f: e3 + 6, h: 36, nome: "leads_batch_status_preview", fim: e3 + 15 },
    { tipo: "ferramenta", f: e3 + 15, h: 48, nome: "leads_batch_status_change", fim: e3 + 26 },
    { tipo: "linha", f: e3 + 28, h: 40, id: "c1" },
    { tipo: "linha", f: e3 + 35, h: 28, id: "c2" },
  ]),
  turno(DIG.p4, e4, [
    { tipo: "ferramenta", f: e4 + 4, h: 48, nome: "leads_counts", fim: e4 + 12 },
    { tipo: "linha", f: e4 + 14, h: 40, id: "d1" },
    { tipo: "linha", f: e4 + 20, h: 28, id: "d2" },
  ]),
  turno(DIG.p5, e5, [
    { tipo: "ferramenta", f: e5 + 3, h: 48, nome: "creatives_list", fim: e5 + 9 },
    { tipo: "linha", f: e5 + 10, h: 28, id: "e1" },
  ]),
  turno(DIG.p6, e6, [
    { tipo: "ferramenta", f: e6 + 3, h: 48, nome: "leads_counts", fim: e6 + 9 },
    { tipo: "linha", f: e6 + 10, h: 28, id: "f1" },
  ]),
];
// Trecho de prova na resposta 1, de onde o cursor arrasta para selecionar (em pixels da janela).
export const CL = { trilho: 52, coluna: 730 };
export const CL_X0 = CL.trilho + (JANELA.w - CL.trilho - CL.coluna) / 2;
export const CL_CX = CL_X0 + CL.coluna / 2;
export const TRECHO = { x: CL_X0 + 16 + 20, y1: JANELA.topo + 148 + 36 + 36 + 48 + 40 + 40 + 44 + 14, y2: JANELA.topo + 148 + 36 + 36 + 48 + 40 + 40 + 44 + 28 + 14, fim2: 196 };

// ───────────── Avisos do sistema (mensagem que chega enquanto ele está no Claude) ─────────────
export const AVISOS: { f: number; de: string; t: string; foto: Foto; dura?: number }[] = [
  { f: T.paula3, de: "Dra. Paula · Viva Sorriso", t: "Lucas??", foto: { sigla: "VS", cor: "#0E7C86" } },
  { f: T.beto2, de: "Beto do futebol", t: "300 já ajuda", foto: { sigla: "B", cor: "#5B5F66" } },
  { f: T.amor1, de: "Amor ❤️", t: "Sonhei que você me traiu. Tô chateada.", foto: { sigla: "C", cor: "#B5476B" } },
  { f: T.beto3, de: "Beto do futebol", t: "100?", foto: { sigla: "B", cor: "#5B5F66" } },
  { f: T.beto4, de: "Beto do futebol", t: "E 50?", foto: { sigla: "B", cor: "#5B5F66" }, dura: 52 },
  { f: T.fimMarcela, de: "Marcela · Studio Pilates", t: "Ufa!! Obrigada 🙌", foto: {}, dura: 40 },
  { f: T.fimPaula, de: "Dra. Paula · Viva Sorriso", t: "Perfeito. Sobe a verba no vídeo.", foto: { sigla: "VS", cor: "#0E7C86" }, dura: 30 },
];
export const AVISO_DURA = 78;

// ───────────── Abas e telas ─────────────
export const ABA = { x0: 80, w: 240 };
export const ABA_WA = { x: ABA.x0 + ABA.w / 2, y: 22 };
export const ABA_CL = { x: ABA.x0 + ABA.w + ABA.w / 2, y: 22 };
// Até o solo, ele troca de aba clicando. No solo, a câmera chicoteia entre as duas telas.
export const CHICOTES = [T.ch1, T.ch2, T.ch3, T.ch4, T.ch5, T.ch6, T.ch7, T.ch8];
export const SOLO = { de: T.ch1 - 5, ate: T.ch8 + 5 };
export const noClaude = (f: number) => {
  if (f < SOLO.de) return (f > T.aba1 && f <= T.abaVolta1) || (f > T.aba2 && f <= T.abaVolta2);
  return false;
};

// ───────────── Câmera ─────────────
// Ponto da janela que fica no centro do quadro, e ampliação (1 = pixel de tela, 1440 de largura). No solo, o Claude fica em x + DIST.
const WX = CONVERSA.x + CONVERSA.w * 0.5;
const C = DIST;
const chicote = (f: number, para: Chave): Chave[] => [{ ...para, f: f + 4, e: "chicote" }];
const CAMERA_COM_DERIVA: Chave[] = [
  { f: 0, x: WX, y: 572, m: 2.04 },
  { f: T.renato1 - 2, x: WX, y: 574, m: 2.06, e: "linear" },
  // a reclamação chega e a câmera fecha nela (antes ela recuava logo depois: era o contrário do que a cena pede)
  { f: T.renato1 + 15, x: 835, y: 645, m: 2.85 },
  { f: T.paula1 - 2, x: 837, y: 647, m: 2.96, e: "linear" },
  { f: T.paula1 + 22, x: 640, y: 450, m: 1.5 },
  { f: 180, x: 634, y: 444, m: 1.56, e: "linear" },
  { f: 196, x: 330, y: 330, m: 2.2 },
  { f: 204, x: 332, y: 328, m: 2.22, e: "linear" },
  { f: T.aba1 - 1, x: 560, y: 200, m: 1.7 },
  { f: T.aba1 + 2, x: 560, y: 200, m: 1.7, e: "linear" },
  { f: T.aba1 + 24, x: CL_CX, y: 396, m: 2.3 },
  { f: T.envia1, x: CL_CX, y: 398, m: 2.4, e: "linear" },
  { f: T.envia1 + 18, x: CL_CX - 30, y: 326, m: 2.42 },
  { f: T.sel - 16, x: CL_CX - 44, y: 338, m: 2.52, e: "linear" },
  { f: T.sel - 2, x: CL_CX - 146, y: 430, m: 2.8 },
  { f: T.selFim + 3, x: CL_CX - 144, y: 432, m: 2.84, e: "linear" },
  { f: T.abaVolta1 - 1, x: 480, y: 190, m: 1.7 },
  { f: T.abaVolta1 + 2, x: 480, y: 190, m: 1.7, e: "linear" },
  { f: T.abaVolta1 + 20, x: WX, y: 572, m: 2.04 },
  { f: T.manda1 + 4, x: WX, y: 576, m: 2.08, e: "linear" },
  { f: T.manda1 + 18, x: 640, y: 450, m: 1.5 },
  { f: T.abrePaula, x: 636, y: 446, m: 1.54, e: "linear" },
  { f: T.abrePaula + 14, x: WX, y: 560, m: 2.04 },
  { f: T.aba2 - 13, x: WX, y: 564, m: 2.12, e: "linear" },
  { f: T.aba2 - 1, x: 560, y: 200, m: 1.7 },
  { f: T.aba2 + 2, x: 560, y: 200, m: 1.7, e: "linear" },
  { f: T.aba2 + 17, x: CL_CX, y: 610, m: 2.2 },
  { f: T.envia2, x: CL_CX, y: 612, m: 2.26, e: "linear" },
  { f: T.envia2 + 16, x: CL_CX - 30, y: 326, m: 2.42 },
  { f: T.abaVolta2 - 14, x: CL_CX - 36, y: 334, m: 2.56, e: "linear" },
  { f: T.abaVolta2 - 1, x: 480, y: 190, m: 1.7 },
  { f: T.abaVolta2 + 2, x: 480, y: 190, m: 1.7, e: "linear" },
  { f: T.abreAmor - 4, x: 560, y: 380, m: 1.6 },
  { f: T.abreAmor + 3, x: 560, y: 380, m: 1.6, e: "linear" },
  { f: T.abreAmor + 18, x: WX, y: 572, m: 2.04 },
  { f: T.abrePaula2 - 10, x: WX, y: 578, m: 2.12, e: "linear" },
  { f: T.abrePaula2 - 4, x: 684, y: 480, m: 1.55 },
  { f: T.abrePaula2 + 3, x: 684, y: 480, m: 1.55, e: "linear" },
  { f: T.abrePaula2 + 14, x: WX, y: 572, m: 2.04 },
  { f: T.mandaPaula + 2, x: WX, y: 575, m: 2.09, e: "linear" },
  { f: T.abreMarcela - 4, x: 684, y: 480, m: 1.55 },
  { f: T.abreMarcela + 3, x: 684, y: 480, m: 1.55, e: "linear" },
  { f: T.abreMarcela + 13, x: WX, y: 560, m: 2.04 },
  // O solo: cada chicote dura 8 quadros e cai no tempo da música
  { f: T.ch1 - 4, x: WX, y: 564, m: 2.1, e: "linear" },
  ...chicote(T.ch1, { f: 0, x: C + CL_CX, y: 610, m: 2.3 }),
  { f: T.envia3, x: C + CL_CX, y: 612, m: 2.34, e: "linear" },
  { f: T.envia3 + 14, x: C + CL_CX - 30, y: 326, m: 2.42 },
  { f: T.ch2 - 4, x: C + CL_CX - 34, y: 332, m: 2.54, e: "linear" },
  ...chicote(T.ch2, { f: 0, x: WX, y: 590, m: 2.2 }),
  { f: T.mandaMarcela + 2, x: WX, y: 593, m: 2.26, e: "linear" },
  { f: T.abreBarao - 4, x: 684, y: 500, m: 1.55 },
  { f: T.abreBarao + 3, x: 684, y: 500, m: 1.55, e: "linear" },
  { f: T.abreBarao + 13, x: WX, y: 560, m: 2.04 },
  { f: T.ch3 - 4, x: WX, y: 564, m: 2.1, e: "linear" },
  ...chicote(T.ch3, { f: 0, x: C + CL_CX, y: 610, m: 2.3 }),
  { f: T.envia4, x: C + CL_CX, y: 610, m: 2.31, e: "linear" },
  { f: T.envia4 + 12, x: C + CL_CX - 30, y: 324, m: 2.42 },
  { f: T.ch4 - 4, x: C + CL_CX - 34, y: 328, m: 2.5, e: "linear" },
  ...chicote(T.ch4, { f: 0, x: WX, y: 590, m: 2.2 }),
  { f: T.ch5 - 4, x: WX, y: 592, m: 2.25, e: "linear" },
  // O vai e vem: quatro chicotes em cinco tempos, e a câmera pousa no enquadramento da abertura, na conversa do Renato
  ...chicote(T.ch5, { f: 0, x: C + CL_CX - 30, y: 324, m: 2.42 }),
  { f: T.ch6 - 4, x: C + CL_CX - 30, y: 326, m: 2.46, e: "linear" },
  ...chicote(T.ch6, { f: 0, x: WX, y: 606, m: 2.4 }),
  { f: T.ch7 - 4, x: WX, y: 608, m: 2.43, e: "linear" },
  ...chicote(T.ch7, { f: 0, x: C + CL_CX - 30, y: 324, m: 2.46 }),
  { f: T.ch8 - 4, x: C + CL_CX - 30, y: 325, m: 2.48, e: "linear" },
  ...chicote(T.ch8, { f: 0, x: WX, y: 572, m: 2.04 }),
  // A última tela fica parada: as mensagens que continuam chegando é que dão o movimento.
  { f: T.someFim, x: WX, y: 572, m: 2.04, e: "linear" },
];
// Aproximação lenta durante as paradas: desligada por padrão desde a versão 3.4. A tela fica parada enquanto se lê,
// e o movimento fica só onde quer dizer alguma coisa: a reclamação que abre o filme. Desde a 3.6 a última tela também fica parada.
export const DERIVA = false;
const DERIVA_FICA = new Set([T.paula1 - 2]);
export const CAMERA: Chave[] = CAMERA_COM_DERIVA.map((k, i, a) => (DERIVA || k.e !== "linear" || i === 0 || DERIVA_FICA.has(k.f) ? k : { ...k, x: a[i - 1].x, y: a[i - 1].y, m: a[i - 1].m }));

// ───────────── Cursor do mouse ─────────────
// Cada movimento parte de onde o cursor está. "arco" curva o caminho; "passa" faz a mão passar do ponto e voltar.
type Mov = { de: number; ate: number; x: number; y: number; arco?: number; passa?: number };
const CAIXA_WA = { x: 700, y: 770 };
const noTopo = { x: CELULA.x, y: CELULA.y0 };
export const MOVS: Mov[] = [
  { de: 180, ate: 194, x: CELULA.x + 30, y: CELULA.y0 + 6, arco: -40, passa: 8 }, // vai até o pedido do Beto
  { de: 196, ate: 203, x: CELULA.x + 26, y: CELULA.y0 + 16 }, // hesita em cima dele
  { de: 204, ate: T.aba1 - 1, x: ABA_CL.x + 6, y: ABA_CL.y + 2, arco: 26, passa: 6 }, // desiste e vai para o Claude
  { de: T.aba1 + 4, ate: T.aba1 + 18, x: CL_X0 + 250, y: JANELA.topo + 322, arco: 20 },
  { de: T.sel - 16, ate: T.sel - 2, x: TRECHO.x, y: TRECHO.y1, arco: -14, passa: 5 },
  { de: T.sel, ate: T.selFim, x: TRECHO.x + TRECHO.fim2, y: TRECHO.y2 }, // arrasta, selecionando
  { de: T.selFim + 4, ate: T.abaVolta1 - 1, x: ABA_WA.x + 10, y: ABA_WA.y + 2, arco: 30, passa: 7 },
  { de: T.abaVolta1 + 3, ate: T.abaVolta1 + 14, x: CAIXA_WA.x, y: CAIXA_WA.y, arco: -30 },
  { de: T.manda1 + 2, ate: T.manda1 + 13, x: CELULA.x + 20, y: CELULA.y0 + CELULA.passo, arco: 30, passa: 8 }, // mira a Dra. Paula
  { de: T.marcela2 + 6, ate: T.marcela2 + 16, x: CELULA.x + 24, y: CELULA.y0 + 2 * CELULA.passo + 4 }, // a lista andou: corrige
  { de: T.aba2 - 14, ate: T.aba2 - 1, x: ABA_CL.x + 2, y: ABA_CL.y + 3, arco: 34, passa: 6 },
  { de: T.aba2 + 3, ate: T.aba2 + 14, x: CL_X0 + 300, y: JANELA.topo + 616, arco: -20 },
  { de: T.envia2 + 50, ate: T.amor1 + 1, x: CL_X0 + 380, y: 330 }, // vai devagar até a resposta, para selecionar: o aviso da esposa interrompe
  { de: T.amor1 + 14, ate: T.amor1 + 22, x: CL_X0 + 430, y: 300 }, // olha o aviso
  { de: T.abaVolta2 - 13, ate: T.abaVolta2 - 1, x: ABA_WA.x + 4, y: ABA_WA.y + 2, arco: 24, passa: 6 },
  { de: T.abaVolta2 + 3, ate: T.abreAmor - 1, x: noTopo.x + 10, y: noTopo.y + 4, arco: -16 },
  { de: T.abrePaula2 - 10, ate: T.abrePaula2 - 1, x: CELULA.x + 16, y: -1 }, // y calculado: onde a Dra. Paula está na lista
  { de: T.mandaPaula + 2, ate: T.abreMarcela - 1, x: CELULA.x + 22, y: -2 },
  { de: T.mandaMarcela + 2, ate: T.abreBarao - 1, x: CELULA.x + 18, y: -3 },
];
// Alvos que dependem da ordem da lista no momento do clique.
const alvoY: Record<string, number> = {
  "-1": yDaCelula("paula", T.abrePaula2) + 3,
  "-2": yDaCelula("marcela", T.abreMarcela) - 2,
  "-3": yDaCelula("barao", T.abreBarao) + 2,
};
const MOVS_R = MOVS.map((m) => (m.y < 0 ? { ...m, y: alvoY[String(m.y)] } : m));
export const cursorEm = (f: number) => {
  let x = 1150;
  let y = 668;
  for (const m of MOVS_R) {
    if (f <= m.de) break;
    if (f >= m.ate) {
      x = m.x;
      y = m.y;
      continue;
    }
    const t = (f - m.de) / (m.ate - m.de);
    const dx = m.x - x;
    const dy = m.y - y;
    const d = Math.hypot(dx, dy) || 1;
    const corte = m.passa ? 0.78 : 1;
    const ida = mao(Math.min(1, t / corte));
    const sobra = m.passa ? m.passa * (t < corte ? ida : 1 - mao((t - corte) / (1 - corte))) : 0;
    const curva = Math.sin(Math.PI * Math.min(1, t / corte)) * (m.arco ?? 0);
    return { x: x + dx * ida + (dx / d) * sobra + (-dy / d) * curva, y: y + dy * ida + (dy / d) * sobra + (dx / d) * curva };
  }
  return { x, y };
};
export const CLIQUES = [T.aba1, T.abaVolta1, T.abaVolta1 + 15, T.abrePaula, T.aba2, T.aba2 + 15, T.abaVolta2, T.abreAmor, T.abrePaula2, T.abreMarcela, T.abreBarao];

// ───────────── Sons (a trilha de efeitos é montada fora, a partir desta lista) ─────────────
export const SONS = () => {
  const s: { f: number; som: string; v: number }[] = [];
  // No solo, só soa a tecla da tela que está em cena (ele digita "fora de quadro" enquanto a câmera está na outra).
  const doClaude: Tecla[][] = [DIG.p1, DIG.p2, DIG.p3, DIG.p4, DIG.p5, DIG.p6];
  for (const d of Object.values(DIG))
    for (const k of d) {
      const naTelaDoClaude = k.f >= SOLO.de && k.f <= SOLO.ate ? percurso(CAMERA, k.f).x > DIST / 2 : doClaude.includes(d);
      if (naTelaDoClaude === doClaude.includes(d)) s.push({ f: k.f, som: k.som, v: 1 });
    }
  for (const c of CLIQUES) s.push({ f: c, som: "mouse", v: 1 });
  s.push({ f: T.sel, som: "mouse", v: 0.7 }, { f: T.selFim, som: "mouse", v: 0.5 }, { f: T.cola1, som: "tecla", v: 1.3 });
  for (const t of TURNOS) s.push({ f: t.envia, som: "enter", v: 1 }, { f: t.itens.find((i) => i.tipo === "linha")!.f, som: "resposta", v: 1 });
  // Sons do WhatsApp Web como o código dele toca: "enviada" a cada envio; "aviso" só quando a mensagem chega com o WhatsApp fora de foco.
  for (const c of CHATS) for (const m of c.msgs) if (m.f >= 0) s.push({ f: m.f, som: m.lado === "d" ? "enviada" : focoNoClaude(m.f) ? "aviso" : "recebida", v: 1 });
  for (const c of CHICOTES) s.push({ f: c - 4, som: "chicote", v: 1 });
  return s.sort((a, b) => a.f - b.f);
};
export const INICIOS = { defesa: inicioDe(DIG.defesa), p1: inicioDe(DIG.p1), r1: inicioDe(DIG.r1), p2: inicioDe(DIG.p2), amor: inicioDe(DIG.amor), r2: inicioDe(DIG.r2), p3: inicioDe(DIG.p3), r3: inicioDe(DIG.r3), p4: inicioDe(DIG.p4), r4: inicioDe(DIG.r4) };
// Onde está o foco: no solo, a tela em cena; fora dele, a aba clicada. O WhatsApp Web só toca o aviso sonoro quando não está em foco.
export const focoNoClaude = (f: number) => (f >= SOLO.de && f <= SOLO.ate ? percurso(CAMERA, f).x > DIST / 2 : noClaude(f));
