import Link from "next/link";
import { Container } from "../components/Container";

export default function GearPage() {
  const sections = [
    {
      title: "Desk & Workspace Tech",
      items: [
        {
          name: "ErgoLift Laptop Stand",
          benefit: "Better posture, cleaner desk setup, and improved airflow.",
          href: "/gear/ergolift-laptop-stand",
        },
        {
          name: "QuietGlow Desk Lamp",
          benefit: "Soft, focused light that’s easier on the eyes for long sessions.",
          href: "/gear/quietglow-desk-lamp",
        },
        {
          name: "CableDock Organizer",
          benefit: "Tames chargers and adapters so your workspace stays tidy.",
          href: "/gear/cabledock-organizer",
        },
      ],
    },
    {
      title: "Productivity Gadgets",
      items: [
        {
          name: "FocusDial Timer",
          benefit: "A simple physical timer to structure deep work blocks.",
          href: "/gear/focusdial-timer",
        },
        {
          name: "QuietKeys Mechanical Keyboard",
          benefit: "Comfortable typing with a calmer sound profile for shared spaces.",
          href: "/gear/quietkeys-mechanical-keyboard",
        },
      ],
    },
    {
      title: "Mobile & Power",
      items: [
        {
          name: "PocketCharge 10K",
          benefit: "Reliable power for travel days and long meetings away from outlets.",
          href: "/gear/pocketcharge-10k",
        },
        {
          name: "TravelPort USB-C Hub",
          benefit: "Extra ports when you need them, without a heavy setup.",
          href: "/gear/travelport-usb-c-hub",
        },
      ],
    },
    {
      title: "Remote Work Gear",
      items: [
        {
          name: "ClearVoice Mic",
          benefit: "Cleaner calls with less room noise and fewer repeats.",
          href: "/gear/clearvoice-mic",
        },
        {
          name: "ComfortFit Headset",
          benefit: "All-day wearability for meetings and focused work.",
          href: "/gear/comfortfit-headset",
        },
        {
          name: "CamLight Mini",
          benefit: "A small light that makes video calls look more natural.",
          href: "/gear/camlight-mini",
        },
      ],
    },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
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
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group rounded-2xl border border-black/[.08] bg-white p-5 transition-colors hover:bg-black/[.02] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-base font-medium text-zinc-950 dark:text-zinc-50">
                              {item.name}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                              {item.benefit}
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

