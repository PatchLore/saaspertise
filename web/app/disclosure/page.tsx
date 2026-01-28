import type { Metadata } from "next";

import { BackButton } from "../components/BackButton";
import { Container } from "../components/Container";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | SaaSpertise",
  description:
    "How SaaSpertise uses affiliate links, maintains editorial independence, and complies with FTC disclosure guidelines.",
};

export default function DisclosurePage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <BackButton href="/" />

            <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Affiliate Disclosure
            </h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                Some links on SaaSpertise are affiliate links. If you purchase
                through these links, we may earn a small commission at no extra
                cost to you.
              </p>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  Editorial Independence
                </h2>
                <p>
                  Our recommendations are based on research, real-world use
                  cases, and clear evaluation criteria. Affiliate relationships
                  never determine rankings or outcomes.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  How We Evaluate Products
                </h2>
                <p>
                  We focus on reliability, setup friction, long-term value, and
                  fit for modern professional workflows. When possible, we test
                  products directly or validate them through reputable sources.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">FTC Compliance</h2>
                <p>
                  SaaSpertise complies with FTC guidelines for endorsements and
                  testimonials. We disclose affiliate relationships clearly on
                  pages that contain affiliate links.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  Supporting SaaSpertise
                </h2>
                <p>
                  Affiliate revenue helps us keep the site running, expand
                  coverage, and invest in better research. We appreciate your
                  support.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
