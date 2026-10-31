# Frontend - Classroom Device Management

React + Vite.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

The API URL is configured using `VITE_API_URL` (default `http://localhost:5000`).

## Production

Set `VITE_API_URL` to the public Render backend URL **before building** the frontend, then run `npm run build`. Do not store secrets in `VITE_API_URL`.
