---
slug: just-crave-it
title: Just Crave It - Premium Dessert Shop Portfolio
short: High-performance, SEO-optimized static Next.js website for an Australian premium dessert brand.
badge: Production
category: web-ai
tech:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - GSAP
links:
  live: https://justcraveit.com
  github: https://github.com/sii-fu/justcraveit
---

## THE CORE PROBLEM

> Brick-and-mortar dessert shops, particularly premium self-serve concepts, frequently suffer from slow, non-responsive, or generic web templates that fail to capture organic local foot traffic on search engines. This structural deficiency prevents local brands from ranking in high-intent geographical searches while failing to reflect their physical premium identity. By engineering a production-ready, static Next.js 15 site featuring custom image compilation pipelines and localized SEO schemas, this project establishes a zero-runtime-database model optimized for fast load speeds and local search visibility.

---

## SCREENSHOT SHOWCASE

![Just Crave It Project Showcase](/projects/travila.png)

---

## SYSTEM ARCHITECTURE & LAYER COMPARISON

To maintain a zero-maintenance runtime, the architecture is split into a build-time preprocessor, a semantic frontend layer, and a high-efficiency animation engine.

| Architecture Layer | Core Technologies | Primary Optimization Objective | Key Metric / Performance Target |
| :--- | :--- | :--- | :--- |
| **Asset Pipeline** | Node.js, Sharp, `next/font` | Automate downscaling, convert source assets to `.webp`, eliminate Cumulative Layout Shift (CLS) | LCP < 1.2s, 0ms render-blocking font fetching |
| **Interactive UX** | GSAP, Framer Motion, Swiper | Smooth viewport-aware scroll interactions, hardware-accelerated transitions | Constant 60fps animation performance on mobile |
| **Metadata & Discovery** | Next.js Metadata API, JSON-LD | Structured local business schemas, high search indexability for Australian regions | 100/100 Lighthouse SEO auditing |
| **Static Deployment** | Vercel Edge Network | Global distribution of static HTML, CSS, and optimized media assets | TTFB < 50ms |

---

## SYSTEM WALKTHROUGH & WORKFLOW

The deployment and runtime cycles function without backend overhead by compiling assets, layouts, and interactive boundaries during the initial build pipeline:

1. **Prebuild Optimization**: The compilation process begins with a Node.js prebuild hook running a custom pipeline powered by `sharp`. Raw high-resolution assets of menu items are downscaled and encoded to `.webp` format.
2. **Font Orchestration**: Next.js loads modern variable typography structures via `next/font`. It self-hosts the assets to prevent layout shifts during standard page rendering.
3. **Static Layout Tree Generation**: Next.js compiles the single-page modular components—including the Hero section, the responsive `FlavourSlider`, and structural contact modals—into highly minimized, semantic static HTML.
4. **Hydration & Animation Binding**: On user retrieval, the browser downloads the static bundle. Once hydrated, React initializes local states for modal elements while the GSAP engine binds to scroll-trigger events.
5. **Dynamic Carousel Routing**: The touch-responsive `FlavourSlider` utilizes a Swiper carousel instance, allowing mobile-first sliding transitions across premium custom flavors without layout recalculations.

---

## TECHNICAL IMPLEMENTATION

### 1. Build-Time Automation Scripting
The following configuration integrates a prebuild asset compression pipeline into the local Node.js compilation cycle:

```json
{
  "name": "just-crave-it",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev --turbopack",
    "prebuild": "node scripts/optimize-images.js",
    "build": "next build",
    "optimize-images": "node scripts/optimize-images.js"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "19.0.0",
    "sharp": "^0.33.0"
  }
}
```

### 2. Static SEO & Metadata Definitions
Leveraging Next.js's native Metadata API, the static application defines localized, structured information directly in the layout tree to capture regional search intent:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Just Crave It | Premium Self-Serve Frozen Yogurt',
  description: 'Experience premium self-serve frozen yogurt in Australia. Browse our rotating gourmet flavors, fresh toppings, and warm winter desserts.',
  metadataBase: new URL('https://justcraveit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Just Crave It - Premium Dessert Shop',
    description: 'Rotating gourmet frozen yogurt flavors and premium toppings in Australia.',
    url: 'https://justcraveit.com',
    siteName: 'Just Crave It',
    locale: 'en_AU',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

---

## KEY OUTCOMES & FUTURE SCOPE

- [x] Deployed high-availability static assets to edge infrastructure via Vercel.
- [x] Automated prebuild raw asset conversions to optimized Next-Gen WebP formats.
- [x] Reduced Cumulative Layout Shift (CLS) to 0 using self-hosted layout font optimization.
- [x] Structured semantic HTML5 markers and custom local JSON-LD definitions to improve search crawler visibility.
- [ ] Implement a localized, client-side product cart estimator using decoupled React state.
- [ ] Prepare headless architecture models to hook directly into a future Shopify API backend.