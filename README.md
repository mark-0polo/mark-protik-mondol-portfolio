# Mark Protik Mondol — Portfolio

A React + TypeScript portfolio inspired by [ArtCraft's apps page](https://getartcraft.com/apps): a charcoal default theme, an ivory alternative, an editorial grid, warm copper-orange accents (`#F38B45`), a prominent handwritten signature, seven project tiles, and purposeful motion.

## Run locally

Use Node.js 22.12 or later (Node 22 LTS recommended).

```bash
npm ci
npm run dev
```

Open **http://127.0.0.1:5173/**. The development server reloads after source edits. Stop it with Ctrl+C.

```bash
npm run build
npm run preview
```

The build runs TypeScript checks and writes the deployable site to `dist/`. The production preview runs at **http://127.0.0.1:4173/**. Preview is for local review; GitHub Pages serves the deployed files.

## Upload and deploy to GitHub Pages

1. Upload the project source to your GitHub repository, including `src/`, `public/`, `package.json`, `package-lock.json`, `index.html`, `vite.config.js`, `tsconfig.json`, `postcss.config.js`, and **`.github/workflows/deploy.yml`**. Do not upload `node_modules/` or `dist/` for this workflow.
2. In the repository, choose **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push/upload to `main` or `master`. The included workflow installs dependencies, checks types, builds, and deploys. You can also start it from **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
4. When the workflow succeeds, open the URL displayed under Settings → Pages.

The Vite base is relative (`./`), and all images, fonts, and PDF paths follow that base. This works for `https://mark-0polo.github.io/`, `https://mark-0polo.github.io/REPOSITORY/`, and a custom domain without changing the build.

If uploading using GitHub's website, remember to add the hidden `.github` folder/workflow; upload the source contents, not the ZIP itself.

### Deploy the already-built files instead

Extract `github-pages-site.zip` and upload **its contents** (the built `index.html`, `assets/`, `fonts/`, `favicon.svg`, and `.nojekyll`) into your publishing branch's root. Select **Settings → Pages → Deploy from a branch**, that branch, and **/(root)**. There is no Node build step with this option. Source files are needed for future edits.

## Customize

- `src/data/portfolioData.ts`: original full project descriptions, certificates, education, and external URLs.
- `src/PortfolioApp.tsx`: navigation, copy, short project summaries, filters, contact form, and previews.
- `src/craft.css`: layouts, reference colors, responsive breakpoints, hover effects, and reduced-motion rules.
- `src/craft-motion.css`: shared motion tokens and reveal/tilt/dialog transitions.
- `src/components/craft/Interactions.tsx`: Lenis scrolling, magnetic elements, cursor follower, scroll ruler, and accessible native dialogs.
- `src/components/craft/ProjectArt.tsx`: original conceptual illustrations of the projects. These are visual explanations, not screenshots or measured benchmark charts.
- `public/assets/`: your existing portrait, signature, CV PDF/preview, and certificate artwork.
- `public/fonts/`: locally bundled Archivo, Inter, and JetBrains Mono, with their SIL Open Font Licenses. No font CDN is needed at runtime.

## Contact and metadata

The contact form retains your existing Formspree endpoint (`https://formspree.io/f/xlgpyeyo`). Submission requires that endpoint to remain active and allow your deployed domain. Success and failure states can be tested with intercepted requests; local verification does not send real email. Email, telephone, GitHub, and LinkedIn links also work directly.

If you publish under a repository path or custom domain, update `og:url`, `twitter:url`, `og:image`, and `twitter:image` in `index.html` to that final public address for accurate social sharing previews. They currently reference `https://mark-0polo.github.io/`.

## Motion and accessibility

Lenis provides smooth desktop wheel and anchor scrolling. Touch scrolling stays native. The pointer follower uses transforms and springs, expands over interactive targets, shows a VIEW label over previews, and hides over text fields. Magnetic buttons, a subtle signature tilt, blur-and-rise reveals, image zooms, animated arrows, and shorter dialog exits echo the reference's interaction style.

The desktop ruler's tick marks travel with the document, and its percentage uses rolling digits. Phones show a compact progress line beneath the header. Main body copy is 16px, controls are at least 12px, and certificate metadata is 11px or larger. Certificate logos and badges use a white artwork surface in both themes to preserve their original colors and readable lettering. Preview dialogs scroll internally on short screens, keeping the close control accessible.

Reduced-motion preferences disable smooth scrolling, pointer effects, and moving reveals. Hover effects apply only to fine pointers. Navigation, filters, previews, and the CV download work with the keyboard. Native dialogs trap focus, dismiss with Escape, and restore focus to their trigger.

Legacy section components and Tailwind styles are retained in `src/components/portfolio/` and `src/index.css` as reference; the new page uses `craft.css`. The SVG skill and social icons are reused from those original components.

Reference deployment documentation: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [Vite static deployment](https://vite.dev/guide/static-deploy.html).
