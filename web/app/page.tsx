import { Container } from "./components/Container";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const categories = [
    { title: "Desk & Workspace Tech", href: "/gear/desk" },
    { title: "Productivity Gadgets", href: "/gear/productivity" },
    { title: "Mobile & Power", href: "/gear/mobile" },
    { title: "Remote Work Gear", href: "/gear/remote" },
  ] as const;

  const featuredPicks = [
    {
      name: "ErgoLift Laptop Stand",
      benefit: "Better posture, cleaner desk setup, and improved airflow.",
      imageSrc: "/images/products/placeholder.png",
      href: "/gear/ergolift-laptop-stand",
    },
    {
      name: "QuietKeys Mechanical Keyboard",
      benefit: "Comfortable typing with a calmer sound profile for shared spaces.",
      imageSrc: "/images/products/placeholder.png",
      href: "/gear/quietkeys-mechanical-keyboard",
    },
    {
      name: "PocketCharge 10K",
      benefit: "Reliable power for travel days and long meetings away from outlets.",
      imageSrc: "/images/products/placeholder.png",
      href: "/gear/pocketcharge-10k",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          {/* 1) Hero */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Tech tools that actually improve how you work
              </h1>
              <p className="mt-5 text-pretty text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                SaaSpertise reviews tech tools, gadgets, and software built for
                productivity and modern work—so you can buy with confidence and
                build a setup that lasts.
              </p>
              <div className="mt-8">
                <Link
                  href="/gear"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
                >
                  Browse Best Tools
                </Link>
              </div>
            </div>
          </section>

          {/* 2) Category grid */}
          <section className="py-10 sm:py-12">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-lg font-semibold tracking-tight">Browse by category</h2>
              <Link
                href="/gear"
                className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                View all
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group rounded-2xl border border-black/[.08] bg-white p-5 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-medium">{category.title}</div>
                    <span className="text-zinc-500 transition-transform group-hover:translate-x-0.5 dark:text-zinc-400">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 3) Featured picks */}
          <section className="py-10 sm:py-12">
            <h2 className="text-lg font-semibold tracking-tight">Featured picks</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {featuredPicks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group overflow-hidden rounded-2xl border border-black/[.08] bg-white transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]"
                >
                  <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      className="object-cover opacity-95 transition-opacity group-hover:opacity-100"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-base font-medium text-zinc-950 dark:text-zinc-50">
                      {item.name}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {item.benefit}
                    </p>
                    <div className="mt-4 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      Read the pick <span aria-hidden>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 4) Editorial entry */}
          <section className="py-10 sm:py-12">
            <div className="rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Editorial
                  </div>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    Best Tech Gadgets for Modern Work (2026)
                  </h2>
                </div>
                <Link
                  href="/best/modern-work"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-black/[.08] bg-transparent px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:text-zinc-50 dark:hover:bg-[#1a1a1a]"
                >
                  Read the roundup
                </Link>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
                A practical, category-by-category guide to the tools that make
                work feel smoother—picked for ergonomics, reliability, and real
                day-to-day use.
              </p>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
