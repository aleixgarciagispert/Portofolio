# Aleix Garcia — Portfolio

A dual-portfolio website built with **React**, **Vite**, and **TypeScript**. It showcases two distinct bodies of work:

- **Front-End Development** — web apps, interactive experiences, and WebGL
- **3D / CGI Environments** — worldbuilding, lookdev, and real-time environments

Design references live in `./referencias` and informed the initial UI implementation.

## Tech Stack

- React 19
- Vite 6
- TypeScript
- React Router
- CSS Modules

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── layouts/
│   └── SiteLayout.tsx   # Shared frame (logo, nav, footer)
├── components/          # Reusable UI components
│   ├── ContactForm/
│   ├── FilterBar/
│   ├── Logo/
│   ├── SideNav/         # Vertical NavLink navigation
│   ├── PortfolioFooter/
│   ├── PortfolioHeader/
│   ├── PortfolioNav/
│   ├── ProjectCard/
│   ├── SocialLinks/
│   └── ...
├── data/
│   └── site.ts          # Site config & project data
├── pages/               # Route-level pages
├── styles/
│   └── global.css       # Global tokens & resets
└── types/
    └── index.ts         # Shared TypeScript types
```

## Routes

Navigation uses **React Router** with nested routes and `NavLink` for active states.

| Path               | Description                     |
| ------------------ | ------------------------------- |
| `/`                | Landing — hero + portfolio entry |
| `/front-end`       | Front-End Development portfolio |
| `/3d-environments` | 3D / CGI Environments portfolio |

The vertical sidebar (`SideNav`) links to each route. Layout is shared via `SiteLayout` + `<Outlet />`.

## Customization

### Site & social links

Edit `src/data/site.ts` → `siteConfig` for name, email, social URLs, and availability status.

### Projects

Add or update entries in `frontendProjects` and `cgiProjects` inside `src/data/site.ts`. Each project supports:

- Title, description, year, tags
- Category (used by filter buttons)
- Aspect ratio and featured (wide) layout
- Optional external link

### Design tokens

Global colors and fonts are defined in `src/styles/global.css`. Portfolio pages use theme-specific accents:

- Front-End: `#FF2A45`
- 3D / CGI: `#1FE0D0`

## Design References

Initial mockups are in `./referencias`:

- `Landing.dc.html` — landing variants A (faithful) & B (duality)
- `Front-End Work.dc.html` — front-end portfolio layout
- `3D Environments.dc.html` — CGI portfolio layout

The landing page includes a toggle to switch between both landing variants at runtime.

## Design

Flat, high-contrast layout inspired by `./referencias` — black background, red accent ring hero, vertical sidebar navigation, and corner-anchored header/footer.

## License

Private — all rights reserved.
