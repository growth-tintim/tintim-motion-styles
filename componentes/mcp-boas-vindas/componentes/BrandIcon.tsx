// Ícone de marca na escala de interface: quadradinho branco com o logo, ou o ícone do próprio app.
import { Img } from "remotion";
import { C, FONTE } from "../marca";

export const TAMANHO_ICONE = 44;

export const BrandIcon = ({
  x,
  y,
  src,
  rotulo,
  entrada,
  entradaRotulo = entrada,
  app = false,
  pulso = 0,
}: {
  x: number; // centro
  y: number; // centro
  src: string;
  rotulo?: string;
  entrada: number; // spring: pode ultrapassar 1 de leve
  entradaRotulo?: number;
  app?: boolean; // o arquivo já é o ícone inteiro do app
  pulso?: number; // 0 a 1: anel de chegada
}) => (
  <div
    name={`Ícone · ${rotulo ?? "app"}`}
    style={{ position: "absolute", left: x - TAMANHO_ICONE / 2, top: y - TAMANHO_ICONE / 2, width: TAMANHO_ICONE, height: TAMANHO_ICONE }}
  >
    <div style={{ position: "absolute", inset: 0, scale: entrada, opacity: Math.min(1, entrada * 2) }}>
      <div
        style={{
          position: "absolute",
          inset: -3,
          borderRadius: 13,
          boxShadow: `0 0 0 1px rgba(232,240,79,${0.8 * pulso})`,
          scale: 1 + (1 - pulso) * 0.25,
          opacity: pulso > 0 ? 1 : 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 10,
          overflow: "hidden",
          background: app ? "transparent" : C.branco,
          boxShadow: "0 1px 2px rgba(2,8,20,0.4), 0 6px 16px rgba(2,8,20,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img src={src} style={{ width: app ? TAMANHO_ICONE : 26, height: app ? TAMANHO_ICONE : 26, objectFit: "contain" }} />
      </div>
    </div>
    {rotulo ? (
      <div
        style={{
          position: "absolute",
          top: TAMANHO_ICONE + 6,
          left: "50%",
          translate: "-50% 0",
          opacity: Math.min(1, entradaRotulo),
          color: "rgba(255,255,255,0.62)",
          fontFamily: FONTE,
          fontWeight: 500,
          fontSize: 12,
          lineHeight: "16px",
          whiteSpace: "nowrap",
        }}
      >
        {rotulo}
      </div>
    ) : null}
  </div>
);
