import Link from "next/link";

import { Container } from "@/app/components/Container";

const modules = [
  {
    title: "Module 1 — The Executive Excel Mindset",
    points: [
      "What senior analysts do differently (clarity, speed, and decision-ready outputs)",
      "The 80/20 of spreadsheets: what to master, what to ignore",
      "A simple workflow for clean, credible models under time pressure",
    ],
  },
  {
    title: "Module 2 — Fast, Clean Data (Without the Drama)",
    points: [
      "Reliable import and cleanup patterns you can reuse",
      "Text-to-columns, trimming, and shape fixes that prevent downstream errors",
      "Quick checks to catch the 5 most common data issues",
    ],
  },
  {
    title: "Module 3 — Formulas That Scale",
    points: [
      "Writing formulas you can hand to someone else with confidence",
      "Lookup strategies for real models (and when not to use them)",
      "Dynamic ranges and structured references for maintainable workbooks",
    ],
  },
  {
    title: "Module 4 — Pivots, Summaries, and Story",
    points: [
      "Building summaries that answer questions, not just show numbers",
      "Pivot patterns for recurring reporting and ad hoc analysis",
      "Turning messy tables into decision-ready views",
    ],
  },
  {
    title: "Module 5 — Presentation-Grade Output",
    points: [
      "Formatting that reads like a deck: hierarchy, spacing, and emphasis",
      "Charts that earn trust (and which ones to avoid)",
      "Templates for stakeholder-ready exports",
    ],
  },
  {
    title: "Module 6 — Speed Systems: Shortcuts, Habits, and QA",
    points: [
      "Keyboard-first workflows that compound over time",
      "A lightweight QA checklist to prevent avoidable mistakes",
      "How to ship faster without sacrificing credibility",
    ],
  },
] as const;

const outcomes = [
  "Build clean, decision-ready spreadsheets that leaders trust",
  "Move faster with a repeatable workflow for analysis and reporting",
  "Use formulas, summaries, and pivots without creating fragile files",
  "Present results clearly with professional formatting and chart choices",
  "Reduce rework with simple quality checks and a consistent structure",
] as const;

const bonuses = [
  {
    title: "Excel QA Checklist (Printable)",
    desc: "A quick pre-send checklist to catch errors before they reach stakeholders.",
  },
  {
    title: "Formatting Framework",
    desc: "A simple standard for spacing, hierarchy, and emphasis you can reuse in any workbook.",
  },
  {
    title: "Shortcut Map",
    desc: "A curated list of high-leverage shortcuts grouped by workflow, not by keyboard.",
  },
] as const;

export default function CareerShortcutsCoursePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950">
      <main className="py-16 sm:py-20">
        <Container>
          {/* Hero */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl">
              <p className="text-sm font-medium tracking-wide text-zinc-600">
                Paid course
              </p>
              <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
                Career Shortcuts — Excel That Gets You Promoted
              </h1>
              <p className="mt-5 text-pretty text-lg leading-8 text-zinc-700">
                Learn the Excel workflows senior analysts use to deliver
                decision-ready work\u2014fast, clean, and credible. Built for
                corporate environments where clarity and reliability matter more
                than clever tricks.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#pricing"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                >
                  Get Instant Access
                </a>
                <a
                  href="#curriculum"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-50"
                >
                  Preview Curriculum
                </a>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Format",
                    value: "Short modules, practical demonstrations",
                  },
                  { label: "Level", value: "Intermediate to advanced" },
                  { label: "Focus", value: "Speed, clarity, credibility" },
                ].map((item) => (
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
                  What you\u2019ll be able to do
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  The goal is not to learn everything in Excel. It\u2019s to
                  develop a professional system for producing analysis that is
                  easy to follow, easy to update, and hard to break.
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
                    Corporate workers who want to stand out through clarity and
                    reliability
                  </li>
                  <li>
                    Aspiring senior analysts who need faster, cleaner workflows
                  </li>
                  <li>
                    Professionals who build recurring reports and want fewer
                    mistakes
                  </li>
                  <li>
                    People who already use Excel and want an upgrade in
                    structure, not shortcuts alone
                  </li>
                </ul>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-white p-8">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  Who this is not for
                </h2>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-zinc-700">
                  <li>
                    Beginners who need the basics of cells, worksheets, and
                    simple formulas
                  </li>
                  <li>
                    Anyone looking for entertainment, hacks, or novelty features
                  </li>
                  <li>
                    People who want a theoretical course with minimal practical
                    examples
                  </li>
                  <li>
                    Teams that need enterprise training and custom onboarding
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section id="curriculum" className="py-10 sm:py-14 scroll-mt-24">
            <div className="max-w-3xl">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                Curriculum: 6 modules
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Each module is designed to be applied immediately in your
                day-to-day work. You\u2019ll learn patterns you can reuse across
                reports, models, and recurring analysis.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {modules.map((module) => (
                <div
                  key={module.title}
                  className="rounded-3xl border border-zinc-200 bg-white p-8"
                >
                  <h3 className="text-base font-semibold tracking-tight text-zinc-950">
                    {module.title}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700">
                    {module.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Bonus materials */}
          <section className="py-10 sm:py-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  Bonus materials
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Lightweight resources to help you execute consistently, even
                  when you\u2019re busy.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="grid gap-4">
                  {bonuses.map((bonus) => (
                    <div
                      key={bonus.title}
                      className="rounded-3xl border border-zinc-200 bg-white p-7"
                    >
                      <div className="text-sm font-semibold text-zinc-950">
                        {bonus.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-zinc-700">
                        {bonus.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
                    Launch pricing for early students. No subscriptions, no
                    upsells on this page.
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-6 text-zinc-700">
                    <li>Full access to all 6 modules</li>
                    <li>Bonus materials included</li>
                    <li>Designed for practical, professional workflows</li>
                  </ul>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8">
                    <div className="text-sm font-medium text-zinc-600">
                      Launch price
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <div className="text-4xl font-semibold tracking-tight text-zinc-950">
                        £29
                      </div>
                      <div className="text-sm text-zinc-600">one-time</div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <a
                        href="#pricing"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-amber-500 px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-400"
                      >
                        Get Instant Access
                      </a>
                      <Link
                        href="/contact"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-50"
                      >
                        Questions? Contact us
                      </Link>
                    </div>
                    <p className="mt-4 text-xs leading-5 text-zinc-500">
                      Payment and access delivery will be provided at checkout.
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

