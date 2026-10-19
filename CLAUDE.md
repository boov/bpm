# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm dev              # Start Astro dev server for the active app (default: web) on http://localhost:4321/
pnpm preview          # Build then serve the production output locally
```

`dev`, `build`, and `preview` proxy to the workspace named in `.active-app` (falling back to `web` when the file is absent), e.g. `pnpm --filter @bpm/$(cat .active-app) run dev`.

### Build

```bash
pnpm build            # Build only the active app
pnpm build:all        # Build every workspace that defines a build script
pnpm clean            # Remove apps/*/dist, apps/*/.astro, apps/*/.netlify, .eslintcache
```

### Test and check

```bash
pnpm --filter @bpm/web test    # Unit tests
pnpm --filter @bpm/web check   # Post-build checks (run after pnpm build)
pnpm --filter @bpm/web typecheck   # Type check .astro and .ts files (astro check; dist and scripts are excluded)
```

### Quality

```bash
pnpm prettier         # Format the repo in place (prettier -lw .)
pnpm eslint           # Lint with --cache --fix
pnpm format           # Run prettier then eslint (preferred pre-commit gate)
```

### Workspace-Specific Commands

```bash
# Run commands in specific workspace
pnpm --filter @bpm/web <script>

# Available workspaces: @bpm/web, @bpm/design-system, @bpm/tailwind-base, @bpm/custom-merge, @bpm/data
```

## Architecture

### Monorepo Structure

This is a pnpm workspaces monorepo (`pnpm-workspace.yaml`). pnpm is pinned in the root `packageManager` field; run `corepack enable pnpm` once to install it. Each workspace lists its own dependencies; the root holds only lint, format and TypeScript tooling. External versions live once in the `catalog:` block of `pnpm-workspace.yaml`, and each `package.json` refers to them as `"catalog:"`; add new dependencies with `pnpm add --save-catalog <pkg>`. Workspace packages are linked with `workspace:*`:

- **`apps/web/`** - Main Astro 7 static website application
- **`packages/`** - Shared workspace packages:
  - `design-system` - Tailwind CSS plugin with custom utilities
  - `tailwind-base` - Base Tailwind preset configuration
  - `custom-merge` - Tailwind class merging (`twMerge`, `twSort`), built on `tailwind-merge`
  - `data` - Shared content data (personnel, questions)

### Content Collections System

The site uses Astro's Content Collections API with custom loaders (apps/web/src/content.config.ts):

- **Collections**: `personnel`, `services`, `audiences`, `questions`
- **Data Sources**:
  - JSON files in `src/content/` (services, audiences)
  - Shared workspace package `@bpm/data` (personnel, questions)
- **Validation**: All collections use Zod schemas
- **ID Generation**: `personnel` and `questions` IDs come from the name or title (e.g., "John Doe" → "john-doe"); `services` and `audiences` IDs are the JSON file names

Read `content.config.ts` for the current fields; it is the only source of truth. Cross-page links are `reference()` fields: `services.related` and `audiences.services` list service IDs (the JSON file names).

### Custom Design System

Located in `packages/design-system/`, this Tailwind plugin exports:

- `designSystem` - Main plugin with container and grid utilities
- `magicTypography()` - Exponential typography scale generator

#### 1. Magic Typography System

The `magicTypography()` function generates fluid typography scales using exponential ratios:

```typescript
// Headings: h0-h7 with 1.25 ratio, line-heights 1.05-1.2
magicTypography({ h0: 7, h1: 6, h2: 5, ... }, 1.25, [1.05, 1.2])

// Text sizes: 9xl-xs with 1.15 ratio, line-heights 1.1-1.65
magicTypography({ "9xl": 10, ..., base: 0, sm: -1, xs: -2 }, 1.15, [1.1, 1.65])
```

- Exponent values convert to rem via `ratio^exponent`
- Line-heights scale inversely (larger text = tighter)
- Both scales defined in `packages/tailwind-base/tailwind.base.ts`

#### 2. Grid-Based Spacing System

Uses column-based units instead of arbitrary values:

- `12c` = width of 12 grid columns (including gutters)
- Configured in design system plugin with column width + gutter calculations
- Example: `container-12c` creates a container 12 columns wide

#### 3. Container Utilities

Custom `container` component with automatic padding:

```html
<div class="container-12c">
  <!-- Max width of 12 columns + responsive padding -->
</div>
```

- Default width: `12c`
- Padding: `5vw` with minimum of `theme('spacing.7')`
- Centered with `margin: auto`

### TypeScript Path Aliases

Configured in `apps/web/tsconfig.json`:

```json
{
  "@helpers": ["src/assets/scripts/helpers.ts"],
  "@types": ["src/types.ts"],
  "@assets/*": ["src/assets/*"],
  "@components/*": ["src/components/*"],
  "@layouts/*": ["src/layouts/*"]
}
```

Use these aliases in imports rather than relative paths.

### Component Organization

- **Base components**: `src/components/` (Button, Input, Heading, Section, etc.)
- **Global components**: `src/components/global/` (Footer, CTA, Banner, Schema, GTM, etc.) used across pages
- **Page components**: `src/components/pages/<page>/` (per-route building blocks: `home`, `about`, `contact`, `pay-online`)
- **Section components**: `src/components/sections/` (shared page sections: PageHero, IntroBlock, IncludedList, StepList, ProofList, FaqList, ServiceLinks, InlineText)
- **Collection components**: `src/components/collection/{audience,personnel,question,service}/` rendering content collection entries
- **Shared constants**: call to action labels and targets live only in `src/assets/scripts/calls-to-action.ts`; business details live only in `src/assets/scripts/site.ts`
- **Layouts**: `src/layouts/` (`Base`, `Default`, `Text`)

### Build & Deployment

**Astro Configuration** (apps/web/astro.config.mjs):

- Dev server: port 4321
- Site URL: `https://www.belgarum-property.co.uk`
- Integrations: sitemap, meta-tags
- Prefetching: enabled for all links

**Netlify Deployment** (apps/web/netlify.toml):

- Build command: `pnpm run build`
- Publish directory: `apps/web/dist`
- Redirects from the live site: `[[redirects]]` blocks in `netlify.toml` (301)
- Lighthouse audits on: /, /services, /services/block-and-estate-management, /who-we-work-with/rmc-and-rtm-directors, /about, /faqs, /contact, /privacy-policy
- Node.js 22+ required (see `.nvmrc`)

**Tailwind CSS**:

- Tailwind v4 with native Vite support (`@tailwindcss/vite`)
- Base preset in `packages/tailwind-base/`

**AlpineJS**

- AlpineJS is used for client-side interactivity and state management (`alpinejs`)

**Lucide Icons**:

- All icons are sourced from Lucide Icons, using their astro package (`@lucide/astro`)
- To import a specific icon: `import IconName from "@lucide/astro/icons/icon-name";`

### Linting & Formatting

- **Prettier** (`.prettierrc.json`): `printWidth: 180`, double quotes, no trailing commas, no semicolons override; uses `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (the Tailwind plugin sorts classes inside `twMerge` and `twSort` helpers).
- **ESLint** (flat config in `eslint.config.js`): TypeScript + Astro rules plus `simple-import-sort` for `imports`/`exports`. Ignores `dist`, `.astro`, and `*.d.ts`. Run `pnpm format` for the combined Prettier + ESLint pass.

## Important Notes

- **Active app**: Root `dev`/`build`/`preview` scripts read `.active-app` (defaults to `web`); to target another app either edit that file or pass `--filter @bpm/<name>` explicitly.
- **Port**: Astro dev server runs on port 4321 (Netlify's `netlify dev` is not wired into package scripts; use `pnpm dlx netlify dev` from `apps/web/` if you specifically need its port 8888 proxy).
- **Typography**: Use `magicTypography()` for consistent scaling when adding new size scales.
- **Spacing**: Prefer column-based units (`5c`) over arbitrary values for grid-aligned spacing.
- **Content**: Add new collections to `content.config.ts` with proper Zod schemas and loaders.
- **Node Version**: Project requires Node.js 22+ (enforced in `package.json` engines and `.nvmrc`).
- **Release cooldown**: pnpm refuses any package version published less than 14 days ago (`minimumReleaseAge: 20160` minutes in `pnpm-workspace.yaml`), and `ncu` skips them (`.ncurc.json`). This also covers versions already in the lockfile. pnpm checks the whole lockfile before any install, so to replace a blocked transitive version: remove `minimumReleaseAge`, pin an older version in `overrides`, run `pnpm install`, then restore `minimumReleaseAge`, remove the pin and run `pnpm install` again.
