// Painel do Tintim no acabamento de lista de mensageiro. Todos os números internos valem para o nome em 22 px;
// o conjunto é escalado por K para entrar no mundo do palco sem mudar a câmera.
// O logo fica no palco, fora daqui: é ele que vira o cabeçalho do painel na transição da cena 1.
import { C, FONTE } from "../marca";

export const K = 12.5 / 22; // nome real no mundo do palco / nome da spec
const RECUO = 28;
const RAIO = 30;
const TOPO = 70; // recuo 28 + logo 30 + 12
const LINHA = 89; // spec: 85. Referências medidas: 4,04 a 4,58 vezes o nome, ou seja, 89 a 101
const AVATAR = 54; // spec: 50. Referências medidas: 2,44 a 3,21 vezes o nome, ou seja, 54 a 71
const INICIO_TEXTO = RECUO + AVATAR + 16;
const LARGURA = 552;
const N_LINHAS = 5;
const SOBRA_BASE = 10; // a última linha tem 18 abaixo do texto; 10 a mais completam os 28
const ALTURA = TOPO + N_LINHAS * LINHA + SOBRA_BASE;
const CENTRO = { x: 616, y: 541 }; // mesmo centro da versão anterior: a câmera não muda

export const PAINEL = {
  x: CENTRO.x - (LARGURA * K) / 2,
  y: CENTRO.y - (ALTURA * K) / 2,
  largura: LARGURA * K,
  altura: ALTURA * K,
  recuo: RECUO * K,
  alturaLogo: 30 * K,
};

const INK = "#0E1525";
const SEC = "#5A6170";
const TER = "#7B818D"; // spec: #959BA6. Referências medidas: de #5E5E5E a #8A8A8E

const LogoMeta = () => (
  <svg width={21} height={21} viewBox="0 0 24 24" style={{ flexShrink: 0, display: "block" }}>
    <path
      fill="#0866FF"
      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
    />
  </svg>
);

const LogoGoogleAds = () => (
  <svg width={21} height={21} viewBox="0 0 24 24" style={{ flexShrink: 0, display: "block" }}>
    <path
      fill="#FBBC04"
      d="M7.5137 4.8438L1.5645 15.1484A4.5 4.5 0 0 1 4 14.4297c2.5597-.0075 4.6248 2.1585 4.4941 4.7148l3.2168-5.5723-3.6094-6.25c-.4499-.7793-.6322-1.6394-.5878-2.4784z"
    />
    <path
      fill="#4285F4"
      d="M23.4641 16.9287L15.4632 3.072C14.3586 1.1587 11.9121.5028 9.9988 1.6074S7.4295 5.1585 8.5341 7.0718l8.0009 13.8567c1.1046 1.9133 3.5511 2.5679 5.4644 1.4646 1.9134-1.1046 2.568-3.5511 1.4647-5.4644z"
    />
    <path
      fill="#34A853"
      d="M3.9998 22.9291C1.7908 22.9291 0 21.1383 0 18.9293s1.7908-3.9998 3.9998-3.9998 3.9998 1.7908 3.9998 3.9998-1.7908 3.9998-3.9998 3.9998z"
    />
  </svg>
);

const LINHAS = [
  { ini: "AL", h: 262, nome: "Ana Lima", hora: "14:32", previa: "Oi! Vi o anúncio, ainda tem horário amanhã?", Origem: LogoMeta },
  { ini: "BR", h: 214, nome: "Bruno Reis", hora: "14:18", previa: "Qual o valor da consulta?", Origem: LogoGoogleAds },
  { ini: "CD", h: 152, nome: "Carla Dias", hora: "13:55", previa: "Pode me mandar o endereço?", Origem: LogoMeta },
  { ini: "DM", h: 28, nome: "Diego Melo", hora: "13:41", previa: "Vocês parcelam no cartão?", Origem: LogoMeta },
  { ini: "EN", h: 338, nome: "Elisa Nunes", hora: "13:07", previa: "Quero agendar para sábado", Origem: LogoGoogleAds },
];

export const TintimCard = ({
  entrada,
  entradaLinhas,
  recuo = 0,
  chegada = 0,
  leitura = null,
  contador = 0,
  opacidadeContador = 0,
  escalaCamera = 1,
  cameraY = 540,
  alinhar = true,
}: {
  entrada: number; // 0 a 1
  entradaLinhas: number[];
  recuo?: number;
  chegada?: number; // 0 a 1: anel quando um pulso entra
  leitura?: number | null; // 0 a 1: faixa de luz que percorre as linhas
  contador?: number;
  opacidadeContador?: number;
  escalaCamera?: number; // zoom atual: o separador fica com 1 px na tela
  cameraY?: number; // ponto do mundo no centro vertical do quadro
  alinhar?: boolean; // só com a câmera parada: em movimento, o ajuste faria a linha pular em degraus
}) => {
  const alturaLinhas = N_LINHAS * LINHA;
  const faixaY = leitura === null ? null : leitura * (alturaLinhas + 105) - 52;
  const fio = 1 / (K * escalaCamera);
  // Alinha o topo do separador a um pixel inteiro da tela: em posição fracionária ele se divide em duas linhas e parece borrado.
  const ajusteFio = (i: number) => {
    // Math.round: o navegador arredonda a origem de um elemento com transform para pixel inteiro do mundo.
    const yMundo = Math.round(PAINEL.y) + (TOPO + (i + 1) * LINHA - fio) * K;
    const yTela = (yMundo - cameraY) * escalaCamera + 540;
    return alinhar ? (Math.round(yTela) - yTela) * fio : 0;
  };
  return (
    <div
      name="Painel do Tintim"
      style={{
        position: "absolute",
        left: PAINEL.x,
        top: PAINEL.y,
        width: PAINEL.largura,
        height: PAINEL.altura,
        opacity: Math.min(1, entrada * 1.4),
        scale: 0.94 + 0.06 * entrada,
        transformOrigin: "16% 8%",
        translate: `${recuo}px 0px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: LARGURA,
          height: ALTURA,
          scale: K,
          transformOrigin: "0 0",
          borderRadius: RAIO,
          overflow: "hidden",
          background: C.branco,
          color: INK,
          fontFamily: FONTE,
          boxShadow: `0 1px 1px rgba(5,12,30,.25), 0 10px 20px -6px rgba(5,12,30,.35), 0 34px 70px -18px rgba(5,12,30,.6), 0 0 0 ${2.5 * chegada}px rgba(232,240,79,${Math.pow(chegada, 3)})`, // cai rápido: lima translúcido sobre navy vira verde-oliva
        }}
      >
        <div
          style={{
            position: "absolute",
            top: RECUO,
            left: RECUO,
            right: RECUO,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: 17,
            lineHeight: "20px",
            fontWeight: 500,
            color: TER,
            fontVariantNumeric: "tabular-nums",
            opacity: Math.min(1, entrada) * opacidadeContador,
          }}
        >
          {contador} conversas
        </div>
        <div style={{ position: "absolute", top: TOPO, left: 0, width: LARGURA }}>
          {LINHAS.map((l, i) => {
            const centro = i * LINHA + LINHA / 2;
            const luz = faixaY === null ? 0 : Math.exp(-Math.pow((faixaY - centro) / 42, 2));
            const e = entradaLinhas[i];
            return (
              <div
                key={l.nome}
                style={{
                  position: "relative",
                  height: LINHA,
                  padding: `0 ${RECUO}px`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  background: `rgba(22,112,203,${0.1 * luz})`,
                  opacity: Math.min(1, e),
                  translate: `0px ${(1 - e) * 9}px`,
                }}
              >
                <div
                  style={{
                    width: AVATAR,
                    height: AVATAR,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: `hsl(${l.h} 75% 94%)`,
                    color: `hsl(${l.h} 45% 38%)`,
                    boxShadow: `inset 0 0 0 1px hsl(${l.h} 50% 88%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {l.ini}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ fontSize: 22, lineHeight: "28px", fontWeight: 700, letterSpacing: "-0.01em" }}>{l.nome}</div>
                    <div style={{ fontSize: 18, lineHeight: "28px", fontWeight: 500, color: TER, fontVariantNumeric: "tabular-nums" }}>{l.hora}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, height: 25 }}>
                    <div style={{ fontSize: 18.5, lineHeight: "25px", fontWeight: 500, color: SEC, whiteSpace: "nowrap", wordSpacing: "0.06em" }}>{l.previa}</div>
                    <l.Origem />
                  </div>
                </div>
                {i < N_LINHAS - 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      left: INICIO_TEXTO,
                      right: RECUO,
                      top: 0,
                      height: 1,
                      // Espessura e posição por transform: o navegador arredonda height e top para pixels inteiros
                      // antes da escala, e 1 px da spec vira 1,5 px na tela, em duas linhas e com intensidades diferentes.
                      transform: `translateY(${LINHA - fio + ajusteFio(i)}px) scaleY(${fio})`,
                      transformOrigin: "0 0",
                      background: "rgba(14,21,37,.12)",
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
