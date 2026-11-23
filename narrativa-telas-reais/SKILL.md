---
name: "tintim-narrativa-telas-reais"
description: "Fazer anúncios do Tintim no estilo narrativa com telas reais: história sem narração contada em telas fiéis de software (WhatsApp Web, Claude), presa à música, em cenas no Kino."
---

# Narrativa com telas reais: o estilo, regra por regra

Estado em 23/11/2026, depois de dois dias de correções do Jorge sobre o filme 1 da campanha de dezembro do MCP ("Lead ruim"), em nove versões (v1, v2, v3, v3.1 a v3.6). Filme de referência: `mcp-dezembro-filme-1-lead-ruim-computador-v3-6-kino.mp4`, 66,0 s, 1920×1080, 30 quadros por segundo, sem narração.

Cada regra traz o número usado no filme e a origem. Fala do Jorge vem entre aspas, palavra por palavra. Quase todas as regras nasceram de uma reprovação dele: trate-as como lei. O que é escolha do Claude ainda não validada está marcado como "recomendação" ou "palpite".

**Sempre:** responda em português, com acentos. Conclusão primeiro, depois o porquê de cada escolha. Separe fato, inferência, palpite e recomendação. Cite a documentação literal ao opinar sobre ferramenta. Diga "não medi" e "não ouço" quando for o caso. Escreva "o Tintim", nunca "a Tintim".

**O que esta skill não prova:** o filme ainda não rodou como anúncio. Não há dado de desempenho, só a aprovação do Jorge ("Cool demais!", 23/11) e medidas feitas no arquivo.

## 0. Leia antes de produzir

Esta skill é a camada densa. O detalhe completo (o porquê longo de cada regra, os comandos, o filme cena por cena e o código) está em quatro lugares, e você deve abri-los antes de escrever um filme novo:

| O quê | Onde |
|---|---|
| `GUIA.md` (regras completas), `PROCESSO.md` (passo a passo com comandos), `FILME-1-ANATOMIA.md` (cenas, mapa de tempos, histórico) e `componentes/filme-1-lead-ruim/` (código e ferramentas) | Repositório `growth-tintim/tintim-motion-styles`, pasta `narrativa-telas-reais/`. Cópia nos arquivos do projeto Growth: `/mnt/project-files/estilo-motion/narrativa-telas-reais/` |
| Filme de referência | Arquivos do projeto Growth, `videos-motion-mcp/filme-1-lead-ruim/export/`. No Mac do Jorge, no SSD: `/Volumes/TOSHIBA EXT/kino-media/mcp-dezembro-filme-1/export/` |
| Projeto no Kino | `rb84rGYVNB`, "MCP dezembro · Filme 1 · Lead ruim (computador)" |
| Falas do Jorge, palavra por palavra | Arquivos do projeto Growth, `videos-motion-mcp/2026-11-22-feedback-jorge-filme-1-v2-verbatim.md` |
| Guia do motion explicativo (marca, dados fictícios, entrega) | `GUIA.md` na raiz do mesmo repositório. Onde diverge desta skill, esta vale para este estilo (seção 13) |

Ao receber uma correção do Jorge ou fechar um filme, atualize o `GUIA.md` do repositório e proponha a mesma mudança nesta skill, com a fala dele entre aspas.

## 1. A ideia

Um anúncio sem narração em que a história é contada pelo que acontece em telas de software refeitas com fidelidade: cursor, digitação com erro, lista de conversas andando, avisos, os sons reais das telas. O produto não é explicado. Ele aparece trabalhando no meio da pressão, e a música conduz.

- "Isso ficou uma verdadeira narrativa com telas reais de software, um estilo do cacete pra fazer propaganda no geral."
- "a vida do cara é PRESSÃO, ele tem q responder mta coisa ao msm tempo, mas com o Tintim ele dá conta"

| | Este estilo | Motion explicativo |
|---|---|---|
| Quem conduz | Música e ação na tela | Narração |
| Tempo preso a | Tempos e compassos da música | Palavras da narração |
| Tela | Janela inteira e fiel, com cursor | Peças isoladas e ampliadas |
| Câmera | Parada na leitura, panorâmica veloz na pressa | Contínua e suave |
| Serve para | Anúncio: o espectador se reconhece na situação | Página, e-mail: explicar o mecanismo |

## 2. História

| Regra | No filme 1 | Origem |
|---|---|---|
| **Várias frentes, nunca uma resposta matadora.** O produto ajuda em tudo, e nenhum caso vence o filme sozinho | 4 clientes, 2 casos-relâmpago, 2 fios pessoais e 6 perguntas à IA em 66 s | "Isso de FALEI COM UM E ARREBENTEI COM UMA RESPOSTINHA é fraco, uncool, parece um drop the mic extremamente falsinho, mais maneiro colocá-lo tipo 1 min falando com várias, indo pra lá e pra cá, resolvendo seu dia em mtas frentes" |
| **O primeiro caso ensina o gesto inteiro, os seguintes mostram cada vez menos** | Caso 1: aba, pergunta, ferramentas, resposta, seleção da prova, volta, cola, envia. Do caso 3 em diante, panorâmica no lugar do clique | Estrutura da v3, aprovada |
| **Quem abre reclamando fecha dando razão**, no mesmo enquadramento da abertura | "Esses leads que você manda são muito ruins. Ninguém compra." em 0,5 s. "Você tinha razão. Valeu, Lucas! 🙏" em 56,8 s | "seria legal se a última tela tbm não terminasse nessa de empréstimo, q fosse uma positiva" |
| **A última tela não para o ritmo.** Mensagens continuam chegando até a tela sumir, com "digitando..." até o último quadro e câmera parada. Mensagem que não couber fica cortada | Intervalo de 1,2 s entre mensagens. Duas mensagens do roteiro caem depois do sumiço | "não ficar parado olhando pra tela como se isso fosse um sinal de qlqr coisa, como se a última tela elicitasse uma PARADA de ritmo [...] pode ir recebendo msg coerente até a tela sumir, e a tela parada, e não dando zoom" e "se alguma for cortada, não tem problema" |
| **Toda ação tem intenção.** Clique só para "dar movimento" sai | Boas notícias dos outros clientes passam em aviso. Ele só abre a conversa que fecha o filme | "não saquei esse movimento de ele só ir clicando no que vai aparecendo de novo, essa ação meio q é insignificante" |
| **O protagonista hesita e erra**, ao menos uma vez por ato | Começa uma defesa e apaga. Hesita sobre o pedido do Beto. Digita "ontme" e corrige. "Mas foi um sonh", apaga | Ofício tirado do trailer do Drawquarium, que o Jorge indicou |
| **Humor em até dois fios pessoais, sempre de fundo**, com histórico, piada que diminui e chateação distribuída | Beto: 500 na lista, depois 300, 100 e 50 só em aviso. Esposa com o pão da véspera | "Vamos mudar Beto cunhado pra 'Beto do futebol' [...] pra não ficar toda annoyance sobre a esposa" |
| **O produto prova com dado concreto, e o protagonista usa a prova** | Ele seleciona e cola "Diego, 9h04: “Qual o valor do multifocal?”" e "Primeira resposta: 15h40." | Roteiro aprovado desde a v2 |
| **Varie o tipo de pedido** e use os nomes reais das ferramentas do MCP (confira na documentação a cada filme) | Diagnóstico, ranking, ação, contagem. `leads_list`, `leads_messages`, `creatives_list`, `leads_batch_status_preview`, `leads_batch_status_change`, `leads_counts` | Documentação do MCP do Tintim |

**Atos presos à forma da música:** introdução rala para o problema e a fila (0 a 7,2 s). Entrada da banda no primeiro clique na IA, com o caso 1 inteiro (até 20,5 s). Caso 2 com a interrupção pessoal (até 38,7 s). Solo com casos encurtando (visitas de 4,7 s, 4,2 s e 3,1 s) e depois vai e vem (quatro panorâmicas em 2,2 s). Parada da banda na virada (56,8 s). Instrumento sozinho no slogan e na marca (58,9 a 66 s).

## 3. Texto das conversas

**Teste de cada fala:** (1) responde à fala anterior? (2) uma pessoa real escreveria isso no WhatsApp, com esse tamanho e essa grafia? (3) faz sentido lida sozinha? Um "não" manda reescrever.

Três reprovações que fixaram a regra:

- "a mulher falando 'Tá. Traz pão'. Nada a ver essa resposta, porra"
- "'Desculpa amor <3 / Acho bom' Não faz o menor sentido, cara. É 'Desculpa amor, não vai acontecer mais! <3', algo assim"
- "Melhor seria ser mais realista", com as mensagens dele: "A menina que atende não olhou o número direito ontem pq disse que tava doente.", "Será que na outra loja tá assim tbm o atendimento?", "Vamo fazer uma call mais tarde?"

O que as dele têm: causa concreta, grafia de celular ("pq", "tbm", "Vamo") e mais trabalho para o protagonista. As minhas resolviam rápido demais ("O Diego fechou! 🎉").

Regras de escrita: registro próprio por contato ("Meu filho, o telefone não tocou hoje. Esse anúncio tá ligado?"). Nome mais negócio nos clientes ("Renato · Ótica Central"). Histórico coerente antes do filme, com datas. Horas que andam (08:47 a 09:07). Números que batem entre as telas. Dados sempre fictícios. Texto do Jorge entra palavra por palavra, e não se tira fala que ele não pediu para tirar ("Nah, essa pode seguir existindo"). Avise sobre frase sensível em mídia paga, sem censurar.

## 4. Fecho

- **Slogan em duas linhas:** "O mercado só acelera." em branco e, 40 quadros (1,33 s) depois, "Com o Tintim você dá conta." em lima #E8F04F. Eudoxus Sans, 96 px, peso 700, entrelinha 116 px, espaçamento -0,025 em, y = 416 e 536. Cada linha entra por foco (opacidade e desfoque de 12 px a 0, em 9 e 8 quadros). Nada viaja. As entradas caem em notas medidas da música.
- **Como a frase foi decidida:** "A pressão não para." caiu porque "tem uma conotação meio negativa, e a pressão está implícita na aceleração do mercado". O "Mas" caiu ("Será que o slogan final não fica melhor sem o Mas?") e a vírgula também ("Vamos deixar sem a vírgula").
- **Regras:** o contraste vem da montagem (tempo, quebra de linha e cor), e não de conjunção. A segunda linha tem que funcionar sozinha como assinatura. Prefira a frase ambiciosa à frase da dor. Na dúvida entre duas, mostre as duas no filme.
- **Tela some com as mensagens ainda chegando:** opacidade e desfoque de 22 px em 12 quadros.
- **Cartela:** logo oficial com 680 px, nascendo do desfoque (24 px a 0 em 16 quadros, escala 1,22 a 1 em 44). "As vendas do WhatsApp dentro da sua IA.", 60 px, peso 500, 14 quadros depois. Ícones do Claude e do ChatGPT com 104 px, iguais, 12 quadros depois.
- **Piscada:** fecha em 3 quadros, segura 8, abre em 5, com pulinho de 7%, numa nota da música. Com 2 quadros fechada, ninguém via: "E o Tintim não piscou na última tela."

## 5. Música e grade

- **Gênero:** jazz rápido com introdução rala, entrada de banda, solo e parada seca ("com um bop jazz desses"). Filme 1: `le-jazz_short-03_66sec.wav`.
- **A duração do filme é a do corte oficial.** Liste a pasta original inteira e meça cada arquivo antes de afirmar o que existe. Não edite a música por conta própria: "q não faria necessário vc editar música amadoristicamente". Se faltar tempo, a ordem é versão cheia, loops e, por último, emenda com o Jorge ouvindo.
- **Meça antes de escrever** (fluxo espectral e autocorrelação, depois os ataques um a um). Filme 1: 135,2 bpm, um tempo = 13,314 quadros, primeiro tempo no quadro 2, banda entra no compasso 5 (quadro 215), solo nos compassos 21 a 28, último ataque da banda no quadro 1706, notas finais em 1759, 1813, 1865 e 1913 a 1920.
- **Tudo é escrito em tempos:** `bt(k) = Math.round(2.25 + TEMPO * k)` e `bar(n, t) = bt((n - 1) * 4 + t)`.
- **Em tempo cheio, até o solo:** chegada de mensagem que importa, clique de aba, Enter, envio, abertura de conversa. **No contratempo** (6 ou 7 quadros): avisos de fundo e, do solo em diante, metade das panorâmicas e parte dos envios.
- **A digitação termina no tempo:** `digitaEntre(inicio, fim, …)` acha o ritmo que cabe, e `digitaAte(fim, …)` termina no quadro pedido.
- **Virada na parada da banda** (3 quadros antes do último ataque). Slogan, marca e piscada nas notas do instrumento sozinho.
- **Volumes:** música 0,9, efeitos 1,25. Medido: média de -19,1 dB, pico de -2,8 dB. Sem ducking.

## 6. Ritmo e legibilidade

**Régua:** norma de legendas da Netflix para português do Brasil, "Adult programs: Up to 17 characters per second". Origem: "é legal passar de tela pra tela rápido, mas cada uma delas precisa ser mais ou menos legível, saca? As mais importantes ao menos".

Três tipos de tela: a que carrega a história (tempo pela régua, ou perto), a que confirma o que foi lido durante a digitação (curta) e a de pressa (0,6 a 1,1 s, sem leitura).

**Pausas calibradas. O Jorge reprova os dois extremos: depois de corrigir uma pausa curta, procure o meio, e não o dobro.**

| Pausa | Valor aprovado | Reprovado | Fala |
|---|---|---|---|
| Reclamação da abertura, sozinha | 3,1 s | Câmera recuava logo | "O q precisa de mais zoom e tempo é a primeira tela" |
| Resposta da IA limpa, antes de uma interrupção | 1,3 s limpa, 2,6 s até sair | 0,4 s e depois 2,7 s | "mal dá tempo de ler" e depois "ficou mto tempo aqui parado" |
| Resposta de alguém depois do envio dele | 1,3 s, com tiques azuis e "digitando..." | 0,4 s | "'Acho bom.' aparece INSTANTANEAMENTE após ele mandar" |
| Parada numa conversa antes de ir à IA | 1,2 s | 1,63 s | "duas pausas meio awkwards aqui" |
| Resposta da IA no solo, depois de completa | 1,4 s | 2,07 s | Idem |
| Câmera na lista para um clique | 7 quadros: chega 4 antes, sai 3 depois | 2 a 3 quadros | "impressão de 'hiccup' [...] mas tbm não precisa ficar lerdando parado numa lista onde vai um clique só" |
| Entre mensagens seguidas do mesmo contato | 37 quadros (1,2 s) | Uma por tempo (0,44 s) | "coloque um ritmo normal" |

- **O tempo é soma zero.** A música fixa a duração. Tempo tirado de pausa vai para ação visível, de preferência a digitação seguinte.
- **Enxugue o texto antes de alongar a tela.** Resposta da IA com 2 a 5 linhas e marca-texto só no número que prova.
- **Resposta da IA em blocos:** frase de intenção, linhas de ferramenta (12 a 16 quadros rodando no caso 1, até 6 no fim), linhas da resposta (uma por tempo no caso 1, uma a cada 6 ou 7 quadros depois). Marca-texto lima 8 quadros depois da linha.
- **A digitação acelera com a música:** 12 a 18 caracteres por segundo no começo, 16 a 22 no caso 2, 28 a 37 no solo, com parte fora de quadro.

## 7. Câmera

- **Parada enquanto se lê.** Aproximação lenta desligada (`DERIVA = false`). "tou me perguntando se o zoom in lento q vc dá em cada tela é realmente necessário". Única exceção: fechar na reclamação da abertura (2,04 para 2,85 em 17 quadros, chegando a 2,96). A última tela fica parada.
- **Nunca recue quando chega a informação importante.** "rola um zoom out assim q o primeiro contato fala disso, precisamos arrumar isso".
- **Enquadramentos** (1 = pixel real, janela de 1440 px): lista e conversa 1,5 a 1,6. Abas 1,7. Conversa 2,04 a 2,2. Pergunta na IA 2,2 a 2,4. Resposta 2,42. Prova 2,8 a 2,96. Reenquadramentos de 6 a 24 quadros, curva `bezier(0.45, 0, 0.15, 1)`, ampliação em escala geométrica.
- **Clique de aba até o solo, chicote do solo em diante.** "passar de um software ao outro aos poucos, de janela em janela e aí de repente começar a virar como q uma viagem de uma tela ou outra com um blur de movimento ultra veloz, na horizontal, como acontece em whiplash".
- **Chicote:** duas janelas lado a lado, a 2200 px. 8 quadros, centrado no tempo, curva `bezier(0.8, 0, 0.2, 1)`. Borrão horizontal = (velocidade em px por quadro - 36) × 0,13, teto 210 (vertical, teto 40). Folga de 640 px nas laterais para o borrão ter imagem. "Vush" de 0,42 s com pan na direção.
- **O intervalo entre chicotes encolhe:** 10,5, 9,5, 7, 2,6, 2, 1,4 e 1,6 tempos. "fazer um bounce menos compreensível, pra lá e pra cá, pra mostrar pressa e aí terminar na boa notícia". Em aberto: ele achou pouco ("Senti q foi pouco pra lá e pra cá") e depois deixou como está. Recomendação não testada: 6 a 10 chicotes num filme novo.
- **Sem tremor:** nunca arredonde a posição da câmera. Janela desenhada 3 vezes maior e reduzida, em camada própria. Origem: "as telas dos apps tá trêmula, sutilmente trêmula de um jeito neurastênico esquisito". Confira: deslocamento entre quadros constante e no mesmo sentido.

## 8. Cursor e digitação

- **Cursor:** perfil `t³(10 - 15t + 6t²)`, sem tranco. Arco de 14 a 40 px. Passa 5 a 8 px do alvo e corrige. 7 a 14 quadros por movimento. Hesita sobre um alvo sem clicar. Corrige quando a lista anda. Seta do macOS que vira barra de texto sobre campos, e encolhe 12% no clique. A câmera chega antes ou junto, nunca depois.
- **Digitação:** rajadas de 3 a 7 letras com pausa de 0,8 a 2,4 vezes o ritmo. Cada letra de 0,55 a 1,45 vezes o ritmo. Espaço soma 35%, pontuação 160%. Erro corrigido a 2 quadros por letra, frase abandonada apagada a 0,55 quadro por letra. Semente fixa. Só começa depois do clique no campo. Colar é instantâneo.

## 9. Telas

Ordem das fontes: código público do produto, depois imagem oficial, depois observação. Cada peça diz no cabeçalho de onde veio, e a estimativa é declarada ao Jorge.

| Tela | Fonte | Estimativa |
|---|---|---|
| WhatsApp Web escuro | Código público de web.whatsapp.com, lido em 22/11/2026: medidas (trilho 64 px, lista 30%, cabeçalho 64 px), cores `--WDS-*`, ícones, textos, papel de parede real a 6%, fonte do sistema | Nada de estrutura |
| Claude claro | Imagens oficiais da Anthropic (claude.com/blog/interactive-tools-in-claude): trilho 52 px, coluna 730 px, cores | Tela de conversa nova, ícones laterais, fontes (Hanken Grotesk e Source Serif 4) |
| Chrome e avisos do macOS | Observação | Tudo |

- Não peça print ao Jorge. Não contorne proteção contra robô (o claude.ai devolve 403). Releia o código do produto a cada filme.
- **A tela é movida a dados:** a lista reordena quando chega mensagem (8 quadros), não lidas e "(N)" na aba, tiques de cinza a azul, "digitando...", rascunho por conversa. Nada animado à mão.
- Janela de 1440×810 com zoom 3, sobre o palco navy da marca. A luz verde acompanha o WhatsApp.

## 10. Som

- **Sons reais das telas.** "WhatsApp não faz esse barulho que vc elegeu." Aviso e envio são os arquivos que o WhatsApp Web toca (`WAWebNotificationTone`, `WAWebOutgoingMessageTone`). São da Meta: usar em mídia paga é decisão do Jorge. Teclado (34 toques de MacBook) e mouse são CC0, do Freesound. Só o "vush" é sintetizado.
- **O som obedece ao produto:** no código, `shouldMuteDueToAppState` usa `document.hasFocus()`. O aviso só toca com a IA em cena. Mensagem que chega com o WhatsApp em cena entra muda, inclusive a reclamação e a virada. No solo, só soa a tecla da tela em cena.
- **Uma faixa só, gerada do roteiro** (`SONS()` e `gera-efeitos.py`): 476 sons no filme 1, sempre o mesmo arquivo para o mesmo roteiro. Ganhos: tecla 0,075, espaço 0,085, apagar 0,06, Enter 0,11, mouse 0,11, aviso 0,19, envio 0,16, vush 0,20. Pico limitado a 0,3.
- **O Claude não ouve.** Confira por medição e peça ao Jorge para ouvir os trechos novos.

## 11. Código e Kino

- **Um roteiro, e as telas como função do quadro.** `roteiro.ts` guarda `T` (marcos), `DIG`, `CHATS`, `ABRE`, `RASCUNHOS`, `TURNOS`, `AVISOS`, `CAMERA`, `MOVS`, `CLIQUES` e `SONS()`. As peças não têm estado. Mudar um tempo move mensagem, cursor, câmera, tique e som juntos.
- **Cenas editáveis desde o primeiro dia**, mesmo num plano contínuo:

```tsx
<Sequence name="10 · A esposa" from={866} trimBefore={866} durationInFrames={205} layout="none">
  <div name="10 · A esposa" style={{ position: "absolute", inset: 0 }}>
    <Cena />
  </div>
</Sequence>
```

- `trimBefore` é o quadro do roteiro em que a cena começa (documentação do Kino: "First frame of the item's own timeline."). A `<div>` com nome faz o Kino mostrar um clipe por cena. `Cena` junta palco, tela e a faixa de efeitos. O filtro de borrão usa `React.useId()`. Sem `.map()` para gerar cenas. Música em faixa contínua.
- Origem: "no caralho do Kino o filme é um blocão só, não são vários trechos modificáveis". Documentação do Kino: "Use one authored node per independently editable clip".
- **Limites a avisar:** mudar a duração de uma cena tira as panorâmicas seguintes do tempo da música. Alongar o fim mostra o que vem depois no roteiro.
- Recomendação ainda não feita: controles no inspetor do Kino ("schema knobs") para pausas e textos.

## 12. Como trabalhar com o Jorge

| Regra | O que aconteceu |
|---|---|
| Leia o pedido ao pé da letra e no menor tamanho. Crítica de texto é só de texto | "NÃO! STOP", "Vc entendeu tudo errado", "eu critiquei apenas o texto" |
| Opinião sincera, com motivo, e sustentada | "Não precisa concordar", "não seja sicofanta, me diga o q lhe parece", "Seja sincero" |
| Quem decide é ele. Quando propõe e reafirma, execute | "Bizarro isso, hm? Claro que deveria ir com a frase nova." |
| Confira o estado do sistema na hora, antes de afirmar | "Mas tem um vídeo lá no Kino de 1h atrás" |
| Trabalhe no Kino, em cenas, com prévia. Render inteiro é exceção | "Se cada alteração precisar de uma renderização completa ao invés de pré-ajustes, isso é uma GRANDE perda de tempo" |
| Antes de gravar um arquivo no projeto do Kino, compare a soma com a última que você gravou. Ele edita texto direto lá | Ele tirou o "Mas" no próprio Kino |
| Não tire o que ele não pediu para tirar | "Nah, essa pode seguir existindo" |
| "Apenas me responda" quer dizer não mexer em nada | "Não é preciso fazer nada ainda, apenas me responda." |
| Guarde cada fala dele palavra por palavra antes de resumir | Regra do projeto |
| Nunca mexa em `.kino-mount`. Mídia no SSD. Um filme por projeto do Kino. Avise antes de trabalho pesado no Mac | Regras do projeto |

## 13. Onde diverge do motion explicativo

Câmera parada na leitura (lá, movimento contínuo). Panorâmica com borrão entre janelas (lá, sem corte, só transformação). Tempo preso à música (lá, à narração). Jazz em primeiro plano (lá, lo-fi 15 LU abaixo da voz). Duração do corte da música, 66 s (lá, 1min30 a 1min50). Piscada de 3, 8 e 5 quadros com pulinho (lá, 3, 2 e 4). Resposta da IA curta (lá, estruturada com título e tabela).

Continua igual: dados fictícios, telas refeitas do código, dizer o que é estimativa, cores e fontes da marca, logos oficiais, Claude e ChatGPT do mesmo tamanho, texto de marca parado.

## 14. Passo a passo de um filme novo

1. **Abra o Kino** com `getKinoInstructions`. Crie o arquivo de falas do Jorge.
2. **História em uma página:** uma linha por ato, com quem fala, o que pede, o que o produto responde e o que o protagonista faz com a resposta. Confira as regras da seção 2 e o teste de fala da seção 3.
3. **Música:** liste a pasta original, escolha o corte, meça andamento e estrutura, escreva `TEMPO`, `bt` e `bar`.
4. **Roteiro em quadros,** nesta ordem: `T` (primeiro os marcos que a música impõe), `CHATS`, `DIG`, `TURNOS`, `ABRE`, `RASCUNHOS`, `AVISOS`, `CAMERA`, `MOVS` e `CLIQUES`.
5. **Rode `ferramentas/tabela-de-tempos.ts`** e leia os números antes de olhar um quadro: desvio dos marcos, intervalos entre chicotes, velocidade das digitações e o tempo de leitura que cada mensagem pede.
6. **Telas:** reaproveite as peças do filme 1, mantendo as pastas. Releia o código do produto. Declare as fontes no cabeçalho.
7. **Som:** `despeja.ts` e `gera-efeitos.py`. Gere de novo sempre que um evento mudar de quadro. Copie para o SSD com nome novo a cada versão, porque o Kino reaproveita mídia com o mesmo caminho e o mesmo tamanho.
8. **Monte no Kino em cenas** (seção 11), com nomes numerados e humanos. Confira com `timelineGet` que há um clipe por cena.
9. **Confira sem render:** `projectScreenshot`, com os instantes em segundos. Diga ao Jorge que cena tocar. Regra do Kino: "Use Render In to Out only if the user explicitly asks, or playback is severely degraded".
10. **Ciclo de correção:** guarde a fala, responda em até 20 palavras com o primeiro passo, faça a menor leitura do pedido, mude o roteiro, confira, e responda com antes e depois em números, de onde saiu o tempo, o que é palpite e o que você não conferiu.
11. **Exporte só com o OK dele:** `exportVideo` em `mp4`, `h264`, taxa `very-high`, para `/Volumes/TOSHIBA EXT/kino-media/<projeto>/export`. Filme 1: 40 a 55 s.
12. **Confira o arquivo:** quadros e duração (`ffprobe -count_frames`), volume médio e pico (`volumedetect`) e uma folha com os quadros que mudaram, olhada de fato. Filme 1: 1980 quadros, 66,0 s, -19,1 dB, -2,8 dB.
13. **Nunca sobrescreva uma versão entregue.** Arquivo e pasta de código novos a cada versão.
14. **Plano B, só com o Kino de fato parado:** Remotion fora do Kino, renderizando só o trecho que mudou (`--frames`). As fontes saem substitutas, então o final é sempre do Kino.

## 15. Em aberto

Sem dado de desempenho. Mais vai e vem, a testar. Controles no inspetor do Kino. Conferência automática do tempo que cada mensagem fica em quadro. Versão vertical com a história nova (só existe uma v1 antiga de iPhone). Cópia em -14 LUFS, licença da trilha para anúncio e decisão sobre os sons da Meta. Tela do ChatGPT a partir de fonte oficial.
