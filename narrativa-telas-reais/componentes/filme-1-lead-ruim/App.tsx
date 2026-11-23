// Filme 1 da campanha de dezembro do MCP, versão 3.5 de computador, em cenas. 1920×1080, 30 qps, 66 s, sem narração.
// Um gestor de tráfego responde quatro clientes, a esposa e o amigo do futebol ao mesmo tempo, com o Tintim dentro do Claude.
// O filme é um plano contínuo escrito em roteiro.ts. Aqui ele aparece cortado em cenas: cada uma é uma janela do roteiro
// (trimBefore = quadro do roteiro em que a cena começa). Lado a lado, sem mexer, elas dão exatamente o filme inteiro.
// Dados e nomes fictícios.
import React from "react";
import { Sequence } from "remotion";
import { Audio } from "@remotion/media";
import { S } from "./midia";
import { Palco } from "./pecas/Palco";
import { Cena } from "./pecas/Cena";
import { Cartela, Frase } from "./pecas/Fecho";

export default function App() {
  return (
    <>
      <Sequence name="Música · le-jazz short 03 (66 s)" from={0} durationInFrames={1980} layout="none">
        <Audio src={S.musica} volume={0.9} />
      </Sequence>
      <Sequence name="Fundo do fecho" from={1768} trimBefore={1768} durationInFrames={212} layout="none">
        <Palco />
      </Sequence>
      <Sequence name="01 · Renato reclama" from={0} trimBefore={0} durationInFrames={107} layout="none">
        <div name="01 · Renato reclama" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="02 · A fila cresce" from={107} trimBefore={107} durationInFrames={73} layout="none">
        <div name="02 · A fila cresce" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="03 · Beto pede dinheiro" from={180} trimBefore={180} durationInFrames={35} layout="none">
        <div name="03 · Beto pede dinheiro" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="04 · Pergunta ao Claude sobre o Renato" from={215} trimBefore={215} durationInFrames={120} layout="none">
        <div name="04 · Pergunta ao Claude sobre o Renato" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="05 · Claude responde e ele copia" from={335} trimBefore={335} durationInFrames={160} layout="none">
        <div name="05 · Claude responde e ele copia" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="06 · Cola a resposta para o Renato" from={495} trimBefore={495} durationInFrames={84} layout="none">
        <div name="06 · Cola a resposta para o Renato" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="07 · Abre a Dra. Paula" from={579} trimBefore={579} durationInFrames={89} layout="none">
        <div name="07 · Abre a Dra. Paula" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="08 · Pergunta ao Claude sobre os anúncios" from={668} trimBefore={668} durationInFrames={106} layout="none">
        <div name="08 · Pergunta ao Claude sobre os anúncios" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="09 · Claude responde os anúncios" from={774} trimBefore={774} durationInFrames={92} layout="none">
        <div name="09 · Claude responde os anúncios" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="10 · A esposa" from={866} trimBefore={866} durationInFrames={205} layout="none">
        <div name="10 · A esposa" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="11 · Responde a Dra. Paula" from={1071} trimBefore={1071} durationInFrames={78} layout="none">
        <div name="11 · Responde a Dra. Paula" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="12 · Abre a Marcela" from={1149} trimBefore={1149} durationInFrames={58} layout="none">
        <div name="12 · Abre a Marcela" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="13 · Claude move para Negociação" from={1207} trimBefore={1207} durationInFrames={140} layout="none">
        <div name="13 · Claude move para Negociação" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="14 · Responde a Marcela" from={1347} trimBefore={1347} durationInFrames={55} layout="none">
        <div name="14 · Responde a Marcela" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="15 · Abre o Seu Barão" from={1402} trimBefore={1402} durationInFrames={71} layout="none">
        <div name="15 · Abre o Seu Barão" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="16 · Claude conta as conversas do Barão" from={1473} trimBefore={1473} durationInFrames={93} layout="none">
        <div name="16 · Claude conta as conversas do Barão" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="17 · Responde o Barão" from={1566} trimBefore={1566} durationInFrames={34} layout="none">
        <div name="17 · Responde o Barão" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="18 · Vai e vem" from={1600} trimBefore={1600} durationInFrames={67} layout="none">
        <div name="18 · Vai e vem" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="19 · Renato dá razão" from={1667} trimBefore={1667} durationInFrames={101} layout="none">
        <div name="19 · Renato dá razão" style={{ position: "absolute", inset: 0 }}>
          <Cena />
        </div>
      </Sequence>
      <Sequence name="20 · Frase final" from={1768} trimBefore={1768} durationInFrames={109} layout="none">
        <Frase />
      </Sequence>
      <Sequence name="21 · Cartela" from={1868} trimBefore={1868} durationInFrames={112} layout="none">
        <Cartela />
      </Sequence>
    </>
  );
}
