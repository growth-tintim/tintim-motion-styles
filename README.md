# Estilo de motion do Tintim

Regras, processo e componentes para manter o estilo nos vídeos de motion do Tintim. O ponto de partida foi o vídeo de boas-vindas ao MCP, de novembro de 2026. Em 23/11/2026 entrou o segundo estilo, a narrativa com telas reais, que nasceu no filme 1 da campanha de dezembro.

## Dois estilos

| Estilo | Onde está | Quando usar |
|---|---|---|
| Motion explicativo, com narração | Nesta raiz: `GUIA.md`, `PROCESSO.md` e `componentes/` | Página, e-mail, boas-vindas: explicar como o produto funciona |
| Narrativa com telas reais, sem narração | `narrativa-telas-reais/` | Anúncio: uma história contada em telas fiéis de software, no ritmo da música |

## O que tem aqui (motion explicativo)

- `GUIA.md`: as regras de estilo, cada uma com o porquê. Formato, narração, tempo, texto, câmera, enumerações, telas de produto, identidade visual, som e entrega.
- `PROCESSO.md`: o passo a passo, do roteiro ao vídeo exportado, com Kino, ElevenLabs e CrisperWhisper.
- `componentes/`: o código Remotion reaproveitável do vídeo do MCP.

## Como usar num vídeo novo

Peça ao Claude para ler o `GUIA.md` e o `PROCESSO.md` antes de escrever o roteiro. Quando uma regra não servir para o vídeo novo, mude-a aqui e registre o porquê, para que a próxima pessoa saiba o que vale.

## O que fica fora

Músicas, efeitos, narrações e vídeos exportados ficam fora do repositório. São pesados e mudam a cada vídeo. Eles ficam no SSD externo, em `/Volumes/TOSHIBA EXT/kino-media/<projeto>/`, e as versões finais ficam no vault, em `execucao/atividades-ativas/<data>/`.
