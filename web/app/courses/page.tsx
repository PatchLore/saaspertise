import Link from "next/link";

import { Container } from "@/app/components/Container";

const PAYHIP_LAUNCH_URL = "https://payhip.com/b/XxSev";

const products = [
  {
    href: "/courses/career-shortcuts",
    title: "47 Excel Shortcuts That Make You Look Senior at Work",
    format: "PDF download",
    price: "$9",
    description:
      "A concise, professional cheat sheet of practical Excel shortcuts used in real corporate workflows. Designed to help you work faster, reduce manual steps, and keep spreadsheets clean and credible.",
    cta: "Get Instant Access",
    ctaHref: PAYHIP_LAUNCH_URL,
  },
] as const;

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Courses & Downloads
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Practical learning resources designed for real professional work.
                More products will be added over time.
              </p>
            </div>
          </section>

          <section className="py-6 sm:py-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.title}
                  className="group relative overflow-hidden rounded-2xl border border-black/[.08] bg-white p-6 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {product.format}
                      </div>
                      <div className="mt-2 text-pretty text-base font-semibold text-zinc-950 dark:text-zinc-50">
                        {product.title}
                      </div>
                      <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
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

                  {/* Hover reveal */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-white/95 dark:bg-black/92" />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                      {product.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      <Link
                        href={product.href}
                        className="pointer-events-auto text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                      >
                        View details
                      </Link>
                      <a
                        href={product.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto text-sm font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                      >
                        {product.cta}
                      </a>
                    </div>
                  </div>

                  {/* Mobile-friendly always-visible actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-4 sm:hidden">
                    <Link
                      href={product.href}
                      className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                    >
                      View details
                    </Link>
                    <a
                      href={product.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                    >
                      {product.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}

