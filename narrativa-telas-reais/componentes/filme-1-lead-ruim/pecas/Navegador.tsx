// Janela do Chrome no Mac, tema escuro: faixa de abas (40 px) e barra de endereço (46 px).
// A moldura do navegador não tem código público: é desenho por observação. O contador "(N)" no título da aba do WhatsApp também.
import React from "react";
import { IC } from "../icones";
import { CH, SISTEMA, WA } from "../marca";
import { JANELA } from "../geometria";
import { ABA, conversasNaoLidas, TURNOS } from "../roteiro";
import { MarcaClaude } from "./MarcaClaude";

const Tra = ({ d, t = 16, cor = CH.cinza, l = 1.6 }: { d: string; t?: number; cor?: string; l?: number }) => (
  <svg width={t} height={t} viewBox="0 0 16 16" fill="none" style={{ display: "block", flexShrink: 0 }}>
    <path d={d} stroke={cor} strokeWidth={l} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Aba = ({ x, ativa, icone, titulo, sobre }: { x: number; ativa: boolean; icone: React.ReactNode; titulo: string; sobre: boolean }) => (
  <div name={`Aba ${titulo}`} style={{ position: "absolute", left: x, top: 6, width: ABA.w, height: 34 }}>
    {ativa ? (
      <>
        <div style={{ position: "absolute", inset: 0, background: CH.barra, borderRadius: "10px 10px 0 0" }} />
        <div style={{ position: "absolute", left: -10, bottom: 0, width: 10, height: 10, background: `radial-gradient(circle at 0 0, rgba(60,60,60,0) 9.6px, ${CH.barra} 10px)` }} />
        <div style={{ position: "absolute", right: -10, bottom: 0, width: 10, height: 10, background: `radial-gradient(circle at 100% 0, rgba(60,60,60,0) 9.6px, ${CH.barra} 10px)` }} />
      </>
    ) : sobre ? (
      <div style={{ position: "absolute", left: 2, right: 2, top: 2, bottom: 4, background: "rgba(255,255,255,.08)", borderRadius: 8 }} />
    ) : null}
    <div style={{ position: "absolute", left: 12, top: 0, right: 10, height: 32, display: "flex", alignItems: "center", gap: 9, fontSize: 12, lineHeight: "16px", color: ativa ? CH.texto : CH.cinza }}>
      {icone}
      <span style={{ flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg, #000 85%, transparent 100%)", maskImage: "linear-gradient(90deg, #000 85%, transparent 100%)" }}>{titulo}</span>
      <Tra d="M4.5 4.5l7 7M11.5 4.5l-7 7" t={14} cor={ativa ? CH.texto : CH.cinza} l={1.3} />
    </div>
  </div>
);

export const Navegador = ({ f, pagina, cursor, children }: { f: number; pagina: "wa" | "cl"; cursor: { x: number; y: number } | null; children: React.ReactNode }) => {
  const claude = pagina === "cl";
  const e1 = TURNOS[0].envia;
  const n = conversasNaoLidas(f);
  const tituloClaude = f < TURNOS[0].itens[3].f ? "Claude" : "Ótica Central: vendas de ontem - Claude";
  const naFaixa = !!cursor && cursor.y > 6 && cursor.y < 40;
  const sobreWa = naFaixa && cursor!.x > ABA.x0 && cursor!.x < ABA.x0 + ABA.w;
  const sobreClaude = naFaixa && cursor!.x > ABA.x0 + ABA.w && cursor!.x < ABA.x0 + 2 * ABA.w;
  return (
    <div name="Janela do Chrome" style={{ position: "absolute", left: 0, top: 0, width: JANELA.w, height: JANELA.h, borderRadius: 10, overflow: "hidden", background: CH.moldura, fontFamily: SISTEMA, boxShadow: "0 0 0 .5px rgba(255,255,255,.22) inset" }}>
      <div name="Faixa de abas" style={{ position: "absolute", left: 0, top: 0, width: JANELA.w, height: 40, background: CH.moldura }}>
        <div style={{ position: "absolute", left: 13, top: 14, width: 12, height: 12, borderRadius: 6, background: "#FF5F57" }} />
        <div style={{ position: "absolute", left: 33, top: 14, width: 12, height: 12, borderRadius: 6, background: "#FEBC2E" }} />
        <div style={{ position: "absolute", left: 53, top: 14, width: 12, height: 12, borderRadius: 6, background: "#28C840" }} />
        <Aba
          x={ABA.x0}
          ativa={!claude}
          sobre={sobreWa}
          titulo={n > 0 ? `(${n}) WhatsApp` : "WhatsApp"}
          icone={
            <svg width={16} height={16} viewBox="0 0 24 24" style={{ display: "block", flexShrink: 0 }}>
              <circle cx={12} cy={12} r={12} fill="#25D366" />
              <g transform="translate(3.2 3.2) scale(.733)" fill="#FFFFFF">
                <path d={IC.whatsapp.p[0].d} />
                <path d={IC.whatsapp.p[1].d} />
              </g>
            </svg>
          }
        />
        <Aba x={ABA.x0 + ABA.w} ativa={claude} sobre={sobreClaude} titulo={tituloClaude} icone={<MarcaClaude tamanho={16} />} />
        <div style={{ position: "absolute", left: ABA.x0 + 2 * ABA.w + 10, top: 11, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tra d="M8 3.5v9M3.5 8h9" />
        </div>
        <div style={{ position: "absolute", right: 12, top: 9, width: 26, height: 26, borderRadius: 13, background: "rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Tra d="M4.5 6.5 8 10l3.5-3.5" t={14} />
        </div>
      </div>
      <div name="Barra de endereço" style={{ position: "absolute", left: 0, top: 40, width: JANELA.w, height: 46, background: CH.barra, display: "flex", alignItems: "center", padding: "0 10px", boxSizing: "border-box", gap: 4 }}>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M12.5 8h-9M7 4 3.2 8 7 12" /></div>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.4 }}><Tra d="M3.5 8h9M9 4l3.8 4L9 12" /></div>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}><Tra d="M12.6 8a4.6 4.6 0 1 1-1.5-3.4M12.8 2.8v2.6h-2.6" /></div>
        <div name="Endereço" style={{ flex: 1, height: 34, borderRadius: 17, background: CH.campo, margin: "0 6px", display: "flex", alignItems: "center", padding: "0 6px", boxSizing: "border-box", gap: 10, fontSize: 14, lineHeight: "20px", color: CH.texto }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: CH.barra, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tra d="M2.8 5.2h5.4M11.6 5.2h1.6M2.8 10.8h1.6M7.8 10.8h5.4M9.9 3.6v3.2M6.1 9.2v3.2" t={15} l={1.4} />
          </div>
          <span style={{ flex: 1 }}>
            {claude ? "claude.ai" : "web.whatsapp.com"}
            <span style={{ color: CH.fraco }}>{claude ? (f < e1 + 4 ? "/new" : "/chat/7c2e41d8-5b0a-4f6e-9a13-2d8c0e6b1f47") : ""}</span>
          </span>
          <div style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tra d="M8 2.6l1.6 3.4 3.7.5-2.7 2.5.7 3.6L8 10.9l-3.3 1.7.7-3.6-2.7-2.5 3.7-.5Z" l={1.3} />
          </div>
        </div>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 12, background: "#1670CB", color: "#FFFFFF", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>L</div>
        </div>
        <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width={16} height={16} viewBox="0 0 16 16"><circle cx={8} cy={3.2} r={1.4} fill={CH.cinza} /><circle cx={8} cy={8} r={1.4} fill={CH.cinza} /><circle cx={8} cy={12.8} r={1.4} fill={CH.cinza} /></svg>
        </div>
      </div>
      <div name="Página" style={{ position: "absolute", left: 0, top: JANELA.topo, width: JANELA.w, height: JANELA.h - JANELA.topo, overflow: "hidden", background: claude ? "#FAF9F5" : WA.fundo }}>{children}</div>
    </div>
  );
};
