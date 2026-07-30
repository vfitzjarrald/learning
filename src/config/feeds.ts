import type { DomainSlug } from "./domains";

export type NewsFeed = {
  name: string;
  url: string;
  domain: DomainSlug;
};

export const NEWS_FEEDS: NewsFeed[] = [
  // AI
  { name: "OpenAI News", url: "https://openai.com/news/rss.xml", domain: "ai" },
  {
    name: "Google AI Blog",
    url: "https://blog.google/technology/ai/rss/",
    domain: "ai",
  },
  {
    name: "Hugging Face Blog",
    url: "https://huggingface.co/blog/feed.xml",
    domain: "ai",
  },
  {
    name: "arXiv cs.AI",
    url: "https://export.arxiv.org/rss/cs.AI",
    domain: "ai",
  },
  {
    name: "Simon Willison",
    url: "https://simonwillison.net/atom/everything/",
    domain: "ai",
  },

  // Education
  {
    name: "EdSurge",
    url: "https://www.edsurge.com/articles_rss",
    domain: "education",
  },
  {
    name: "Chronicle of Higher Education",
    url: "https://www.chronicle.com/feed",
    domain: "education",
  },
  {
    name: "Inside Higher Ed",
    url: "https://www.insidehighered.com/rss.xml",
    domain: "education",
  },
  {
    name: "EDUCAUSE Review",
    url: "https://er.educause.edu/rss",
    domain: "education",
  },

  // Pedagogy
  {
    name: "Faculty Focus",
    url: "https://www.facultyfocus.com/feed/",
    domain: "pedagogy",
  },
  {
    name: "Teaching in Higher Ed",
    url: "https://teachinginhighered.com/feed/",
    domain: "pedagogy",
  },
  {
    name: "Hybrid Pedagogy",
    url: "https://hybridpedagogy.org/feed/",
    domain: "pedagogy",
  },

  // Andragogy / adult learning
  {
    name: "Learning Guild",
    url: "https://www.learningguild.com/rss/",
    domain: "andragogy",
  },
  {
    name: "ATD",
    url: "https://www.td.org/rss",
    domain: "andragogy",
  },

  // Content development
  {
    name: "Nielsen Norman Group",
    url: "https://www.nngroup.com/feed/rss/",
    domain: "content-development",
  },
  {
    name: "Content Science",
    url: "https://content-science.com/feed/",
    domain: "content-development",
  },
  {
    name: "A List Apart",
    url: "https://alistapart.com/main/feed/",
    domain: "content-development",
  },

  // Product management
  {
    name: "Lenny's Newsletter",
    url: "https://www.lennysnewsletter.com/feed",
    domain: "product-management",
  },
  {
    name: "SVPG",
    url: "https://www.svpg.com/feed/",
    domain: "product-management",
  },
  {
    name: "Mind the Product",
    url: "https://www.mindtheproduct.com/feed/",
    domain: "product-management",
  },
  {
    name: "Product Talk",
    url: "https://www.producttalk.org/feed/",
    domain: "product-management",
  },

  // Cursor & Copilot
  {
    name: "Cursor Blog",
    url: "https://cursor.com/blog/rss.xml",
    domain: "cursor-copilot",
  },
  {
    name: "GitHub Changelog",
    url: "https://github.blog/changelog/feed/",
    domain: "cursor-copilot",
  },
  {
    name: "GitHub AI & ML",
    url: "https://github.blog/ai-and-ml/feed/",
    domain: "cursor-copilot",
  },
];
