# EventSphere Dashboard

Admin and organizer dashboard for the [Confaero](https://confaero.com) event management platform. Built with React and Vite, it provides tools to manage conferences, registrations, reviewers, exhibitors, resources, communications, and platform settings from a single web interface.

## Overview

EventSphere Dashboard is the control panel for event organizers and platform administrators. Organizers manage a single assigned event—registrations, agenda, reviewers, sponsors, and attendee resources. Super admins oversee the full platform: all events, global user management, and cross-event analytics.

The app talks to the Confaero REST API (`/api/v1`) and uses JWT authentication with role-based access control.

## Features

### Authentication & account

- Email/password login with validation
- Forgot password, OTP verification, and password reset flows
- Session persistence via JWT (`localStorage`)
- Automatic redirect to login on `401` responses

### Role-based access

| Role | Description |
|------|-------------|
| `SUPER_ADMIN` | Platform-wide access: admin dashboard, user management, all events |
| `ORGANIZER` | Event-scoped access: manage assigned event and its modules |

Protected admin routes are wrapped with `AdminRoute` and redirect non-admins to `/dashboard/home`.

### Dashboard & analytics

- **Organizer home** — event header, overview charts (Recharts), recent user activity
- **Admin home** — platform-wide metrics and event summaries
- **Event overview** — per-event analytics for admins (`/dashboard/admin-events/event-overview/:id`)

### Event management (admin)

- Create and manage events from the admin events list
- Select an active event to unlock event-scoped sidebar modules
- Selected event is stored in Redux and `localStorage` and sent as the `eventid` request header

### Event modules (when an event is selected)

| Module | Route | Description |
|--------|-------|-------------|
| Registration | `/dashboard/users` | View and manage event registrants |
| Invitations | `/dashboard/invitaitons` | Send and track invitations |
| Event Details & Agenda | `/dashboard/enents` | Event metadata and agenda builder |
| Verified Emails | `/dashboard/verified-emails` | Manage verified email domains/addresses |
| Reviewer Management | `/dashboard/reviewer-management` | Assign and manage paper/poster reviewers |
| Exhibitors & Sponsors | `/dashboard/exhibitors-sponsors` | Booth and sponsor management |
| Volunteers | `/dashboard/volunteers` | Volunteer roster and assignments |
| Resources | `/dashboard/resources/*` | Documents, photos, job posts, Q&A/polls/surveys |
| Notice & Announcements | `/dashboard/notice-announcements` | Broadcast notices to attendees |
| Messages | `/dashboard/messages` | In-app messaging (Socket.io) |
| Posters | `/dashboard/posters` | Poster submissions and ranking |
| Payment Management | `/dashboard/payment-management` | Payment records and configuration |

### Platform administration

- **User Management** (`/dashboard/user-management`) — manage all platform users
- **Settings** — privacy policy, terms, about page, organizer guidelines (view + rich-text edit via Jodit)
- **Profile** — view/edit organizer profile and notification preferences

### UX & performance

- Code-split routes with `React.lazy` and automatic chunk-load retry/reload
- Skeleton loaders for auth pages, dashboard shell, and individual pages
- Global toast notifications (`react-hot-toast`) — see [TOAST_USAGE.md](./TOAST_USAGE.md)
- Responsive sidebar layout with collapsible Resources and Event Management menus

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router 7 |
| State & API | Redux Toolkit, RTK Query |
| Styling | Tailwind CSS 4, Ant Design 5 |
| Charts | Recharts |
| Rich text | Jodit React |
| Real-time | Socket.io Client |
| HTTP | Axios (utility), RTK Query `fetchBaseQuery` (primary) |
| Icons | Lucide React, React Icons, Ant Design Icons |
| Alerts | SweetAlert2, React Hot Toast |

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm** 9+
- Access to a running Confaero API backend

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd EventSphere-dashboardd
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and set your API origin:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_BASE_URL` | Yes | API origin without trailing slash (e.g. `https://api.confaero.com`). Requests are made to `{VITE_API_BASE_URL}/api/v1`. |

### 4. Start the development server

```bash
npm run dev
```

The dev server runs on **port 5000** (`0.0.0.0`) by default. Open `http://localhost:5000` in your browser.

### 5. Build for production

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

Production output is written to `dist/`.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Project structure

```
EventSphere-dashboardd/
├── public/                    # Static assets (logo, images)
├── src/
│   ├── auth/                  # Login, forgot password, OTP, reset password
│   ├── components/            # Shared UI (loading skeletons, editors, etc.)
│   ├── dashboard/
│   │   ├── home/              # Dashboard home, charts, admin overview
│   │   └── sidebarMenu/       # Feature pages (events, users, resources, …)
│   ├── hooks/                 # useUserRole, useSelectedEvent, useToast, …
│   ├── layout/                # Main shell: Sidebar, Header
│   ├── redux/
│   │   ├── api/               # RTK Query base API slice, base URL
│   │   └── features/          # Feature slices (auth, events, messages, …)
│   ├── route/                 # React Router config, AdminRoute guard
│   ├── utils/                 # lazyWithRetry, helpers
│   ├── App.jsx
│   ├── Home.jsx               # Root route → Login
│   ├── main.jsx               # App entry, Redux Provider, Toaster
│   └── index.css              # Global styles, Tailwind imports
├── .env.example
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── TOAST_USAGE.md             # Toast notification usage guide
```

## Routing

Public routes:

| Path | Page |
|------|------|
| `/` | Login |
| `/forgotpassword` | Forgot password |
| `/verifyotp` | Email OTP verification |
| `/updatepassword` | Set new password |

Dashboard routes (under `/dashboard`, requires auth):

| Path | Access | Page |
|------|--------|------|
| `home` | All | Role-aware dashboard home |
| `admin-home` | Admin | Platform admin overview |
| `user-management` | Admin | Global user list |
| `admin-events` | Admin | Event list & selection |
| `admin-events/event-overview/:id` | Admin | Single-event analytics |
| `users`, `users/details/:id` | Event context | Registrations |
| `settings/*`, `profile`, `notification` | All | Settings & profile |

See `src/route/Route.jsx` for the full route table.

## API integration

- **Base URL:** `{VITE_API_BASE_URL}/api/v1` (configured in `src/redux/api/baseUrl.js`)
- **Auth header:** `Authorization: Bearer <token>` (from `localStorage.token`)
- **Event context header:** `eventid: <selectedEventId>` when an event is selected
- **RTK Query:** Central `apiSlice` with injected endpoints per feature slice; cache tags include `Events`, `Users`, `Messages`, `Reviewer`, etc.
- **401 handling:** Clears session and redirects to `/`

## Authentication flow

1. User submits credentials on `/`.
2. On success, the app stores `token`, `userRole`, and user data in `localStorage`.
3. User is routed to `/dashboard/home` (organizer) or admin views based on role.
4. Logout clears `token`, `user`, `userRole`, and selected event keys from `localStorage`.

## Local storage keys

| Key | Purpose |
|-----|---------|
| `token` | JWT access token |
| `userRole` | Active role (`SUPER_ADMIN`, `ORGANIZER`, …) |
| `user` | Serialized user profile |
| `selectedEventId` | Currently selected event for scoped API calls |
| `selectedEventName` | Display name for sidebar event badge |
| `isResourcesOpen` | Sidebar Resources dropdown state |
| `isEventManagementOpen` | Sidebar Event Management dropdown state |

## Development notes

- **Lazy loading:** Route components use `lazyWithRetry` to recover from stale chunk errors after deploys.
- **Vite server:** Configured for `confaero.com`, `www.confaero.com`, and staging hosts in `allowedHosts`.
- **Manual chunks:** React and Redux vendor bundles are split in production builds.
- **Toast usage:** Prefer the `useToast` hook or `window.toast` — details in [TOAST_USAGE.md](./TOAST_USAGE.md).

## Linting

```bash
npm run lint
```

ESLint is configured with React Hooks and React Refresh plugins (`eslint.config.js`).

## Deployment

1. Set `VITE_API_BASE_URL` to the production API origin in your CI/CD or hosting environment.
2. Run `npm run build`.
3. Serve the `dist/` folder with any static host (Vercel, Netlify, Nginx, S3 + CloudFront, etc.).
4. Ensure the host allows client-side routing (fallback to `index.html` for SPA routes).

## Related documentation

- [TOAST_USAGE.md](./TOAST_USAGE.md) — global toast configuration and usage patterns

## License

Private — Confaero / EventSphere. All rights reserved.
