import Link from "next/link";
import { Container } from "../components/Container";
import { products } from "../data/products";

export default function GearPage() {
  const sections = [
    { title: "Productivity Hardware", category: "desk" },
    { title: "Workflow & Automation Tools", category: "productivity" },
    { title: "Connectivity & Power", category: "mobile" },
    { title: "Remote & Mobile Work", category: "remote" },
  ] as const;

  return (
    <div id="top" className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          {/* 1) Page intro */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Productivity Gear & Reviews for Modern SaaS Workflows
              </h1>
              <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400">
                Independent reviews of productivity hardware and workflow tools,
                built for SaaS founders, consultants, and remote professionals
                who want reliable setups that support focused, repeatable work.
              </p>
              <p className="mt-4 text-sm italic leading-6 text-zinc-500 dark:text-zinc-500">
                Some links on this page are affiliate links. If you make a
                purchase, we may earn a small commission at no extra cost to you.
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
                        <div
                          key={product.slug}
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

                          <div className="mt-5 flex flex-wrap items-center gap-4">
                            <Link
                              href={`/gear/${product.slug}`}
                              className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                            >
                              View review
                            </Link>
                            <a
                              href={product.affiliateUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener"
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              Check price
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* 3) Soft CTA */}
          <section className="pt-10 sm:pt-12">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Explore individual reviews to see pros, cons, and who each tool is
              best for.{" "}
              <Link
                href={`/gear/${products[0]?.slug ?? ""}`}
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                Start with the first review
              </Link>
              .
            </p>
          </section>
        </Container>
      </main>
    </div>
  );
}
