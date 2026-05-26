# Prompts de geração de imagens — Saúde V2 (PDF feedback)

Documento de handoff. Use estes prompts no seu gerador de preferência (Midjourney v6.1+, Sora, Ideogram v2, Flux Pro, Adobe Firefly 3). Cada card tem **3 variações de prompt** — gere todas e escolha a melhor. Output final em `.webp` qualidade 90-92.

## Padrão técnico (vale pros 2 cards)

- **Aspect ratio:** `--ar 4:5` (portrait) — combina com os cards do grid de modalidades (`min-h-[420-520px]`)
- **Resolução final:** mínimo 1600×2000px, ideal 2000×2500px
- **Formato de entrega:** `.webp` qualidade 90-92 (use `cwebp -q 92 input.jpg -o output.webp` ou export do Photoshop)
- **Não deve ter:** texto sobreposto, logos, marca d'água, watermarks, UI elements, gráficos, dashboards, overlays digitais
- **Paleta visual:** deep navy `#0d2240`, accent neutros quentes, levíssimo vermelho ambient `#ae251c` em pontos discretos (luz, parede, objeto pequeno)
- **Mood:** cinematográfico, editorial, premium consultivo — **anti stock-photo genérico**
- **Iluminação:** natural daylight, golden hour suave, sem flash duro, sem HDR exagerado

---

## Card 01 — Individual e Familiar

**Output esperado:** `/public/images/Saude/familia-completa.webp`

**Brief:** Família completa (pai + mãe + 1 ou 2 filhos) num momento íntimo em casa. Cena calorosa, real, NÃO posada stock-photo. Deve transmitir "proteção, previsibilidade, presença". O card vai ter overlay escuro de gradiente no topo (logo/eyebrow) — então a composição precisa ter área respirável na metade superior.

### Variação A — Sala de estar contemporânea (Recomendado pra fidelidade ao PDF)

> Cinematic editorial portrait of a contemporary Brazilian family of four — father (early 30s), mother (early 30s), young son (around 7), young daughter (around 4) — sitting together on a modern beige fabric sofa in a softly-lit living room. Natural late afternoon golden-hour light streams through large windows from the right, creating warm rim light on faces and soft shadows. The parents are relaxed, leaning slightly toward each other, the children naturally engaged in the moment — one looking at a book, the other smiling toward the parents. Genuine candid expressions, no fake stock-photo smiles. Background: minimalist contemporary Brazilian apartment with plants, warm wood tones, a soft beige wall, subtle navy blue accent in a cushion or artwork. Composition: family centered slightly lower in frame, leaving breathing room above for editorial overlay. Color palette: warm neutrals, soft beiges, hints of deep navy `#142f54`. Shot on Sony FX3 with 50mm f/1.4 lens, shallow depth of field, color graded like a premium editorial campaign for a consultive brand. No text, no logos, no watermarks. --ar 4:5 --style raw --v 6.1

**Português (para Sora/Ideogram em português):**

> Retrato editorial cinematográfico de uma família brasileira contemporânea de quatro pessoas — pai (início dos 30), mãe (início dos 30), filho pequeno (cerca de 7 anos), filha pequena (cerca de 4 anos) — sentados juntos em um sofá moderno de tecido bege em uma sala de estar suavemente iluminada. Luz natural de final de tarde (golden hour) entra por janelas grandes pela direita, criando luz quente nos rostos e sombras suaves. Os pais estão relaxados, levemente inclinados um para o outro, as crianças naturalmente engajadas no momento — uma olhando um livro, a outra sorrindo na direção dos pais. Expressões genuínas, sem sorrisos fake de banco de imagem. Fundo: apartamento contemporâneo brasileiro minimalista com plantas, tons de madeira quente, parede bege suave, leve toque de azul-marinho em uma almofada ou quadro. Composição: família ligeiramente centralizada na parte inferior do quadro, deixando respiro na parte superior para overlay editorial. Paleta: neutros quentes, beges suaves, toques discretos de azul profundo `#142f54`. Filmagem com Sony FX3, lente 50mm f/1.4, profundidade de campo rasa, gradação de cor de campanha editorial premium. Sem texto, sem logos, sem marca d'água. Proporção 4:5.

### Variação B — Cozinha aberta (alternativa do PDF mockup 1)

> Cinematic warm editorial photograph of a Brazilian family of three or four in an open-concept contemporary kitchen-living space, gathered around a wooden kitchen island during late afternoon. Father, mother, and one or two children sharing a relaxed moment — could be the daughter laughing, son holding a glass of juice, parents in casual home wear. Soft natural light through wide back windows, warm tungsten kitchen pendant lamps adding amber glow. Plants and modern but lived-in styling. Genuine candid moment, not a posed shot. Earth-tone palette: warm wood, cream walls, soft beige tones, subtle navy or deep teal accent. Shallow depth of field, color graded with warm editorial finish. Composition leaves space in upper third for overlay text. No watermarks, no logos, no text. --ar 4:5 --style raw --v 6.1

### Variação C — Sofá próximo + janela (íntimo, intencional)

> Editorial close-mid portrait of a Brazilian family of four sitting close together on a contemporary linen sofa near a large window, late golden hour light filtering through sheer curtains. Father with arm gently around mother's shoulder, mother holding the younger child on her lap, older child leaning into the father's other side. Everyone in soft neutral home clothing (oatmeal, cream, soft denim). Background slightly out of focus — minimal contemporary Brazilian living room with one large abstract artwork in warm tones and a single navy blue ceramic vase. Calm, contemplative, protective mood. Sony FX3 50mm f/1.6, color graded for a high-end consultive brand. No text, no logos, no UI overlays. --ar 4:5 --style raw --v 6.1

### Negative prompt (importante)
```
no text, no logos, no watermarks, no UI overlays, no charts, no graphs,
no fake stock smiles, no clinical white background, no aggressive HDR,
no overly bright cartoon colors, no doctor coats, no medical scrubs,
no hospital settings, no babies under 1 year old, no harsh flash
```

---

## Card 03 — Empresarial (PME / Soluções corporativas)

**Output esperado:** `/public/images/Saude/empresarial-pme.webp`

**Brief:** Executivo de PME (homem ou mulher, late 30s — early 40s) sorrindo discretamente, postura confiante, com equipe de 2-3 pessoas em soft-focus no fundo, em um escritório moderno PME (não corporativão Wall Street, mas espaço bem cuidado com plantas e luz natural). Transmite "consultivo, confiável, sustentável". A PDF de referência tinha overlays de gráfico/dashboard — **NÃO incluir esses overlays**, queremos a foto crua.

### Variação A — Executivo PME (Recomendado pra fidelidade)

> Cinematic editorial portrait of a confident Brazilian PME (small-to-mid business) entrepreneur, late 30s to early 40s, slight friendly smile, dressed in a refined casual blazer over a simple white or oatmeal shirt — no tie, modern professional. Standing or seated relaxed in a modern contemporary co-working / boutique office space with natural daylight pouring through large industrial windows. Background: two or three diverse team members in soft focus, working at a long wooden table or standing in casual conversation. Plants (large monstera or fiddle leaf fig) flanking the scene, warm wood tones, polished concrete or pale wood floor, deep navy or charcoal wall as accent. Bokeh background, sharp focus on the entrepreneur. Genuine confident expression — slight smile, gaze toward camera or slightly off-axis, no clenched corporate fake-smile. Color palette: warm neutrals, navy `#142f54`, hints of green from plants, sunlight warmth. Shot on Sony FX3 with 85mm f/1.4 lens, shallow depth of field, premium editorial color grade — looks like a feature in a Brazilian business magazine. No charts, no UI overlays, no logos, no text. --ar 4:5 --style raw --v 6.1

**Português:**

> Retrato editorial cinematográfico de um(a) empreendedor(a) brasileiro(a) de PME, entre 35 e 42 anos, sorriso leve e confiante, com blazer casual refinado sobre camisa branca ou off-white — sem gravata, profissional moderno. Em pé ou sentado relaxado em escritório boutique moderno / espaço de coworking contemporâneo com luz natural entrando por janelas industriais grandes. Fundo: dois ou três membros de equipe diversos em foco suave, trabalhando em uma mesa longa de madeira ou em conversa casual em pé. Plantas (monstera grande ou figueira-lira) flanqueando a cena, tons quentes de madeira, piso de concreto polido ou madeira clara, parede de destaque em azul profundo ou carvão. Bokeh no fundo, foco nítido no(a) protagonista. Expressão confiante e genuína — leve sorriso, olhar para a câmera ou ligeiramente fora do eixo, sem sorriso corporativo falso. Paleta: neutros quentes, azul `#142f54`, toques de verde das plantas, calor da luz do sol. Filmagem com Sony FX3, lente 85mm f/1.4, profundidade de campo rasa, gradação de cor editorial premium — como uma matéria em revista de negócios brasileira. Sem gráficos, sem overlays de UI, sem logos, sem texto. Proporção 4:5.

### Variação B — Reunião colaborativa (sem protagonista único)

> Cinematic editorial wide-mid shot of a Brazilian small-business team — three or four people, mixed gender and age, in smart casual professional attire — engaged in a focused, genuine collaboration moment around a large wooden table in a modern boutique office. Natural daylight from oversized industrial windows, plants in background, exposed warm brick or polished concrete walls, deep navy accent. Laptop open but no visible screen content. One person mid-explanation, the others engaged but relaxed. Authentic moment, not posed. Sony FX3 35mm f/2 lens, slight motion in foreground, premium color grade. Avoid clinical office cliché. No logos, no text, no UI overlays, no charts. --ar 4:5 --style raw --v 6.1

### Variação C — Retrato editorial single em janela

> Editorial cinematic portrait of a confident Brazilian PME founder, early 40s, standing in front of a large industrial-style window in a modern contemporary office. Late morning daylight rim-lighting her or his profile, hands relaxed in front, slight side-look toward the camera with a confident reassuring expression. Modern smart-casual outfit in oatmeal, white, or navy. Background visible through bokeh: hint of office space with plants and warm wood. Color palette warm and refined. Sony FX3 85mm f/1.4. No text, no logos, no UI overlays. --ar 4:5 --style raw --v 6.1

### Negative prompt (importante)
```
no text, no logos, no UI overlays, no charts, no graphs, no laptops with
visible screen content, no Wall Street suits, no clinical white office,
no fake corporate handshake, no fake group laughter, no harsh flash,
no aggressive HDR, no plastic stock-photo skin, no cartoon styling,
no oversaturated colors, no fake smiles
```

---

## Checklist final antes de exportar

- [ ] Aspect ratio exato 4:5 (fundamental pros cards)
- [ ] Mínimo 1600×2000 px (não fazer downscale)
- [ ] Sem texto, logo, watermark, UI sobreposta
- [ ] Faces nítidas, pele realista (não plastificada)
- [ ] Composição com **respiro na parte superior** (área onde overlay de gradiente vai cair no card)
- [ ] Exportar `.webp` qualidade 90-92
- [ ] Nomear exatamente: `familia-completa.webp` e `empresarial-pme.webp`
- [ ] Colocar em `E:\Projetos\hold\public\images\Saude\`

## Quando você enviar os arquivos
Me avisa nome dos arquivos colocados em `/public/images/Saude/`. Eu troco o `src:` em `components/sections/saude/SaudeModalidades.tsx` linhas 38 e 50, rodo build, e checo visual rápido. Mudança de 30 segundos no código.

## Plano B (se a IA não acertar a família com 4 pessoas)
Algumas IAs (especialmente MJ) têm dificuldade com cenas com 4 pessoas em proximidade. Se acontecer:
1. Gere primeiro o casal + 1 criança (Variação A modificada — "family of three")
2. Em segunda passada com inpainting (img2img + mask), adicione a 2ª criança
3. OU aceite "família de 3" como compromisso aceitável — ainda é família completa (PDF não exige número específico de filhos, só "filho(s)")
