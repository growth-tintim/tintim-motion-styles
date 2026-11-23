# Faixa de efeitos do filme vertical de 37 s, a partir de out/sons-v37.json (gerado por despeja.ts). Mesmo método do filme de 66 s.
# Rode na pasta que tem sons-reais/: python3 gera-efeitos.py <sons.json> <saida.wav>. Semente fixa: o mesmo arquivo sai sempre igual.
# Sons reais (ver sons-reais/FONTES.md do filme de 66 s):
#   whatsapp-aviso = arquivo que o WhatsApp Web toca no aviso (static.whatsapp.net/rsrc.php/yW/r/BS_BUUXbKq5.mp3)
#   whatsapp-envio = arquivo que o WhatsApp Web toca a cada envio (static.whatsapp.net/rsrc.php/yu/r/lsK0FC6wi8C.m4a)
#   teclado = toques de um MacBook Pro (freesound.org/s/565645, CC0). Aqui viram toque de tela: só os primeiros 30 ms,
#   sem o grave (passa-alta), mais baixos. O iPhone não tem tecla física; o clique do teclado do iOS é curto e agudo.
# O "vush" da troca de app é sintetizado, como no filme de 66 s: é som de montagem, não de tela.
import json, sys, wave, numpy as np
SR = 48000; FPS = 30
d = json.load(open(sys.argv[1])); T = d['T']
N = int(SR * T['fim'] / FPS)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(20261123)
def le(n, corta=0.0):
    w = wave.open(f'sons-reais/{n}.wav'); assert w.getframerate() == SR
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float) / 32768
    if w.getnchannels() == 2: x = x.reshape(-1, 2).mean(axis=1)
    x = x[int(corta * SR):]
    return x / np.abs(x).max()
aviso = le('whatsapp-aviso-BS_BUUXbKq5', 0.27)
envio = le('whatsapp-envio-lsK0FC6wi8C')
b = np.load('sons-reais/teclado-macbook-freesound-565645.npz'); assert int(b['sr']) == SR
def toque_de_tela(s):
    n = int(0.030 * SR); s = s[:n].copy()
    s = np.append(s[0], s[1:] - 0.93 * s[:-1])          # passa-alta simples: tira o "corpo" da tecla de notebook
    s *= np.linspace(1, 0, len(s)) ** 1.5                # cauda curta
    return s / np.abs(s).max()
teclas = [toque_de_tela(s) for s in b['sons']]
def poe(x, f, ganho, pan=0.0):
    i = int(round(f / FPS * SR)); x = x[: max(0, N - i)]
    L[i:i + len(x)] += x * ganho * (1 - max(0, pan)); R[i:i + len(x)] += x * ganho * (1 + min(0, pan))
def chicote(dur=.36):
    n = int(dur * SR); t = np.arange(n) / n
    ruido = rng.standard_normal(n)
    fc = 350 * (9 ** np.sin(np.pi * t)); y = np.zeros(n); lp = 0.0; lp2 = 0.0
    for i in range(n):
        a = 1 - np.exp(-2 * np.pi * fc[i] / SR)
        lp += a * (ruido[i] - lp); lp2 += a * .25 * (lp - lp2); y[i] = lp - lp2
    y *= np.sin(np.pi * t) ** 2.2
    return y / np.abs(y).max()
vush = chicote(); conta = {}; ida = True
for e in d['sons']:
    f, s = e['f'], e['som']; conta[s] = conta.get(s, 0) + 1
    if s in ('tecla', 'espaco', 'apaga'): poe(teclas[rng.integers(len(teclas))], f, .05 * rng.uniform(.75, 1.0), rng.uniform(-.08, .08))
    elif s == 'enter': poe(teclas[rng.integers(len(teclas))], f, .06, 0)
    elif s == 'toque': poe(teclas[rng.integers(len(teclas))], f, .045, 0)
    elif s == 'aviso': poe(aviso, f, .19 * e['v'], .12)
    elif s == 'enviada': poe(envio, f, .16, -.1)
    elif s == 'chicote':
        n = len(vush); p = np.linspace(-.6, .6, n) * (-1 if ida else 1); i = int(round((f + 9) / FPS * SR)) - n // 2
        L[i:i + n] += vush * .17 * (1 - np.maximum(0, p)); R[i:i + n] += vush * .17 * (1 + np.minimum(0, p)); ida = not ida
print(conta)
x = np.stack([L, R], axis=1); pico = np.abs(x).max(); print('pico', round(pico, 3))
if pico > .3: x *= .3 / pico
w = wave.open(sys.argv[2], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
