# Processo: do roteiro ao vídeo exportado

Este é o caminho que usamos no vídeo do MCP. As regras de estilo estão em `GUIA.md`.

## 1. Roteiro

- Escreva o roteiro cena a cena: locução, o que aparece na tela e a palavra da fala que dispara cada evento.
- Tire os fatos do produto de fontes reais, como a documentação, o código e os prompts oficiais, e não de memória. Diga no roteiro o que é estimativa.
- Defina antes onde o vídeo vai ser publicado. Isso decide o formato (horizontal ou vertical) e se o texto pode ter marca de tempo.

## 2. Voz

- O Jorge gera a narração no ElevenLabs, com a voz e as configurações do `GUIA.md` (seção 2), e salva em `~/Downloads` no Mac.
- Copie o arquivo para o SSD com um nome novo. O Kino reaproveita a mídia que tem o mesmo caminho e o mesmo tamanho, então um nome repetido traz o áudio velho.
- Para trocar um trecho, gere o parágrafo inteiro e emende numa troca de cena. Iguale o loudness da tomada nova ao do trecho que fica.

## 3. Tempos

- Transcreva com o CrisperWhisper 2.0 medium (`~/Documents/tintim/crisper`), com tempo por palavra.
- Confira as palavras-âncora na forma de onda. Erro acima de 0,1 s aparece na tela.
- Grave os gatilhos em quadros, num arquivo único (`gatilhos-*.ts`).

## 4. Montagem no Kino

- O app do Kino precisa estar aberto no Mac, porque a ligação é local. A documentação diz: "Your agent connects through the Kino desktop app, so keep it open while it works."
- A primeira chamada é sempre `getKinoInstructions`, porque o jeito de usar o Kino pode mudar entre versões.
- Cada projeto do Kino é código Remotion. Reaproveite os componentes de `componentes/` em vez de redesenhar.
- Nunca mexa no arquivo `.kino-mount`.
- Guarde toda a mídia no SSD externo, em `/Volumes/TOSHIBA EXT/kino-media/<projeto>/`, porque o disco do Mac tem pouco espaço.
- Antes de render ou export, confira o espaço com `df -h /`. Rode o que for pesado com `nice -n 19` e avise o Jorge antes.
- Alternativas viram projetos separados no Kino. Para não mexer na versão aprovada, faça uma cópia.

## 5. Revisão

- O Jorge assiste pelo link do projeto, `https://kino.ai/?project=<id>`.
- Ninguém do lado do Claude ouve o áudio. Mande medidas (tempos, loudness, pitch, andamento) e diga o que precisa ser ouvido.

## 6. Export e entrega

- Exporte em 1920×1080, 30 fps, H.264 com AAC.
- Meça o loudness integrado e o true peak. Gere a cópia em -14 LUFS e -1 dBTP só no áudio.
- Confira a duração, a ausência de quadro preto no início e no fim, o áudio do começo ao fim, e a cópia idêntica entre o SSD e o vault.
- Copie para o vault, em `execucao/atividades-ativas/<data>/`.
- Para subir no Google Drive pelo navegador, o limite da ferramenta é de 10 MB por arquivo. Vídeos maiores precisam do Drive para desktop instalado no Mac, ou de alguém subindo à mão.

## 7. Licenças

- Músicas e efeitos da Envato precisam ser registrados no projeto de uso. O Jorge cuida desse registro.
