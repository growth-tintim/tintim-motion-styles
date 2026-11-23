// Claude no iPhone, tema claro. Medidas tiradas das imagens oficiais da App Store (pt-BR): botões redondos no topo
// (menu à esquerda; conversa nova e "..." à direita), balão do usuário à direita (16/21 pt, raio 18), resposta em serifa,
// caixa de pedidos em cartão branco com "+", "Opus", microfone e o botão de voz, que vira a seta coral quando há texto.
// Textos oficiais: "No que você está pensando?" e "Converse com o Claude".
// A linha de ferramenta do Tintim segue a do Claude na web; as ações embaixo da resposta e a posição da tela inicial são estimativa.
// Fontes substitutas: as do Claude são proprietárias.
import React, { useEffect, useState } from "react";
import { Img, interpolate, useDelayRender } from "remotion";
import { loadFont as carregaSans } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as carregaSerifa } from "@remotion/google-fonts/SourceSerif4";
import { CL as COR } from "../marca";
import { M } from "../midia";
import { CHEGA, IOS, SUAVE, surge, TECLADO, TELA, trava } from "../geometria";
import { DIG, PERGUNTA, PERGUNTA2, PERGUNTA3, RESPOSTA2, T, textoEm } from "../tempos";
import { Toque } from "./Sistema";
import { MarcaClaude } from "./MarcaClaude";
import { Tecla, Teclado } from "./Teclado";

const { fontFamily: SANS, waitUntilDone: esperaSans } = carregaSans("normal", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
const { fontFamily: SERIFA, waitUntilDone: esperaSerifa } = carregaSerifa("normal", { weights: ["400", "600"], subsets: ["latin", "latin-ext"] });

const Tra = ({ d, t = 20, cor = COR.texto, l = 1.5 }: { d: string; t?: number; cor?: string; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const B = ({ children }: { children: React.ReactNode }) => <b style={{ fontWeight: 600 }}>{children}</b>;
// Marca-texto lima por cima da tela, como caneta sobre papel: não faz parte do desenho do Claude.
const Realce = ({ d, children }: { d: number; children: React.ReactNode }) => (
  <span style={{ position: "relative", display: "inline-block" }}>
    {d > 0 ? <span style={{ position: "absolute", left: -4, right: -4, top: 1, bottom: 1, borderRadius: 4, background: "rgba(232,240,79,.66)", clipPath: `inset(0 ${(1 - d) * 100}% 0 0)`, mixBlendMode: "multiply" }} /> : null}
    <span style={{ position: "relative" }}>{children}</span>
  </span>
);
const Emblema = ({ t }: { t: number }) => (
  <div name="Emblema do Tintim" style={{ width: t, height: t, borderRadius: t * 0.24, overflow: "hidden", flexShrink: 0, position: "relative", background: "#FFFFFF", boxShadow: "0 0 0 .5px rgba(31,30,29,.15)" }}>
    <Img src={M.logoAzul} style={{ position: "absolute", left: t * 0.04, top: t * 0.04, height: t * 0.92, width: "auto", maxWidth: "none" }} />
  </div>
);
const Ferramenta = ({ nome, op, ativa }: { nome: string; op: number; ativa: boolean }) => (
  <div name={`Ferramenta ${nome}`} style={{ height: 36, display: "flex", alignItems: "center", gap: 8, fontFamily: SANS, fontSize: 15, lineHeight: "20px", opacity: op }}>
    <Emblema t={20} />
    <span style={{ color: COR.texto }}>Tintim</span>
    <span style={{ color: COR.cinza, marginLeft: 2, opacity: ativa ? 0.72 : 1 }}>{nome}</span>
    <span style={{ flex: 1 }} />
    <Tra d="M5.4 5 2.4 8l3 3M10.6 5l3 3-3 3M9.2 3.8 6.800 12.200" t={16} cor={COR.cinza} l={1.25} />
  </div>
);
const Redondo = ({ children, w = 43 }: { children: React.ReactNode; w?: number }) => (
  <div style={{ width: w, height: 43, borderRadius: 21.5, background: "rgba(255,255,255,.9)", boxShadow: "0 0 0 .5px rgba(31,30,29,.08), 0 3px 12px rgba(31,30,29,.09)", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>{children}</div>
);

const TECLAS: Tecla[] = [...DIG.pergunta, ...DIG.pergunta2, ...DIG.pergunta3].map((k) => ({ q: k.f, c: k.c }));
const sugerir = (texto: string, alvo: string) => {
  const PALAVRAS = alvo.split(" ");
  if (texto === "") return ["Eu", "O", "Como"];
  const ps = texto.split(" ");
  const parcial = ps[ps.length - 1];
  if (parcial === "") return ["que", "o", "a"];
  const w = (PALAVRAS[ps.length - 1] ?? "").replace(/[?]/g, "");
  return [`“${parcial}”`, w && w !== parcial ? w : "é", parcial.length > 3 ? "de" : "que"];
};
// Seleção de texto do iOS, por cima do trecho de prova: fundo azul claro e as duas alças.
const Selecao = ({ p }: { p: number }) =>
  p > 0 ? (
    <div name="Seleção" style={{ position: "absolute", left: 10, right: 2, top: -2, bottom: -2, opacity: Math.min(1, p * 3), pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,122,255,.2)", clipPath: `inset(0 ${(1 - p) * 100}% ${(1 - p) * 60}% 0)` }} />
      <div name="Alça de cima" style={{ position: "absolute", left: -1, top: 0, width: 2, height: 25, background: "#007AFF" }}>
        <div style={{ position: "absolute", left: -4, top: -8, width: 10, height: 10, borderRadius: 5, background: "#007AFF" }} />
      </div>
      <div name="Alça de baixo" style={{ position: "absolute", right: 0, bottom: 0, width: 2, height: 25, background: "#007AFF", opacity: p >= 1 ? 1 : 0 }}>
        <div style={{ position: "absolute", left: -4, bottom: -8, width: 10, height: 10, borderRadius: 5, background: "#007AFF" }} />
      </div>
    </div>
  ) : null;

export const ClaudeIOS = ({ f }: { f: number }) => {
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [espera] = useState(() => delayRender("fontes da tela do Claude"));
  useEffect(() => {
    Promise.all([esperaSans(), esperaSerifa()]).then(() => continueRender(espera)).catch(cancelRender);
  }, []);

  const abre = (de: number, ate: number) => interpolate(f, [de + 2, de + 12], [0, 1], IOS) - interpolate(f, [ate + 1, ate + 11], [0, 1], IOS);
  const k = abre(T.toque2, T.envia) + abre(T.toque4, T.envia2) + abre(T.toque6, T.envia3);
  const enviado = f >= T.envia;
  const segunda = f >= T.toque4;
  const terceira = f >= T.toque6;
  const texto = !enviado ? textoEm(DIG.pergunta, f) : terceira ? (f < T.envia3 ? textoEm(DIG.pergunta3, f) : "") : segunda && f < T.envia2 ? textoEm(DIG.pergunta2, f) : "";
  const digitandoAgora = (f >= T.dig2 - 2 && f <= T.envia) || (f >= T.dig5 - 2 && f <= T.envia2) || (f >= T.dig6 - 2 && f <= T.envia3);
  const cursor = k > 0.5 && (digitandoAgora || Math.floor(f / 16) % 2 === 0);
  const aperto = interpolate(f, [T.envia - 3, T.envia - 1, T.envia + 2], [0, 1, 0], trava) + interpolate(f, [T.envia2 - 3, T.envia2 - 1, T.envia2 + 2], [0, 1, 0], trava) + interpolate(f, [T.envia3 - 3, T.envia3 - 1, T.envia3 + 2], [0, 1, 0], trava);
  // Na segunda pergunta, a conversa sobe até a pergunta nova ficar no topo, como o app faz.
  const D = 560;
  const D2 = 330; // altura da segunda pergunta com a resposta, mais folga
  const rola = interpolate(f, [T.envia2 + 1, T.envia2 + 14], [0, D], IOS) + interpolate(f, [T.envia3 + 1, T.envia3 + 14], [0, D2], IOS);
  const pergunta3 = interpolate(f, [T.envia3 + 2, T.envia3 + 10], [0, 1], CHEGA);
  const trabalhando3 = f >= T.envia3 + 8 && f < T.t1 + 8;
  const pergunta2 = interpolate(f, [T.envia2 + 2, T.envia2 + 10], [0, 1], CHEGA);
  const trabalhando2 = f >= T.envia2 + 8 && f < T.s4 + 10;
  const pronto2 = f >= T.s4 + 10;
  const m3 = interpolate(f, [T.s2 + 6, T.s2 + 16], [0, 1], SUAVE);
  const copiado2 = f >= T.copia2 + 2;
  const pergunta = interpolate(f, [T.envia + 2, T.envia + 10], [0, 1], CHEGA);
  const trabalhando = f >= T.envia + 10 && f < T.r5 + 12;
  const pronto = f >= T.r5 + 12;
  const m1 = interpolate(f, [T.r2 + 6, T.r2 + 16], [0, 1], SUAVE) - interpolate(f, [T.r5 + 4, T.r5 + 10], [0, 1], trava);
  const m2 = interpolate(f, [T.r5 + 7, T.r5 + 17], [0, 1], SUAVE) - interpolate(f, [T.sel - 4, T.sel + 2], [0, 1], trava);
  const sel = f >= T.toque4 ? 0 : interpolate(f, [T.sel, T.sel + 7], [0, 1], IOS); // a seleção some quando ele toca na caixa de novo
  const menu = interpolate(f, [T.menu, T.menu + 5], [0, 1], CHEGA) * (1 - interpolate(f, [T.copia + 2, T.copia + 6], [0, 1], trava));
  const copiado = false;
  const caixaBase = 26 + Math.max(0, k) * (TECLADO.h + 10 - 26);
  const toque = (em: number, dur = 9) => interpolate(f, [em - 3, em + dur], [0, 1], trava);
  const sugestoes = sugerir(texto, terceira ? PERGUNTA3 : segunda ? PERGUNTA2 : PERGUNTA);

  return (
    <div name="Claude" style={{ position: "absolute", inset: 0, background: COR.fundo, color: COR.texto, fontFamily: SANS, overflow: "hidden" }}>
      <div name="Esmaecido do topo" style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: 112, background: `linear-gradient(${COR.fundo} 62%, rgba(250,249,245,0))`, zIndex: 3 }} />
      {!enviado || f < T.envia + 6 ? (
        <div name="Saudação" style={{ position: "absolute", left: 0, top: 236, width: TELA.w, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: 1 - interpolate(f, [T.envia, T.envia + 5], [0, 1], trava) }}>
          <MarcaClaude tamanho={34} />
          <div style={{ fontFamily: SERIFA, fontSize: 31, lineHeight: "37px", letterSpacing: "-0.015em", textAlign: "center", color: "#3D3D3A" }}>
            No que você
            <br />
            está pensando?
          </div>
        </div>
      ) : null}

      {enviado ? (
        <div name="Conversa" style={{ position: "absolute", left: 0, top: 112 - rola, width: TELA.w, boxSizing: "border-box", padding: "0 25px", display: "flex", flexDirection: "column" }}>
          <div name="Pergunta" style={{ alignSelf: "flex-end", maxWidth: 272, boxSizing: "border-box", padding: "11px 16px 12px", borderRadius: 18, background: COR.balao, fontSize: 16, lineHeight: "21px", opacity: pergunta, translate: `0px ${(1 - pergunta) * 14}px` }}>{PERGUNTA}</div>
          {f >= T.frase0 ? <div name="Frase antes das ferramentas" style={{ marginTop: 20, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "23px", opacity: surge(f, T.frase0) }}>Vou olhar as conversas de ontem no Tintim.</div> : null}
          {f >= T.ferr1 ? <div style={{ marginTop: 6 }}><Ferramenta nome="leads_list" op={surge(f, T.ferr1)} ativa={f < T.ferr2} /></div> : null}
          {f >= T.ferr2 ? <Ferramenta nome="leads_messages" op={surge(f, T.ferr2)} ativa={f < T.lido} /> : null}
          {f >= T.r1 ? (
            <div name="Resposta" style={{ marginTop: 8, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "23px", display: "flex", flexDirection: "column", gap: 11 }}>
              <div style={{ opacity: surge(f, T.r1) }}>Ontem a Ótica Central recebeu <B>38 conversas</B> pelos anúncios e fechou <B>5 vendas</B>.</div>
              {f >= T.r2 ? <div style={{ opacity: surge(f, T.r2) }}><Realce d={m1}><B>14 conversas</B> ficaram sem resposta.</Realce></div> : null}
              {f >= T.r3 ? <div style={{ opacity: surge(f, T.r3) }}>Tempo médio até a primeira resposta: <B>3h12</B>.</div> : null}
              {f >= T.r4 ? (
                <div name="Trecho de prova" style={{ position: "relative", paddingLeft: 14, boxShadow: `inset 3px 0 0 rgba(222,220,209,${surge(f, T.r4)})` }}>
                  <Selecao p={sel} />
                  <Toque p={interpolate(f, [T.aperta - 3, T.sel + 2], [0, 1], trava)} x={120} y={12} />
                  {menu > 0 ? (
                    <div name="Menu de edição" style={{ position: "absolute", left: 14, top: -54, height: 42, display: "flex", alignItems: "center", borderRadius: 12, background: "rgba(255,255,255,.98)", boxShadow: "0 8px 28px rgba(0,0,0,.18), 0 0 0 .5px rgba(0,0,0,.08)", fontFamily: SANS, fontSize: 15.5, lineHeight: "42px", color: "#000000", opacity: menu, scale: String(0.9 + 0.1 * menu), transformOrigin: "30% 100%", zIndex: 6, whiteSpace: "nowrap" }}>
                      <div style={{ position: "relative", padding: "0 16px" }}>Copiar<Toque p={interpolate(f, [T.copia - 3, T.copia + 6], [0, 1], trava)} /></div>
                      <div style={{ width: .5, height: 42, background: "rgba(0,0,0,.14)" }} />
                      <div style={{ padding: "0 16px" }}>Selecionar Tudo</div>
                      <div style={{ width: .5, height: 42, background: "rgba(0,0,0,.14)" }} />
                      <div style={{ padding: "0 14px", color: "rgba(0,0,0,.55)" }}>›</div>
                    </div>
                  ) : null}
                  <div style={{ opacity: surge(f, T.r4) }}><B>Diego, 9h04:</B> “Qual o valor do multifocal?”</div>
                  {f >= T.r5 ? <div style={{ opacity: surge(f, T.r5) }}>Primeira resposta: <Realce d={m2}><B>15h40</B></Realce>.</div> : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {f >= T.envia + 10 ? (
            <div name="Rodapé da resposta" style={{ marginTop: 14, height: 30, display: "flex", alignItems: "center", gap: 16 }}>
              <div name="Símbolo do Claude" style={{ opacity: surge(f, T.envia + 10), scale: String(trabalhando ? 1 + 0.08 * Math.sin((f - T.envia) / 3.2) : 1), rotate: `${trabalhando ? (f - T.envia) * 2.2 : 0}deg` }}>
                <MarcaClaude tamanho={26} />
              </div>
              {pronto ? (
                <div name="Ações da resposta" style={{ display: "flex", alignItems: "center", gap: 18, opacity: surge(f, T.r5 + 12) }}>
                  <div name="Copiar" style={{ position: "relative", width: 20, height: 20 }}>
                    {copiado ? <Tra d="M3.2 8.400 6.600 11.800 12.800 4.600" cor={COR.texto} l={1.6} /> : <Tra d="M5.600 5.600V3.900a1 1 0 0 1 1-1h5.500a1 1 0 0 1 1 1v5.500a1 1 0 0 1-1 1h-1.700M3.900 5.600h5.500a1 1 0 0 1 1 1v5.500a1 1 0 0 1-1 1H3.900a1 1 0 0 1-1-1V6.600a1 1 0 0 1 1-1Z" cor={COR.cinza} l={1.25} />}

                  </div>
                  <Tra d="M5.200 7.200 7.600 2.600c.9 0 1.600.7 1.600 1.600v2.200h3a1.200 1.200 0 0 1 1.200 1.400l-.7 4.200a1.200 1.200 0 0 1-1.200 1H5.200ZM5.200 7.200H3a.6.6 0 0 0-.6.6v4.600c0 .3.3.6.6.6h2.200" cor={COR.cinza} l={1.25} />
                  <Tra d="M10.800 8.800 8.400 13.400c-.9 0-1.600-.7-1.600-1.600V9.600h-3a1.200 1.200 0 0 1-1.200-1.400l.7-4.200a1.200 1.200 0 0 1 1.200-1h6.300ZM10.800 8.800H13a.6.6 0 0 0 .6-.6V3.600A.6.6 0 0 0 13 3h-2.200" cor={COR.cinza} l={1.25} />
                  <Tra d="M13 8a5 5 0 1 1-1.600-3.700M13.200 2.600v2.800h-2.800" cor={COR.cinza} l={1.25} />
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {f >= T.envia2 ? (
        <div name="Conversa, segunda pergunta" style={{ position: "absolute", left: 0, top: 112 + D - rola, width: TELA.w, boxSizing: "border-box", padding: "0 25px", display: "flex", flexDirection: "column" }}>
          <div name="Pergunta 2" style={{ alignSelf: "flex-end", maxWidth: 272, boxSizing: "border-box", padding: "11px 16px 12px", borderRadius: 18, background: COR.balao, fontSize: 16, lineHeight: "21px", opacity: pergunta2, translate: `0px ${(1 - pergunta2) * 14}px` }}>{PERGUNTA2}</div>
          {f >= T.ferr3 ? <div style={{ marginTop: 14 }}><Ferramenta nome="creatives_list" op={surge(f, T.ferr3)} ativa={f < T.s1} /></div> : null}
          {f >= T.s1 ? (
            <div name="Resposta 2" style={{ marginTop: 8, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "23px", display: "flex", flexDirection: "column", gap: 9 }}>
              <div style={{ opacity: surge(f, T.s1) }}>{RESPOSTA2[0]}</div>
              {f >= T.s2 ? <div style={{ opacity: surge(f, T.s2) }}>1. Vídeo do clareamento: <Realce d={m3}><B>23 vendas</B></Realce></div> : null}
              {f >= T.s3 ? <div style={{ opacity: surge(f, T.s3) }}>2. Carrossel do aparelho: <B>4 vendas</B></div> : null}
              {f >= T.s4 ? <div style={{ opacity: surge(f, T.s4) }}>3. Avaliação grátis: <B>1 venda</B></div> : null}
            </div>
          ) : null}
          <div name="Rodapé da resposta 2" style={{ marginTop: 14, height: 30, display: "flex", alignItems: "center", gap: 16 }}>
            <div name="Símbolo do Claude" style={{ opacity: surge(f, T.envia2 + 8), scale: String(trabalhando2 ? 1 + 0.08 * Math.sin((f - T.envia2) / 3.2) : 1), rotate: `${trabalhando2 ? (f - T.envia2) * 2.2 : 0}deg` }}>
              <MarcaClaude tamanho={26} />
            </div>
            {pronto2 ? (
              <div name="Ações da resposta" style={{ display: "flex", alignItems: "center", gap: 18, opacity: surge(f, T.s4 + 10) }}>
                <div name="Copiar" style={{ position: "relative", width: 20, height: 20 }}>
                  {copiado2 ? <Tra d="M3.2 8.4 6.6 11.8 12.8 4.6" cor={COR.texto} l={1.6} /> : <Tra d="M5.6 5.6V3.9a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1h-1.7M3.9 5.6h5.5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H3.9a1 1 0 0 1-1-1V6.6a1 1 0 0 1 1-1Z" cor={COR.cinza} l={1.25} />}
                  <Toque p={toque(T.copia2)} />
                </div>
                <Tra d="M5.2 7.2 7.6 2.6c.9 0 1.6.7 1.6 1.6v2.2h3a1.2 1.2 0 0 1 1.2 1.4l-.7 4.2a1.2 1.2 0 0 1-1.2 1H5.2ZM5.2 7.2H3a.6.6 0 0 0-.6.6v4.6c0 .3.3.6.6.6h2.2" cor={COR.cinza} l={1.25} />
                <Tra d="M10.8 8.8 8.4 13.4c-.9 0-1.6-.7-1.6-1.6V9.6h-3a1.2 1.2 0 0 1-1.2-1.4l.7-4.2a1.2 1.2 0 0 1 1.2-1h6.3ZM10.8 8.8H13a.6.6 0 0 0 .6-.6V3.6A.6.6 0 0 0 13 3h-2.2" cor={COR.cinza} l={1.25} />
                <Tra d="M13 8a5 5 0 1 1-1.6-3.7M13.2 2.6v2.8h-2.8" cor={COR.cinza} l={1.25} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {f >= T.envia3 ? (
        <div name="Conversa, terceira pergunta" style={{ position: "absolute", left: 0, top: 112 + D + D2 - rola, width: TELA.w, boxSizing: "border-box", padding: "0 25px", display: "flex", flexDirection: "column" }}>
          <div name="Pergunta 3" style={{ alignSelf: "flex-end", maxWidth: 272, boxSizing: "border-box", padding: "11px 16px 12px", borderRadius: 18, background: COR.balao, fontSize: 16, lineHeight: "21px", opacity: pergunta3, translate: `0px ${(1 - pergunta3) * 14}px` }}>{PERGUNTA3}</div>
          {f >= T.ferr4 ? <div style={{ marginTop: 14 }}><Ferramenta nome="leads_batch_status_preview" op={surge(f, T.ferr4)} ativa={f < T.ferr5} /></div> : null}
          {f >= T.ferr5 ? <Ferramenta nome="leads_batch_status_change" op={surge(f, T.ferr5)} ativa={f < T.t1} /> : null}
          {f >= T.t1 ? <div name="Resposta 3" style={{ marginTop: 8, fontFamily: SERIFA, fontSize: 16.5, lineHeight: "23px", opacity: surge(f, T.t1) }}>Pronto. Movi para Negociação os <B>7 leads</B> da Studio Pilates que pediram preço ontem.</div> : null}
          <div name="Rodapé da resposta 3" style={{ marginTop: 14, height: 30, display: "flex", alignItems: "center" }}>
            <div name="Símbolo do Claude" style={{ opacity: surge(f, T.envia3 + 8), scale: String(trabalhando3 ? 1 + 0.08 * Math.sin((f - T.envia3) / 3.2) : 1), rotate: `${trabalhando3 ? (f - T.envia3) * 2.2 : 0}deg` }}>
              <MarcaClaude tamanho={26} />
            </div>
          </div>
        </div>
      ) : null}

      <div name="Botões do topo" style={{ position: "absolute", left: 20, top: 61, width: TELA.w - 40, display: "flex", justifyContent: "space-between", zIndex: 4 }}>
        <Redondo><Tra d="M3 4.400h10M3 8h7.200M3 11.600h4.400" t={19} l={1.4} /></Redondo>
        <Redondo w={100}>
          <svg width={24} height={24} viewBox="0 0 24 24" style={{ display: "block" }}>
            <path d="M12 3.200a8.600 8.600 0 0 1 0 17.200c-1.300 0-2.500-.3-3.600-.8L4 20.700l1.200-4A8.600 8.600 0 0 1 12 3.200Z" fill="#141413" />
            <path d="M12 8.200v7.200M8.400 11.800h7.200" stroke="#FFFFFF" strokeWidth={1.8} strokeLinecap="round" />
          </svg>
          <svg width={22} height={22} viewBox="0 0 24 24" style={{ display: "block" }}><circle cx={5} cy={12} r={1.9} fill="#141413" /><circle cx={12} cy={12} r={1.9} fill="#141413" /><circle cx={19} cy={12} r={1.9} fill="#141413" /></svg>
        </Redondo>
      </div>

      <div name="Caixa de pedidos" style={{ position: "absolute", left: 26, bottom: caixaBase, width: TELA.w - 52, minHeight: 88, background: "#FFFFFF", borderRadius: 28, boxShadow: `0 0 0 .5px ${COR.bordaFina}, 0 6px 24px rgba(31,30,29,.07)`, boxSizing: "border-box", padding: "14px 16px 53px", zIndex: 4 }}>
        <div style={{ fontSize: 16.500, lineHeight: "21px", color: texto ? COR.texto : COR.cinza }}>
          {texto ? texto : null}
          <span style={{ display: "inline-block", width: 2, height: 20, verticalAlign: "-4px", borderRadius: 1, background: COR.coral, opacity: cursor ? 1 : 0, marginRight: texto ? 0 : -2 }} />
          {texto ? null : "Converse com o Claude"}
        </div>
        <Toque p={toque(T.toque2)} />
        <Toque p={toque(T.toque4)} />
        <Toque p={toque(T.toque6)} />
        <div style={{ position: "absolute", left: 10, right: 10, bottom: 9, height: 36, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: COR.pilula, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M8 3v10M3 8h10" t={18} l={1.4} /></div>
          <div style={{ height: 36, padding: "0 14px", borderRadius: 18, background: COR.pilula, fontSize: 14, lineHeight: "36px" }}>Opus</div>
          <span style={{ flex: 1 }} />
          <div style={{ width: 36, height: 36, borderRadius: 18, background: COR.pilula, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M8 2.200a2 2 0 0 1 2 2v3.400a2 2 0 0 1-4 0V4.200a2 2 0 0 1 2-2ZM4.200 7.600a3.800 3.800 0 0 0 7.600 0M8 11.400v2.400" t={19} cor={COR.cinza} l={1.2} /></div>
          {texto ? (
            <div name="Enviar" style={{ position: "relative", width: 37, height: 37, borderRadius: 18.500, background: COR.coral, display: "flex", alignItems: "center", justifyContent: "center", scale: String(1 - 0.12 * aperto) }}>
              <Tra d="M8 12.800V3.400M4 7.200l4-4 4 4" t={20} cor="#FFFFFF" l={1.5} />
              <Toque p={toque(T.envia - 1)} />
              <Toque p={toque(T.envia2 - 1)} />
              <Toque p={toque(T.envia3 - 1)} />
            </div>
          ) : (
            <div name="Voz" style={{ width: 37, height: 37, borderRadius: 18.500, background: "#141413", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tra d="M3.200 6.800v2.400M5.600 4.800v6.400M8 3.200v9.600M10.400 5.600v4.800M12.800 6.800v2.400" t={19} cor="#FFFFFF" l={1.4} />
            </div>
          )}
        </div>
      </div>

      <Teclado f={f} k={Math.max(0, k)} teclas={TECLAS} vazio={texto === ""} sugestoes={sugestoes} />
    </div>
  );
};
