// Claude no navegador, tema claro. O site do Claude não deixa robô entrar, então as medidas vêm de duas imagens
// oficiais da Anthropic (claude.com/blog/interactive-tools-in-claude e o filme do mesmo anúncio): trilho de 52 px,
// coluna de 730 px, balão do usuário, linha de ferramenta "ícone · conector · ferramenta" e o símbolo abaixo da resposta.
// A tela de conversa nova (saudação e caixa no meio) é desenho por estimativa. Fontes substitutas: as do Claude são proprietárias.
// Os nomes das ferramentas do Tintim são os da documentação do MCP. Os números das respostas são fictícios.
import React, { useEffect, useState } from "react";
import { Img, interpolate, useDelayRender } from "remotion";
import { loadFont as carregaSans } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as carregaSerifa } from "@remotion/google-fonts/SourceSerif4";
import { CL as COR } from "../marca";
import { M } from "../midia";
import { CHEGA, PAGINA, SUAVE, surge, trava } from "../geometria";
import { CL, CL_X0, cursorEm, Item, T, textoEm, TRECHO, Turno, TURNOS } from "../roteiro";
import { MarcaClaude } from "./MarcaClaude";

const { fontFamily: SANS, waitUntilDone: esperaSans } = carregaSans("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
const { fontFamily: SERIFA, waitUntilDone: esperaSerifa } = carregaSerifa("normal", { weights: ["400", "600"], subsets: ["latin", "latin-ext"] });

const Tra = ({ d, t = 18, cor = COR.texto, l = 1.25 }: { d: string; t?: number; cor?: string; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const B = ({ children }: { children: React.ReactNode }) => <b style={{ fontWeight: 600 }}>{children}</b>;
// Marca-texto lima por cima da tela, como caneta sobre papel: não faz parte do desenho do Claude.
const Realce = ({ d, children }: { d: number; children: React.ReactNode }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    {d > 0 ? <span style={{ position: "absolute", left: -4, right: -4, top: 2, bottom: 2, borderRadius: 4, background: "rgba(232,240,79,.62)", clipPath: `inset(0 ${(1 - d) * 100}% 0 0)`, mixBlendMode: "multiply" }} /> : null}
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);
// Seleção de texto: cresce até onde o cursor está.
const Selecao = ({ ate, children }: { ate: number; children: React.ReactNode }) => (
  <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
    {ate > 0 ? <span style={{ position: "absolute", left: 0, top: 1, bottom: 1, width: ate, maxWidth: "100%", background: "rgba(56,132,246,.28)" }} /> : null}
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);

const Emblema = ({ t }: { t: number }) => (
  <div name="Emblema do Tintim" style={{ width: t, height: t, borderRadius: t * 0.24, overflow: "hidden", flexShrink: 0, position: "relative", background: "#FFFFFF", boxShadow: "0 0 0 .5px rgba(31,30,29,.15)" }}>
    <Img src={M.logoAzul} style={{ position: "absolute", left: t * 0.04, top: t * 0.04, height: t * 0.92, width: "auto", maxWidth: "none" }} />
  </div>
);

const Ferramenta = ({ nome, op, ativa }: { nome: string; op: number; ativa: boolean }) => (
  <div name={`Ferramenta ${nome}`} style={{ position: "absolute", left: 12, right: 14, top: 0, height: 36, display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 15, lineHeight: "20px", opacity: op }}>
    <Emblema t={20} />
    <span style={{ color: COR.texto }}>Tintim</span>
    <span style={{ color: COR.cinza, marginLeft: 2, opacity: ativa ? 0.72 : 1 }}>{nome}</span>
    <span style={{ flex: 1 }} />
    <Tra d="M5.4 5 2.4 8l3 3M10.6 5l3 3-3 3M9.2 3.8 6.8 12.2" t={16} cor={COR.cinza} />
  </div>
);

// Linha de ranking da resposta 2: nome do anúncio à esquerda, vendas e receita à direita.
const Posto = ({ n, tipo, nome, vendas, receita, m = 0 }: { n: number; tipo: string; nome: string; vendas: string; receita: string; m?: number }) => (
  <div style={{ display: "flex", alignItems: "baseline", width: 600, gap: 10 }}>
    <span style={{ color: COR.cinza, width: 18 }}>{n}.</span>
    <span>
      {tipo} <B>“{nome}”</B>
    </span>
    <span style={{ flex: 1, borderBottom: "1px dotted rgba(31,30,29,.25)", translate: "0 -5px" }} />
    <span>
      <Realce d={m}><B>{vendas}</B></Realce> · {receita}
    </span>
  </div>
);

// O texto de cada linha de resposta. "m" é o avanço do marca-texto daquela linha (0 a 1).
const Linha = ({ id, m, sel1, sel2, barra }: { id: string; m: number; sel1: number; sel2: number; barra: number }) => {
  if (id === "a1") return <>Ontem a Ótica Central recebeu <B>38 conversas</B> pelos anúncios e fechou <B>5 vendas</B>.</>;
  if (id === "a2") return <Realce d={m}><B>14 conversas</B> ficaram sem resposta.</Realce>;
  if (id === "a3") return <>Tempo médio até a primeira resposta: <B>3h12</B>.</>;
  if (id === "a4") return <span style={{ display: "inline-block", paddingLeft: 17, boxShadow: `inset 3px 0 0 rgba(222,220,209,${barra})` }}><Selecao ate={sel1}><B>Diego, 9h04:</B> “Qual o valor do multifocal?”</Selecao></span>;
  if (id === "a5") return <span style={{ display: "inline-block", paddingLeft: 17, boxShadow: `inset 3px 0 0 rgba(222,220,209,${barra})` }}><Selecao ate={sel2}>Primeira resposta: <Realce d={m}><B>15h40</B></Realce>.</Selecao></span>;
  if (id === "b1") return <>Em novembro, por vendas confirmadas:</>;
  if (id === "b2") return <Posto n={1} tipo="Vídeo" nome="Clareamento em 1 sessão" vendas="23 vendas" receita="R$ 18.400" m={m} />;
  if (id === "b3") return <Posto n={2} tipo="Carrossel" nome="Aparelho invisível" vendas="4 vendas" receita="R$ 3.100" />;
  if (id === "b4") return <Posto n={3} tipo="Imagem" nome="Avaliação grátis" vendas="1 venda" receita="R$ 450" />;
  if (id === "c1") return <><B>7 conversas</B> pediram preço ontem.</>;
  if (id === "c2") return <Realce d={m}>Movi as 7 para <B>Negociação</B>.</Realce>;
  if (id === "d1") return <>Hoje o anúncio trouxe <B>9 conversas</B>.</>;
  if (id === "d2") return <Realce d={m}><B>3</B> ainda estão sem resposta.</Realce>;
  if (id === "e1") return <>Pausa o carrossel <B>“Aparelho invisível”</B>: <Realce d={m}><B>4 vendas</B></Realce>, contra 23 do vídeo.</>;
  if (id === "f1") return <><Realce d={m}><B>31 conversas</B></Realce> hoje na Imobiliária Porto, pelo anúncio do Jardins.</>;
  return null;
};

const Bloco = ({ t, f, topo, primeiro }: { t: Turno; f: number; topo: number; primeiro: boolean }) => {
  const pergunta = interpolate(f, [t.envia + 2, t.envia + 10], [0, 1], CHEGA);
  const trabalhando = f >= t.envia + 8 && f < t.pronto;
  // Seleção do trecho de prova (só na primeira resposta): segue o cursor enquanto ele arrasta
  const c = cursorEm(Math.min(f, T.selFim));
  const arrastando = primeiro && f >= T.sel && f < T.abaVolta1 + 1;
  const naSegunda = c.y > (TRECHO.y1 + TRECHO.y2) / 2;
  const sel1 = arrastando ? (naSegunda ? 9999 : c.x - TRECHO.x) : 0;
  const sel2 = arrastando && naSegunda ? c.x - TRECHO.x : 0;
  let y = 148;
  let base = 148;
  const itens: React.ReactNode[] = [];
  t.itens.forEach((it: Item, i: number) => {
    const meu = y;
    y += it.h;
    if (f < it.f) return;
    base = y;
    if (it.tipo === "frase") itens.push(<div key={i} style={{ position: "absolute", left: 16, top: meu, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "28px", whiteSpace: "nowrap", opacity: surge(f, it.f) }}>{it.t}</div>);
    else if (it.tipo === "ferramenta") itens.push(<div key={i} style={{ position: "absolute", left: 0, right: 0, top: meu, height: 36 }}><Ferramenta nome={it.nome} op={surge(f, it.f)} ativa={f < it.fim} /></div>);
    else {
      // o marca-texto pousa 8 quadros depois da linha; na primeira resposta ele dá lugar à seleção
      let m = interpolate(f, [it.f + 8, it.f + 18], [0, 1], SUAVE);
      if (it.id === "a2") m -= interpolate(f, [T.sel - 30, T.sel - 22], [0, 1], trava);
      if (it.id === "a5") m -= interpolate(f, [T.sel - 12, T.sel - 4], [0, 1], trava);
      itens.push(<div key={i} style={{ position: "absolute", left: 16, top: meu, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "28px", whiteSpace: "nowrap", opacity: surge(f, it.f) }}><Linha id={it.id} m={Math.max(0, m)} sel1={sel1} sel2={sel2} barra={surge(f, it.f)} /></div>);
    }
  });
  return (
    <div name="Pergunta e resposta" style={{ position: "absolute", left: 0, top: topo, width: CL.coluna, height: t.alto }}>
      <div name="Pergunta" style={{ position: "absolute", right: 0, top: 80, height: 52, boxSizing: "border-box", padding: "12px 12px", borderRadius: 12, background: COR.balao, fontFamily: SANS, fontSize: 16, lineHeight: "28px", whiteSpace: "nowrap", opacity: pergunta, translate: `0px ${(1 - pergunta) * 14}px` }}>{t.teclas[t.teclas.length - 1].texto}</div>
      {itens}
      {f >= t.envia + 8 ? (
        <div name="Símbolo do Claude" style={{ position: "absolute", left: 14, top: base + 10, opacity: surge(f, t.envia + 8), scale: String(trabalhando ? 1 + 0.08 * Math.sin((f - t.envia) / 3.2) : 1), rotate: `${trabalhando ? (f - t.envia) * 2.2 : 0}deg` }}>
          <MarcaClaude tamanho={24} />
        </div>
      ) : null}
      {f >= t.pronto ? (
        <div name="Ações da resposta" style={{ position: "absolute", left: 52, top: base + 12, display: "flex", gap: 14, opacity: surge(f, t.pronto) * 0.9 }}>
          <Tra d="M5.6 5.6V3.9a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1h-1.7M3.9 5.6h5.5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H3.9a1 1 0 0 1-1-1V6.6a1 1 0 0 1 1-1Z" t={16} cor={COR.cinza} />
          <Tra d="M5.2 7.2 7.6 2.6c.9 0 1.6.7 1.6 1.6v2.2h3a1.2 1.2 0 0 1 1.2 1.4l-.7 4.2a1.2 1.2 0 0 1-1.2 1H5.2ZM5.2 7.2H3a.6.6 0 0 0-.6.6v4.6c0 .3.3.6.6.6h2.2" t={16} cor={COR.cinza} />
          <Tra d="M10.8 8.8 8.4 13.4c-.9 0-1.6-.7-1.6-1.6V9.6h-3a1.2 1.2 0 0 1-1.2-1.4l.7-4.2a1.2 1.2 0 0 1 1.2-1h6.3ZM10.8 8.8H13a.6.6 0 0 0 .6-.6V3.6A.6.6 0 0 0 13 3h-2.2" t={16} cor={COR.cinza} />
          <Tra d="M13 8a5 5 0 1 1-1.6-3.7M13.2 2.6v2.8h-2.8" t={16} cor={COR.cinza} />
        </div>
      ) : null}
    </div>
  );
};

const Caixa = ({ topo, texto, cursor, vazio }: { topo: number; texto: string; cursor: boolean; vazio: string }) => (
  <div name="Caixa de pedidos" style={{ position: "absolute", left: 0, top: topo, width: CL.coluna, height: 104, background: "#FFFFFF", borderRadius: 16, boxShadow: `0 0 0 1px ${COR.bordaFina}, 0 4px 20px rgba(0,0,0,.04)`, boxSizing: "border-box", padding: "15px 14px 10px 16px", fontFamily: SANS }}>
    <div style={{ fontSize: 16, lineHeight: "24px", color: texto ? COR.texto : COR.cinza, whiteSpace: "nowrap" }}>
      {texto ? texto : null}
      <span style={{ display: "inline-block", width: 1.5, height: 20, verticalAlign: "-4px", background: COR.texto, opacity: cursor ? 1 : 0, marginRight: texto ? 0 : -1.5 }} />
      {texto ? null : vazio}
    </div>
    <div style={{ position: "absolute", left: 12, right: 12, bottom: 10, height: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", gap: 6 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, boxShadow: `inset 0 0 0 1px ${COR.bordaFina}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M8 3.2v9.6M3.2 8h9.6" t={16} /></div>
        <div style={{ width: 32, height: 32, borderRadius: 8, boxShadow: `inset 0 0 0 1px ${COR.bordaFina}`, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M2.6 5h4.2M10.4 5h3M2.6 11h3M9.2 11h4.2M8.6 3.3v3.4M7 9.3v3.4" t={16} /></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, lineHeight: "20px", color: COR.texto }}>
        <span>Opus 5.5</span>
        <Tra d="M4.2 6.2 8 10l3.8-3.8" t={14} cor={COR.cinza} l={1.5} />
        <div name="Enviar" style={{ width: 32, height: 32, borderRadius: 8, background: COR.coral, opacity: texto ? 1 : 0.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tra d="M8 12.6V3.6M4 7.4l4-4 4 4" t={16} cor="#FFFFFF" l={1.7} />
        </div>
      </div>
    </div>
  </div>
);

export const ClaudeWeb = ({ f, foco }: { f: number; foco: boolean }) => {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [espera] = useState(() => delayRender("fontes da tela do Claude"));
  useEffect(() => {
    Promise.all([esperaSans(), esperaSerifa()]).then(() => continueRender(espera)).catch(cancelRender);
  }, []);

  const e1 = TURNOS[0].envia;
  const enviado = f >= e1;
  // o que está sendo digitado agora: a pergunta do próximo turno ainda não enviado
  let texto = "";
  let teclou = -99;
  for (const t of TURNOS) {
    if (f >= t.envia || t.teclas[0].f > f) continue;
    texto = textoEm(t.teclas, f);
    teclou = Math.max(...t.teclas.filter((k) => k.f <= f).map((k) => k.f));
    break;
  }
  const cursor = foco && (f - teclou < 9 || Math.floor(f / 16) % 2 === 0);
  const desce = interpolate(f, [e1, e1 + 12], [0, 1], SUAVE);
  // a página rola para a pergunta nova ficar no topo
  let rola = 0;
  let topo = 0;
  const topos: number[] = [];
  TURNOS.forEach((t, i) => {
    topos.push(topo);
    if (i > 0) rola += TURNOS[i - 1].alto * interpolate(f, [t.envia, t.envia + 12], [0, 1], SUAVE);
    topo += t.alto;
  });
  const atual = TURNOS.filter((t) => f >= t.envia).length - 1;

  return (
    <div name="Claude" style={{ position: "absolute", inset: 0, background: COR.fundo, color: COR.texto, fontFamily: SANS, overflow: "hidden" }}>
      <div name="Coluna" style={{ position: "absolute", left: CL_X0, top: 0, width: CL.coluna, height: PAGINA.h }}>
        {!enviado || desce < 1 ? (
          <div name="Saudação" style={{ position: "absolute", left: 0, right: 0, top: 214, display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontFamily: SERIFA, fontSize: 40, lineHeight: "52px", color: "#3D3D3A", letterSpacing: "-0.01em", opacity: 1 - interpolate(f, [e1, e1 + 5], [0, 1], trava) }}>
            <MarcaClaude tamanho={36} />
            Bom dia, Lucas
          </div>
        ) : null}
        <div name="Conversa" style={{ position: "absolute", left: 0, top: -rola, width: CL.coluna }}>
          {TURNOS.map((t, i) => (i >= atual - 1 && i <= atual && f >= t.envia ? <Bloco key={i} t={t} f={f} topo={topos[i]} primeiro={i === 0} /> : null))}
        </div>
        {enviado ? <div name="Fundo da caixa" style={{ position: "absolute", left: -20, right: -20, top: PAGINA.h - 104 - 30 - 28, bottom: 0, background: `linear-gradient(180deg, rgba(250,249,245,0) 0px, ${COR.fundo} 28px)` }} /> : null}
        <Caixa topo={interpolate(desce, [0, 1], [296, PAGINA.h - 104 - 30])} texto={texto} cursor={cursor} vazio={enviado ? "Responder..." : "Como posso ajudar você hoje?"} />
      </div>

      <div name="Trilho do Claude" style={{ position: "absolute", left: 0, top: 0, width: CL.trilho, height: PAGINA.h, background: COR.fundo, boxShadow: `inset -1px 0 0 rgba(31,30,29,.08)` }}>
        <div style={{ position: "absolute", left: 17, top: 25 }}><Tra d="M2.6 3.4h10.8a.9.9 0 0 1 .9.9v7.4a.9.9 0 0 1-.9.9H2.6a.9.9 0 0 1-.9-.9V4.3a.9.9 0 0 1 .9-.9ZM5.9 3.4v9.2" /></div>
        <div style={{ position: "absolute", left: 17, top: 85 }}><Tra d="M8 2.2a5.8 5.8 0 1 1-2.8 10.9l-2.9.7.8-2.7A5.8 5.8 0 0 1 8 2.2ZM8 5.7v4.6M5.7 8h4.6" /></div>
        <div style={{ position: "absolute", left: 17, top: 121 }}><Tra d="M6.9 2.2a4.7 4.7 0 1 1-2.3 8.8l-2.2.5.6-2A4.7 4.7 0 0 1 6.9 2.2ZM9.4 12.6a3.6 3.6 0 0 0 3.7.3l1.5.4-.4-1.4a3.6 3.6 0 0 0 .2-2.6" /></div>
        <div style={{ position: "absolute", left: 17, top: 157 }}><Tra d="M2.9 6.6h10.2l-.7 5.9a1 1 0 0 1-1 .9H4.6a1 1 0 0 1-1-.9ZM4 4.6h8M5.2 2.7h5.6" /></div>
        <div style={{ position: "absolute", left: 17, top: 193 }}><Tra d="M4.5 2.3 6.5 4.3 4.5 6.3 2.5 4.3ZM9.7 2.5h3.6l-1 1.8 1 1.8H9.7l1-1.8ZM2.7 9.7h3.6v3.6H2.7ZM11.5 9.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" /></div>
        <div style={{ position: "absolute", left: 17, top: 229 }}><Tra d="M5.3 5 2.3 8l3 3M10.7 5l3 3-3 3M9.2 3.8 6.8 12.2" /></div>
        <div style={{ position: "absolute", left: 11, bottom: 14, width: 30, height: 30, borderRadius: 15, background: "#3D3D3A", color: "#FAF9F5", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div>
      </div>
      {f >= TURNOS[0].itens[3].f ? (
        <div name="Título da conversa" style={{ position: "absolute", left: CL.trilho + 1, top: 0, right: 0, height: 60, background: `linear-gradient(180deg, ${COR.fundo} 44px, rgba(250,249,245,0) 60px)`, opacity: surge(f, TURNOS[0].itens[3].f, 10) }}>
          <div style={{ position: "absolute", left: 23, top: 22, height: 24, display: "flex", alignItems: "center", gap: 8, fontSize: 16, lineHeight: "24px" }}>
            Ótica Central: vendas de ontem
            <Tra d="M4.2 6.2 8 10l3.8-3.8" t={14} l={1.5} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
