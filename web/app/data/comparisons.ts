export type Comparison = {
  slug: string;
  title: string;
  excerpt: string;
  tools: string[]; // e.g., ["Instapage", "Unbounce"]
  category: string;
  highlights: string[];
  updatedAt: string;
};

export const comparisons: Comparison[] = [
  {
    slug: "instapage-vs-unbounce",
    title: "Instapage vs Unbounce (2026): Which Landing Page Builder Is Actually Better?",
    excerpt:
      "Compare Instapage vs Unbounce in 2026. Pricing, features, A/B testing, and conversion optimization for SaaS companies and performance marketers.",
    tools: ["Instapage", "Unbounce"],
    category: "Landing Pages",
    highlights: [
      "Pricing and ROI context for paid traffic teams",
      "Feature depth for A/B testing and collaboration",
      "Performance differences for conversion lift",
    ],
    updatedAt: "2026-01-25",
  },
];
