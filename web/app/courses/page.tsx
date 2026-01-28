import { Container } from "@/app/components/Container";
import { HeroSection } from "@/app/components/HeroSection";
import { PrimaryButton } from "@/app/components/PrimaryButton";
import { SurfaceCard } from "@/app/components/SurfaceCard";

const PAYHIP_LAUNCH_URL = "https://payhip.com/b/XxSev";

const products = [
  {
    href: "/courses/career-shortcuts",
    title: "47 Excel Shortcuts That Make You Look Senior at Work",
    format: "PDF download",
    price: "$9",
    description:
      "A concise, professional cheat sheet of practical Excel shortcuts used in real corporate workflows. Designed to help you work faster, reduce manual steps, and keep spreadsheets clean and credible.",
    highlights: [
      "Practical shortcuts for finance, ops, and consulting",
      "Clean layouts that reduce spreadsheet friction",
      "Built for real-world corporate workflows",
    ],
    cta: "Get Instant Access",
    ctaHref: PAYHIP_LAUNCH_URL,
  },
] as const;

const primaryButtonClasses =
  "inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.35)]";

const benefits = [
  {
    icon: "📌",
    title: "Practical, not theoretical",
    description: "Focused on real workflows that save time and reduce mistakes.",
  },
  {
    icon: "⚡",
    title: "Fast to apply",
    description: "Quick wins you can use immediately with minimal setup.",
  },
  {
    icon: "🧠",
    title: "Built for professionals",
    description: "Written for founders, consultants, and modern operators.",
  },
  {
    icon: "🧾",
    title: "Clear takeaways",
    description: "Concise format with high-signal, low-noise content.",
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="pb-16 sm:pb-20">
        <HeroSection
          title="Level Up Your Skills"
          subtitle="Practical learning resources designed for real professional work. Clear takeaways, modern workflows, and high-signal guidance."
        />

        <Container>
          <section className="py-6 sm:py-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <SurfaceCard key={product.title} className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="inline-flex items-center rounded-full border border-black/[.08] bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:border-white/[.12] dark:bg-white/5 dark:text-zinc-300">
                        {product.format}
                      </div>
                      <div className="mt-3 text-pretty text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                        {product.title}
                      </div>
                      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        {product.price} one-time
                      </div>
                    </div>
                    <span
                      className="mt-1 text-zinc-500 transition-transform group-hover:translate-x-0.5 dark:text-zinc-400"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                    {product.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-1 text-indigo-500" aria-hidden>
                          •
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <PrimaryButton href={product.href}>View details</PrimaryButton>
                    <a
                      href={product.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={primaryButtonClasses}
                    >
                      {product.cta}
                    </a>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </section>

          <section className="py-10 sm:py-14">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Why Learn Here
              </h2>
              <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Short, actionable resources built for focused work, faster execution,
                and higher-quality outcomes.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => (
                <SurfaceCard key={benefit.title} className="p-5">
                  <div className="mb-3 text-2xl" aria-hidden>
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {benefit.description}
                  </p>
                </SurfaceCard>
              ))}
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}

