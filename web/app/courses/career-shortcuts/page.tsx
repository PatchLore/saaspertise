import Link from "next/link";

import { Container } from "@/app/components/Container";

const PAYHIP_LAUNCH_URL = "https://payhip.com/b/XxSev";

const outcomes = [
  "Work faster using practical shortcuts you can apply immediately",
  "Clean and format spreadsheets so they read clearly and earn trust",
  "Navigate large workbooks and filtered data with less friction",
  "Reduce avoidable mistakes by using consistent, repeatable habits",
] as const;

const whatYouGet = [
  { label: "Format", value: "PDF download" },
  { label: "Contents", value: "47 practical Excel shortcuts" },
  { label: "Use case", value: "Daily work speed, clarity, and confidence" },
] as const;

export default function CareerShortcutsCoursePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950">
      <main className="py-16 sm:py-20">
        <Container>
          {/* Hero */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                47 Excel Shortcuts That Make You Look Senior at Work
              </h1>
              <p className="mt-5 text-pretty text-lg leading-8 text-zinc-700">
                A concise, professional cheat sheet of practical Excel shortcuts
                used by senior analysts and managers. Built for corporate work
                where speed, clarity, and reliability matter more than flashy
                tricks.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={PAYHIP_LAUNCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                >
                  Get Instant Access
                </a>
                <a
                  href="#whats-inside"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-50"
                >
                  Preview Contents
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {whatYouGet.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200 bg-white p-5"
                  >
                    <div className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-zinc-800">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Outcomes */}
          <section className="py-10 sm:py-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  What you’ll be able to do
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  This is a focused guide for working faster and producing cleaner spreadsheets in real professional environments.
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="grid gap-3">
                  {outcomes.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-800"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Who it's for / not for */}
          <section className="py-10 sm:py-14">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  Who this is for
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
                  <li>
                    Office professionals who use Excel regularly
                  </li>
                  <li>
                    Analysts, assistants, graduates, and aspiring senior analysts
                  </li>
                  <li>
                    Anyone who wants to move faster without advanced Excel knowledge
                  </li>
                  <li>
                    People who want a clean reference they can use at work
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  Who this is not for
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
                  <li>
                    People who never use Excel at work
                  </li>
                  <li>
                    Anyone looking for a long, video-first course experience
                  </li>
                  <li>
                    Users who want deep modelling theory rather than practical speed
                  </li>
                  <li>
                    Teams that need custom enterprise training or onboarding
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What's inside */}
          <section id="whats-inside" className="py-10 sm:py-14 scroll-mt-24">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                What’s inside
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                A curated set of shortcuts and small workflow habits that reduce manual work and keep your spreadsheets clean and credible.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {[
                {
                  title: "Keyboard shortcuts that save time",
                  points: [
                    "High-frequency actions for navigation, selection, and editing",
                    "Patterns that reduce mouse dependence and context switching",
                  ],
                },
                {
                  title: "Data-cleaning shortcuts",
                  points: [
                    "Quick fixes that make datasets usable and consistent",
                    "Fast ways to reduce errors before analysis",
                  ],
                },
                {
                  title: "Formatting shortcuts",
                  points: [
                    "Create readable, professional spreadsheets quickly",
                    "Small standards that make work easier to trust",
                  ],
                },
                {
                  title: "Two advanced shortcuts included",
                  points: [
                    "Filter menu open shortcut for faster analysis",
                    "Worksheet switching for large workbooks",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-8"
                >
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                    {block.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section id="pricing" className="py-10 sm:py-14 scroll-mt-24">
            <div className="rounded-[32px] border border-zinc-200 bg-white p-8 sm:p-10">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-7">
                  <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                    Simple pricing
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    One-time purchase. Instant access after purchase.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-700">
                    <li>PDF download with 47 practical shortcuts</li>
                    <li>Designed for real professional work environments</li>
                    <li>Keep it open while you work and apply immediately</li>
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
                    <div className="text-sm font-medium text-zinc-600">
                      Price
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <div className="text-4xl font-semibold tracking-tight text-zinc-950">
                        £9
                      </div>
                      <div className="text-sm text-zinc-600">One-time payment</div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href={PAYHIP_LAUNCH_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                      >
                        Get Instant Access
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-50"
                      >
                        Questions? Contact us.
                      </Link>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-zinc-500">
                      Checkout and delivery are handled by Payhip.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer note */}
          <section className="py-10 sm:py-14">
            <div className="max-w-3xl">
              <p className="text-sm leading-6 text-zinc-600">
                Prefer to explore the site first? Browse our{" "}
                <Link href="/gear" className="font-medium text-zinc-950 hover:underline">
                  reviews
                </Link>{" "}
                for tools and hardware used in real professional workflows.
              </p>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}

