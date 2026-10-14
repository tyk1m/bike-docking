# CycleEazy API

This directory contains the NestJS API, Prisma data layer, first-party
email/password authentication, and bike/rental endpoints.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set a PostgreSQL connection string and a
   random `JWT_SECRET` of at least 32 characters. The bundled CA path is
   relative to `backend/prisma/` in the database URL.
3. Generate the Prisma client and apply additive migrations with `npm run
   db:generate` and `npm run db:migrate`. The migration command verifies and
   applies checked-in SQL transactionally through the PostgreSQL driver, then
   records each applied migration in `_prisma_migrations`.
4. Add the starter bikes with `npm run db:seed`.
5. Start the API with `npm run start:dev` and request
   `GET http://localhost:3000/api/v1/health`.

Registration and login set an HTTP-only session cookie. Passwords are stored
as scrypt hashes. The browser uses credentialed requests to this API; database
credentials and JWT signing keys stay in backend environment variables.

Available endpoints: `POST /api/v1/auth/register`, `POST /api/v1/auth/login`,
`POST /api/v1/auth/logout`, `GET /api/v1/auth/me`, `GET /api/v1/bikes`,
`GET /api/v1/stations`, `GET /api/v1/rentals`, `POST /api/v1/rentals`, and
`POST /api/v1/rentals/return`.
