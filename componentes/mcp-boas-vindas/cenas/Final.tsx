// Cena 7. Página do Tintim reconstruída de tintim-locals (templates, app.css e comece-por-aqui.md), com a conta fictícia Ótica Central.
// Janela do Claude e tela de autorização copiadas dos prints do guia do próprio Tintim. Logo: arquivo oficial, com o olho do mascote animado.
import React, { useEffect, useState } from "react";
import { Easing, Img, interpolate, useCurrentFrame, useDelayRender } from "remotion";
import { loadFont as carregaInter } from "@remotion/google-fonts/Inter";
import { FAIXA } from "../faixa";
import { LogoPiscando } from "../componentes/LogoPiscando";
import { M } from "../marca";
import { T } from "../gatilhos";
import { CL, Cursor, SANS } from "./Partes23";

const { fontFamily: INTER, waitUntilDone: esperaInter } = carregaInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] });
const trava = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const SUAVE = { easing: Easing.bezier(0.45, 0, 0.15, 1), ...trava };

// Tokens de frontend/src/app.css
const TT = { fundo: "#f5f8fa", texto: "#181c32", primaria: "#009ef7", barra: "#1e1e2d", barraTexto: "#9d9da6", icone: "#c5c5d8", avatar: "#9E6FFF" };
const JAN = { x: 80, y: 45, w: 1760, h: 990, r: 45 };
const ESCALA_PAG = 1.75; // 14 px da interface viram 24,5 px
const LIMA = "#E8F04F";

// Ícones de traço simples, no lugar da fonte bootstrap-icons
const Icone = ({ d, cor = TT.icone }: { d: string; cor?: string }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const I = {
  painel: "M2 2.5h5v4H2zM9 2.5h5v7H9zM2 8.5h5v5H2zM9 11.5h5v2H9z",
  estrelas: "M6 2.5 7.2 6l3.3 1.2-3.3 1.2L6 12 4.8 8.4 1.5 7.2 4.8 6zM12 2l.6 1.7 1.7.6-1.7.6L12 6.6l-.6-1.7-1.7-.6 1.7-.6z",
  pessoa: "M8 7.5a2.8 2.8 0 1 0 0-5.6 2.8 2.8 0 0 0 0 5.6ZM2.5 14c.4-3 2.6-4.5 5.5-4.5s5.1 1.5 5.5 4.5z",
  link: "M6.5 9.5l3-3M7 4.5l1.2-1.2a2.6 2.6 0 0 1 3.7 3.7L10.7 8.2M9 11.5l-1.2 1.2a2.6 2.6 0 0 1-3.7-3.7L5.3 7.8",
  megafone: "M2 6.5v3h2.5L12 13V3L4.5 6.5zM5 9.5l1 3.5h1.5l-.7-2.7",
  mensagem: "M2.5 3h11v8H6l-3.5 2.5zM5 6h6M5 8.5h4",
  lupa: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM10.7 10.7 14 14",
  bandeira: "M3.5 14V2.5M3.5 3h9l-2 3 2 3h-9",
  bussola: "M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM10.5 5.5l-1.4 3.6-3.6 1.4 1.4-3.6z",
  balao: "M2.5 3h11v8H6l-3.5 2.5zM5.5 6.2v1.6M8 6.2v1.6",
  lista: "M2.5 4h2M2.5 8h2M2.5 12h2M6.5 4h7M6.5 8h7M6.5 12h7",
  tomada: "M6 2v3M10 2v3M4 5h8v3a4 4 0 0 1-8 0zM8 12v2.5",
  livro: "M8 3.5C6.5 2.5 4.5 2.5 2.5 3v10c2-.5 4-.5 5.5.5 1.5-1 3.5-1 5.5-.5V3c-2-.5-4-.5-5.5.5ZM8 3.5v10",
};

const ItemMenu = ({ icone, rotulo, ativo = false, realce = 0 }: { icone: string; rotulo: string; ativo?: boolean; realce?: number }) => (
  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, height: 34, padding: "0 12px", borderRadius: 8, fontSize: 14, color: ativo ? TT.primaria : TT.barraTexto, background: ativo ? "#2a2a3c" : undefined }}>
    {realce > 0 ? <div style={{ position: "absolute", inset: 0, borderRadius: 8, background: LIMA, opacity: realce }} /> : null}
    <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, color: realce > 0.5 ? TT.texto : undefined }}>
      <Icone d={icone} cor={realce > 0.5 ? TT.texto : ativo ? TT.primaria : TT.icone} />
      {rotulo}
    </span>
  </div>
);

const Barra = ({ logo }: { logo?: boolean }) => (
  <div style={{ height: 60, display: "flex", alignItems: "center", padding: "0 18px", borderBottom: "1px dashed rgba(255,255,255,.12)" }}>
    {logo ? <Img src={M.logoBranco} style={{ height: 36, width: "auto" }} /> : null}
  </div>
);

const Cabecalho = ({ titulo, trilha }: { titulo: string; trilha: React.ReactNode }) => (
  <div style={{ position: "relative", height: 70, background: "#fff", boxShadow: "0 1px 3px rgba(24,28,50,.08)", padding: "13px 24px" }}>
    <div style={{ fontSize: 20, lineHeight: "26px", fontWeight: 600 }}>{titulo}</div>
    <div style={{ fontSize: 14, lineHeight: "18px", fontWeight: 500, color: "rgba(24,28,50,.6)" }}>{trilha}</div>
    <div style={{ position: "absolute", right: 22, top: 22, display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500 }}>
      <div style={{ width: 24, height: 24, borderRadius: 12, background: TT.avatar, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>ÓC</div>
      Ótica Central
    </div>
  </div>
);

// Menu principal, com a ordem real de public/layout/_sidebar.html. O miolo é neutro: só o cartão de convite é real.
const Dashboard = ({ realce }: { realce: number }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex" }}>
    <div style={{ width: 265, background: TT.barra, flexShrink: 0, overflow: "hidden" }}>
      <Barra logo />
      <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
        <ItemMenu icone={I.painel} rotulo="Dashboard" ativo />
        <ItemMenu icone={I.estrelas} rotulo="Assistente de IA" realce={realce} />
        <ItemMenu icone={I.pessoa} rotulo="Conversas" />
        <ItemMenu icone={I.link} rotulo="Links Rastreáveis" />
        <ItemMenu icone={I.megafone} rotulo="Campanhas de Mensagem" />
        <ItemMenu icone={I.mensagem} rotulo="Mensagens Rastreáveis" />
        <ItemMenu icone={I.lupa} rotulo="Inspetor de Campanhas" />
        <ItemMenu icone={I.lista} rotulo="Jornada de Compra" />
      </div>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <Cabecalho titulo="Dashboard" trilha="Início" />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, background: "#fff", borderRadius: 10, padding: "20px 22px", boxShadow: "0 1px 2px rgba(24,28,50,.06)" }}>
          <Icone d={I.estrelas} cor={TT.primaria} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, lineHeight: "24px", fontWeight: 700 }}>Use o Tintim com o seu assistente de IA</div>
            <div style={{ fontSize: 14, lineHeight: "20px", color: "rgba(24,28,50,.7)" }}>Conecte o Claude, o ChatGPT ou o Cursor e pergunte o que quiser sobre as suas contas.</div>
          </div>
          <div style={{ height: 40, padding: "0 16px", borderRadius: 8, background: "rgba(0,158,247,.12)", color: TT.primaria, fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center" }}>Conectar</div>
        </div>
        <div style={{ marginTop: 18, display: "flex", gap: 18 }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ flex: 1, height: 150, background: "#fff", borderRadius: 10, boxShadow: "0 1px 2px rgba(24,28,50,.06)" }} />)}
        </div>
        <div style={{ marginTop: 18, height: 130, background: "#fff", borderRadius: 10, boxShadow: "0 1px 2px rgba(24,28,50,.06)" }} />
      </div>
    </div>
  </div>
);

export const BOTAO_PAG = { x: 289, y: 376, w: 226, h: 40 };

// assistant/pages/comece-por-aqui.md, aba Claude Desktop e claude.ai
const ComecePorAqui = ({ anel, aperta }: { anel: number; aperta: number }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex" }}>
    <div style={{ width: 265, background: TT.barra, flexShrink: 0, overflow: "hidden" }}>
      <Barra logo />
      <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 3 }}>
        <ItemMenu icone={I.bandeira} rotulo="Comece por aqui" ativo />
        <ItemMenu icone={I.bussola} rotulo="Como funciona" />
        <ItemMenu icone={I.balao} rotulo="O que pedir" />
        <ItemMenu icone={I.lista} rotulo="Referência" />
        <div style={{ padding: "16px 12px 4px", fontSize: 14, color: TT.barraTexto }}>Sua conta</div>
        <ItemMenu icone={I.tomada} rotulo="Aplicativos conectados" />
        <div style={{ padding: "16px 12px 4px", fontSize: 14, color: TT.barraTexto }}>Para desenvolvedores</div>
        <ItemMenu icone={I.livro} rotulo="Documentação da API" />
      </div>
    </div>
    <div style={{ position: "relative", flex: 1, minWidth: 0 }}>
      <Cabecalho titulo="Assistente de IA" trilha={<>Início <span style={{ opacity: 0.5 }}>›</span> Assistente de IA <span style={{ opacity: 0.5 }}>›</span> Comece por aqui</>} />
      <div style={{ padding: "18px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ fontSize: 18, lineHeight: "26px", fontWeight: 600 }}>Comece por aqui</div>
            <div style={{ fontSize: 14, lineHeight: "20px", color: "rgba(24,28,50,.7)" }}>Conecte o seu assistente de IA ao Tintim e confirme que ele já enxerga as suas contas.</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontSize: 14, lineHeight: "22px" }}>Conectado ao Tintim, o seu assistente de IA passa a responder sobre as suas contas: quantas conversas entraram, o que mudou desde a última reunião, quais vendas estão esperando decisão.</div>
        <div style={{ marginTop: 14, display: "flex", gap: 2, fontSize: 14, borderBottom: "1px solid rgba(24,28,50,.12)" }}>
          {["Claude Code", "Claude Desktop e claude.ai", "ChatGPT", "Cursor", "VS Code", "Outro cliente"].map((a, i) => (
            <div key={a} style={{ padding: "9px 12px", whiteSpace: "nowrap", fontWeight: i === 1 ? 600 : 400, color: i === 1 ? TT.texto : "rgba(24,28,50,.6)", boxShadow: i === 1 ? `inset 0 -2px 0 ${TT.texto}` : undefined }}>{a}</div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: "22px" }}>Vale para o claude.ai, no navegador, e para o aplicativo Claude Desktop. Qualquer plano serve, inclusive o gratuito, que aceita um conector personalizado. Faça no computador.</div>
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: "22px", fontWeight: 700 }}>1. Abra o Claude com o Tintim já preenchido.</div>
      </div>
      <div name="Botão" style={{ position: "absolute", left: BOTAO_PAG.x - 265, top: BOTAO_PAG.y, width: BOTAO_PAG.w, height: BOTAO_PAG.h, borderRadius: 8, background: TT.primaria, color: "#fff", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", scale: 1 - 0.03 * aperta, outline: anel > 0 ? `2.5px solid rgba(232,240,79,${anel})` : undefined, outlineOffset: 3 }}>
        Adicionar o Tintim ao Claude
      </div>
    </div>
  </div>
);

// Janela do print claude-adicionar-conector.png, em unidades do print. Sem a faixa, os campos sobem e a janela encurta.
const M_E = 1.65;
const M_L = 535;
const M_F = FAIXA ? 203 : 110;
const M_H = M_F + 358;
export const MODAL = { w: M_L * M_E, h: M_H * M_E, x: (JAN.w - M_L * M_E) / 2, y: (JAN.h - M_H * M_E) / 2 };
const MarcaCampo = ({ d }: { d: number }) => (d > 0 ? <div style={{ position: "absolute", inset: -3, borderRadius: 11, background: `rgba(232,240,79,${0.55 * d})`, mixBlendMode: "multiply" }} /> : null);
const LinkAzul = ({ children }: { children: React.ReactNode }) => <span style={{ color: "#1F5FA8", textDecoration: "underline", textUnderlineOffset: 3 }}>{children}</span>;

const JanelaConector = ({ campo1, campo2, aperta }: { campo1: number; campo2: number; aperta: number }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: M_L, height: M_H, transform: `scale(${M_E})`, transformOrigin: "0 0", fontFamily: SANS, color: CL.texto }}>
    <div style={{ position: "absolute", left: 24, top: 20, fontSize: 22, lineHeight: "30px", fontWeight: 500 }}>Adicionar conector personalizado</div>
    <div style={{ position: "absolute", right: 16, top: 16, width: 34, height: 34, borderRadius: 9, boxShadow: "inset 0 0 0 1.5px #2F7DE1", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={13} height={13} viewBox="0 0 13 13"><path d="M2 2l9 9M11 2l-9 9" stroke={CL.texto} strokeWidth={1.3} strokeLinecap="round" /></svg>
    </div>
    <div style={{ position: "absolute", left: 24, right: 24, top: 58, fontSize: 15, lineHeight: "22px" }}>
      Conecte Claude aos seus dados e ferramentas. <LinkAzul>Saiba mais sobre conectores</LinkAzul> ou comece com <LinkAzul>conectores pré-construídos</LinkAzul>.
    </div>
    {FAIXA ? (
      <div name="Faixa de aviso" style={{ position: "absolute", left: 24, right: 24, top: 110, height: 72, borderRadius: 10, background: "#FBD0D0", boxShadow: "inset 0 0 0 1px #EFA3A3", color: "#7F1D1D", fontSize: 15, lineHeight: "21px", display: "flex", gap: 12, padding: "5px 16px 0 18px", boxSizing: "border-box" }}>
        <svg width={18} height={18} viewBox="0 0 18 18" style={{ flexShrink: 0, marginTop: 8 }} fill="none"><path d="M9 2.5 16.5 15.5h-15zM9 7.5v4M9 13.6v.1" stroke="#7F1D1D" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div>Este conector foi sugerido por um link externo. Verifique se o nome e a URL são de um desenvolvedor confiável antes de adicionar.</div>
      </div>
    ) : null}
    <div style={{ position: "absolute", left: 24, right: 24, top: M_F, height: 32, borderRadius: 9, background: "#fff", boxShadow: `inset 0 0 0 1px ${CL.borda}`, padding: "0 12px", fontSize: 16.5, lineHeight: "32px" }}>Tintim<MarcaCampo d={campo1} /></div>
    <div style={{ position: "absolute", left: 24, top: M_F + 38, fontSize: 14, lineHeight: "20px", color: CL.cinza }}>Exibido na lista de conectores.</div>
    <div style={{ position: "absolute", left: 24, right: 24, top: M_F + 74, height: 32, borderRadius: 9, background: "#fff", boxShadow: `inset 0 0 0 1px ${CL.borda}`, padding: "0 12px", fontSize: 16.5, lineHeight: "32px" }}>https://s.tintim.app/mcp<MarcaCampo d={campo2} /></div>
    <div style={{ position: "absolute", left: 24, top: M_F + 112, fontSize: 14, lineHeight: "20px", color: CL.cinza }}>Conecta-se a s.tintim.app</div>
    <div style={{ position: "absolute", left: 24, right: 24, top: M_F + 156, fontSize: 14.5, lineHeight: "20.5px", color: CL.cinza }}>Use apenas conectores de desenvolvedores em quem você confia. A Anthropic não controla quais ferramentas os desenvolvedores disponibilizam e não pode garantir que funcionarão conforme o esperado ou que não serão alteradas.</div>
    <div style={{ position: "absolute", left: 24, right: 24, top: M_F + 248, fontSize: 14.5, lineHeight: "20.5px", color: CL.cinza }}>Desenvolvendo um servidor MCP? <LinkAzul>Relate problemas e inscreva-se para receber atualizações aqui</LinkAzul></div>
    <div style={{ position: "absolute", right: 24, bottom: 23, display: "flex", gap: 8, fontSize: 15, fontWeight: 500 }}>
      <div style={{ width: 83, height: 32, borderRadius: 9, boxShadow: `inset 0 0 0 1px ${CL.borda}`, display: "flex", alignItems: "center", justifyContent: "center" }}>Cancelar</div>
      <div style={{ width: 91, height: 32, borderRadius: 9, background: CL.texto, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", scale: 1 - 0.03 * aperta }}>Continuar</div>
    </div>
  </div>
);

// Tela do print consent-hosted-claude.png, em unidades do print dividido por 2, com 20 px a menos no topo para caber
const A_E = 1.68;
const A_L = 600;
const A_H = 570;
export const AUT = { w: A_L * A_E, h: A_H * A_E, x: (JAN.w - A_L * A_E) / 2, y: (JAN.h - A_H * A_E) / 2 };
const TelaAutorizar = ({ aperta }: { aperta: number }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: A_L, height: A_H, transform: `scale(${A_E})`, transformOrigin: "0 0", fontFamily: INTER, color: TT.texto, textAlign: "center" }}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 28, display: "flex", justifyContent: "center" }}><Img src={M.logoAzul} style={{ height: 44, width: "auto" }} /></div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 104, fontSize: 24, lineHeight: "32px", fontWeight: 700 }}>Autorizar acesso</div>
    <div style={{ position: "absolute", left: 0, right: 0, top: 142, fontSize: 14.5, lineHeight: "22px", color: "rgba(24,28,50,.5)" }}><b style={{ color: TT.texto, fontWeight: 600 }}>Claude</b> está solicitando acesso à sua conta Tintim.</div>
    <div style={{ position: "absolute", left: 49, right: 49, top: 180, height: 48, borderRadius: 8, background: "#FFF7DC", border: "1px dashed #F6C000", boxSizing: "border-box", display: "flex", alignItems: "center", gap: 12, padding: "0 14px", fontSize: 14.5, textAlign: "left" }}>
      <svg width={20} height={22} viewBox="0 0 20 22" fill="none"><path d="M10 1.5 18 4v7c0 5-3.5 8-8 9.5C5.500 19 2 16 2 11V4zM10 6.500v6M10 15.500v.1" stroke="#F6B800" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" /></svg>
      <span>Aplicativo hospedado em <b style={{ fontWeight: 600 }}>claude.ai</b></span>
    </div>
    <div style={{ position: "absolute", left: 49, right: 49, top: 254, height: 134, borderRadius: 8, background: "#F1F8FF", border: "1px dashed #009EF7", boxSizing: "border-box", padding: "16px 20px", fontSize: 14.5, lineHeight: "24px", textAlign: "left" }}>
      <div style={{ fontWeight: 600 }}>Ao autorizar, este aplicativo poderá:</div>
      <div style={{ marginTop: 6, color: "rgba(24,28,50,.75)" }}>•&nbsp; Acessar e operar suas contas Tintim em seu nome via MCP</div>
      <div style={{ color: "rgba(24,28,50,.75)" }}>•&nbsp; Agir com as suas permissões do Tintim em todas as contas às quais você tem acesso.</div>
    </div>
    <div style={{ position: "absolute", left: 49, right: 49, top: 410, fontSize: 14, lineHeight: "20px", textAlign: "left", color: "rgba(24,28,50,.5)" }}>Você será redirecionado para <b style={{ color: TT.texto, fontWeight: 600 }}>https://claude.ai/api/mcp/auth_callback</b>. Autorize apenas se você reconhece este aplicativo.</div>
    <div style={{ position: "absolute", left: 49, top: 478, width: 242, height: 45, borderRadius: 8, background: "#F5F8FA", color: "rgba(24,28,50,.6)", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>Recusar</div>
    <div style={{ position: "absolute", left: 301, top: 478, width: 250, height: 45, borderRadius: 8, background: TT.primaria, color: "#fff", fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", scale: 1 - 0.03 * aperta }}>Autorizar</div>
  </div>
);

const CAIXA = { w: 1368, h: 176, x: (JAN.w - 1368) / 2, y: (JAN.h - 176) / 2, r: 36 };
const CaixaVazia = ({ frame }: { frame: number }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: CAIXA.w, height: CAIXA.h, fontFamily: SANS, color: CL.texto }}>
    <div style={{ position: "absolute", left: 36, top: 26, display: "flex", alignItems: "center", fontSize: 36, lineHeight: "48px", color: CL.cinza }}>
      <div style={{ width: 3, height: 42, marginRight: 4, background: CL.texto, opacity: frame % 30 < 16 ? 1 : 0 }} />
      Digite / para ver as habilidades
    </div>
    <svg width={36} height={36} viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: 32, bottom: 20 }}><path d="M12 4.500v15M4.500 12h15" stroke={CL.texto} strokeWidth={1.7} strokeLinecap="round" /></svg>
    <div style={{ position: "absolute", right: 20, bottom: 14, display: "flex", alignItems: "center", gap: 16, fontSize: 28, lineHeight: "36px" }}>
      <span>Opus 5.5</span>
      <span style={{ color: CL.cinza }}>Medium</span>
      <svg width={22} height={22} viewBox="0 0 20 20" fill="none"><path d="M4.500 7.500 10 13l5.500-5.500" stroke={CL.cinza} strokeWidth={1.800} strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ width: 54, height: 54, borderRadius: 15, background: "#D97757", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={30} height={30} viewBox="0 0 18 18" fill="none"><path d="M9 14.500V3.800M4.400 8.200 9 3.600l4.600 4.600" stroke="#fff" strokeWidth={1.900} strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    </div>
  </div>
);

export const Final = () => {
  const frame = useCurrentFrame();
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [espera] = useState(() => delayRender("fonte da página do Tintim"));
  useEffect(() => {
    esperaInter().then(() => continueRender(espera)).catch(cancelRender);
  }, []);
  if (frame < T.slideF) return null;

  const dF = interpolate(frame, [T.slideF, T.slideF + 48], [0, 1], SUAVE);
  const dL = interpolate(frame, [T.slideLogo, T.slideLogo + 48], [0, 1], SUAVE);
  const pag = interpolate(frame, [T.pagina, T.pagina + 6], [0, 1], trava);
  const realceMenu = interpolate(frame, [T.assistente, T.assistente + 8, T.pagina, T.pagina + 4], [0, 1, 1, 0], trava);
  const anelBotao = interpolate(frame, [T.adicionar, T.adicionar + 9, T.cliqueBtn + 2, T.cliqueBtn + 10], [0, 1, 1, 0], trava);
  const clique = (q: number) => interpolate(frame, [q - 2, q + 1, q + 6], [0, 1, 0], { easing: Easing.inOut(Easing.quad), ...trava });

  // Depois do clique, abre o Claude; a janela do conector vira a tela de autorização, e ela encolhe até a caixa vazia
  const abre = interpolate(frame, [T.cliqueBtn + 4, T.cliqueBtn + 22], [0, 1], SUAVE);
  const m2 = interpolate(frame, [T.cliqueCont + 4, T.cliqueCont + 24], [0, 1], SUAVE);
  const m3 = interpolate(frame, [T.cliqueAut + 4, T.cliqueAut + 34], [0, 1], SUAVE);
  const mix = (a: number, b: number, c: number) => a + (b - a) * m2 + (c - b) * m3;
  const cartao = { x: mix(MODAL.x, AUT.x, CAIXA.x), y: mix(MODAL.y, AUT.y, CAIXA.y), w: mix(MODAL.w, AUT.w, CAIXA.w), h: mix(MODAL.h, AUT.h, CAIXA.h) };
  const raio = mix(32, 26, CAIXA.r);
  const campo1 = interpolate(frame, [T.cliqueBtn + 24, T.cliqueBtn + 31, T.cliqueBtn + 40, T.cliqueBtn + 46], [0, 1, 1, 0], trava);
  const campo2 = interpolate(frame, [T.cliqueBtn + 40, T.cliqueBtn + 47, T.cliqueCont, T.cliqueCont + 4], [0, 1, 1, 0], trava);

  // Um único cursor faz os três cliques, sempre em aproximação lenta e contínua
  const pontos = [
    { x: 1180, y: 900 },
    { x: BOTAO_PAG.x * ESCALA_PAG + (BOTAO_PAG.w / 2) * ESCALA_PAG, y: (BOTAO_PAG.y + BOTAO_PAG.h / 2) * ESCALA_PAG },
    { x: MODAL.x + (M_L - 24 - 45) * M_E, y: MODAL.y + (M_H - 39) * M_E },
    { x: AUT.x + 426 * A_E, y: AUT.y + 500 * A_E },
  ];
  const trecho = frame < T.cliqueBtn + 4 ? 0 : frame < T.cliqueCont + 4 ? 1 : 2;
  const inicioTrecho = [T.pagina + 4, T.cliqueBtn + 22, T.cliqueCont + 10][trecho];
  const fimTrecho = [T.cliqueBtn, T.cliqueCont, T.cliqueAut][trecho];
  const anda = interpolate(frame, [inicioTrecho, fimTrecho], [0, 1], SUAVE);
  const cx = pontos[trecho].x + (pontos[trecho + 1].x - pontos[trecho].x) * anda;
  const cy = pontos[trecho].y + (pontos[trecho + 1].y - pontos[trecho].y) * anda;
  const opCursor = interpolate(frame, [T.pagina + 4, T.pagina + 10, T.cliqueAut + 6, T.cliqueAut + 16], [0, 1, 1, 0], trava);
  const aperto = Math.max(clique(T.cliqueBtn), clique(T.cliqueCont), clique(T.cliqueAut));

  // Piscadela: fecha em 3 quadros, segura 2 e abre em 4
  const olho = interpolate(frame, [T.piscada, T.piscada + 3, T.piscada + 5, T.piscada + 9], [1, 0.16, 0.16, 1], { easing: Easing.inOut(Easing.quad), ...trava });

  return (
    <div name="Cena 7" style={{ position: "absolute", inset: 0 }}>
      {dL < 1 ? (
        <div name="Janela final" style={{ position: "absolute", left: JAN.x, top: JAN.y, width: JAN.w, height: JAN.h, borderRadius: JAN.r, overflow: "hidden", background: TT.fundo, boxShadow: "0 1px 1px rgba(5,12,30,.25), 0 15px 30px -9px rgba(5,12,30,.35), 0 51px 105px -27px rgba(5,12,30,.6)", translate: `${1920 * (1 - dF) - 1920 * dL}px 0px`, fontFamily: INTER, color: TT.texto, wordSpacing: 0 }}>
          {abre < 1 ? (
            <div style={{ position: "absolute", left: 0, top: 0, width: JAN.w / ESCALA_PAG, height: JAN.h / ESCALA_PAG, transform: `scale(${ESCALA_PAG})`, transformOrigin: "0 0" }}>
              {pag < 1 ? <Dashboard realce={realceMenu} /> : null}
              {pag > 0 ? <div style={{ position: "absolute", inset: 0, opacity: pag, background: TT.fundo }}><ComecePorAqui anel={anelBotao} aperta={clique(T.cliqueBtn)} /></div> : null}
            </div>
          ) : null}
          {abre > 0 ? (
            <div name="Claude" style={{ position: "absolute", inset: 0 }}>
              <div name="Fundo do Claude" style={{ position: "absolute", inset: 0, background: `rgb(${250 - 5 * m2 * (1 - m3)},${249 - m2 * (1 - m3)},${245 + 5 * m2 * (1 - m3)})`, opacity: abre }} />
              <div name="Cartão" style={{ position: "absolute", left: cartao.x, top: cartao.y + (1 - abre) * JAN.h, width: cartao.w, height: cartao.h, borderRadius: raio, background: "#fff", overflow: "hidden", boxShadow: `0 0 0 1.5px ${CL.borda}, 0 10px 40px rgba(20,20,19,.1)` }}>
                {m2 < 0.5 ? <div style={{ position: "absolute", inset: 0, opacity: 1 - m2 * 2 }}><JanelaConector campo1={campo1} campo2={campo2} aperta={clique(T.cliqueCont)} /></div> : null}
                {m2 > 0.5 && m3 < 0.5 ? <div style={{ position: "absolute", inset: 0, opacity: (m2 - 0.5) * 2 * (1 - m3 * 2) }}><TelaAutorizar aperta={clique(T.cliqueAut)} /></div> : null}
                {m3 > 0.88 ? <div style={{ position: "absolute", inset: 0, opacity: (m3 - 0.88) / 0.12 }}><CaixaVazia frame={frame} /></div> : null}
              </div>
            </div>
          ) : null}
          {opCursor > 0 ? <Cursor x={cx} y={cy} opacidade={opCursor} aperta={aperto} /> : null}
        </div>
      ) : null}
      {dL > 0 ? (
        <div name="Fechamento" style={{ position: "absolute", left: (1920 - 1040) / 2, top: (1080 - (1040 * 60) / 186) / 2, translate: `${1920 * (1 - dL)}px 0px` }}>
          <LogoPiscando largura={1040} s={olho} />
        </div>
      ) : null}
    </div>
  );
};
