# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
npm run dev:web          # Start Netlify dev server for web workspace (http://localhost:8888/)
```

### Build & Quality

```bash
npm run build            # Build all workspaces for production
npm run prettier         # Check code formatting
npm run prettier:fix     # Auto-fix formatting issues
```

### Workspace-Specific Commands

```bash
# Run commands in specific workspace
npm run <script> --workspace=@bpm/web

# Available workspaces: @bpm/web, @bpm/design-system, @bpm/tailwind-base, @bpm/custom-merge, @bpm/data
```

## Architecture

### Monorepo Structure

This is an npm workspaces monorepo:

- **`apps/web/`** - Main Astro 5 static website application
- **`packages/`** - Shared workspace packages:
  - `design-system` - Tailwind CSS plugin with custom utilities
  - `tailwind-base` - Base Tailwind preset configuration
  - `custom-merge` - Object merging utility (lodash wrapper)
  - `data` - Shared content data (personnel, questions, testimonials)

### Content Collections System

The site uses Astro's Content Collections API with custom loaders (apps/web/src/content.config.ts):

- **Collections**: `personnel`, `services`, `questions`, `testimonials`
- **Data Sources**:
  - JSON files in `src/content/` (services)
  - Shared workspace package `@bpm/data` (personnel, questions, testimonials)
- **Validation**: All collections use Zod schemas
- **ID Generation**: Auto-generated from name fields (e.g., "John Doe" → "john-doe")

Example collection definition:

```typescript
const services = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/services" }),
  schema: ({ image }) =>
    z.object({
      status: statusSchema,
      order: z.number().optional().default(0),
      title: z.string(),
      description: z.string(),
      cover: image()
    })
});
```

### Custom Design System

Located in `packages/design-system/`, this Tailwind plugin exports:

- `designSystem` - Main plugin with container and grid utilities
- `magicTypography()` - Exponential typography scale generator

#### 1. Magic Typography System

The `magicTypography()` function generates fluid typography scales using exponential ratios:

```typescript
// Headings: h0-h7 with 1.25 ratio, line-heights 1.05-1.45
magicTypography({ h0: 7, h1: 6, h2: 5, ... }, 1.25, [1.05, 1.45])

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

Configured in `tsconfig.base.json`:

```json
{
  "@helpers": [
    "src/assets/scripts/helpers.ts"
  ],
  "@types": [
    "src/types.ts"
  ],
  "@assets/*": [
    "src/assets/*"
  ],
  "@components/*": [
    "src/components/*"
  ],
  "@layouts/*": [
    "src/layouts/*"
  ]
}
```

Use these aliases in imports rather than relative paths.

### Component Organization

- **Base components**: `src/components/` (Button, Input, Heading, Section, etc.)
- **Domain components**: `src/components/collection/` (feature-specific)
- **Layouts**: `src/layouts/` (page templates)

### Build & Deployment

**Astro Configuration** (apps/web/astro.config.mjs):

- Dev server: port 4321
- Site URL: `https://www.belgarum-property.co.uk`
- Integrations: compress (HTML/JS/Images), sitemap, meta-tags, page-insight
- Prefetching: enabled for all links

**Netlify Deployment** (apps/web/netlify.toml):

- Build command: `npm run build`
- Publish directory: `apps/web/dist`
- Lighthouse audits on: /, /services, /services/budgeting, /about, /faqs, /contact, /privacy-policy
- Node.js 22+ required (see `.nvmrc`)

**Tailwind CSS**:

- Tailwind v4 with native Vite support (`@tailwindcss/vite`)
- Base preset in `packages/tailwind-base/`

**AlpineJS**

- AlpineJS is used for client-side interactivity and state management (`alpinejs`)

**Lucide Icons**:

- All icons are sourced from Lucide Icons, using their astro package (`@lucide/astro`)
- To import a specific icon: `import IconName from "@lucide/astro/icons/icon-name";`

## Important Notes

- **Port**: Dev server runs on port 4321
- **Typography**: Use `magicTypography()` for consistent scaling when adding new size scales
- **Spacing**: Prefer column-based units (`5c`) over arbitrary values for grid-aligned spacing
- **Content**: Add new collections to `content.config.ts` with proper Zod schemas and loaders
- **Node Version**: Project requires Node.js 22+ (enforced in package.json engines and .nvmrc)
