# Narrativa com telas reais

O segundo estilo de motion do Tintim: um anúncio sem narração, em que a história é contada pelo que acontece em telas de software refeitas com fidelidade, no ritmo de uma música. Nasceu no filme 1 da campanha de dezembro do MCP ("Lead ruim"), fechado em 23/11/2026 na versão 3.6.

O Jorge, sobre o resultado: "Isso ficou uma verdadeira narrativa com telas reais de software, um estilo do cacete pra fazer propaganda no geral."

## O que tem aqui

| Arquivo | Para que serve | Quando ler |
|---|---|---|
| `GUIA.md` | As regras do estilo, cada uma com o número exato, o porquê e a fala do Jorge que a originou. História, texto das conversas, fecho, música, ritmo, câmera, cursor, telas, som, código, entrega e como trabalhar com o Jorge | Antes de escrever qualquer coisa |
| `PROCESSO.md` | O passo a passo, da história em uma página ao arquivo conferido, com os comandos | Durante a produção |
| `FILME-1-ANATOMIA.md` | O filme de referência cena por cena, o mapa de tempos completo e o histórico das nove versões | Para ver as regras aplicadas |
| `SKILL.md` | O texto da skill `tintim-narrativa-telas-reais`: a camada densa das regras, que o Claude carrega sozinho quando o pedido é deste estilo | Para manter a skill igual ao guia |
| `componentes/filme-1-lead-ruim/` | O código Remotion da v3.6, igual ao do projeto do Kino, e as ferramentas de som e de tempo | Para começar um filme novo sem redesenhar as telas |

## Como usar num filme novo

Peça ao Claude para ler o `GUIA.md` e o `PROCESSO.md` antes de propor a história. A skill `tintim-narrativa-telas-reais` traz as mesmas regras em forma densa (212 linhas) e aponta para esta pasta. O texto dela está em `SKILL.md`.

Quando o Jorge corrigir uma regra, mude o `GUIA.md` e a skill na mesma hora, com a fala dele entre aspas. Este guia vale pelo que registra de reprovações, e não pelo que eu acho bonito.

## Diferença para o motion explicativo

O guia da raiz do repositório (`../GUIA.md`) é o do motion explicativo, com narração. A tabela de quando usar cada um está no `GUIA.md` desta pasta, seção 1.1, e as divergências entre os dois estão na seção 14.

## O que fica fora do repositório

- Músicas, vídeos exportados e a faixa de efeitos pronta. Ficam no SSD, em `/Volumes/TOSHIBA EXT/kino-media/mcp-dezembro-filme-1/`.
- Os dois sons do WhatsApp Web, que são arquivos da Meta. Os endereços estão em `componentes/filme-1-lead-ruim/sons-reais/FONTES.md`.

O banco de teclas e o clique de mouse ficam aqui, porque são de domínio público (CC0), pequenos e servem a todos os filmes.
