# Learning — Victor Fitzjarrald

Next.js site for [learning.victorfitzjarrald.com](https://learning.victorfitzjarrald.com).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

- GitHub: [vfitzjarrald/learning](https://github.com/vfitzjarrald/learning)
- Vercel project: `vicfitz/learning` (Git connected; production deploys from `main`)
- Production alias: https://learning-alpha-wheat-33.vercel.app
- Custom domain: `learning.victorfitzjarrald.com`

### DNS (GoDaddy)

`victorfitzjarrald.com` uses GoDaddy nameservers. Add this record so the subdomain resolves:

| Type  | Name     | Value                                |
| ----- | -------- | ------------------------------------ |
| CNAME | learning | `6ea9c2ce05476323.vercel-dns-017.com` |

Then verify:

```bash
vercel domains verify learning.victorfitzjarrald.com --scope vicfitz
```
