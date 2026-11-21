# Renxuan Tan · Academic homepage

A compact bilingual academic homepage adapted from [PRISM](https://github.com/xyjoey/PRISM) (MIT, revision `f2748db`). The site is a Next.js static export: no database, API keys, or external fonts.

## Preview

Use Node.js 22 or later. Run `npm ci` followed by `npm run dev`; visit the localhost address printed by Next.js.

## Edit

- `content/config.toml` and `content_zh/config.toml`: name, email, Scholar link, portrait path, navigation and update date.
- `content/publications.bib`: published papers, authors, venue, DOI, description, image and preprint URLs. Set `selected = {true}` for the default Highlights view.
- `content/submissions.json`: additional works shown only in All Works, with ordered author lists, OpenReview links, bilingual summaries and the author-confirmed co-first credit for OVAL.
- `src/components/home/ResearchHome.tsx`: biography, honors, news, internship, education and publication cards. Paper dates follow the [advisor’s publication list](https://rongpeng.info/publications/); TMC’s rating follows the [CCF journal list](https://www.ccf.org.cn/Academic_Evaluation/CN/). The [NICE team](https://rongpeng.info/team/) and advisor are linked in the biography.
- `public/schools/`: emblems of Zhejiang University and Sichuan University, rendered from [TomBener/uni-logo](https://github.com/TomBener/uni-logo); they belong to the respective institutions.
- `public/papers/`: cropped original paper figures. OVAL Fig. 1, CHAT Fig. 2, E-TRACE Fig. 1; each published paper uses Fig. 1 from its author preprint. Figures retain their original authorship and are not covered by the template’s MIT license.
- `src/app/folio.css`: typography, responsive layout and publication thumbnails.

## GitHub Pages

The homepage at https://lakjx.github.io/ uses GitHub Pages' existing **Deploy from a branch → main → /(root)** configuration. Both editable source and ready-to-serve files are committed. The root `.nojekyll` preserves Next.js asset paths without requiring a custom Actions workflow.

After editing, run `npm ci` and `npm run build:pages` with no base path. Commit the source and regenerated root files together. For a local preview, serve `out/` with a static HTTP server.
