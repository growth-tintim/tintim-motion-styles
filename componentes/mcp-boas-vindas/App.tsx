import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { Palco } from "./cenas/Palco";
import { T } from "./gatilhos";

// Trilha: Rhodes Chill (ColorFilmMusic, Envato), escolhida por Jorge. Licença a registrar depois por ele.
// Voz -21,5 LUFS; faixa -10,0 LUFS nos 105,8 s usados. Volume 0,0473 deixa a música 15 LU abaixo da voz, constante.
// Sem música: troque VOLUME_MUSICA por 0.
const VOLUME_MUSICA = 0.0473;
// A 112 BPM o compasso dura 2,143 s, e a faixa começa numa cabeça de compasso. A saída começa no compasso 48, em 102.86 s.
const INICIO_SAIDA = 3086;
const Musica = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Audio
      src="kino:66983b31-c73e-4e19-b577-08d895883294"
      volume={interpolate(frame, [0, fps, INICIO_SAIDA, T.fim], [0, VOLUME_MUSICA, VOLUME_MUSICA, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })}
    />
  );
};

export default function GeneratedScene() {
  return (
    <>
      <Sequence name="Cenas 1 e 2 · Palco contínuo" from={0} durationInFrames={T.fim} layout="none">
        <Palco />
      </Sequence>
      <Sequence name="Narração · Marcio, com pausas" from={0} durationInFrames={T.corteAudio} layout="none">
        <Audio src="kino:c17edea6-0d1e-498a-990a-e20ce776b3c8" style={{ zIndex: 100 }} />
      </Sequence>
      <Sequence name="Música · Rhodes Chill" from={0} durationInFrames={T.fim} layout="none">
        <Musica />
      </Sequence>
      <Sequence name="SFX · Clique do logo" from={T.tintim} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.45} />
      </Sequence>
      <Sequence name="SFX · Encaixe do MCP" from={T.mcp} durationInFrames={6} layout="none">
        <Audio src="kino:e016b8be-a890-4025-a11b-7e790957388a" volume={0.7} />
      </Sequence>
      <Sequence name="SFX · Clique da pergunta" from={T.pergunta} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
      <Sequence name="SFX · Clique da resposta" from={T.fimContas + 28} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
      <Sequence name="SFX · Clique em Permitir uma vez" from={T.clique3} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
      {/* Pim único, sintetizado: um tom puro em Dó 7, no quadro em que o olho fecha. */}
      <Sequence name="SFX · Pim na piscadela" from={T.piscada + 3} durationInFrames={6} layout="none">
        <Audio src="kino:f062d793-420b-4f2f-a141-0978bbd4e59c" volume={0.25} />
      </Sequence>
      <Sequence name="SFX · Clique em Adicionar o Tintim ao Claude" from={T.cliqueBtn} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
      <Sequence name="SFX · Clique em Continuar" from={T.cliqueCont} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
      <Sequence name="SFX · Clique em Autorizar" from={T.cliqueAut} durationInFrames={3} layout="none">
        <Audio src="kino:e18b1384-26da-403f-b1a0-dd50e40a196e" volume={0.3} />
      </Sequence>
    </>
  );
}
