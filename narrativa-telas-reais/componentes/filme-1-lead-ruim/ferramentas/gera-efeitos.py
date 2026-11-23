# Monta a faixa de efeitos do filme a partir da lista de eventos do roteiro (out/sons.json, gerado por ferramentas/despeja.ts).
# Rode a partir da pasta do filme: python3 ferramentas/gera-efeitos.py. O resultado sai em out/sfx-efeitos.wav.
# A mesma lista gera sempre o mesmo arquivo, byte a byte (o sorteio tem semente fixa).
# Uma faixa só, em vez de um clipe por tecla: são centenas de eventos.
# Sons reais (pasta sons-reais/):
#   whatsapp-aviso  = arquivo que o módulo WAWebNotificationTone do WhatsApp Web toca (static.whatsapp.net/rsrc.php/yW/r/BS_BUUXbKq5.mp3)
#   whatsapp-envio  = arquivo que o módulo WAWebOutgoingMessageTone toca a cada envio (static.whatsapp.net/rsrc.php/yu/r/lsK0FC6wi8C.m4a)
#   teclado         = 34 toques isolados de um MacBook Pro 2018, recortados de freesound.org/s/565645 (khenshom, CC0)
#   mouse           = freesound.org/s/534103 (pbimal, CC0)
# O "vush" do chicote é o único som sintetizado: é som de montagem, não de tela.
import json, wave, numpy as np
SR = 48000; FPS = 30
d = json.load(open('out/sons.json')); T = d['T']
N = int(SR * T['fim'] / FPS)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(20261122)
def le(n, corta=0.0):
    w = wave.open(f'sons-reais/{n}.wav'); assert w.getframerate() == SR
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
    if w.getnchannels() == 2: x = x.reshape(-1, 2).mean(axis=1)
    x = x[int(corta * SR):]
    return x / np.abs(x).max()
aviso = le('whatsapp-aviso-BS_BUUXbKq5', 0.27)   # o arquivo começa com 0,28 s de silêncio: corto para o som cair no quadro certo
envio = le('whatsapp-envio-lsK0FC6wi8C')
mouse = le('mouse-freesound-534103')
b = np.load('sons-reais/teclado-macbook-freesound-565645.npz'); assert int(b['sr']) == SR
teclas = [s / np.abs(s).max() for s in b['sons']]
ordem = np.argsort(b['cent'])                      # os de timbre mais grave servem de espaço e Enter (teclas maiores)
graves = [teclas[i] for i in ordem[:6]]; comuns = [teclas[i] for i in ordem[6:]]
def poe(x, f, ganho, pan=0.0):
    i = int(round(f / FPS * SR)); x = x[: max(0, N - i)]
    L[i:i + len(x)] += x * ganho * (1 - max(0, pan)); R[i:i + len(x)] += x * ganho * (1 + min(0, pan))
def chicote(dur=.42):
    n = int(dur * SR); t = np.arange(n) / n
    ruido = rng.standard_normal(n)
    fc = 350 * (9 ** np.sin(np.pi * t)); y = np.zeros(n); lp = 0.0; lp2 = 0.0
    for i in range(n):
        a = 1 - np.exp(-2 * np.pi * fc[i] / SR)
        lp += a * (ruido[i] - lp); lp2 += a * .25 * (lp - lp2); y[i] = lp - lp2
    y *= np.sin(np.pi * t) ** 2.2
    return y / np.abs(y).max()
vush = chicote(); conta = {}
for e in d['sons']:
    f, s = e['f'], e['som']; conta[s] = conta.get(s, 0) + 1
    if s == 'tecla': poe(comuns[rng.integers(len(comuns))], f, .075 * rng.uniform(.7, 1.0) * e['v'], rng.uniform(-.12, .12))
    elif s == 'espaco': poe(graves[rng.integers(len(graves))], f, .085, 0)
    elif s == 'apaga': poe(comuns[rng.integers(len(comuns))], f, .06, .1)
    elif s == 'enter': poe(graves[rng.integers(len(graves))], f, .11, .08)
    elif s == 'mouse': poe(mouse, f - .6, .11 * e['v'], .15)   # o toque começa 20 ms dentro do arquivo
    elif s == 'aviso': poe(aviso, f, .19, .2)
    elif s == 'enviada': poe(envio, f, .16, -.1)
    elif s == 'chicote':
        ida = d['CHICOTES'].index(f + 4) % 2 == 0  # W→C vai da esquerda para a direita
        n = len(vush); p = np.linspace(-.7, .7, n) * (1 if ida else -1); i = int(round((f + 4) / FPS * SR)) - n // 2
        L[i:i + n] += vush * .20 * (1 - np.maximum(0, p)); R[i:i + n] += vush * .20 * (1 + np.minimum(0, p))
print(conta)
x = np.stack([L, R], axis=1); pico = np.abs(x).max(); print('pico', round(pico, 3))
if pico > .3: x *= .3 / pico
rms = np.sqrt((x ** 2).mean()); print('rms dBFS', round(20 * np.log10(rms), 1))
w = wave.open('out/sfx-efeitos.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
