# Sons reais usados no filme 1, versão 3.2 (22/11/2026)

| Arquivo | O que é | Origem | Direito de uso |
|---|---|---|---|
| whatsapp-aviso-BS_BUUXbKq5.wav | Som de aviso de mensagem do WhatsApp Web | https://static.whatsapp.net/rsrc.php/yW/r/BS_BUUXbKq5.mp3, arquivo que o módulo `WAWebNotificationTone` do WhatsApp Web toca (`playNotification`) | Arquivo da Meta. Usar em anúncio é decisão do Jorge (ver nota abaixo) |
| whatsapp-envio-lsK0FC6wi8C.wav | Som de mensagem enviada do WhatsApp Web | https://static.whatsapp.net/rsrc.php/yu/r/lsK0FC6wi8C.m4a, arquivo que o módulo `WAWebOutgoingMessageTone` toca (`playOutgoingMessageTone`) | Idem |
| teclado-macbook-freesound-565645.npz | 34 toques de tecla isolados de um MacBook Pro 2018 | https://freesound.org/s/565645/ (khenshom), recortados com ferramentas/recorta.py | CC0 (domínio público) |
| mouse-freesound-534103.wav | Clique de mouse | https://freesound.org/s/534103/ (pbimal) | CC0 (domínio público) |

Regra de quando o aviso toca, lida no código do WhatsApp Web (módulo `WAWebNotificationHelpers`):
`function v(t){return r("WAWebEnvironment").isWindows?e()&&(t==null?void 0:t.isChatsSurfaceActive)===!0:e()}` com `function e(){return document.hasFocus()}`,
exportada como `shouldMuteDueToAppState`. Ou seja: com a aba do WhatsApp em foco, o aviso não toca. No filme, o aviso só toca quando ele está no Claude.

Nota: os dois sons do WhatsApp são arquivos da Meta, baixados do endereço público que o próprio WhatsApp Web usa. O filme já mostra a interface do WhatsApp; o som segue a mesma lógica, mas a decisão de usar em anúncio pago é do Jorge.
O "vush" das panorâmicas é sintetizado (som de montagem, não de tela).
