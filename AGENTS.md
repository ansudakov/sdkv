<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Content pipeline for blog posts

Redакторская политика — голос, синтаксис, структура статьи, техническая специфика SVG-иллюстраций — целиком в [REDPOLITIKA.md](REDPOLITIKA.md). Прочитать перед любой правкой контента в `src/content/posts/` или связанных компонентов.

**SEO/соцшеринг-метаданные новой статьи собираются автоматически из фронтматтера `.mdx` — не добавлять руками:**
- `og:image`/`twitter:image` — генерируются кодом (`src/app/blog/[slug]/opengraph-image.tsx`) из `title`, брендированы под сайт.
- JSON-LD `BlogPosting` (`image`, `datePublished`, `dateModified`, `mainEntityOfPage`, `publisher`) — собирается в `src/app/blog/[slug]/page.tsx` из `date`/`updated`.
- `alt` у обложки поста (в статье, на `/blog`, в тизере на главной) — везде `post.title`, прокидывается через `PostCoverImage`.
- `canonical` — на уровне роута для всех страниц сайта, включая `/blog/[slug]`.

Единственное ручное поле — опциональный `updated: "YYYY-MM-DD"` во фронтматтере, когда уже опубликованную статью существенно правят задним числом (влияет на `dateModified`). Если меняется сама схема метаданных (новые поля, другой генератор og-картинки) — обновлять и код, и описание в REDPOLITIKA.md, и этот файл, чтобы не разъехалось.
