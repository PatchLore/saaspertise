import Link from "next/link";

import { BackButton } from "../components/BackButton";
import { Container } from "../components/Container";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <BackButton href="/" />

            <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Last updated: January 2026
              </p>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Introduction</h2>
                <p>
                  SaaSpertise (“we,” “our,” or “us”) is committed to protecting
                  your privacy. This Privacy Policy explains how we collect,
                  use, and safeguard your information when you visit our
                  website.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  Information We Collect
                </h2>
                <p>
                  We may collect information that you provide directly to us,
                  such as when you contact us or use our services. We also
                  automatically collect certain information about your device
                  and how you interact with our website.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  How We Use Your Information
                </h2>
                <p>
                  We use the information we collect to provide, maintain, and
                  improve our services, respond to your inquiries, and analyze
                  how our website is used.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Affiliate Links</h2>
                <p>
                  Our website contains affiliate links. When you click on these
                  links and make a purchase, we may receive a commission. This
                  does not affect the price you pay or our editorial
                  independence.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track
                  activity on our website and hold certain information. You can
                  instruct your browser to refuse all cookies or to indicate
                  when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy, please contact
                  us through our{" "}
                  <Link
                    href="/contact"
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
