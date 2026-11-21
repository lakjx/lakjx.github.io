# Renxuan Tan · Academic homepage

A compact bilingual academic homepage adapted from [PRISM](https://github.com/xyjoey/PRISM) (MIT, revision `f2748db`). The site is a Next.js static export: no database, API keys, or external fonts.

## Preview

Use Node.js 22 or later. Run `npm ci` followed by `npm run dev`; visit the localhost address printed by Next.js.

## Edit

- `content/config.toml` and `content_zh/config.toml`: name, email, Scholar link, portrait path, navigation and update date.
- `content/publications.bib`: published papers, authors, venues, links and illustrations.
- `content/submissions.json`: submitted works, ordered author lists, OpenReview links, bilingual summaries and OVAL’s co-first credit. Submission is not acceptance.
- `src/components/home/ResearchHome.tsx`: ordered highlight IDs, publication cards, internship and education (including scholarships). Paper dates follow the [advisor’s publication list](https://rongpeng.info/publications/); TMC’s rating follows the [CCF journal list](https://www.ccf.org.cn/Academic_Evaluation/CN/).
- `src/components/home/ProfileSections.tsx` holds the bilingual bio, news and photo descriptions. The three gallery images are in `public/life/`. The journal acceptance months come from the papers’ first pages. The conference entries use the notification months listed by [ACL 2026](https://2026.aclweb.org/calls/main_conference_papers/) and [SPAWC 2025](https://www.imperial.ac.uk/media/imperial-college/research-centres-and-groups/intelligent-transmission/%5BCall-for-Papers%5D-SPAWC2025.pdf).
- `public/schools/`: emblems of Zhejiang University and Sichuan University, rendered from [TomBener/uni-logo](https://github.com/TomBener/uni-logo); they belong to the respective institutions.
- `public/papers/`: original figures, cropped from the papers. OVAL Fig. 1, CHAT Fig. 2, E-TRACE Fig. 1; Agentic MAC uses Fig. 5 for its results preview and retains Fig. 1 in the expanded view. Other published works use Fig. 1. Figures retain their original authorship and are not covered by the template’s MIT license.
- `src/app/folio.css`: typography, responsive layout and publication thumbnails.

## GitHub Pages

The homepage at https://lakjx.github.io/ uses GitHub Pages' existing **Deploy from a branch → main → /(root)** configuration. Both editable source and ready-to-serve files are committed. The root `.nojekyll` preserves Next.js asset paths without requiring a custom Actions workflow.

After editing, run `npm ci` and `npm run build:pages` with no base path. Commit the source and regenerated root files together. For a local preview, serve `out/` with a static HTTP server.
