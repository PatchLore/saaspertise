"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Container } from "./components/Container";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SaaSpertise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaSpertise is a professional review platform that helps founders, consultants, and remote professionals choose the best SaaS tools, productivity hardware, and work systems.",
      },
    },
    {
      "@type": "Question",
      name: "How does SaaSpertise make money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaSpertise may earn commissions through affiliate links when users purchase products we recommend, at no extra cost to the buyer.",
      },
    },
    {
      "@type": "Question",
      name: "Are the reviews on SaaSpertise unbiased?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All recommendations are based on hands-on research, real-world use cases, and professional workflows, not sponsorships.",
      },
    },
    {
      "@type": "Question",
      name: "Who is SaaSpertise for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaSpertise is built for SaaS founders, consultants, developers, and remote professionals who want reliable tools to improve productivity.",
      },
    },
    {
      "@type": "Question",
      name: "Do you test the products you recommend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We evaluate products based on performance, usability, reliability, and long-term value for professional work environments.",
      },
    },
  ],
} as const;

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100">
      <div className="animated-gradient-bg" aria-hidden />

      <nav
        id="navbar"
        className={[
          "fixed top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl transition-all duration-300",
          scrolled ? "py-4 bg-slate-900/95" : "py-6",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="bg-gradient-to-br from-indigo-500 to-pink-500 bg-clip-text text-2xl font-extrabold text-transparent"
          >
            SaaSpertise
          </Link>

          <ul className="hidden list-none items-center gap-10 md:flex">
            {[
              { href: "#features", label: "Features" },
              { href: "/gear", label: "Reviews" },
              { href: "/courses/career-shortcuts", label: "Courses" },
              { href: "#about", label: "About" },
            ].map((item) => (
              <li key={item.href}>
                {item.href.startsWith("#") ? (
                  <a
                    href={item.href}
                    className="group relative font-medium text-slate-400 transition-colors hover:text-slate-100"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="group relative font-medium text-slate-400 transition-colors hover:text-slate-100"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/gear"
            className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 px-5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
          >
            Get Started
          </Link>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="flex min-h-screen items-center justify-center px-[5%] pb-16 pt-32">
          <div className="w-full max-w-[1400px]">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div className="text-center lg:text-left">
                <h1 className="mb-6 text-balance text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
                    Build Your Perfect{" "}
                  </span>
                  <span className="bg-gradient-to-br from-indigo-500 via-pink-500 to-violet-500 bg-clip-text text-transparent">
                    SaaS Work Stack
                  </span>
                </h1>
                <p className="mb-10 text-pretty text-lg leading-8 text-slate-400 sm:text-xl">
                  Discover productivity hardware, work stack tools, and the
                  systems that keep founders and remote professionals moving.
                  Practical picks and clear comparisons\u2014built for real-world
                  workflows, not just software.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link
                    href="/gear"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 px-6 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
                  >
                    Explore Reviews
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl animate-[float_6s_ease-in-out_infinite]">
                  <div className="mb-6">
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-100 sm:text-2xl">
                      What We Review
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
                      Carefully selected tools and hardware that improve real-world SaaS workflows.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      {
                        title: "\uD83D\uDDB1\uFE0F Productivity Hardware",
                        desc: "Mice, keyboards, monitor accessories, and desk gear that reduce friction during long work sessions.",
                      },
                      {
                        title: "\u2699\uFE0F Workflow & Automation Tools",
                        desc: "Tools that streamline daily tasks, automate repetitive work, and help teams focus on high-impact output.",
                      },
                      {
                        title: "\uD83D\uDD0C Connectivity & Power",
                        desc: "Hubs, chargers, and accessories that keep modern laptops, monitors, and peripherals working reliably.",
                      },
                      {
                        title: "\uD83D\uDDA5\uFE0F Remote & Mobile Setups",
                        desc: "Portable monitors and workspace gear designed for remote work, travel, and hybrid teams.",
                      },
                    ].map((card) => (
                      <div
                        key={card.title}
                        className="rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-500/20 hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)]"
                      >
                        <h3 className="mb-2 text-base font-bold text-indigo-400">
                          {card.title}
                        </h3>
                        <p className="text-sm text-slate-400">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24">
          <Container className="max-w-[1400px]">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                Why Choose SaaSpertise?
              </h2>
              <p className="text-lg text-slate-400">
                Clear, trust-first reviews for choosing tools, gear, and systems
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[
                {
                  icon: "\u26A1",
                  title: "Independent Reviews",
                  desc: "Research-driven writeups focused on what helps in real work\u2014not hype, not sponsorships.",
                },
                {
                  icon: "\uD83C\uDFAF",
                  title: "Clear Fit & Tradeoffs",
                  desc: "Straightforward guidance on who a tool is for, where it shines, and where it falls short.",
                },
                {
                  icon: "\uD83D\uDCB0",
                  title: "No Sponsored Rankings",
                  desc: "Affiliate links may support the site, but they never decide what we recommend or how we rank.",
                },
                {
                  icon: "\uD83D\uDCCA",
                  title: "Pros & Cons, Up Front",
                  desc: "Balanced breakdowns so you can compare options quickly before committing time or budget.",
                },
                {
                  icon: "\uD83D\uDD04",
                  title: "Systems, Not Just Software",
                  desc: "Recommendations that combine productivity hardware, tools, and workflows into a cohesive setup.",
                },
                {
                  icon: "\uD83E\uDD1D",
                  title: "Built for Modern Work",
                  desc: "Made for SaaS founders, consultants, and remote professionals who want reliable tools that reduce friction.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-md transition-all duration-300 hover:-translate-y-2.5 hover:border-indigo-500/50 hover:shadow-[0_20px_60px_rgba(99,102,241,0.2)]"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <div className="relative">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-2xl">
                      {feature.icon}
                    </div>
                    <h3 className="mb-4 text-xl font-bold">{feature.title}</h3>
                    <p className="leading-8 text-slate-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section id="get-started" className="px-[5%] py-32">
          <div className="mx-auto max-w-[1200px] text-center">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 px-8 py-16 backdrop-blur-xl sm:px-12">
              <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)] animate-[pulse_8s_ease-in-out_infinite]" />
              <div className="relative">
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Build a Smarter SaaS Stack
                </h2>
                <p className="mb-10 text-lg text-slate-400 sm:text-xl">
                  Compare tools, productivity hardware, and workflows before you
                  commit\u2014so your setup supports focused, reliable work.
                </p>
                <Link
                  href="/gear"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 px-10 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(99,102,241,0.4)]"
                >
                  Browse Reviews
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (mapped to #about for nav parity) */}
      <footer
        id="about"
        className="border-t border-white/10 px-[5%] py-12 text-center text-slate-400"
      >
        <div className="mb-8 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Learning
            </span>
            <Link
              href="/courses/career-shortcuts"
              className="transition-colors hover:text-indigo-500"
            >
              Courses
            </Link>
          </div>
          <Link
            href="/about"
            className="transition-colors hover:text-indigo-500"
          >
            About
          </Link>
          <Link
            href="/disclosure"
            className="transition-colors hover:text-indigo-500"
          >
            Affiliate Disclosure
          </Link>
          <Link
            href="/privacy"
            className="transition-colors hover:text-indigo-500"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-indigo-500"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-indigo-500"
          >
            Contact
          </Link>
        </div>
        <p>\u00A9 2026 SaaSpertise. All rights reserved.</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
