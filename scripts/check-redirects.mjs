/**
 * Guard against reintroducing case-variant /Programs redirects.
 * Next/Vercel can match redirect sources case-insensitively, which turns
 * /Programs → /programs into an infinite loop on /programs.
 */
import { existsSync, readFileSync } from "fs";
import path from "path";

const manifestPath = path.join(process.cwd(), ".next", "routes-manifest.json");
if (!existsSync(manifestPath)) {
  console.log("No .next/routes-manifest.json yet — skip redirect guard.");
  process.exit(0);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8")) as {
  redirects?: Array<{ source?: string; destination?: string }>;
};

const banned = (manifest.redirects ?? []).filter((rule) => {
  const source = rule.source ?? "";
  return /\/Programs/i.test(source) && source.includes("Programs");
});

if (banned.length > 0) {
  console.error(
    "Forbidden /Programs redirects found in routes-manifest.json:\n",
    banned,
  );
  process.exit(1);
}

console.log("Redirect guard OK — no /Programs case-variant redirects.");
