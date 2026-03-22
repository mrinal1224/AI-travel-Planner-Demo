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
| 2 | Authentication (signup, login, logout, protected routes, session) | Done |
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

Firebase env vars are documented in `.env.example`. Until they are set, the app still runs; Firebase stays uninitialized in development and a console message explains missing configuration. For sign-up and log-in, enable **Email/Password** in Firebase Console → Authentication → Sign-in method.

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

### Feature 2 — Authentication

**Purpose:** Email/password auth with session persistence, guarded app routes, and guest-only auth screens.

**Delivered**

- **`src/context/authContext.js`** — `AuthContext` instance.
- **`src/context/AuthProvider.jsx`** — Subscribes to Firebase `onAuthStateChanged` when the app is configured; exposes `user`, `loading`, `authConfigured`, `signIn`, `signUp`, `logout`. Loading is false immediately when Firebase env is missing; otherwise true until the first auth callback.
- **`src/hooks/useAuth.js`** — `useAuth()` for consumers (keeps React Fast Refresh happy).
- **`src/services/firebase/auth.js`** — `registerWithEmail`, `loginWithEmail`, `logOut`, `subscribeToAuthState`, `isAuthAvailable`, `mapAuthError` (friendly copy for Firebase error codes and missing config).
- **`src/utils/validation.js`** — `validateEmail`, `validatePassword`, `validatePasswordConfirm` for client-side checks.
- **`src/components/auth/`** — `AuthFormField`, `AuthSubmitButton`, `AuthFormCard`, `GoogleSignInButton`, `AuthDivider`.
- **`src/utils/userDisplay.js`** — Navbar display name from `displayName` or formatted email local part.
- **`src/components/common/AuthLoadingScreen.jsx`** — Full-page spinner + message while auth is resolving.
- **`src/components/common/FirebaseUnavailable.jsx`** — Instructions when Firebase web keys are not set.
- **`src/components/layout/RequireAuth.jsx`** — Wraps private app routes; shows loading, config error, or redirects to login with `state.from` for post-login return.
- **`src/components/layout/GuestOnlyRoute.jsx`** — Wraps login/signup; redirects signed-in users to the prior `from` path or dashboard.
- **`src/routes/AppRoutes.jsx`** — Main app nested under `RequireAuth` → `MainLayout`; `/login` and `/signup` under `GuestOnlyRoute`. `/share/:shareId` stays public.
- **`src/pages/LoginPage.jsx` / `SignupPage.jsx`** — Wired forms, field + form errors, submit loading, **Continue with Google** (`signInWithPopup`), plus email/password.
- **`src/components/layout/Navbar.jsx`** — Shows a **display name** when available (`getNavbarDisplayName`: Firebase `displayName` for Google users, otherwise a title-cased name from the email local part), email as `title` tooltip, and **Log out**.
- **`src/main.jsx`** — `AuthProvider` inside `BrowserRouter`.
- **`src/services/firebase/index.js`** — Re-exports auth helpers.
- **`.env.example`** — Note to enable Email/Password in Firebase.

**Session persistence:** Firebase Auth persists the session in the browser by default (`LOCAL` persistence).

**Google sign-in:** `signInWithGoogle` in `src/services/firebase/auth.js` uses `GoogleAuthProvider` + `signInWithPopup` (with `prompt=select_account`). Enable **Google** in Firebase Authentication and configure the OAuth consent screen / authorized domains as needed.

**Not in scope for Feature 2:** Firestore user profiles, dashboard data, password reset, additional OAuth providers.

---

*Last updated: Feature 2 complete.*
