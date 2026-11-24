// Lista de conversas do WhatsApp no iPhone, tema claro: título grande "Conversas", busca, filtros e uma linha por conversa
// (foto, nome, hora, prévia em até duas linhas e o contador verde de não lidas). A ordem e os contadores saem das próprias
// conversas em tempos.ts, quadro a quadro: o que chegou enquanto ele estava em outra tela aparece como não lido.
// Desenho por estimativa, a partir do layout do app (não medido em imagem oficial, como as telas de conversa).
import React from "react";
import { interpolate } from "remotion";
import { IC } from "../icones";
import { WI } from "../marca";
import { TELA, trava } from "../geometria";
import { Chat, CHATS, Msg, NAV, T, BARAO } from "../tempos";
import { Foto, Toque } from "./Sistema";

const CINZA = "rgba(118,118,128,.12)";
const VERDE = WI.acento;
const TOPO = 240;
const ALT = 76;

// Até quando ele já viu esta conversa: o último quadro em que ela estava aberta.
const vistoAte = (chat: Chat, f: number) => {
  let v = -1;
  NAV.forEach((n, i) => {
    if (n.tela === chat && n.f <= f) v = Math.max(v, Math.min(NAV[i + 1]?.f ?? f, f));
  });
  return v;
};
const diaDe = (msgs: Msg[], ate: Msg) => {
  let d: string | undefined;
  for (const m of msgs) {
    if (m.dia) d = m.dia;
    if (m === ate) break;
  }
  return d;
};
const linhaDe = (chat: Chat, f: number, ordem: number) => {
  const vistas = chat.msgs.filter((m) => m.f <= f);
  const u = vistas[vistas.length - 1];
  const dia = diaDe(chat.msgs, u);
  const quando = u.f >= 0 || dia === "Hoje" || dia === undefined ? u.hora : dia;
  const visto = vistoAte(chat, f);
  const naoLidas = vistas.filter((m) => m.lado === "e" && m.f >= 0 && m.f > visto).length;
  const previa = (u.autor ? `${u.autor}: ` : "") + u.t.replace(/\n+/g, " ");
  return { chat, u, quando, naoLidas, previa, chave: u.f >= 0 ? u.f : -1000 - ordem };
};

const Ic = ({ n, t, cor }: { n: string; t: number; cor: string }) => (
  <svg width={t} height={t} viewBox={IC[n].vb} style={{ display: "inline-block", flexShrink: 0, color: cor, verticalAlign: "-3px", marginRight: 2 }}>
    {IC[n].p.map((p, i) => <path key={i} d={p.d} fill="currentColor" fillRule={p.e ? "evenodd" : undefined} clipRule={p.e ? "evenodd" : undefined} />)}
  </svg>
);
const Tra = ({ d, t = 24, cor = "#000000", l = 1.7 }: { d: string; t?: number; cor?: string; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Chip = ({ ativo, children }: { ativo?: boolean; children: React.ReactNode }) => (
  <div style={{ height: 32, padding: "0 13px", borderRadius: 16, background: ativo ? "#D9FDD3" : CINZA, color: ativo ? "#15603E" : "rgba(0,0,0,.62)", fontSize: 15, lineHeight: "32px", fontWeight: ativo ? 600 : 500, whiteSpace: "nowrap" }}>{children}</div>
);

export const Lista = ({ f }: { f: number }) => {
  const linhas = CHATS.map((c, i) => linhaDe(c, f, i)).sort((a, b) => b.chave - a.chave);
  const naoLidas = linhas.filter((l) => l.naoLidas > 0).length;
  const toque = interpolate(f, [T.toqueBarao - 3, T.toqueBarao + 9], [0, 1], trava);
  return (
    <div name="Lista de conversas" style={{ position: "absolute", inset: 0, background: "#FFFFFF", overflow: "hidden" }}>
      <div name="Botões do topo" style={{ position: "absolute", left: 16, top: 57, width: TELA.w - 32, height: 34, display: "flex", alignItems: "center" }}>
        <div style={{ width: 34, height: 34, borderRadius: 17, background: CINZA, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: 4.4, height: 4.4, borderRadius: 2.2, background: "#000000" }} />)}
        </div>
        <span style={{ flex: 1 }} />
        <Tra d="M3.4 8.8a2 2 0 0 1 2-2h2.3l1.3-2.1h6l1.3 2.1h2.3a2 2 0 0 1 2 2v8.4a2 2 0 0 1-2 2H5.4a2 2 0 0 1-2-2ZM12 9.4a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" t={27} l={1.6} />
        <div style={{ marginLeft: 18, width: 34, height: 34, borderRadius: 17, background: VERDE, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tra d="M12 5.6v12.8M5.6 12h12.8" t={22} cor="#FFFFFF" l={2.2} />
        </div>
      </div>
      <div name="Título" style={{ position: "absolute", left: 16, top: 98, fontSize: 34, lineHeight: "41px", fontWeight: 700, letterSpacing: "-0.02em" }}>Conversas</div>
      <div name="Busca" style={{ position: "absolute", left: 16, top: 148, width: TELA.w - 32, height: 36, borderRadius: 10, background: CINZA, display: "flex", alignItems: "center", gap: 6, padding: "0 8px", boxSizing: "border-box", fontSize: 17, color: "rgba(60,60,67,.6)" }}>
        <Tra d="M10.6 4.4a6.2 6.2 0 1 1 0 12.4 6.2 6.2 0 0 1 0-12.4ZM15.2 15.2l4.6 4.6" t={20} cor="rgba(60,60,67,.6)" l={2} />
        Pesquisar
      </div>
      <div name="Filtros" style={{ position: "absolute", left: 16, top: 196, display: "flex", gap: 8 }}>
        <Chip ativo>Tudo</Chip>
        <Chip>Não lidas {naoLidas}</Chip>
        <Chip>Favoritas</Chip>
        <Chip>Grupos</Chip>
      </div>
      {linhas.map((l, i) => {
        const tocada = l.chat === BARAO && toque > 0 && toque < 1;
        return (
          <div key={l.chat.id} name={`Linha: ${l.chat.nome}`} style={{ position: "absolute", left: 0, top: TOPO + i * ALT, width: TELA.w, height: ALT, background: tocada ? `rgba(0,0,0,${0.08 * Math.sin(Math.PI * toque)})` : undefined }}>
            <div style={{ position: "absolute", left: 16, top: 12 }}><Foto foto={l.chat.foto} t={52} /></div>
            <div style={{ position: "absolute", left: 80, top: 11, right: 16, display: "flex", alignItems: "baseline", gap: 8 }}>
              <div style={{ flex: 1, fontSize: 17, lineHeight: "22px", fontWeight: 600, letterSpacing: "-0.02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.chat.nome}</div>
              <div style={{ fontSize: 14, lineHeight: "22px", color: l.naoLidas ? VERDE : "rgba(0,0,0,.45)", fontWeight: l.naoLidas ? 500 : 400 }}>{l.quando}</div>
            </div>
            <div style={{ position: "absolute", left: 80, top: 34, width: l.naoLidas ? 252 : 290, fontSize: 15, lineHeight: "19px", letterSpacing: "-0.01em", color: "rgba(0,0,0,.5)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {l.u.lado === "d" ? <Ic n={l.u.lida !== undefined && f >= l.u.lida ? "read" : "delivered"} t={17} cor={l.u.lida !== undefined && f >= l.u.lida ? WI.lido : "rgba(0,0,0,.42)"} /> : null}
              {l.previa}
            </div>
            {l.naoLidas ? (
              <div name="Não lidas" style={{ position: "absolute", right: 16, top: 38, minWidth: 21, height: 21, padding: "0 6px", boxSizing: "border-box", borderRadius: 10.5, background: VERDE, color: "#FFFFFF", fontSize: 13, lineHeight: "21px", fontWeight: 600, textAlign: "center" }}>{l.naoLidas}</div>
            ) : null}
            <div style={{ position: "absolute", left: 80, right: 0, bottom: 0, height: 0.5, background: "rgba(0,0,0,.12)" }} />
            {l.chat === BARAO ? <Toque p={toque} x={200} y={38} /> : null}
          </div>
        );
      })}
      <div name="Barra de abas" style={{ position: "absolute", left: 0, top: TELA.h - 83, width: TELA.w, height: 83, background: "rgba(248,248,248,.97)", boxShadow: "0 -.5px 0 rgba(0,0,0,.14)", display: "flex", justifyContent: "space-around", paddingTop: 7, boxSizing: "border-box", fontSize: 10.5, fontWeight: 500 }}>
        {["Atualizações", "Ligações", "Comunidades", "Conversas", "Configurações"].map((n) => (
          <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: n === "Conversas" ? "#000000" : "rgba(0,0,0,.5)" }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: n === "Conversas" ? "rgba(0,0,0,.85)" : "rgba(0,0,0,.18)" }} />
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};
