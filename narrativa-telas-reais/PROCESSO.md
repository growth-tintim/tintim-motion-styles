# Processo: da ideia ao filme exportado

O caminho usado no filme 1, já com o que mudaríamos se começássemos hoje. As regras de estilo estão no `GUIA.md`. Os números entre parênteses são os do filme 1.

Tempo real do filme 1, para planejar: a primeira versão no estilo (v3) levou cerca de 1h20 depois do pedido. As seis versões seguintes levaram de 7 a 25 minutos cada, quase tudo gasto em render fora do Kino. Trabalhando direto no Kino, um ajuste aparece no player em segundos e o export leva menos de 1 minuto.

---

## 0. Antes de começar

1. **Confirme que o estilo serve** (GUIA, seção 1.1). Se a peça precisa explicar um mecanismo, o estilo é o explicativo.
2. **Abra a conversa com o Kino.** A primeira chamada é sempre `getKinoInstructions`, porque o jeito de usar o Kino muda entre versões. O app precisa estar aberto no Mac do Jorge.
3. **Crie um arquivo de falas do Jorge.** Tudo o que ele disser como correção entra ali palavra por palavra, com data e hora, antes de qualquer resumo.
4. **Um filme por projeto do Kino.** Alternativa que precisa ser vista lado a lado vira projeto separado. Não acumule projetos, e diga quais podem ser apagados.

## 1. História em uma página

Escreva, antes de qualquer código, uma tabela com uma linha por ato (GUIA, seção 2.2):

| Ato | Quem fala | O que ele pede | O que o produto responde | O que o protagonista faz com a resposta | Fio pessoal |
|---|---|---|---|---|---|

Confira nessa página:

- Quem abre reclamando e como essa pessoa fecha (GUIA 2.3).
- De 3 a 5 casos de trabalho, com tipos de pedido diferentes (GUIA 2.8).
- No máximo dois fios pessoais, com a piada diminuindo (GUIA 2.7).
- Uma hesitação ou erro por ato (GUIA 2.6).
- Cada fala passa no teste de realismo (GUIA 3.1).
- Os fatos do produto vêm de fonte real: a documentação do MCP, o código, os prompts oficiais. Marque o que é estimativa.

Mande a página ao Jorge se a história for nova. Se ele já descreveu a história, comece a produzir e mostre o filme, porque ele julga melhor vendo.

## 2. Música

1. Peça ao Jorge a pasta da trilha, ou use a que ele indicar. Liste **a pasta original inteira** e meça a duração de cada arquivo antes de dizer o que existe (GUIA 5.1).
2. Escolha o corte cuja duração serve ao filme. A duração do filme passa a ser essa.
3. Meça andamento, primeiro tempo e estrutura (GUIA 5.2). Anote: entrada da banda, início e fim do solo, último ataque da banda e cada nota do trecho final.
4. Escreva `TEMPO`, `bt` e `bar` em `geometria.ts`.
5. Confirme com o Jorge que a licença da trilha cobre anúncio. Quem registra o uso é ele.

## 3. Roteiro em quadros

Escreva o `roteiro.ts` nesta ordem, porque cada bloco depende do anterior:

1. **`T`, os marcos.** Primeiro os que a música impõe: entrada da banda, início do solo, parada, notas finais. Depois distribua os casos entre eles.
2. **`CHATS`.** Conversas com histórico, horas e as mensagens do filme presas aos marcos.
3. **`DIG`.** As digitações, encaixadas entre o clique no campo e o envio (`digitaEntre`) ou terminando num quadro (`digitaAte`).
4. **`TURNOS`.** Perguntas e respostas da IA, linha por linha, com as ferramentas reais.
5. **`ABRE`, `RASCUNHOS` e `AVISOS`.**
6. **`CAMERA`.** Uma chave por enquadramento. Parada na leitura, exceções declaradas (GUIA 7.1).
7. **`MOVS` e `CLIQUES`.** O cursor por último, porque ele depende de onde as coisas estão em cada quadro.

Depois rode a tabela de tempos e leia os números antes de olhar um quadro:

```bash
npx esbuild ferramentas/tabela-de-tempos.ts --bundle --platform=node --outfile=out/tabela.cjs --log-level=error && node out/tabela.cjs
```

O que procurar na tabela:

- Marcos importantes com desvio zero em relação ao tempo da música.
- Intervalos entre chicotes encolhendo, sem um intervalo maior depois de um menor (fora o pouso final).
- Digitações da introdução abaixo de 18 caracteres por segundo, e as do solo de 28 a 37.
- Para cada mensagem que carrega a história, o tempo que ela pede pela régua de 17 caracteres por segundo. Compare com o tempo que ela fica em quadro.

## 4. Telas

1. Para cada tela, busque a fonte na ordem: código público do produto, imagem oficial, observação (GUIA 9.1). Não peça print ao Jorge e não contorne proteção contra robô.
2. Reaproveite as peças de `componentes/filme-1-lead-ruim/pecas/`. Copie mantendo as pastas, porque os imports são relativos.
3. Releia o código do produto para ver se a tela mudou desde 22/11/2026.
4. Escreva no cabeçalho de cada peça de onde veio cada medida e o que é estimativa.
5. Tela nova segue o mesmo contrato: recebe o quadro e lê tudo do roteiro, sem estado próprio.

## 5. Som

1. Ache os sons reais de cada tela no código do próprio produto, e a regra de quando cada um toca (GUIA 10.2).
2. Teclado e mouse: use o banco em `sons-reais/` (domínio público).
3. Os dois sons do WhatsApp não estão no repositório, porque são arquivos da Meta. Os endereços estão em `sons-reais/FONTES.md`. Baixe, converta para WAV de 48 kHz e ponha na mesma pasta.
4. Gere a faixa:

```bash
npx esbuild ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja.cjs --log-level=error && node out/despeja.cjs
python3 ferramentas/gera-efeitos.py   # precisa de numpy; grava out/sfx-efeitos.wav
```

5. **Toda vez que um evento mudar de quadro, gere a faixa de novo.** Se só mudou texto que chega com o WhatsApp em foco, a faixa sai idêntica: confira com `cmp` em vez de supor.
6. Copie a faixa para o SSD **com nome novo** a cada versão (`sfx-v3-5-efeitos.wav`). O Kino reaproveita a mídia que tem o mesmo caminho e o mesmo tamanho, então um nome repetido traz o áudio velho.
7. Importe no Kino com `addMediaToKino` e ponha o id novo em `midia.ts`. Se uma importação ficar presa na fila, importe de novo com outro nome em vez de esperar.

## 6. Montagem no Kino, em cenas desde o primeiro dia

1. Mídia no SSD externo, em `/Volumes/TOSHIBA EXT/kino-media/<projeto>/` (`audio/`, `export/`). O disco do Mac tem pouco espaço.
2. O código vai na pasta do projeto, em `/Users/chll/.kino/Projects.nosync/<id do projeto>/`. O Kino sincroniza em segundos. **Nunca mexa na pasta `.kino-mount`.**
3. `App.tsx` com a música numa `<Sequence>` contínua e uma `<Sequence>` por cena, com `from`, `trimBefore` e `durationInFrames` (GUIA 11.2). Toda `<Sequence>` com `layout="none"`. Não gere as cenas com `.map()`: o Kino precisa de um nó escrito por clipe.
4. Corte as cenas onde a história muda de assunto (no filme 1: 19 cenas de tela, mais a frase final e a cartela). Dê nome numerado e humano: "10 · A esposa", "18 · Vai e vem".
5. Confira no Kino com `timelineGet` que aparece um clipe por cena, com o nome da cena.
6. **Antes de gravar qualquer arquivo no projeto, compare a soma (`md5sum`) com a última versão que você gravou.** Se mudou, foi o Jorge editando no Kino: traga a versão dele para a sua pasta e edite em cima dela, no lugar (por exemplo com `sed`), sem substituir o arquivo.
7. O Kino pode reescrever arquivos por conta própria quando o Jorge mexe na linha do tempo (acrescenta `zIndex`, repassa `style`). Trate o que está no projeto como a verdade.

## 7. Conferir sem render

1. `projectScreenshot` com os instantes **em segundos** (quadro ÷ 30). Até 10 por chamada, e várias entradas voltam numa folha só.
2. Olhe sempre: o primeiro quadro, cada tela que mudou, o meio de um chicote, a última tela, o slogan e a cartela.
3. Avise o Jorge de qual cena tocar: "dê play na cena 19 · Renato dá razão".
4. Sobre render, a regra do Kino é: "Use Render In to Out only if the user explicitly asks, or playback is severely degraded".

## 8. Ciclo de correção com o Jorge

1. Guarde a fala dele palavra por palavra.
2. Responda em até 20 palavras dizendo o primeiro passo.
3. Leia o pedido no menor tamanho possível (GUIA, seção 13). Na dúvida entre duas leituras, faça a menor e diga qual foi.
4. Mude o roteiro. Rode a tabela de tempos. Gere a faixa de efeitos de novo, se algum evento mudou de quadro.
5. Confira pelos quadros do Kino.
6. Responda com: o que mudou, em números (antes e depois); de onde saiu o tempo; o que é palpite; o que você não conseguiu conferir. Sempre diga que você mede o áudio, mas não ouve.
7. Exporte só quando ele pedir ou aprovar. O export pesa no Mac dele por cerca de 1 minuto.

Se a pergunta dele for de opinião, dê a sua, com os motivos e com o grau de confiança, e sustente até aparecer um argumento novo. A decisão é dele, e uma vez tomada se executa sem pedir de novo.

## 9. Export

`exportVideo` com: pasta de saída `/Volumes/TOSHIBA EXT/kino-media/<projeto>/export`, nome com a versão (`…-v3-6-kino`), contêiner `mp4`, vídeo `h264`, taxa `very-high`. Acompanhe com `getVideoExportTask` (filme 1: 40 a 55 s).

**Conferência obrigatória do arquivo:**

```bash
# quadros, duração, tamanho e taxa
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,nb_read_frames,duration -of default=nw=1 filme.mp4
# volume médio e pico
ffmpeg -hide_banner -i filme.mp4 -af volumedetect -vn -f null - 2>&1 | grep -E "mean_volume|max_volume"
# folha de quadros: troque os números pelos quadros que mudaram
ffmpeg -hide_banner -loglevel error -y -i filme.mp4 -vf "select='eq(n,1218)+eq(n,1345)+eq(n,1700)+eq(n,1750)+eq(n,1800)+eq(n,1960)',scale=960:-1,tile=3x2" -vsync 0 -frames:v 1 folha.jpg
```

| Conferir | Valor do filme 1 |
|---|---|
| Quadros e duração | 1980 quadros, 66,0 s |
| Imagem | 1920×1080, 30 quadros por segundo, H.264 |
| Áudio | AAC, 48 kHz, estéreo, do começo ao fim |
| Volume | média de -19,1 dB, pico de -2,8 dB |
| Folha de quadros | Olhada de fato: lista, chicote, última tela, slogan, cartela |
| Mudança entre versões | Só o que foi pedido mudou. Quando nada deveria mudar, compare os dois arquivos |

Depois: copie o arquivo para a pasta de arquivos do projeto e guarde o código da versão numa pasta nova, ao lado das anteriores. A cópia nessa pasta pode sair alguns KB maior que a original (a pasta regrava o arquivo), com os mesmos quadros e as mesmas amostras de áudio. Confira por conteúdo, e não por tamanho.

Ainda por fazer neste estilo: a cópia com o áudio em -14 LUFS e -1 dBTP, como pede o guia explicativo.

## 10. Plano B: render fora do Kino

Só quando o Kino estiver de fato parado, **conferido na hora** (olhe a data do último arquivo sincronizado antes de afirmar).

- Projeto Remotion comum (versão 4.0.545 no filme 1), com `midia-local.ts.txt` no lugar de `midia.ts`.
- Renderize só o trecho que mudou. A opção do Remotion é `--frames`, descrita na ajuda como "Frame range". O filme inteiro só depois do OK.
- Fora do Kino as fontes são substitutas (Inter no lugar da SF Pro) e o emoji é outro. O arquivo final sai sempre do Kino.
- Um render inteiro do filme 1 na nuvem levou cerca de 8 minutos. O export do Kino levou 55 s.

## 11. O que guardar quando o filme fecha

1. O código da versão final, com as ferramentas, nesta pasta do repositório (`componentes/<filme>/`).
2. Uma `ANATOMIA` do filme: cenas, marcos e histórico de versões.
3. As regras novas ou corrigidas no `GUIA.md`, com a fala do Jorge que as originou.
4. A mesma atualização na skill `tintim-narrativa-telas-reais`, para a próxima conversa já começar sabendo.
