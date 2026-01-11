import Link from "next/link";
import { Container } from "../components/Container";
import { products } from "../data/products";

export default function GearPage() {
  const sections = [
    { title: "Desk & Workspace Tech", category: "desk" },
    { title: "Productivity Gadgets", category: "productivity" },
    { title: "Mobile & Power", category: "mobile" },
    { title: "Remote Work Gear", category: "remote" },
  ] as const;

  return (
    <div id="top" className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          {/* 1) Page intro */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Recommended Tech Tools for Modern Work
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
                These picks are selected for day-to-day usefulness, build quality,
                and long-term value. We prioritize tools that reduce friction,
                support focused work, and hold up in real workflows.
              </p>
            </div>
          </section>

          {/* 2) Category sections */}
          <div className="py-6 sm:py-8">
            <div className="grid gap-10 sm:gap-12">
              {sections.map((section) => (
                <section key={section.title} className="scroll-mt-24">
                  <div className="flex items-end justify-between gap-6">
                    <h2 className="text-lg font-semibold tracking-tight">
                      {section.title}
                    </h2>
                    <Link
                      href="#top"
                      className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                    >
                      Back to top
                    </Link>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products
                      .filter((p) => p.category === section.category)
                      .map((product) => (
                        <Link
                          key={product.slug}
                          href={`/gear/${product.slug}`}
                          className="group rounded-2xl border border-black/[.08] bg-white p-5 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-base font-medium text-zinc-950 dark:text-zinc-50">
                                {product.name}
                              </div>
                              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                                {product.shortDescription}
                              </p>
                            </div>
                            <span
                              className="mt-0.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 dark:text-zinc-400"
                              aria-hidden
                            >
                              →
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
