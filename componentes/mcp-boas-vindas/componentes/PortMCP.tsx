// Peça física do MCP: bloco verde-limão, dois pinos à esquerda que entram na lateral do painel e soquete à direita, de onde sai a linha.
// Fica do lado de fora do painel, para não cobrir os horários. Números na escala da spec (nome = 22 px).
import { C, FONTE } from "../marca";
import { K } from "./TintimCard";
import { ReflexoEspecular } from "./Vidro";

const LARGURA = 96;
const ALTURA = 66;
const RAIO = 18;
const VAO = 6; // folga entre o painel e o corpo da peça
export const SOBREPOSICAO = -VAO * K; // negativo: a peça começa depois da borda do painel
export const PORTA = { largura: LARGURA * K, altura: ALTURA * K };

const Pino = ({ topo }: { topo: number }) => (
  <div style={{ position: "absolute", left: -VAO - 7, top: topo, width: VAO + 11, height: 9, borderRadius: 3, background: C.lima, boxShadow: "0 0 0 1px rgba(10,28,51,.28)" }} />
);

export const PortMCP = ({
  x,
  y,
  opacidade = 1,
  escala = 1,
  deslocX = 0,
  deslocY = 0,
  rotacao = 0,
  flash = 0,
  reflexo = 0,
}: {
  x: number; // borda esquerda do corpo
  y: number; // centro vertical
  opacidade?: number;
  escala?: number;
  deslocX?: number;
  deslocY?: number;
  rotacao?: number;
  flash?: number; // 0 a 1: anel de luz no encaixe e na passagem dos pulsos
  reflexo?: number; // 0 a 1: faixa de luz
}) => (
  <div
    name="Porta MCP"
    style={{
      position: "absolute",
      left: x,
      top: y - PORTA.altura / 2,
      width: PORTA.largura,
      height: PORTA.altura,
      translate: `${deslocX}px ${deslocY}px`,
      rotate: `${rotacao}deg`,
      scale: escala,
      opacity: opacidade,
    }}
  >
    <div style={{ position: "absolute", left: 0, top: 0, width: LARGURA, height: ALTURA, scale: K, transformOrigin: "0 0" }}>
      <div name="Anel de luz" style={{ position: "absolute", inset: -9, borderRadius: RAIO + 9, border: `2px solid ${C.lima}`, opacity: flash, scale: 1 + (1 - flash) * 0.32 }} />
      <Pino topo={15} />
      <Pino topo={ALTURA - 15 - 9} />
      <div
        name="Corpo"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: RAIO,
          background: "linear-gradient(180deg, #F0F66B 0%, #E8F04F 100%)",
          color: C.navy,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONTE,
          fontWeight: 700,
          fontSize: 25,
          lineHeight: "30px",
          letterSpacing: "-0.01em",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.7), 0 14px 26px -8px rgba(5,12,30,.55)",
        }}
      >
        <ReflexoEspecular progresso={reflexo} raio={RAIO} intensidade={0.5} />
        MCP
      </div>
      <div name="Soquete" style={{ position: "absolute", right: -7, top: ALTURA / 2 - 7, width: 14, height: 14, borderRadius: "50%", background: C.navy, boxSizing: "border-box", border: `3px solid ${C.lima}` }} />
    </div>
  </div>
);
