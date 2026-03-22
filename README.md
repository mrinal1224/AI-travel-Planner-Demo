# AI Travel Planner (MVP)

A web app for planning trips with Firebase-backed data and an architecture ready for AI-generated itineraries and a trip-scoped chat assistant. This repository is being built **feature by feature**; the sections below describe the full product intent and document what is implemented so far.

## Goals

- Let users sign up, create trips, generate an AI-assisted itinerary, edit it, save to Firestore, browse a trip dashboard, and chat with a simple trip-aware assistant.
- Keep the codebase modular, production-style, and easy to extend with real AI APIs later (mock responses where needed during development).

## Tech stack

| Area | Choice |
|------|--------|
| UI | React (functional components + hooks) |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Optional files | Firebase Storage |
| Build | Vite |

## Planned features (roadmap)

Features are delivered in order; update this list as each one ships.

| # | Feature | Status |
|---|---------|--------|
| 1 | Project setup, folder structure, routing, layout, Firebase service shell | Done |
| 2 | Authentication (signup, login, logout, protected routes, session) | Planned |
| 3 | App layout and routing refinements (if needed) | Planned |
| 4 | User profile / travel preferences | Planned |
| 5 | Dashboard (trip list, empty state, create CTA) | Planned |
| 6 | Create trip flow | Planned |
| 7 | Trip details page | Planned |
| 8 | AI itinerary generation (mock-ready) | Planned |
| 9 | Editable itinerary builder | Planned |
| 10 | Save / load itinerary from Firestore | Planned |
| 11 | Budget estimate section | Planned |
| 12 | AI trip assistant chat | Planned |
| 13 | Share trip (public link via `shareId`) | Planned |
| 14 | Polish: loading, empty states, errors, toasts, validation | Planned |

## Firestore model (target)

High-level shape the app will converge on:

- **`users/{userId}`** — `name`, `email`, `photoURL`, `preferences` (budget style, trip type, interests, pace, transport preference), `createdAt`
- **`trips/{tripId}`** — `userId`, `title`, `destination`, `startDate`, `endDate`, `travelers`, `budget`, `interests`, `pace`, `notes`, `createdAt`, `updatedAt`, `shareId`
- **`trips/{tripId}/days/{dayId}`** — `dayNumber`, `date`, `title`, `summary`
- **`trips/{tripId}/days/{dayId}/activities/{activityId}`** — `time`, `name`, `location`, `category`, `notes`, `estimatedCost`, `status`
- **`trips/{tripId}/chat/{messageId}`** — `role`, `text`, `createdAt`

## Getting started

**Requirements:** Node.js 18+ (or current LTS), npm.

```bash
npm install
cp .env.example .env
# Fill in Firebase web app keys from Firebase Console → Project settings
npm run dev
```

**Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

Firebase env vars are documented in `.env.example`. Until they are set, the app still runs; Firebase stays uninitialized in development and a console message explains missing configuration.

## Repository layout

```
src/
  components/   # auth, common, layout, dashboard, trip, itinerary, budget, chat
  pages/
  routes/
  hooks/
  context/
  services/
    firebase/
    ai/
  utils/
```

---

## Implementation log

Use this section as a running changelog for shipped features. **When adding a new feature, append a subsection here** (and update the roadmap table above).

### Feature 1 — Project setup and architecture

**Purpose:** Establish a scalable structure, tooling, and UI shell without business logic so later features plug in cleanly.

**Delivered**

- **Vite + React** app scaffold with ESLint.
- **Tailwind CSS v4** via `@tailwindcss/vite`; global theme tokens (`brand` palette) and **DM Sans** in `index.html`.
- **React Router** route tree in `src/routes/AppRoutes.jsx` with path constants in `src/routes/paths.js`.
- **Layouts**
  - `MainLayout` — sticky **navbar** + **responsive sidebar** (drawer on small screens, fixed rail on `lg+`).
  - `AuthLayout` — minimal header for login/signup.
  - `SharedTripLayout` — minimal public header for shared trips.
- **Reusable UI:** `PageContainer`, `PageHeader` under `src/components/common/`.
- **Placeholder pages:** Login, Signup, Dashboard, Create Trip, Trip Details (`/trips/:tripId`), Profile, Shared Trip (`/share/:shareId`).
- **Firebase service layer:** `src/services/firebase/config.js` initializes the app (and exports `auth`, `db`) only when `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` are present; otherwise skips init in dev and logs a short note. Barrel export in `src/services/firebase/index.js`. Config imported from `src/main.jsx` for one-time setup.
- **AI placeholder:** `src/services/ai/index.js` reserved for future mock/real AI calls.
- **Empty feature folders** reserved with `.gitkeep` under `components/auth`, `dashboard`, `trip`, `itinerary`, `budget`, `chat`, plus `context/`, `hooks/`, `utils/`.
- **`.env.example`** and `.gitignore` entries for `.env` (keep `.env.example` tracked).

**Not in scope for Feature 1:** Authentication flows, Firestore reads/writes, forms beyond copy placeholders, AI calls, protected routes.

---

*Last updated: Feature 1 complete.*
