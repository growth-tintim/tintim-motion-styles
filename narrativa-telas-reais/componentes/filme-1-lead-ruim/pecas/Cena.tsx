// Uma cena do filme: fundo, tela do computador e os sons daquele trecho, tudo lendo o mesmo relógio.
// O relógio é o do roteiro (roteiro.ts). Cada cena, no App.tsx, é uma janela desse relógio: "trimBefore" diz em que quadro
// do roteiro ela começa, "durationInFrames" quanto dura e "from" onde ela fica na linha do tempo. Por isso dá para mover,
// encurtar, alongar, dividir e mudar a velocidade de uma cena no Kino sem mexer nas outras: o som vai junto.
import React from "react";
import { Audio } from "@remotion/media";
import { S } from "../midia";
import { Palco } from "./Palco";
import { Tela } from "./Tela";

export const Cena = () => (
  <>
    <Palco />
    <Tela />
    <Audio src={S.efeitos} volume={1.25} />
  </>
);
