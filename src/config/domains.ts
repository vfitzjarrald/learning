export const CONTENT_TYPES = [
  { slug: "blog", label: "Blog" },
  { slug: "video", label: "Video" },
  { slug: "article", label: "Article" },
  { slug: "rss", label: "RSS / News" },
  { slug: "program-lesson", label: "Program lesson" },
  { slug: "personal", label: "Personal" },
] as const;

export type ContentTypeSlug = (typeof CONTENT_TYPES)[number]["slug"];

export const DOMAINS = [
  {
    slug: "ai",
    name: "AI",
    summary: "Models, agents, RAG, and applied AI practice.",
  },
  {
    slug: "education",
    name: "Education",
    summary: "Systems, policy, and institutional learning trends.",
  },
  {
    slug: "pedagogy",
    name: "Pedagogy",
    summary: "Teaching methods, classroom design, and instructional craft.",
  },
  {
    slug: "andragogy",
    name: "Andragogy",
    summary: "Adult learning theory and facilitator practice.",
  },
  {
    slug: "content-development",
    name: "Content Development",
    summary: "Curriculum writing, UX writing, and learning content systems.",
  },
  {
    slug: "product-management",
    name: "Product Management",
    summary: "Discovery, prioritization, and shipping product outcomes.",
  },
  {
    slug: "cursor-copilot",
    name: "Cursor & Copilot",
    summary: "AI-assisted development workflows and tooling updates.",
  },
] as const;

export type DomainSlug = (typeof DOMAINS)[number]["slug"];

export function isDomainSlug(value: string): value is DomainSlug {
  return DOMAINS.some((domain) => domain.slug === value);
}

export function isContentTypeSlug(value: string): value is ContentTypeSlug {
  return CONTENT_TYPES.some((type) => type.slug === value);
}

export function domainLabel(slug: string) {
  return DOMAINS.find((domain) => domain.slug === slug)?.name ?? slug;
}

export function contentTypeLabel(slug: string) {
  return CONTENT_TYPES.find((type) => type.slug === slug)?.label ?? slug;
}
