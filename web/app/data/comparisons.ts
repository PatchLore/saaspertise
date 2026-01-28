export type Comparison = {
  slug: string;
  title: string;
  excerpt: string;
  tools: string[]; // e.g., ["Instapage", "Unbounce"]
  updatedAt: string;
};

export const comparisons: Comparison[] = [
  {
    slug: "instapage-vs-unbounce",
    title: "Instapage vs Unbounce (2026): Which Landing Page Builder Is Actually Better?",
    excerpt:
      "Compare Instapage vs Unbounce in 2026. Pricing, features, A/B testing, and conversion optimization for SaaS companies and performance marketers.",
    tools: ["Instapage", "Unbounce"],
    updatedAt: "2026-01-25",
  },
];
