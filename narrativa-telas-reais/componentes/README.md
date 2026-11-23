# Componentes

`filme-1-lead-ruim/` tem o código Remotion do filme 1 na versão 3.6 de computador, copiado do projeto do Kino `rb84rGYVNB` em 23/11/2026. Os arquivos do filme são idênticos, byte a byte, aos do projeto. Por isso alguns comentários de cabeçalho estão desatualizados: `roteiro.ts` ainda diz "versão 3.4" e `App.tsx` diz "versão 3.5". O conteúdo dos dois é o da 3.6.

Só as ferramentas foram ajustadas para rodar a partir desta pasta, e uma é nova (`tabela-de-tempos.ts`).

## Como reaproveitar

- **Copie mantendo as pastas.** Os imports são relativos.
- **Troque a mídia.** `midia.ts` aponta para ids `kino:<id>`, que só existem no Kino do Mac do Jorge. Num projeto novo, importe os arquivos de novo e use os ids novos. Fora do Kino, use `midia-local.ts.txt` (renomeie para `midia.ts`) e ponha os arquivos em `public/`.
- **Fontes.** Eudoxus Sans precisa estar instalada (está no Mac do Jorge). O WhatsApp usa a fonte do sistema, que no Mac é a SF Pro. Hanken Grotesk e Source Serif 4 vêm do `@remotion/google-fonts`.
- **Dependências:** `remotion`, `@remotion/media`, `@remotion/google-fonts` e `react`. O Kino resolve os imports sozinho.
- **Para um filme novo, reescreva o `roteiro.ts` e a grade de `geometria.ts`.** As peças leem tudo de lá.

## Arquivos

| Arquivo | O que faz |
|---|---|
| `App.tsx` | A linha do tempo: música, 19 cenas de tela, frase final e cartela. Cada cena é uma `<Sequence>` com `trimBefore` |
| `roteiro.ts` | O filme inteiro em dados: marcos, digitações, conversas, perguntas e respostas, avisos, câmera, cursor e lista de sons |
| `geometria.ts` | Tamanho do quadro e da janela, a grade da música (`TEMPO`, `bt`, `bar`), as curvas e o percurso da câmera por chaves |
| `marca.ts` | Cores do Tintim, do WhatsApp Web (variáveis `--WDS-*`), do Claude e do Chrome, e as fontes |
| `icones.ts` | Ícones do WhatsApp Web, copiados do código público do site. São desenho da Meta e servem só para reproduzir a tela |
| `midia.ts` | Ids das mídias no Kino. `midia-local.ts.txt` é a versão para render fora do Kino |
| `pecas/Cena.tsx` | Uma cena: palco, tela e faixa de efeitos, lendo o relógio do roteiro |
| `pecas/Tela.tsx` | A câmera, as duas janelas lado a lado do solo, o borrão de movimento e o cursor |
| `pecas/Navegador.tsx` | Moldura do Chrome, com as duas abas e o contador "(N) WhatsApp" |
| `pecas/WhatsAppWeb.tsx` | WhatsApp Web movido a dados: lista que reordena, não lidas, tiques, "digitando...", rascunhos |
| `pecas/ClaudeWeb.tsx` | Claude: pergunta, linhas de ferramenta, resposta em blocos, marca-texto e seleção de texto |
| `pecas/Avisos.tsx` | Avisos de mensagem no canto do quadro |
| `pecas/Palco.tsx` | Fundo navy da marca, com a luz verde que acompanha o WhatsApp |
| `pecas/Fecho.tsx` | As duas linhas do slogan e a cartela com a piscada |
| `pecas/LogoPiscando.tsx` e `pecas/MarcaClaude.tsx` | Logo oficial do Tintim com o olho animado, e o símbolo do Claude |
| `ferramentas/tabela-de-tempos.ts` | Imprime marcos, chicotes, velocidade das digitações e o tempo de leitura que cada mensagem pede |
| `ferramentas/despeja.ts` | Exporta a lista de sons do roteiro para `out/sons.json` |
| `ferramentas/gera-efeitos.py` | Monta a faixa de efeitos a partir de `out/sons.json` e de `sons-reais/` |
| `ferramentas/recorta.py` | Recorta toques isolados de uma gravação de teclado e gera o banco `.npz` |
| `sons-reais/` | `FONTES.md`, o banco de teclas e o clique de mouse (os dois em CC0) |

## Como rodar as ferramentas

A partir de `filme-1-lead-ruim/`, numa pasta em que o pacote `remotion` esteja instalado (o roteiro importa o Remotion):

```bash
npx esbuild ferramentas/tabela-de-tempos.ts --bundle --platform=node --outfile=out/tabela.cjs --log-level=error && node out/tabela.cjs
npx esbuild ferramentas/despeja.ts --bundle --platform=node --outfile=out/despeja.cjs --log-level=error && node out/despeja.cjs
python3 ferramentas/gera-efeitos.py
```

`gera-efeitos.py` precisa do numpy e dos dois sons do WhatsApp em `sons-reais/` (veja `FONTES.md`). Conferido em 23/11/2026: com o roteiro da 3.6, a faixa gerada sai idêntica, byte a byte, à que está no filme.

## Mídia

| Id | O que é |
|---|---|
| `kino:588c9993…` | Música, `le-jazz_short-03_66sec.wav` |
| `kino:290a02a2…` | Faixa de efeitos, `sfx-v3-5-efeitos.wav` (vale também para a 3.6) |
| `kino:4999f6a8…` | Logo do Tintim, azul |
| `kino:802ccf4b…` | Ícone do app Claude |
| `kino:35b1105c…` | Ícone do app ChatGPT |
| `kino:2f61c4a1…` | Papel de parede escuro do WhatsApp Web |
