# Recorta toques de tecla isolados de uma gravação real de teclado (Freesound 565645, CC0) e salva um banco em .npz.
import wave, numpy as np, sys
src, out = sys.argv[1], sys.argv[2]
w = wave.open(src); sr = w.getframerate(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(float)/32768
h = int(sr*.004); env = np.array([np.abs(x[i:i+h]).max() for i in range(0, len(x)-h, h)])
th = 0.025; on = []; ult = -99
for i, e in enumerate(env):
    if e > th and i - ult > 30: on.append(i)   # 120 ms de calma antes
    if e > th * 0.5: ult = i
print('ataques', len(on))
teclas = []
for k, i in enumerate(on):
    a = max(0, i*h - int(.004*sr)); b = a + int(.13*sr)
    prox = on[k+1]*h if k+1 < len(on) else len(x)
    if prox - a < int(.13*sr): continue          # outro toque dentro da janela: descarta
    s = x[a:b].copy(); s[-int(.03*sr):] *= np.linspace(1, 0, int(.03*sr))
    F = np.abs(np.fft.rfft(s)); fr = np.fft.rfftfreq(len(s), 1/sr); cent = (F*fr).sum()/F.sum()
    teclas.append((np.abs(s).max(), cent, s))
print('isolados', len(teclas))
pk = np.array([t[0] for t in teclas]); ce = np.array([t[1] for t in teclas])
print('pico: min %.3f med %.3f max %.3f | centroide: min %d med %d max %d' % (pk.min(), np.median(pk), pk.max(), ce.min(), np.median(ce), ce.max()))
np.savez(out, sr=sr, pico=pk, cent=ce, sons=np.stack([t[2] for t in teclas]))
