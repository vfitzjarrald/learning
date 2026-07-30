import type { DomainSlug } from "./domains";

export type Program = {
  id: string;
  title: string;
  summary: string;
  href: string;
  external: boolean;
  status: "live" | "next" | "planned";
  domains: DomainSlug[];
};

export const PROGRAMS: Program[] = [
  {
    id: "ai-expert",
    title: "The AI Expert",
    summary:
      "Tutor-based AI expert path — knowledge maps, GraphRAG, MCP, and production tutors.",
    href: "https://aicourse.victorfitzjarrald.com",
    external: true,
    status: "live",
    domains: ["ai", "pedagogy", "education"],
  },
  {
    id: "andragogy",
    title: "Andragogy Expert",
    summary:
      "16-week web course on adult learning foundations, motivation, facilitation, and expert practice — with diagnostics, checks, and icon achievements.",
    href: "/programs/andragogy",
    external: false,
    status: "live",
    domains: ["andragogy", "education", "pedagogy"],
  },
  {
    id: "product-management",
    title: "Product Management",
    summary:
      "Planned microsite for product discovery, prioritization, and delivery craft.",
    href: "/programs#product-management",
    external: false,
    status: "planned",
    domains: ["product-management"],
  },
];
