import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "../components/Container";
import { comparisons } from "../data/comparisons";

export const metadata: Metadata = {
  title: "Best SaaS Comparisons (2026) | SaaSpertise",
  description:
    "In-depth, unbiased SaaS comparisons to help founders and marketers choose the right tools in 2026.",
};

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          {/* Page intro */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                SaaS Comparisons
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
                These are side-by-side comparisons for buyers choosing between tools.
                Focused on pricing, features, performance, and real-world use cases.
              </p>
            </div>
          </section>

          {/* Comparison articles */}
          <div className="py-6 sm:py-8">
            <div className="grid gap-6 sm:gap-8">
              {comparisons.map((comparison) => (
                <article
                  key={comparison.slug}
                  className="group rounded-2xl border border-black/[.08] bg-white p-6 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          Comparison
                        </span>
                        <span className="text-sm text-zinc-500 dark:text-zinc-400">
                          {comparison.tools.join(" vs ")}
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

                  <div className="mt-6">
                    <Link
                      href={`/comparisons/${comparison.slug}`}
                      className="inline-flex items-center text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                    >
                      Read comparison
                    </Link>
                  </div>
                </article>
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
