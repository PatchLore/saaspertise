import Image from "next/image";
import Link from "next/link";

import { Container } from "../components/Container";
import { HeroSection } from "../components/HeroSection";
import { PrimaryButton } from "../components/PrimaryButton";
import { SectionHeader } from "../components/SectionHeader";
import { SurfaceCard } from "../components/SurfaceCard";
import { products } from "../data/products";

export default function GearPage() {
  const primaryButtonClasses =
    "inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.35)]";
  const sections = [
    {
      title: "Productivity Hardware",
      category: "desk",
      icon: "🖱️",
      description:
        "Desk gear, peripherals, and ergonomic upgrades that reduce friction during long work sessions.",
    },
    {
      title: "Workflow & Productivity Tools",
      category: "productivity",
      icon: "⚙️",
      description:
        "Streamlined control surfaces and tools that keep daily work focused and repeatable.",
    },
    {
      title: "Connectivity & Power",
      category: "mobile",
      icon: "🔌",
      description:
        "Chargers, hubs, and accessories that keep modern laptops and devices reliable.",
    },
    {
      title: "Remote & Mobile Work",
      category: "remote",
      icon: "🖥️",
      description:
        "Portable displays and mobility gear built for travel, hybrid teams, and remote setups.",
    },
  ] as const;

  return (
    <div id="top" className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="pb-16 sm:pb-20">
        <HeroSection
          title={
            <>
              <span className="bg-gradient-to-br from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-400">
                Build a Smarter{" "}
              </span>
              <span className="bg-gradient-to-br from-indigo-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                SaaS Stack
              </span>
            </>
          }
          subtitle="Independent reviews of productivity hardware and workflow tools for founders, consultants, and remote professionals who want reliable setups that support focused, repeatable work."
        >
          <p className="text-sm italic leading-6 text-zinc-500 dark:text-zinc-400">
            Some links on this page are affiliate links. If you make a purchase,
            we may earn a small commission at no extra cost to you.
          </p>
        </HeroSection>

        <Container>
          {/* 2) Category sections */}
          <div className="py-6 sm:py-8">
            <div className="grid gap-12 sm:gap-14">
              {sections.map((section) => (
                <section key={section.title} className="scroll-mt-24">
                  <SectionHeader
                    icon={section.icon}
                    title={section.title}
                    description={section.description}
                    action={
                      <Link
                        href="#top"
                        className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                      >
                        Back to top
                      </Link>
                    }
                  />

                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products
                      .filter((p) => p.category === section.category)
                      .map((product) => (
                        <SurfaceCard key={product.slug} className="p-5">
                          <div className="relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
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

                          {product.priceRange && (
                            <p className="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                              Typical price: {product.priceRange}
                            </p>
                          )}

                          <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                            {product.pros.slice(0, 2).map((pro) => (
                              <li key={pro} className="flex items-start gap-2">
                                <span className="mt-1 text-indigo-500" aria-hidden>
                                  •
                                </span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <PrimaryButton href={`/gear/${product.slug}`}>
                              View review
                            </PrimaryButton>
                            <a
                              href={product.affiliateUrl}
                              target="_blank"
                              rel="nofollow sponsored noopener"
                              className={primaryButtonClasses}
                            >
                              Check price
                            </a>
                          </div>
                        </SurfaceCard>
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
