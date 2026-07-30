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

### Cross-device persistence (Neon)

1. Create a Neon database and set `DATABASE_URL` in `.env.local` / Vercel.
2. Run migrations + admin seed:

```bash
npm run db:migrate
```

3. Deploy with `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`.

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
