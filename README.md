# Image Transform Lite — Landing Page

Sitio web bilingüe (es/en) para promocionar [Image Transform Lite](https://github.com/MAECLY/image-transform-lite), una app de escritorio para macOS Apple Silicon que procesa imágenes en lote.

## Stack

- Next.js 16 (App Router) con `output: "export"`
- React 19 + TypeScript 5 (strict)
- Tailwind CSS 3 (paleta `apple.*` light theme)
- lucide-react, tsparticles, react-countup, border-beam
- i18n manual (es/en) compatible con static export

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000  → redirige a /es
```

## Build estático

```bash
npm run build
npx serve out -p 5000
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── manifest.ts, robots.ts, sitemap.ts, opengraph-image.tsx, not-found.tsx
│   └── [locale]/                    # i18n: 'es' | 'en'
│       ├── layout.tsx               # generateStaticParams + DictionaryProvider
│       └── page.tsx                 # composición de secciones
├── components/                      # Hero, Stats, Features, TransformationsShowcase, …
│   ├── ui/                          # AnimatedOnScroll, SectionWrapper, GlowCard
│   └── showcase/                    # 8 demos de transformaciones (CSS-driven)
├── i18n/                            # config + dictionaries loader
├── messages/                        # es.json, en.json
└── lib/                             # constants, useGitHubRelease, useDictionary
```

## Notas de mantenimiento

- Cuando salga una nueva release del producto, actualizar `PRODUCT.fallbackVersion` en `src/lib/constants.ts`. El hook `useGitHubRelease` siempre intentará obtener la última versión vía GitHub API; el fallback se usa solo si la API no responde.
- Los strings UI viven en `src/messages/{es,en}.json`. `constants.ts` solo contiene IDs, datos estructurales y URLs.
- El theme se centraliza en `tailwind.config.ts` (paleta `apple.*`).

## Deploy

Vercel detecta `output: "export"` y sirve `out/` directamente. `vercel.json` aplica security headers.
