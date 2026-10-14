# CycleEazy frontend

React 19 and Vite client for the CycleEazy API.

## Run locally

From the repository root:

```powershell
npm --prefix backend run start:dev
npm --prefix bike-docking run dev
```

The browser client calls `http://localhost:3000/api/v1` by default. Set
`VITE_API_URL` in a local `.env` to use another API URL. See
[`../backend/README.md`](../backend/README.md) for database and API setup.

## Checks

```powershell
npm --prefix bike-docking run lint
npm --prefix bike-docking run build
```

The app uses a first-party backend session cookie. It does not use Clerk or
browser-side database credentials. QR scanning, online verification, payments,
and physical bike unlocking are not integrated yet.
