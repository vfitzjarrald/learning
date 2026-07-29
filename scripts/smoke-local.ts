import { config } from "dotenv";

config({ path: ".env.local" });

async function main() {
  const { ensureAdminSeeded, findUserByUsername } = await import("../src/lib/users");
  const { verifyPassword } = await import("../src/lib/password");
  const { upsertNote, listNotes, getNote } = await import("../src/lib/notes");
  const { getDomainNews } = await import("../src/lib/news");

  await ensureAdminSeeded();
  const user = await findUserByUsername("admin");
  if (!user) throw new Error("admin missing");
  const ok = await verifyPassword("learning-dev-password", user.password_hash);
  if (!ok) throw new Error("password mismatch");

  const note = await upsertNote({
    userId: user.id,
    noteDate: "2026-07-29",
    domain: "andragogy",
    contentType: "personal",
    body: "Adult learners need relevance and autonomy.",
  });
  const fetched = await getNote({
    userId: user.id,
    noteDate: "2026-07-29",
    domain: "andragogy",
    contentType: "personal",
  });
  const listed = await listNotes(user.id, 10);
  console.log("note ok", fetched?.body === note.body, "count", listed.length);

  const news = await getDomainNews({ domains: ["ai"], limit: 3 });
  console.log("news count", news.length, news[0]?.title?.slice(0, 80) ?? "none");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
