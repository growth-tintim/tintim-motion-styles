# Guia de estilo dos vídeos de motion do Tintim

Este guia reúne as regras que fechamos no vídeo de boas-vindas ao MCP, em novembro de 2026. Cada regra vem com o porquê, para que dê para julgar quando quebrá-la. Os valores são os do vídeo final, e não os das versões descartadas no caminho.

Vídeos de referência, no vault, em `execucao/atividades-ativas/`:
- `2026-11-06/mcp-boas-vindas-tintim-final-14lufs.mp4`, versão para os compradores da Black Friday.
- `2026-11-09/mcp-tintim-pagina-14lufs.mp4`, versão permanente, usada em features.tintim.app/mcp.

## 1. Formato

- **1920×1080, 30 fps, MP4 H.264 com áudio AAC.** O destino é página e e-mail, onde o horizontal cabe a janela do Claude com texto legível. Para WhatsApp ou Stories, o certo é refazer em vertical (1080×1920), com a janela ocupando a tela toda, e não só recortar.
- **Duração de 1min30 a 1min50.** Três demonstrações com pausa para leitura não cabem em menos que isso sem apertar o texto.

## 2. Narração

- **Voz do Marcio no ElevenLabs:** "Marcio - Viral Hook Narrator", clone de voz profissional, estabilidade 50, similaridade 75, modelo Eleven v4. O nome do arquivo baixado registra isso (`..._pvc_s50_sim75_v4.mp3`). Trocar o modelo muda o timbre, e uma emenda entre modelos diferentes fica audível.
- **Gere parágrafos inteiros, não frases soltas.** A documentação do ElevenLabs diz que o modelo "is sensitive to the wider situation surrounding each utterance", o que ajuda a entonar trechos longos. Com o parágrafo inteiro, a emenda cai numa troca de cena, onde já existe pausa.
- **Gere duas ou três tomadas.** A geração não é determinística ("the AI is non-deterministic; setting the sliders to specific values won't guarantee the same results every time"). Fique com a que tem o mesmo andamento e o tom mais próximo do trecho vizinho. Meça palavras por segundo e a mediana de pitch, em vez de escolher no ouvido de quem não vai ouvir.
- **Texto permanente, sem marca de tempo.** Evite "agora", "novidade", "ontem" e datas de campanha. O vídeo do MCP precisou ser refeito porque a abertura falava da Black Friday.
- **Afirmação, não pergunta.** A entonação de pergunta do Marcio não ficou boa no teste ("Você sabia que...?").
- **Frase falada, não frase de roteiro.** Rejeitadas por soarem artificiais: "Além de rastrear as suas campanhas...", "Aqui é do Tintim", "Pouca gente sabe". Se a frase só existe para casar com a imagem, ela vai soar inventada.
- **"Claude" sai parecido com "Cloud"** nessa voz. Os transcritores ouvem "Cloud", mas é a mesma pronúncia em todo o vídeo, e ficou aprovada.

## 3. Tempo: tudo preso à fala

- **Cada animação nasce numa palavra da narração.** Os tempos vêm da transcrição palavra por palavra (CrisperWhisper 2.0 medium, conferida na forma de onda), e não de estimativa. O espectador lê a tela no mesmo instante em que ouve, e um atraso de meio segundo já parece erro.
- **Sem atraso artificial.** O elemento entra no fim medido da palavra. No vídeo do MCP, um atraso de 0,2 s mais um fade de 0,27 s fez as linhas parecerem atrasadas.
- **Escolha frases com âncoras.** Uma frase boa para motion tem uma palavra para cada evento: a marca quando o logo assenta, o que o cliente já tem quando o card aparece, o nome da peça nova quando ela encaixa. "Existem duas maneiras de usar o Tintim: uma é pelo seu painel, e a outra é pelo MCP" funcionou porque cada trecho cai num evento.
- **Os gatilhos ficam num arquivo único de quadros** (`gatilhos-*.ts`). Quando a voz muda de duração, desloque todos os gatilhos seguintes pela mesma diferença, inclusive o fade da música.

## 4. Texto na tela

- **Texto só parado.** Nada de texto viajando. O que se move pelas linhas é luz. Na primeira versão as mensagens andavam, e ninguém conseguia lê-las.
- **Tempo de leitura:** pelo menos 1,5 s, e cerca de 1 s a cada três palavras. A câmera só volta a andar depois disso.
- **Tamanho mínimo de 24 px numa tela de 1080p.** Valores usados: pergunta de 46 a 50 px, resposta de 56 px, linha secundária de 42 px e conversa de 40 px. Abaixo de 24 px, o texto some no celular. Os valores medem o texto no quadro final, já com a câmera. No código, o número é menor quando a cena está em escala: o palco das cenas 1 e 2 é desenhado em escala de interface, e a câmera amplia de 1,95 a 2,8 vezes.
- **Nada cortado na borda do quadro.**

## 5. Câmera e transições

- **Movimento contínuo e suave, sem corte seco.** Os movimentos entre enquadramentos duram cerca de 1,6 s, com aceleração e desaceleração e sem inversão no meio. Os cortes secos da gramática do trailer de referência foram trocados por movimento a pedido do Jorge.
- **Sem fade de imagem entre planos.** A troca de cena acontece por transformação: o logo encolhe e vira o cabeçalho do painel, e a caixa de pedidos cresce até virar a janela do Claude.
- **Aproximação só para provar.** No vídeo do MCP, a única aproximação de leitura é de 15%, no trecho da conversa que prova o diagnóstico. Uma aproximação maior cortaria a resposta.
- **Movimento mínimo.** Se a câmera não está levando o olho a algo novo, ela fica parada.

## 6. Enumerações

Quando a narração lista itens, por exemplo "quantas chegaram, quantas ficaram sem resposta, quanto o lead esperou":
- **1,0 s de pausa na voz depois de cada item**, aberta na edição. Com menos que isso, não dá tempo de ler a linha.
- **A linha entra no fim medido da palavra** e recebe um realce de marca-texto em lima (#E8F04F, baixa opacidade) atrás dela. O realce entra em cerca de 0,3 s, sem quique, e passa para a linha seguinte quando a voz segue.
- **Itens futuros ficam escondidos.** Na lista dos três pedidos, os cards 2 e 3 só aparecem na vez deles. Revelar antes estraga a estrutura do vídeo.
- **A pausa nunca é silêncio digital nem loop** (ver Som).

## 7. Telas de produto

- **Reconstrua a tela real a partir do código e dos prints do produto,** e não de memória. As telas do Tintim vêm de `tintim-locals` (templates, `frontend/src/app.css` e prints em `assistant/static/assistant/media/connect/`).
- **Diga o que é estimativa.** No vídeo do MCP, o selo do conector dentro da mensagem, a linha de ferramenta do Claude, o pedido de permissão e o gráfico da resposta foram desenhados por estimativa, porque nenhum print real mostrava aquilo.
- **Respostas do Claude estruturadas, como ele responderia:** título curto, tabela de métricas, seção do achado principal e trecho citado. Gráfico na resposta só quando ajuda a ler. A resposta aparece em blocos, e não letra a letra, para dar tempo de ler.
- **Mostre o fluxo real, comprimido.** A conexão real é Continuar, Adicionar, Vincular e Autorizar. O vídeo mostra Continuar e Autorizar, e o aviso real do Claude ("Este conector foi sugerido por um link externo") fica visível, porque a pessoa vai vê-lo ao conectar.
- **Claude e ChatGPT do mesmo tamanho** (120 px, simétricos) quando os dois são citados. Um ícone maior diria a quem usa o outro que é cliente de segunda.
- **Dados sempre fictícios,** de uma conta de demonstração (a Ótica Central). Conversas de clientes reais nunca aparecem num vídeo de marketing. Os números de uma cena batem com os das outras.

## 8. Identidade visual

- **Cores da marca, nas cenas do vídeo** (`marca.ts`): azul #1670CB, lima #E8F04F, navy #0A1C33, halftone #4A9BE8 (brilho das linhas) e verde do WhatsApp #25D366 (pulsos das conversas que chegam). O fundo do palco é um degradê radial navy, de #10294A no centro a #071527 nas bordas, com uma luz azul atrás do painel.
- **Cores do produto, só nas telas reconstruídas do Tintim:** primária #009EF7, fundo #F5F8FA, texto #181C32 (do tema "tintim" em `frontend/src/app.css`). Elas servem para a tela parecer a real, e não para as cenas de marca.
- **Não use lima sobre branco.** O guia de marca desaconselha. Por isso a peça do MCP, lima com a sigla em navy, aparece sempre sobre o palco escuro. Sobre fundo claro, o lima aparece só como realce de marca-texto, transparente e atrás de texto escuro.
- **Grid de fundo só sobre azul ou navy,** como no manual. Sobre fundo claro, sem grid. O vídeo do MCP não usou grid: o palco tem só o degradê e a luz.
- **Fontes:** Eudoxus Sans e Inter, as mesmas do produto (`frontend/fonts` em `tintim-locals`). As telas do Claude usam fontes substitutas, porque as dele não estão disponíveis: Hanken Grotesk na interface e Source Serif 4 no texto das respostas. A paleta do Claude fica em `Partes23.tsx` (fundo #FAF9F5, balão #F0EEE6, texto #141413 e o coral #D97757 da marca).
- **Logos oficiais** do Meta Ads e do Google Ads, nunca redesenhados.
- **Mascote:** use o vetor oficial, `logo-full.svg`, em `identidade-visual/2026-10-15/assets-oficiais/`. O manual proíbe redesenhar as poses. A piscadela foi animada nos próprios olhos do vetor (`Vector_39` e `Vector_40`, sobrancelha em `Vector_35`), sem máscara. O olho fecha em 3 quadros até 16% da altura, fica fechado 2 quadros e abre em 4.

## 9. Som

- **Pausas preenchidas com ruído contínuo sintético, no nível do fundo real da gravação** (cerca de -86 dB), com variação diferente em cada pausa e crossfade de 60 ms (30 ms em pausas curtas). Silêncio digital soa como corte abrupto. Um trecho da própria gravação em loop gerou eco: ele carregava resto de respiração e se repetia a cada 0,24 s.
- **Música lo-fi, calma e humana.** Faixas "corporativas" e dramáticas foram rejeitadas. A do vídeo do MCP é a Rhodes Chill (ColorFilmMusic, 112 BPM), da Envato.
- **Música 15 LU abaixo da voz, constante e sem ducking.** Voz em cerca de -21,5 LUFS, música em -36 a -39 dB nas pausas.
- **Fade-in de 1 s. O fade-out começa numa cabeça de compasso e termina no último quadro.** O compasso vem do BPM. Um fade que começa no meio do compasso soa como erro.
- **Efeitos de interface discretos:** clique quando o logo assenta, clique de encaixe na peça MCP, nada de acorde no início (soou como buzina). Também há um clique quando a pergunta e a resposta entram e em cada botão que o cursor aperta. Volumes no `App.tsx`: clique do logo 0,45, encaixe do MCP 0,7 e os outros cliques 0,3.
- **Piscadela do mascote: um único "pim" fino e rápido.** Senoide pura em 2093 Hz (C7), 150 ms, ataque de 2 ms, pico em cerca de -19 dB, no instante em que o olho fecha (quadro `piscada + 3`, volume 0,25). Sino composto e brinde de taças foram rejeitados.

## 10. Entrega

- **Dois arquivos:** o original e uma cópia com o áudio normalizado em -14 LUFS e -1 dBTP, sem reencodar a imagem. -14 LUFS é o padrão das plataformas de vídeo, e o original costuma sair perto de -18,6.
- **Confira antes de entregar:** duração, nenhum quadro preto no início nem no fim, áudio do começo ao fim e cópia idêntica, byte a byte, entre o SSD e o vault.
- **Versões alternativas viram projetos separados no Kino,** porque o Jorge assiste um vídeo por projeto, pelo link. Não acumule projetos sem necessidade, e diga quais podem ser apagados.
