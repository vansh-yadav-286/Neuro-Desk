# NeuroLearn 3D - Prisma Migrations

This directory contains database migrations for NeuroLearn 3D.

## Setup

1. Configure your DATABASE_URL in `.env`
2. Run migrations: `npm run prisma:migrate`
3. Generate Prisma Client: `npm run prisma:generate`

## Creating a New Migration

```bash
npx prisma migrate dev --name your_migration_name
```

## Resetting Database (development only)

```bash
npx prisma migrate reset
```
