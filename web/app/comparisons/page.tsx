import type { Metadata } from "next";
import { Container } from "../components/Container";
import { HeroSection } from "../components/HeroSection";
import { PrimaryButton } from "../components/PrimaryButton";
import { SurfaceCard } from "../components/SurfaceCard";
import { comparisons } from "../data/comparisons";

export const metadata: Metadata = {
  title: "Best SaaS Comparisons (2026) | SaaSpertise",
  description:
    "In-depth, unbiased SaaS comparisons to help founders and marketers choose the right tools in 2026.",
};

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="pb-16 sm:pb-20">
        <HeroSection
          title="Compare Tools Side-by-Side"
          subtitle="Side-by-side comparisons for buyers choosing between tools. Focused on pricing, features, performance, and real-world use cases."
        />

        <Container>
          {/* Comparison articles */}
          <div className="py-6 sm:py-8">
            <div className="grid gap-6 sm:gap-8">
              {comparisons.map((comparison) => (
                <SurfaceCard key={comparison.slug} className="sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          Comparison
                        </span>
                        <span className="inline-flex items-center rounded-full border border-black/[.08] bg-white/70 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-white/[.12] dark:bg-white/5 dark:text-zinc-300">
                          {comparison.category}
                        </span>
                      </div>
                      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        <span className="rounded-full border border-black/[.08] bg-white/80 px-3 py-1 dark:border-white/[.12] dark:bg-white/5">
                          {comparison.tools[0]}
                        </span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs text-white dark:bg-zinc-50 dark:text-zinc-900">
                          VS
                        </span>
                        <span className="rounded-full border border-black/[.08] bg-white/80 px-3 py-1 dark:border-white/[.12] dark:bg-white/5">
                          {comparison.tools[1]}
                        </span>
                      </div>
                      <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-2xl">
                        {comparison.title}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        {comparison.excerpt}
                      </p>
                    </div>
                    <span
                      className="mt-0.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 dark:text-zinc-400"
                      aria-hidden
                    >
                      →
                    </span>
                  </div>

                  <ul className="mt-5 grid gap-2 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
                    {comparison.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span className="mt-0.5 text-indigo-500" aria-hidden>
                          •
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <PrimaryButton href={`/comparisons/${comparison.slug}`}>
                      Read comparison
                    </PrimaryButton>
                  </div>
                </SurfaceCard>
              ))}
            </div>
          </div>

          {/* Empty state message if no comparisons */}
          {comparisons.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-zinc-600 dark:text-zinc-400">
                More comparisons coming soon.
              </p>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
