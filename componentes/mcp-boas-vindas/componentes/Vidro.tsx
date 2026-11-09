// Acabamento comum: sombra longa em camadas, borda clara de 1px e reflexo especular.
import type { CSSProperties } from "react";

export const SOMBRA_LONGA =
  "0 2px 6px rgba(2,10,25,0.30), 0 18px 40px rgba(2,10,25,0.38), 0 60px 130px rgba(2,10,25,0.55)";

export const BORDA_LUZ = "inset 0 1px 0 rgba(255,255,255,0.65), inset 0 0 0 1px rgba(255,255,255,0.20), inset 0 -1px 0 rgba(2,10,25,0.22)";

// Faixa de luz diagonal que atravessa a peça. progresso 0 a 1; fora disso, fica invisível.
export const ReflexoEspecular = ({ progresso, raio, intensidade = 0.5 }: { progresso: number; raio: number; intensidade?: number }) => {
  const estilo: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: raio,
    overflow: "hidden",
    pointerEvents: "none",
  };
  if (progresso <= 0 || progresso >= 1) return null;
  return (
    <div style={estilo}>
      <div
        style={{
          position: "absolute",
          top: "-60%",
          bottom: "-60%",
          width: "42%",
          left: `${-50 + progresso * 160}%`,
          rotate: "18deg",
          background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,${intensidade}) 50%, rgba(255,255,255,0) 100%)`,
        }}
      />
    </div>
  );
};

// Brilho fixo do vidro: mais claro no alto, como luz de estúdio sobre a peça.
export const BrilhoSuperior = ({ raio, forca = 0.34 }: { raio: number; forca?: number }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      borderRadius: raio,
      background: `linear-gradient(165deg, rgba(255,255,255,${forca}) 0%, rgba(255,255,255,${forca * 0.25}) 34%, rgba(255,255,255,0) 58%)`,
      pointerEvents: "none",
    }}
  />
);
