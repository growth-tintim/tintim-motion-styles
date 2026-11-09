# Componentes

`mcp-boas-vindas/` tem o código Remotion do vídeo do MCP na versão da página (projeto do Kino 598cf966, "MCP abertura · sem Black"). O código foi copiado sem mudanças. Assim, ele é exatamente o que gerou o vídeo de referência, `mcp-tintim-pagina-14lufs.mp4`.

## Como reaproveitar

- **Copie mantendo as pastas.** Os imports são relativos (`../marca`, `../gatilhos`), então um arquivo copiado sozinho para outro lugar quebra.
- **Troque a mídia.** Imagens e sons aparecem como `kino:<id>`. Esses ids só existem no Kino do Mac do Jorge. Num projeto novo, importe o arquivo de novo e use o id novo. A tabela "Mídia" diz o que é cada id.
- **Instale a Eudoxus Sans.** Ela não vem do Google Fonts. Os arquivos estão em `frontend/fonts`, no `tintim-locals`. No Mac do Jorge ela já está instalada (Regular, Medium e Bold). Inter, Hanken Grotesk e Source Serif 4 vêm do `@remotion/google-fonts`.
- **Dependências:** `remotion`, `@remotion/media`, `@remotion/paths`, `@remotion/google-fonts` e `react`. O Kino resolve os imports sozinho, sem `package.json`, por isso a versão do Remotion não está fixada aqui.
- **Retime pelos gatilhos.** Os tempos ficam só em `gatilhos-marcio.ts`, em quadros a 30 fps. As cenas leem os tempos desse arquivo, então retimar para uma narração nova é mudar só os números.

## Arquivos

### Configuração (raiz)

| Arquivo | O que faz |
|---|---|
| `App.tsx` | Monta o vídeo: palco, narração, música e efeitos. Música em volume 0,0473 (15 LU abaixo da voz), fade-in de 1 s e fade-out a partir do compasso 48. |
| `marca.ts` | Cores do guia de marca, a fonte e os ids das imagens. |
| `gatilhos.ts` | Escolhe o arquivo de tempos conforme `versao.ts`. |
| `gatilhos-marcio.ts` | Quadro de cada evento, preso à narração do Marcio. É o arquivo do vídeo final. |
| `gatilhos-original.ts` | Tempos da primeira narração, da Fabíola. Fica como exemplo de anotação (quadro, segundo e palavra). |
| `versao.ts` | `"marcio"` no vídeo final. |
| `direcao.ts` | Estilo da resposta na cena 2: `1`, chat nativo. O código também tem 2 (tipografia de keynote) e 3 (cartão de dados). |
| `alternativa.ts` | `"B"`: a caixa de pedidos cresce até virar a janela do Claude. |
| `faixa.ts` | `true`: mostra a faixa vermelha na janela do Claude na cena 7. |

### Peças (`componentes/`)

| Arquivo | O que faz | Cena |
|---|---|---|
| `TintimCard.tsx` | Painel do Tintim com 5 leads e o contador "212 conversas". | 1 e 2 |
| `PortMCP.tsx` | Peça do MCP: corpo lima com a sigla em navy, dois pinos e soquete. Encaixa no painel na palavra "MCP". | 2 |
| `ConnectionLine.tsx` | Linha que se desenha com `evolvePath`, com brilho, ponta e pulsos verdes. | 2 |
| `BrandIcon.tsx` | Ícones do Meta Ads, Google Ads, Claude e ChatGPT, com entrada em mola. | 2 |
| `Resposta.tsx` | Pergunta e resposta em três estilos, escolhidos em `direcao.ts`. O vídeo usa o 1, chat nativo. | 2 |
| `Vidro.tsx` | Sombra, borda de luz e reflexo especular, usados na peça do MCP. | 2 |
| `camera.ts` | Ajuda para o `uiCamera` do Kino e curva de Hermite entre poses de câmera. | 1 e 2 |
| `caminhos.ts` | Ponto ao longo de um caminho SVG, com cache. | 1 e 2 |
| `MarcaClaude.tsx` | Logo do Claude, do Simple Icons (licença CC0), em #D97757. | 4 a 6 |
| `LogoPiscando.tsx` | Mascote oficial em SVG embutido, com a piscadela feita nos olhos do próprio vetor. | final |

### Cenas (`cenas/`)

| Arquivo | O que faz | Cena |
|---|---|---|
| `Palco.tsx` | Palco contínuo das cenas 1 e 2: quatro enquadramentos ligados por movimentos de 1,6 s, paralaxe e desfoque de profundidade. | 1 e 2 |
| `Tres.tsx` | Card das "3 coisas" nas variantes A, B e C, a barra em esqueleto e o chip "Conector Tintim". | 3 |
| `Cena34.tsx` | A caixa de pedidos vira a janela do Claude. Linha de ferramenta e tabela do diagnóstico com realce lima em cada item. Também é a moldura das partes 2 e 3. | 4 |
| `Partes23.tsx` | `RespostaRelatorio` (origem e funil 212, 118, 64 e 27) e `RespostaInspetor` ("Encontrei 6 vendas", "Permitir uma vez" com cursor, confirmação de R$ 1.240). Tem também o cursor, as fontes substitutas e a paleta do Claude. | 5 e 6 |
| `Final.tsx` | Painel do Tintim refeito com os tokens do `tintim-locals`, o modal "Adicionar conector personalizado", a tela "Autorizar acesso" e um cursor com três cliques. Depois, o logo com a piscadela. | 7 e final |

### Legado

`legado/144f3491/cenas/Cena34.tsx` é uma versão descartada das cenas 3 e 4, com lista tarjada e lupa. Ela fica só como referência de técnica. Não é o estilo aprovado.

## Mídia

| Id | O que é |
|---|---|
| `kino:c17edea6…` | Narração do Marcio com as pausas, versão da página |
| `kino:66983b31…` | Música Rhodes Chill (ColorFilmMusic, Envato) |
| `kino:e18b1384…` | Clique de interface |
| `kino:e016b8be…` | Encaixe do MCP |
| `kino:f062d793…` | "Pim" da piscadela (senoide de 2093 Hz) |
| `kino:b42d52ee…` | Logo do Tintim, branco |
| `kino:4999f6a8…` | Logo do Tintim, azul |
| `kino:802ccf4b…` | Ícone do app Claude |
| `kino:35b1105c…` | Ícone do app ChatGPT |
| `kino:0c8ce5b3…` | Logo do Meta, do site do Tintim (`logo-meta-crop.png`) |
| `kino:fef4323a…` | Logo do Google Ads, do site do Tintim, com o fundo limpo |

Os arquivos ficam no SSD externo, em `/Volumes/TOSHIBA EXT/kino-media/mcp-boas-vindas/`, e não neste repositório.

## Nomes que ficaram da versão da Black Friday

Em `gatilhos-marcio.ts`, os nomes `queBom`, `junto`, `compra`, `black` e `veio` vêm da abertura antiga, que falava da compra na Black Friday. O mesmo vale para o comentário "compra da Black Friday" em `Palco.tsx`. Na versão da página, os números foram refeitos para a frase "Existem duas maneiras de usar o Tintim", mas os nomes ficaram iguais. Num vídeo novo, renomeie os gatilhos com as palavras da fala nova.
