// One-off: torna preto transparente via flood fill 8-connected
// a partir das bordas, e apaga a marca d'água da Sora.
import sharp from 'sharp'

const SRC = 'E:/Projetos/hold/public/personagem/Gemini_Generated_Image_k923cxk923cxk923.png'
const OUT = 'E:/Projetos/hold/public/personagem/saude-character.png'

const FLOOD_THRESH = 12

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true })
const { width: w, height: h, channels: c } = info
const px = Buffer.from(data)
const N = w * h

const lum = new Uint8Array(N)
for (let i = 0; i < N; i++) {
  const k = i * c
  lum[i] = (0.299 * px[k] + 0.587 * px[k + 1] + 0.114 * px[k + 2]) | 0
}

const bg = new Uint8Array(N)
const stack = []
for (let x = 0; x < w; x++) {
  if (lum[x] < FLOOD_THRESH) { bg[x] = 1; stack.push(x) }
  const p = (h - 1) * w + x
  if (lum[p] < FLOOD_THRESH) { bg[p] = 1; stack.push(p) }
}
for (let y = 0; y < h; y++) {
  const l = y * w, r = l + w - 1
  if (lum[l] < FLOOD_THRESH) { bg[l] = 1; stack.push(l) }
  if (lum[r] < FLOOD_THRESH) { bg[r] = 1; stack.push(r) }
}

while (stack.length) {
  const p = stack.pop()
  const x = p % w
  const y = (p / w) | 0
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue
      const nx = x + dx, ny = y + dy
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
      const np = ny * w + nx
      if (bg[np]) continue
      if (lum[np] < FLOOD_THRESH) {
        bg[np] = 1
        stack.push(np)
      }
    }
  }
}

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const p = y * w + x
    const k = p * c
    if (bg[p]) {
      px[k + 3] = 0
    } else {
      let bgN = 0, tot = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue
          const nx = x + dx, ny = y + dy
          if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue
          tot++
          if (bg[ny * w + nx]) bgN++
        }
      }
      if (bgN > 0) {
        const a = Math.round(255 * (1 - bgN / tot * 0.85))
        px[k + 3] = Math.min(px[k + 3], a)
      }
    }
  }
}

const wmX0 = w - 180, wmY0 = h - 110
for (let y = wmY0; y < h; y++) {
  for (let x = wmX0; x < w; x++) {
    px[(y * w + x) * c + 3] = 0
  }
}

await sharp(px, { raw: { width: w, height: h, channels: c } })
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log('OK ->', OUT)
