# Portfolio Backend API

## Setup

1. Install MongoDB locally and ensure it is running.
2. Copy `.env.example` to `.env` and adjust values.
3. Install dependencies:

```bash
npm install
```

4. Seed database:

```bash
npm run seed
```

5. Start server:

```bash
npm run dev
```

API runs at `http://localhost:\8080`

## Auth

- **Register:** `POST /api/auth/register` — `{ name, email, password }`
- **Login:** `POST /api/auth/login` — `{ email, password }`

## Default admin login (after seed)

- Email: `admin@rajat.dev`
- Password: `Admin@12345`

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Public portfolio data |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/auth/login` | Admin login |
| GET | `/api/admin/*` | Protected admin routes |
