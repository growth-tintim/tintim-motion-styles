// Filme 1 da campanha de dezembro do MCP: "Lead ruim", versão vertical de 1 min (66 s) para o Instagram. 1080×1920, 30 qps, sem narração.
// Pedido do Jorge em 24/11: o filme de 66 s transformado para o celular. Tempos, textos e câmera: tempos.ts. Dados e nomes fictícios.
import React from "react";
import { Sequence } from "remotion";
import { Audio } from "@remotion/media";
import { S } from "./midia";
import { T } from "./tempos";
import { Palco } from "./pecas/Palco";
import { Tela } from "./pecas/Tela";
import { Cartela, Frase } from "./pecas/Fecho";

export default function App() {
  return (
    <>
      <Sequence name="Música · le-jazz short 03 (66 s, inteira)" from={0} durationInFrames={T.fim} layout="none">
        <Audio src={S.musica} volume={0.9} />
      </Sequence>
      <Sequence name="Efeitos · uma faixa (ferramentas/gera-efeitos.py)" from={0} durationInFrames={T.fim} layout="none">
        <Audio src={S.efeitos} volume={1} />
      </Sequence>
      <Sequence name="Palco" from={0} durationInFrames={T.fim} layout="none">
        <Palco inicio={0} />
      </Sequence>
      <Sequence name="Tela do iPhone" from={0} durationInFrames={T.someFim} layout="none">
        <Tela inicio={0} />
      </Sequence>
      <Sequence name="Frase final" from={T.some} durationInFrames={T.cartela + 9 - T.some} layout="none">
        <Frase inicio={T.some} />
      </Sequence>
      <Sequence name="Cartela" from={T.cartela} durationInFrames={T.fim - T.cartela} layout="none">
        <Cartela inicio={T.cartela} />
      </Sequence>
    </>
  );
}
