// Partes do iOS que aparecem por cima dos apps: barra de status, indicador de início e o círculo de toque.
// Sem moldura e sem Dynamic Island: é a tela como sai numa gravação de tela, ocupando o quadro todo (o guia: "Vertical é outro filme").
// Proporções medidas nas imagens do guia do iPhone da Apple, as mesmas da versão de iPhone anterior.
import React from "react";
import { SISTEMA } from "../marca";
import { TELA } from "../geometria";

export const Toque = ({ p, t = 34, x, y }: { p: number; t?: number; x?: number; y?: number }) =>
  p > 0 && p < 1 ? (
    <div
      name="Toque"
      style={{
        position: "absolute",
        left: x ?? "50%",
        top: y ?? "50%",
        width: t,
        height: t,
        marginLeft: -t / 2,
        marginTop: -t / 2,
        borderRadius: t / 2,
        background: "rgba(120,124,134,.34)",
        boxShadow: "0 0 0 1px rgba(255,255,255,.55), 0 2px 8px rgba(0,0,0,.18)",
        opacity: Math.min(1, p * 5, (1 - p) * 3),
        scale: String(0.82 + 0.3 * p),
        pointerEvents: "none",
        zIndex: 30,
      }}
    />
  ) : null;

export const Status = ({ hora }: { hora: string }) => (
  <div name="Barra de status" style={{ position: "absolute", left: 0, top: 0, width: TELA.w, height: 54, fontFamily: SISTEMA, color: "#000000", zIndex: 20, pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: 30, top: 18, width: 80, textAlign: "center", fontSize: 17, lineHeight: "22px", fontWeight: 600, letterSpacing: "-0.01em" }}>{hora}</div>
    <svg name="Sinal, Wi-Fi e bateria" width={78} height={14} viewBox="0 0 78 14" style={{ position: "absolute", left: 282, top: 22, display: "block" }}>
      <rect x={0} y={8.6} width={3.2} height={4.4} rx={0.9} fill="#000" />
      <rect x={4.9} y={6.2} width={3.2} height={6.8} rx={0.9} fill="#000" />
      <rect x={9.8} y={3.6} width={3.2} height={9.4} rx={0.9} fill="#000" />
      <rect x={14.7} y={1} width={3.2} height={12} rx={0.9} fill="#000" />
      <path d="M32.2 3.3c2.5 0 4.8 1 6.5 2.6l-1.2 1.2a7.6 7.6 0 0 0-10.6 0l-1.2-1.2a9.3 9.3 0 0 1 6.5-2.6Zm0 3.5c1.6 0 3 .6 4.1 1.6L35 9.7a4 4 0 0 0-5.6 0l-1.3-1.3a5.8 5.8 0 0 1 4.1-1.6Zm0 3.4c.7 0 1.3.3 1.8.7l-1.8 1.9-1.8-1.9c.5-.4 1.1-.7 1.8-.7Z" fill="#000" />
      <rect x={46.6} y={1.1} width={24.4} height={11.8} rx={3.6} fill="none" stroke="#000" strokeOpacity={0.4} strokeWidth={1.1} />
      <rect x={48.4} y={2.9} width={20.8} height={8.2} rx={2.1} fill="#000" />
      <path d="M72.6 5v4c.8-.3 1.5-1.1 1.5-2s-.7-1.7-1.5-2Z" fill="#000" fillOpacity={0.45} />
    </svg>
  </div>
);

export const Inicio = () => <div name="Indicador de início" style={{ position: "absolute", left: (TELA.w - 139) / 2, bottom: 8, width: 139, height: 5, borderRadius: 2.5, background: "#000000", zIndex: 21 }} />;

// Foto redonda de contato: iniciais, ou os óculos da Ótica Central.
export const Foto = ({ foto, t }: { foto: { sigla?: string; cor: string; oculos?: boolean }; t: number }) => (
  <div name="Foto" style={{ width: t, height: t, borderRadius: t / 2, background: foto.cor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#FFFFFF", fontFamily: SISTEMA, fontWeight: 600, fontSize: t * 0.38, letterSpacing: "0.01em" }}>
    {foto.oculos ? (
      <svg width={t * 0.62} height={t * 0.62} viewBox="0 0 30 30" fill="none">
        <circle cx={8.5} cy={16} r={5.2} stroke="#FFFFFF" strokeWidth={2} />
        <circle cx={21.5} cy={16} r={5.2} stroke="#FFFFFF" strokeWidth={2} />
        <path d="M13.5 15c.9-1 2.1-1 3 0M3.4 14.6 2 11.4M26.6 14.6 28 11.4" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ) : (
      foto.sigla
    )}
  </div>
);
