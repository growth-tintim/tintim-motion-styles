// WhatsApp Web, tema escuro, a 1440 de largura. Medidas, cores, textos e ícones tirados do código público de
// web.whatsapp.com em 22/11/2026 (WAWebMain, WAWebNavigationBar, WAWebCellFrameV2, WAWebHeader, WAWebMessageWrapper,
// WAWebMessageTextBubble, WAWebMessageMeta, WAWebMessageComposer). Conversas, nomes e números são fictícios.
// Nesta versão a tela é movida a dados: as conversas, a ordem da lista, as não lidas e o que está digitado saem de roteiro.ts.
import React from "react";
import { Img, interpolate } from "remotion";
import { IC } from "../icones";
import { SISTEMA, WA } from "../marca";
import { M } from "../midia";
import { CHEGA, CONVERSA, JANELA, PAGINA, trava, W } from "../geometria";
import { abertaEm, chat, Chat, CHATS, conversasNaoLidas, Foto as FotoT, Msg, naoLidas, posicaoNaLista, RASCUNHOS, textoEm } from "../roteiro";

export const Ic = ({ n, t = 24, cor = "currentColor", estilo }: { n: string; t?: number; cor?: string; estilo?: React.CSSProperties }) => (
  <svg width={t} height={t} viewBox={IC[n].vb} style={{ display: "block", flexShrink: 0, color: cor, ...estilo }}>
    <path d={IC[n].p[0].d} fill="currentColor" fillRule={IC[n].p[0].e ? "evenodd" : undefined} clipRule={IC[n].p[0].e ? "evenodd" : undefined} />
    {IC[n].p[1] ? <path d={IC[n].p[1].d} fill="currentColor" fillRule={IC[n].p[1].e ? "evenodd" : undefined} clipRule={IC[n].p[1].e ? "evenodd" : undefined} /> : null}
    {IC[n].p[2] ? <path d={IC[n].p[2].d} fill="currentColor" fillRule={IC[n].p[2].e ? "evenodd" : undefined} clipRule={IC[n].p[2].e ? "evenodd" : undefined} /> : null}
  </svg>
);

// Foto de perfil: o padrão do WhatsApp (círculo #242626 com a pessoa) ou um monograma, como uma marca fictícia.
export const Foto = ({ t, foto }: { t: number; foto: FotoT }) => (
  <div style={{ width: t, height: t, borderRadius: t / 2, flexShrink: 0, background: foto.cor ?? WA.recebida, outline: `1px solid ${WA.linha}`, outlineOffset: -1, display: "flex", alignItems: "center", justifyContent: "center", color: foto.sigla || foto.oculos ? "#FFFFFF" : "rgba(255,255,255,.55)", fontSize: t * 0.38, fontWeight: 600, letterSpacing: "0.01em" }}>
    {foto.oculos ? (
      <svg width={t * 0.62} height={t * 0.62} viewBox="0 0 30 30" fill="none">
        <circle cx={8.5} cy={16} r={5.2} stroke="#FFFFFF" strokeWidth={2} />
        <circle cx={21.5} cy={16} r={5.2} stroke="#FFFFFF" strokeWidth={2} />
        <path d="M13.5 15c.9-1 2.1-1 3 0M3.4 14.6 2 11.4M26.6 14.6 28 11.4" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ) : foto.sigla ? (
      foto.sigla
    ) : (
      <Ic n={foto.grupo ? "group" : "person"} t={t * 0.58} />
    )}
  </div>
);

type Estado = "enviada" | "entregue" | "lida";
const Tiques = ({ estado, t = 18 }: { estado: Estado; t?: number }) => <Ic n={estado === "enviada" ? "check" : estado === "entregue" ? "delivered" : "read"} t={t} cor={estado === "lida" ? WA.lido : WA.cinza} />;
const estadoDe = (m: Msg, f: number): Estado => m.estado ?? (f < m.f + 6 ? "enviada" : m.lida !== undefined && f >= m.lida ? "lida" : "entregue");
const digitando = (c: Chat, f: number) => (c.digitando ?? []).some(([a, b]) => f >= a && f < b);
const visiveis = (c: Chat, f: number) => c.msgs.filter((m) => m.f <= f);

// ───────────── Barra de navegação (64 px) ─────────────
const Trilho = ({ f }: { f: number }) => {
  const n = conversasNaoLidas(f);
  return (
    <div name="Barra de navegação" style={{ position: "absolute", left: 0, top: 0, width: W.trilho, height: PAGINA.h, background: WA.trilho, boxSizing: "border-box", padding: "10px 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", color: WA.cinza }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 4 }}>
        <div name="Conversas" style={{ position: "relative", width: 40, height: 40, borderRadius: 20, background: WA.ativo, display: "flex", alignItems: "center", justifyContent: "center", color: WA.texto }}>
          <Ic n="chatFilled" />
          {n > 0 ? <div name="Não lidas" style={{ position: "absolute", top: -4, right: -6, minWidth: 20, height: 20, boxSizing: "border-box", padding: "0 5px", borderRadius: 10, background: WA.acento, border: `2px solid ${WA.trilho}`, color: "#0A0A0A", fontSize: 11, lineHeight: "16px", fontWeight: 600, textAlign: "center" }}>{n}</div> : null}
        </div>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="status" /></div>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="channels" /></div>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="communities" /></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", rowGap: 4 }}>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="settings" /></div>
        <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Foto t={28} foto={{ sigla: "L", cor: "#1670CB" }} /></div>
      </div>
    </div>
  );
};

// ───────────── Lista de conversas (30% da janela) ─────────────
const DATA: Record<string, string> = { "3 de setembro": "03/09/2026" };
const Celula = ({ c, f, ativo, sobre }: { c: Chat; f: number; ativo: boolean; sobre: boolean }) => {
  const ms = visiveis(c, f);
  const u = ms[ms.length - 1];
  let dia: string | undefined;
  for (const m of ms) if (m.dia) dia = m.dia;
  const hora = dia === "Hoje" ? u.hora : dia ? (DATA[dia] ?? dia) : u.hora;
  const n = naoLidas(c, f);
  const escreve = digitando(c, f);
  const pula = n > 0 ? interpolate(f - Math.max(...ms.filter((m) => m.lado === "e").map((m) => m.f)), [0, 3, 8], [0.4, 1.18, 1], trava) : 1;
  return (
    <div name={c.nome} style={{ position: "absolute", left: 10, right: 10, top: 155 + posicaoNaLista(c.id, f) * 74, height: 72, borderRadius: 12, background: ativo ? WA.ativo : sobre ? "rgba(255,255,255,.05)" : "transparent", display: "flex", alignItems: "center", boxSizing: "border-box", padding: "0 10px 0 10px" }}>
      <div style={{ paddingRight: 14 }}><Foto t={49} foto={c.foto} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontSize: 16, lineHeight: "21px", color: WA.texto, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.nome}</div>
          <div style={{ fontSize: 12, lineHeight: "14px", color: n ? WA.acento : WA.cinza, flexShrink: 0 }}>{hora}</div>
        </div>
        <div style={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 2, minWidth: 0, fontSize: 14, lineHeight: "20px", color: escreve ? WA.acento : WA.cinza, fontWeight: escreve ? 500 : 400, whiteSpace: "nowrap" }}>
            {escreve ? (
              "digitando..."
            ) : (
              <>
                {u.lado === "d" ? <Tiques estado={estadoDe(u, f)} /> : null}
                <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  {u.autor ? `${u.autor}: ` : ""}
                  {u.t.join(" ")}
                </span>
              </>
            )}
          </div>
          {n ? <div style={{ minWidth: 20, height: 20, boxSizing: "border-box", padding: "0 4px", borderRadius: 10, background: WA.acento, color: "#0A0A0A", fontSize: 12, lineHeight: "20px", fontWeight: 600, textAlign: "center", flexShrink: 0, scale: String(pula) }}>{n}</div> : null}
        </div>
      </div>
    </div>
  );
};

const Lista = ({ f, cursor }: { f: number; cursor: { x: number; y: number } | null }) => {
  const aberta = abertaEm(f);
  return (
    <div name="Lista de conversas" style={{ position: "absolute", left: W.trilho, top: 0, width: W.lista, height: PAGINA.h, background: WA.fundo, overflow: "hidden" }}>
      <div name="Conversas" style={{ position: "absolute", inset: 0 }}>
        {CHATS.map((c) => {
          const topo = JANELA.topo + 155 + posicaoNaLista(c.id, f) * 74;
          const sobre = !!cursor && cursor.x > W.trilho + 10 && cursor.x < W.trilho + W.lista - 10 && cursor.y >= topo && cursor.y < topo + 72;
          return <Celula key={c.id} c={c} f={f} ativo={c.id === aberta} sobre={sobre} />;
        })}
      </div>
      <div name="Topo da lista" style={{ position: "absolute", left: 0, top: 0, right: 0, height: 155, background: WA.fundo }}>
        <div name="Cabeçalho da lista" style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px 0 20px", boxSizing: "border-box", color: WA.texto }}>
          <svg name="WhatsApp" width={104} height={28} viewBox={IC.wordmark.vb} style={{ display: "block" }}><path d={IC.wordmark.p[0].d} fill="#FFFFFF" /></svg>
          <div style={{ display: "flex", gap: 8, marginRight: -8 }}>
            <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="newChat" /></div>
            <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="moreVert" /></div>
          </div>
        </div>
        <div name="Busca" style={{ margin: "2px 20px 0", height: 40, borderRadius: 20, background: WA.recebida, display: "flex", alignItems: "center", padding: "0 12px", gap: 12, color: WA.cinza, fontSize: 15, lineHeight: "20px", boxSizing: "border-box" }}>
          <Ic n="search" t={20} />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Pesquisar ou começar uma nova conversa</span>
        </div>
        <div name="Filtros" style={{ padding: "12px 10px 9px 20px", display: "flex", gap: 8, fontSize: 14, lineHeight: "20px" }}>
          <div style={{ height: 32, boxSizing: "border-box", padding: "5px 12px", borderRadius: 16, background: WA.pilulaAtiva, color: WA.pilulaAtivaTexto, border: "1px solid transparent" }}>Tudo</div>
          <div style={{ height: 32, boxSizing: "border-box", padding: "5px 12px", borderRadius: 16, color: WA.cinza, border: `1px solid ${WA.linha}` }}>Não lidas</div>
          <div style={{ height: 32, boxSizing: "border-box", padding: "5px 12px", borderRadius: 16, color: WA.cinza, border: `1px solid ${WA.linha}` }}>Favoritas</div>
          <div style={{ height: 32, boxSizing: "border-box", padding: "5px 12px", borderRadius: 16, color: WA.cinza, border: `1px solid ${WA.linha}` }}>Grupos</div>
        </div>
      </div>
    </div>
  );
};

// ───────────── Mensagens ─────────────
const Balao = ({ lado, cauda, hora, estado, autor, children }: { lado: "e" | "d"; cauda: boolean; hora: string; estado?: Estado; autor?: string; children: React.ReactNode }) => {
  const cor = lado === "e" ? WA.recebida : WA.enviada;
  return (
    <div style={{ position: "relative", alignSelf: lado === "e" ? "flex-start" : "flex-end", maxWidth: "65%", background: cor, borderRadius: 7.5, borderTopLeftRadius: lado === "e" && cauda ? 0 : 7.5, borderTopRightRadius: lado === "d" && cauda ? 0 : 7.5, boxShadow: "0 1px .5px rgba(11,20,26,.13)", boxSizing: "border-box", padding: "6px 7px 8px 9px", fontSize: 14.2, lineHeight: "19px", color: WA.texto }}>
      {cauda ? (
        <svg width={8} height={13} viewBox="0 0 8 13" style={{ position: "absolute", top: 0, left: lado === "e" ? -8 : undefined, right: lado === "d" ? -8 : undefined, display: "block", color: cor }}>
          <path fill="currentColor" d={lado === "e" ? "M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z" : "M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"} />
        </svg>
      ) : null}
      {autor ? <div style={{ fontSize: 12.8, lineHeight: "22px", fontWeight: 500, color: "#53BDEB", marginTop: -3 }}>{autor}</div> : null}
      {children}
      <span style={{ display: "inline-block", width: estado ? 58 : 36, height: 1 }} />
      <div style={{ position: "absolute", right: 7, bottom: 3, height: 15, display: "flex", alignItems: "center", gap: 3, fontSize: 11, lineHeight: "15px", color: WA.cinza, whiteSpace: "nowrap" }}>
        {hora}
        {estado ? <Tiques estado={estado} t={17} /> : null}
      </div>
    </div>
  );
};
const Dia = ({ children }: { children: string }) => (
  <div style={{ display: "flex", justifyContent: "center", flexShrink: 0, paddingBottom: 12 }}>
    <div style={{ padding: "4px 12px", borderRadius: 6, background: WA.sistema, boxShadow: "0 0 1px 1px rgba(0,0,0,.06), 0 1px 0 0 rgba(0,0,0,.05)", fontSize: 12.5, lineHeight: "21px", color: WA.cinza }}>{children}</div>
  </div>
);

const Conversa = ({ f, foco }: { f: number; foco: boolean }) => {
  const c = chat(abertaEm(f));
  const ms = visiveis(c, f);
  // Caixa de mensagem: o rascunho mais recente desta conversa que ainda não foi enviado
  let texto = "";
  let colado: string[] | null = null;
  let teclou = -99;
  for (const r of RASCUNHOS) {
    if (r.id !== c.id || r.teclas[0].f > f || f >= r.ate) continue;
    texto = textoEm(r.teclas, f);
    colado = r.colado && f >= r.colado.f ? r.colado.t : null;
    teclou = Math.max(...r.teclas.filter((k) => k.f <= f).map((k) => k.f), r.colado && f >= r.colado.f ? r.colado.f : -99);
  }
  const temTexto = texto.length > 0 || !!colado;
  const cursorAceso = foco && (f - teclou < 9 || Math.floor(f / 16) % 2 === 0);
  const enviou = Math.max(-99, ...ms.filter((m) => m.lado === "d" && m.f >= 0).map((m) => m.f));
  const sub = digitando(c, f) ? "digitando..." : c.sub;
  return (
    <div name="Conversa" style={{ position: "absolute", left: CONVERSA.x, top: 0, width: CONVERSA.w, height: PAGINA.h, background: WA.fundo, boxSizing: "border-box", borderLeft: `1px solid ${WA.linha}`, display: "flex", flexDirection: "column", isolation: "isolate" }}>
      {/* Papel de parede padrão do WhatsApp Web no tema escuro: o arquivo real (bg-chat-dark-refreshed) a 6% de opacidade, como no código. O tamanho do ladrilho é estimativa. */}
      <div name="Papel de parede" style={{ position: "absolute", left: 0, top: W.cabecalho, right: 0, bottom: 0, overflow: "hidden", opacity: 0.06, zIndex: -1 }}>
        <Img src={M.doodleEscuro} style={{ position: "absolute", left: 0, top: 0, width: 405, height: 720 }} />
        <Img src={M.doodleEscuro} style={{ position: "absolute", left: 405, top: 0, width: 405, height: 720 }} />
        <Img src={M.doodleEscuro} style={{ position: "absolute", left: 810, top: 0, width: 405, height: 720 }} />
      </div>
      <div name="Cabeçalho da conversa" style={{ height: W.cabecalho, flexShrink: 0, display: "flex", alignItems: "center", padding: "0 16px", boxSizing: "border-box", background: WA.fundo, color: WA.texto }}>
        <div style={{ paddingRight: 15 }}><Foto t={40} foto={c.foto} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 16, lineHeight: "21px", fontWeight: 400 }}>{c.nome}</div>
          <div style={{ fontSize: 13, lineHeight: "20px", color: WA.cinza }}>{sub}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div name="Ligar" style={{ height: 40, padding: "0 10px 0 12px", borderRadius: 20, border: `1px solid ${WA.linha}`, boxSizing: "border-box", display: "flex", alignItems: "center", gap: 4 }}>
            <Ic n="videocam" />
            <Ic n="chevronDown" t={20} cor={WA.cinza} />
          </div>
          <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="search" /></div>
          <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="moreVert" /></div>
        </div>
      </div>

      <div name="Mensagens" style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 8, fontFamily: SISTEMA }}>
        {ms.map((m, i) => {
          // entra crescendo, como a lista do WhatsApp quando chega mensagem nova
          const p = m.f < 0 ? 1 : interpolate(f, [m.f, m.f + 7], [0, 1], CHEGA);
          const antes = ms[i - 1];
          const depois = ms[i + 1];
          const cauda = !antes || antes.lado !== m.lado || !!m.dia || antes.autor !== m.autor;
          const junto = !!depois && depois.lado === m.lado && !depois.dia;
          return (
            <div key={i} style={{ display: "grid", gridTemplateRows: `${p}fr`, opacity: Math.min(1, p * 1.6), flexShrink: 0 }}>
              <div style={{ minHeight: 0, overflow: "hidden" }}>
                {m.dia ? <Dia>{m.dia}</Dia> : null}
                <div style={{ display: "flex", flexDirection: "column", padding: `0 ${W.margem * 100}% ${junto ? 2 : 12}px`, boxSizing: "border-box" }}>
                  <Balao lado={m.lado} cauda={cauda} hora={m.hora} estado={m.lado === "d" ? estadoDe(m, f) : undefined} autor={cauda ? m.autor : undefined}>
                    {m.t.map((l, j) => (
                      <React.Fragment key={j}>
                        {j > 0 ? <br /> : null}
                        {l}
                      </React.Fragment>
                    ))}
                  </Balao>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div name="Caixa de mensagem" style={{ flexShrink: 0, margin: "0 12px 12px", minHeight: 56, background: WA.compositor, borderRadius: 28, boxShadow: "0 1px 6px #0000001f", boxSizing: "border-box", padding: 2, display: "flex", alignItems: "flex-end", color: WA.texto, fontFamily: SISTEMA }}>
        <div style={{ display: "flex", alignItems: "center", height: 52, paddingLeft: 10 }}>
          <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="add" /></div>
          <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic n="sticker" /></div>
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: "16px 8px", fontSize: 15, lineHeight: "20px", minHeight: 20, boxSizing: "content-box" }}>
          {temTexto ? (
            <span>
              {texto}
              {colado
                ? colado.map((l, j) => (
                    <React.Fragment key={j}>
                      <br />
                      {l}
                    </React.Fragment>
                  ))
                : null}
              <span style={{ display: "inline-block", width: 1.5, height: 19, marginLeft: 0.5, verticalAlign: "-4px", background: WA.acento, opacity: cursorAceso ? 1 : 0 }} />
            </span>
          ) : (
            <span style={{ position: "relative", color: WA.cinza }}>
              <span style={{ position: "absolute", left: -1, top: 0, width: 1.5, height: 19, background: WA.acento, opacity: cursorAceso ? 1 : 0 }} />
              Digite uma mensagem
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", height: 52, paddingRight: 6 }}>
          {temTexto ? (
            <div name="Enviar" style={{ width: 40, height: 40, borderRadius: 20, background: WA.acento, display: "flex", alignItems: "center", justifyContent: "center", color: "#0A1014" }}>
              <Ic n="send" />
            </div>
          ) : (
            <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", scale: String(1 - 0.1 * interpolate(f - enviou, [0, 2, 5], [1, 1, 0], trava)) }}><Ic n="mic" /></div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WhatsAppWeb = ({ f, cursor, foco }: { f: number; cursor: { x: number; y: number } | null; foco: boolean }) => (
  <div name="WhatsApp Web" style={{ position: "absolute", inset: 0, background: WA.fundo, fontFamily: SISTEMA, overflow: "hidden", textRendering: "optimizeLegibility" }}>
    <Trilho f={f} />
    <Lista f={f} cursor={cursor} />
    <Conversa f={f} foco={foco} />
  </div>
);
