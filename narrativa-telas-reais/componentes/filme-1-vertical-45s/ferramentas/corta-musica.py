# Corte de 44,9 s da música, feito a partir do corte oficial de 66 s (o pacote não tem corte oficial entre 40 e 50 s).
# Tira os compassos 17 a 28: emenda o ataque do compasso 17 (28,433 s) com o do compasso 29 (49,766 s), os dois medidos
# por fluxo espectral no arquivo, 10 ms antes de cada ataque, com 15 ms de troca em potência constante.
# Conferência (23/11): espectro dos 2 s depois de cada ataque com correlação de 0,95; volume com 0,4 dB de diferença.
# Uso: python3 corta-musica.py <le-jazz_short-03_66sec.wav> <saida.wav>
import sys, wave, numpy as np
w = wave.open(sys.argv[1]); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2).astype(float)
A = int(round((28.4328 - 0.010) * sr)); B = int(round((49.7662 - 0.010) * sr)); xf = int(0.015 * sr)
t = np.linspace(0, 1, xf)[:, None]
y = np.concatenate([x[:A], x[A:A + xf] * np.cos(t * np.pi / 2) + x[B:B + xf] * np.sin(t * np.pi / 2), x[B + xf:]])
o = wave.open(sys.argv[2], 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr)
o.writeframes(np.clip(y, -32768, 32767).astype(np.int16).tobytes()); o.close()
print(round(len(y) / sr, 3), 's')
