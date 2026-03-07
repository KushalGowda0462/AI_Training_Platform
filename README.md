<<<<<<< HEAD
# AI_Training_Platform
=======
# Aurentis — AI Instructor Agent Platform

A polished enterprise frontend demo built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## Quick Start

```bash
cd aurentis
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Landing page (10 sections)
│   ├── vendors/
│   │   ├── page.tsx            # Vendors directory
│   │   └── [slug]/page.tsx     # Vendor detail with tabs
│   └── certifications/
│       └── page.tsx            # Certification search + filters
├── components/
│   ├── Navbar.tsx              # Sticky nav with live search
│   ├── Footer.tsx              # Dark footer
│   ├── Modal.tsx               # Reusable accessible modal
│   ├── CertificationCard.tsx   # Card + detail modal
│   └── VendorCard.tsx          # Vendor card with stats
└── lib/mock/
    ├── vendors.ts              # 6 vendor records
    ├── certifications.ts       # 8 certification records
    └── labs.ts                 # 26 lab records across vendors
```

## Design System

| Token     | Value     |
|-----------|-----------|
| Gold      | `#D4A017` |
| Gold Hover| `#B8870A` |
| Background| `#FAFAF8` |
| Text      | `#0F172A` |
| Border    | `#E7E2D8` |
| Footer    | `#0B1220` |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with Hero, Comparison Table, Vendor Grid, Cert Search, Contact Form |
| `/vendors` | Vendor directory with search and category filters |
| `/vendors/[slug]` | Vendor detail with tabbed content (Overview, Certs, Labs, Resources) |
| `/certifications` | Full certification catalog with multi-filter search |

## Features

- Global certification search in navbar with dropdown suggestions
- Search navigates to `/certifications?query=<text>`
- Video modal on "Watch the 60-Second Workflow" CTA
- Certification detail modals with learn bullets and related labs
- Lab placeholder modals on vendor detail page
- Contact form with segmented team size control and success toast
- Sticky navbar with scroll shadow + mobile hamburger
- All client-side — no backend required
>>>>>>> kushal-works-here
