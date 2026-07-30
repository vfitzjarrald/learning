# Learning — Victor Fitzjarrald

Private learning OS for [learning.victorfitzjarrald.com](https://learning.victorfitzjarrald.com).

Use **MyDay** to collate domain feeds (AI, Education, Pedagogy, Andragogy, Content Development, Product Management, Cursor & Copilot), keep private notes by day/domain/type, and launch learning programs (The AI Expert link-out first; Andragogy and Product Management next).

## Local development

```bash
cp .env.example .env.local
# Set ADMIN_USERNAME, ADMIN_PASSWORD, SESSION_SECRET
# Leave DATABASE_URL unset/placeholder to use data/local-store.json

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → Sign in → MyDay.

### Cross-device persistence (Neon on Vercel)

1. In the Vercel project, install **Neon** from the Marketplace (injects `DATABASE_URL`).
2. Also set these env vars for Production + Preview (Neon does not create them):
   - `SESSION_SECRET` (long random string)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
3. Redeploy. `npm run build` runs `db:migrate` automatically when `DATABASE_URL` is present (schema + admin seed).

Local without Neon: leave `DATABASE_URL` unset to use `data/local-store.json`.

Manual migrate:

```bash
npm run db:migrate
```

## Routes

| Route | Access | Purpose |
|-------|--------|---------|
| `/` | Public | Brand landing |
| `/login` | Public | Admin sign-in |
| `/myday` | Private | Daily feeds + notes |
| `/feeds` | Private | Multi-domain RSS reader |
| `/notes` | Private | Private note archive |
| `/programs` | Private | Program hub (AI Expert link-out) |

## Deploy

- GitHub: [vfitzjarrald/learning](https://github.com/vfitzjarrald/learning)
- Vercel project: `vicfitz/learning` (production from `main`)
- Custom domain: `learning.victorfitzjarrald.com`

### DNS (GoDaddy)

| Type  | Name     | Value                                |
| ----- | -------- | ------------------------------------ |
| CNAME | learning | `6ea9c2ce05476323.vercel-dns-017.com` |
