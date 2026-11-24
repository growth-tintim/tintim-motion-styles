// WhatsApp no iPhone, tema claro: as conversas, a lista de conversas e a navegação entre elas.
// Medidas da versão de iPhone anterior, tiradas das imagens oficiais da App Store (pt-BR): cabeçalho com voltar, foto, nome e "online";
// balões de 17/22 pt com raio de 16 pt e a ponta embaixo; hora e tiques no canto; barra com "+", campo, câmera e microfone.
// O papel de parede é o arquivo real do WhatsApp (bg-chat-beige). Ícones: código público do WhatsApp Web (icones.ts).
// Estimativa (desenho meu): campo com texto, menu "Colar" do iOS, troca de conversa empurrando da direita e o aviso no topo.
// Toda digitação acontece com o teclado aberto, para a caixa de texto ficar acima do quinto de baixo do quadro (legenda do Reels).
import React from "react";
import { Img, interpolate } from "remotion";
import { IC } from "../icones";
import { SISTEMA, WI } from "../marca";
import { M } from "../midia";
import { CHEGA, IOS, TECLADO, TELA, trava } from "../geometria";
import { AMOR, AMOR_LIMPO, BARAO, Chat, DIG, EQUIPE, MARCELA, NAV, PAULA, PROVA, RENATO, RESPOSTA2, T, textoEm } from "../tempos";
import { Lista } from "./Lista";
import { Foto, Toque } from "./Sistema";
import { Tecla, Teclado } from "./Teclado";

const Ic = ({ n, t = 24, cor = "currentColor" }: { n: string; t?: number; cor?: string }) => (
  <svg width={t} height={t} viewBox={IC[n].vb} style={{ display: "block", flexShrink: 0, color: cor }}>
    {IC[n].p.map((p, i) => (
      <path key={i} d={p.d} fill="currentColor" fillRule={p.e ? "evenodd" : undefined} clipRule={p.e ? "evenodd" : undefined} />
    ))}
  </svg>
);
const Tra = ({ d, t = 24, cor = WI.texto, l = 1.7 }: { d: string; t?: number; cor?: string; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
type Estado = "enviada" | "entregue" | "lida";
const Tiques = ({ estado }: { estado: Estado }) => <Ic n={estado === "enviada" ? "check" : estado === "entregue" ? "delivered" : "read"} t={17} cor={estado === "lida" ? WI.lido : "rgba(0,0,0,.42)"} />;

const Balao = ({ lado, hora, estado, autor, children }: { lado: "e" | "d"; hora: string; estado?: Estado; autor?: string; children: React.ReactNode }) => {
  const cor = lado === "e" ? WI.recebida : WI.enviada;
  return (
    <div style={{ position: "relative", alignSelf: lado === "e" ? "flex-start" : "flex-end", maxWidth: 306, background: cor, borderRadius: 16, boxShadow: "0 .6px .8px rgba(0,0,0,.16)", boxSizing: "border-box", padding: "7px 12px 8px", fontSize: 17, lineHeight: "22px", letterSpacing: "-0.012em", color: WI.texto, whiteSpace: "pre-wrap" }}>
      <svg width={14} height={17} viewBox="0 0 14 17" style={{ position: "absolute", bottom: 0, left: lado === "e" ? -6 : undefined, right: lado === "d" ? -6 : undefined, display: "block", color: cor, scale: lado === "d" ? "-1 1" : undefined }}>
        <path fill="currentColor" d="M14 0v17H0c4.6-1.6 7.4-6.6 7.4-17Z" />
      </svg>
      {autor ? <div name="Autor" style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600, color: "#C4532D", marginBottom: 1 }}>{autor}</div> : null}
      <span style={{ position: "relative" }}>{children}</span>
      <span style={{ display: "inline-block", width: estado ? 62 : 40, height: 1 }} />
      <div style={{ position: "absolute", right: 11, bottom: 5, height: 15, display: "flex", alignItems: "center", gap: 2, fontSize: 11.5, lineHeight: "15px", letterSpacing: 0, color: "rgba(0,0,0,.45)", whiteSpace: "nowrap" }}>
        {hora}
        {estado ? <Tiques estado={estado} /> : null}
      </div>
    </div>
  );
};
// Linha de mensagem: cresce até a altura do próprio conteúdo quando a mensagem chega.
const Linha = ({ p = 1, children }: { p?: number; children: React.ReactNode }) => (
  <div style={{ display: "grid", gridTemplateRows: `${p}fr`, flexShrink: 0, opacity: Math.min(1, p * 1.6) }}>
    <div style={{ minHeight: 0, overflow: p < 1 ? "hidden" : "visible", display: "flex", flexDirection: "column", padding: "0 15px 9px", boxSizing: "border-box" }}>{children}</div>
  </div>
);
const Dia = ({ children }: { children: string }) => (
  <div style={{ display: "flex", justifyContent: "center", flexShrink: 0, paddingBottom: 9 }}>
    <div style={{ padding: "3px 10px", borderRadius: 9, background: "rgba(255,255,255,.94)", boxShadow: "0 .5px 1px rgba(0,0,0,.14)", fontSize: 12.5, lineHeight: "17px", fontWeight: 500, color: "rgba(0,0,0,.55)" }}>{children}</div>
  </div>
);

// O que está escrito na caixa de cada conversa, quadro a quadro.
const SIMPLES = new Map<Chat, { dig: typeof DIG.amor; envia: number }>([
  [AMOR, { dig: DIG.amor, envia: T.enviaAmor }],
  [BARAO, { dig: DIG.barao, envia: T.enviaBR }],
  [EQUIPE, { dig: DIG.equipe, envia: T.enviaEq }],
  [MARCELA, { dig: DIG.marcela, envia: T.envio3 }],
]);
const campoDe = (chat: Chat, f: number) => {
  if (chat === RENATO) {
    if (f < T.troca) return textoEm(DIG.defesa, f);
    if (f >= T.envio1) return "";
    return textoEm(DIG.abre, f) + (f >= T.quebra ? "\n" : "") + (f >= T.cola ? PROVA.join("\n") : "");
  }
  if (chat === PAULA) return f >= T.cola2 && f < T.envio2 ? [RESPOSTA2[0], "", ...RESPOSTA2.slice(1)].join("\n") : "";
  const c = SIMPLES.get(chat);
  return c && f < c.envia ? textoEm(c.dig, f) : "";
};
// Onde ele toca na caixa para colar, e quando toca em enviar, em cada conversa.
const COLAR = new Map<Chat, { toque: number; cola: number }>([[RENATO, { toque: T.toque3, cola: T.cola }], [PAULA, { toque: T.toque5, cola: T.cola2 }]]);
const envioDe = (chat: Chat, f: number) => (chat === RENATO ? (f < T.troca ? -1 : T.envio1) : chat === PAULA ? T.envio2 : SIMPLES.get(chat)?.envia ?? -1);
const DIGITADOS = [DIG.defesa, DIG.abre, DIG.amor, DIG.barao, DIG.equipe, DIG.marcela];
const digitando = (f: number) => DIGITADOS.some((d) => f >= d[0].f - 2 && f <= d[d.length - 1].f + 6) || (f >= T.quebra && f <= T.envio1);

const TECLAS: Tecla[] = [...DIG.defesa, ...DIG.abre, { f: T.quebra, c: "⏎" }, ...DIG.amor, ...DIG.barao, ...DIG.equipe, ...DIG.marcela].map((k) => ({ q: k.f, c: k.c }));

// Sugestões do teclado: a palavra como está, a palavra que ele vai escrever e uma alternativa comum.
const ALVO: [number, string][] = [
  [0, "Mas o custo por conversa caiu. O problema é o atendimento de vocês"],
  [T.troca, "Olhei as conversas de ontem:"],
  [T.abreAmor, "Mas foi um sonho"],
  [AMOR_LIMPO, "Desculpa amor, não vai acontecer mais!"],
  [T.trocaVoltaB, "Tocou: 9 conversas hoje. 3 sem resposta."],
  [T.abreEquipe, "Pausa o carrossel: só 4 vendas."],
  [T.troca3, "Não perdeu: os 7 já estão em Negociação."],
];
const sugerir = (texto: string, f: number) => {
  const linha = texto.split("\n").pop() ?? "";
  if (linha === "") return texto === "" ? ["Oi", "Eu", "O"] : ["Eu", "O", "A"];
  const ps = linha.split(" ");
  const parcial = ps[ps.length - 1];
  if (parcial === "") return ["que", "de", "o"];
  const alvo = ALVO.filter((a) => a[0] <= f).pop()![1].split(" ");
  const w = (alvo[ps.length - 1] ?? "").replace(/[?:!.,]/g, "");
  return [`“${parcial}”`, w && w !== parcial ? w : "é", parcial.length > 3 ? "de" : "que"];
};

const Conversa = ({ chat, f, k }: { chat: Chat; f: number; k: number }) => {
  const texto = campoDe(chat, f);
  const temTexto = texto.length > 0;
  const cursor = digitando(f) || Math.floor(f / 16) % 2 === 0;
  const sub = chat.digitando?.some(([a, b]) => f >= a && f < b) ? "digitando..." : chat.sub ?? "online";
  const toque = (em: number, dur = 9) => interpolate(f, [em - 3, em + dur], [0, 1], trava);
  const colar = COLAR.get(chat);
  const menu = colar !== undefined && f >= colar.toque + 3 && f < colar.cola + 1;
  const envio = envioDe(chat, f);
  const aperto = envio > 0 ? interpolate(f, [envio - 3, envio - 1, envio + 2], [0, 1, 0], trava) : 0;
  return (
    <div name={`Conversa: ${chat.nome}`} style={{ position: "absolute", inset: 0, background: WI.papel, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div name="Papel de parede" style={{ position: "absolute", left: 0, top: 100, width: TELA.w, height: TELA.h - 100, opacity: 0.3 }}>
        <Img src={M.doodle} style={{ position: "absolute", left: 0, top: 0, width: 330, height: 587 }} />
        <Img src={M.doodle} style={{ position: "absolute", left: 330, top: 0, width: 330, height: 587 }} />
        <Img src={M.doodle} style={{ position: "absolute", left: 0, top: 587, width: 330, height: 587 }} />
        <Img src={M.doodle} style={{ position: "absolute", left: 330, top: 587, width: 330, height: 587 }} />
      </div>

      <div name="Cabeçalho" style={{ position: "relative", height: 100, flexShrink: 0, background: WI.barra, boxShadow: `0 .5px 0 ${WI.linha}`, zIndex: 4 }}>
        <div style={{ position: "absolute", left: 7, top: 60 }}><Tra d="M14.6 4.6 7.2 12l7.4 7.4" l={2.4} /></div>
        <div style={{ position: "absolute", left: 44, top: 53.5 }}><Foto foto={chat.foto} t={37} /></div>
        <div style={{ position: "absolute", left: 91, top: 54, width: 200, fontSize: 17, lineHeight: "22px", fontWeight: 600, letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.nome}</div>
        <div style={{ position: "absolute", left: 91, top: 76, fontSize: 13, lineHeight: "16px", color: "rgba(0,0,0,.5)" }}>{sub}</div>
        <div name="Vídeo" style={{ position: "absolute", left: 302, top: 58 }}>
          <Tra d="M2.6 8.4a2.6 2.6 0 0 1 2.6-2.6h8.6a2.6 2.6 0 0 1 2.6 2.6v7.2a2.6 2.6 0 0 1-2.6 2.6H5.2a2.6 2.6 0 0 1-2.6-2.6ZM16.4 10.6l4.3-2.8c.4-.3.9 0 .9.5v7.4c0 .5-.5.8-.9.5l-4.3-2.8" t={28} l={1.5} />
        </div>
        <div name="Ligar" style={{ position: "absolute", left: 349, top: 60 }}>
          <Tra d="M7.3 3.6h2.2c.4 0 .8.3.9.7l1 3.3c.1.4 0 .8-.3 1L9.4 10a11 11 0 0 0 4.6 4.6l1.4-1.7c.2-.3.6-.4 1-.3l3.3 1c.4.1.7.5.7.9v2.2c0 1.2-1 2.2-2.2 2.1C10.6 18.3 5.7 13.4 5.2 5.8 5.1 4.6 6.1 3.6 7.3 3.6Z" t={25} l={1.5} />
        </div>
      </div>

      <div name="Mensagens" style={{ position: "relative", flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingTop: 8 }}>
        {chat.msgs.filter((m) => m.f <= f).map((m, i) => {
          const p = m.f < 0 ? 1 : interpolate(f, [m.f, m.f + 8], [0, 1], CHEGA);
          const estado: Estado | undefined = m.lado === "e" ? undefined : m.f < 0 ? "lida" : f < m.f + 6 ? "enviada" : f < (m.lida ?? 1e9) ? "entregue" : "lida";
          return (
            <React.Fragment key={i}>
              {m.dia ? (
                <div style={{ display: "grid", gridTemplateRows: `${p}fr`, flexShrink: 0, opacity: p }}><div style={{ minHeight: 0, overflow: "hidden" }}><Dia>{m.dia}</Dia></div></div>
              ) : null}
              <Linha p={p}><Balao lado={m.lado} hora={m.hora} estado={estado} autor={m.autor}>{m.t}</Balao></Linha>
            </React.Fragment>
          );
        })}
      </div>

      <div name="Barra da caixa de mensagem" style={{ position: "relative", flexShrink: 0, background: WI.barra, boxShadow: `0 -.5px 0 ${WI.linha}`, zIndex: 4, display: "flex", alignItems: "flex-end", padding: "8px 0 8px 9px", fontFamily: SISTEMA }}>
        <div name="Mais" style={{ marginBottom: 3.5, flexShrink: 0 }}><Tra d="M12 4.2v15.6M4.2 12h15.6" t={26} l={1.5} /></div>
        <div name="Campo" style={{ position: "relative", marginLeft: 12, width: temTexto ? 289 : 241, minHeight: 33, boxSizing: "border-box", borderRadius: 17, background: "#FFFFFF", border: ".5px solid rgba(0,0,0,.16)", padding: "5px 12px", fontSize: 17, lineHeight: "22px", letterSpacing: "-0.012em", whiteSpace: "pre-wrap", flexShrink: 0 }}>
          {texto}
          <span style={{ display: "inline-block", width: 2, height: 21, marginLeft: 0.5, verticalAlign: "-4.5px", borderRadius: 1, background: WI.acento, opacity: cursor ? 1 : 0 }} />
          {!temTexto ? <div name="Figurinhas" style={{ position: "absolute", right: 6, top: 4.5 }}><Tra d="M4.2 9.2a5 5 0 0 1 5-5h5.6a5 5 0 0 1 5 5v3.2l-7.4 7.4H9.2a5 5 0 0 1-5-5ZM19.6 12.6h-3.2a3.8 3.8 0 0 0-3.8 3.8v3.2" t={23} l={1.5} /></div> : null}
          {colar ? <Toque p={toque(colar.toque)} /> : null}
        </div>
        {temTexto ? (
          <div name="Enviar" style={{ position: "relative", marginLeft: 12, width: 33, height: 33, borderRadius: 16.5, background: WI.acento, display: "flex", alignItems: "center", justifyContent: "center", scale: String(1 - 0.12 * aperto), flexShrink: 0 }}>
            <Ic n="send" t={20} cor="#FFFFFF" />
            {envio > 0 ? <Toque p={toque(envio - 1)} /> : null}
          </div>
        ) : (
          <>
            <div name="Câmera" style={{ marginLeft: 20, marginBottom: 3.5 }}>
              <Tra d="M3.4 8.8a2 2 0 0 1 2-2h2.3l1.3-2.1h6l1.3 2.1h2.3a2 2 0 0 1 2 2v8.4a2 2 0 0 1-2 2H5.4a2 2 0 0 1-2-2ZM12 9.4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" t={26} l={1.5} />
            </div>
            <div name="Áudio" style={{ marginLeft: 18, marginBottom: 3.5 }}>
              <Tra d="M12 3.2a3 3 0 0 1 3 3v5.2a3 3 0 0 1-6 0V6.2a3 3 0 0 1 3-3ZM6.2 11.2a5.8 5.8 0 0 0 11.6 0M12 17v3.6" t={26} l={1.5} />
            </div>
          </>
        )}
        {menu ? (
          <div name="Colar" style={{ position: "absolute", left: 58, top: -40, height: 40, padding: "0 20px", borderRadius: 20, background: "rgba(255,255,255,.97)", boxShadow: "0 8px 28px rgba(0,0,0,.18), 0 0 0 .5px rgba(0,0,0,.08)", fontSize: 16, lineHeight: "40px", opacity: interpolate(f, [colar!.toque + 3, colar!.toque + 6], [0, 1], trava), scale: String(interpolate(f, [colar!.toque + 3, colar!.toque + 7], [0.86, 1], CHEGA)), transformOrigin: "30% 100%" }}>
            Colar
            <Toque p={toque(colar!.cola - 1, 6)} />
          </div>
        ) : null}
      </div>
      <div name="Lugar do teclado" style={{ height: 34 + (TECLADO.h - 34) * k, flexShrink: 0 }} />
    </div>
  );
};


// Navegação: voltar para a lista (a conversa sai pela direita e a lista vem de trás) e abrir uma conversa (entra pela direita).
// O teclado desce na lista e sobe na conversa, junto com a transição.
const DUR = 11;
const navEm = (f: number) => {
  let i = 0;
  while (i + 1 < NAV.length && NAV[i + 1].f <= f) i++;
  return i;
};
export const tecladoEm = (f: number) => {
  const i = navEm(f);
  const k = (t: Chat | "lista") => (t === "lista" ? 0 : 1);
  if (i === 0) return k(NAV[0].tela);
  const p = interpolate(f, [NAV[i].f, NAV[i].f + DUR], [0, 1], IOS);
  return k(NAV[i - 1].tela) + (k(NAV[i].tela) - k(NAV[i - 1].tela)) * p;
};
const TelaWA = ({ t, f, k }: { t: Chat | "lista"; f: number; k: number }) => (t === "lista" ? <Lista f={f} /> : <Conversa chat={t} f={f} k={k} />);

export const WhatsAppIOS = ({ f }: { f: number }) => {
  const i = navEm(f);
  const atual = NAV[i];
  const antes = i > 0 ? NAV[i - 1] : null;
  const p = antes ? interpolate(f, [atual.f, atual.f + DUR], [0, 1], IOS) : 1;
  const k = tecladoEm(f);
  const volta = atual.tela === "lista"; // voltar: quem sai fica por cima e vai para a direita
  const texto = atual.tela === "lista" ? "" : campoDe(atual.tela, f);
  const baixo = antes && p < 1 ? (volta ? atual : antes) : null;
  const cima = volta && antes && p < 1 ? antes : atual;
  const q = volta ? (p < 1 ? 1 - p : 1) : p; // quanto a tela de cima já entrou
  return (
    <div name="WhatsApp" style={{ position: "absolute", inset: 0, background: WI.papel, fontFamily: SISTEMA, color: WI.texto, overflow: "hidden" }}>
      {baixo ? (
        <div style={{ position: "absolute", inset: 0, translate: `${-0.3 * TELA.w * q}px 0px` }}>
          <TelaWA t={baixo.tela} f={f} k={k} />
          <div style={{ position: "absolute", inset: 0, background: `rgba(0,0,0,${0.1 * q})`, zIndex: 9 }} />
        </div>
      ) : null}
      <div style={{ position: "absolute", inset: 0, translate: `${(1 - q) * TELA.w}px 0px`, boxShadow: q < 1 ? "-8px 0 24px rgba(0,0,0,.12)" : undefined }}>
        <TelaWA t={cima.tela} f={f} k={k} />
      </div>
      <Teclado f={f} k={k} teclas={TECLAS} vazio={texto === "" || texto.endsWith("\n")} sugestoes={sugerir(texto, f)} />
    </div>
  );
};
