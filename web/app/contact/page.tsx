import { Container } from "../components/Container";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-8 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Back to home
            </Link>

            <h1 className="mb-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact Us
            </h1>

            <div className="space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p>
                Have a question about SaaSpertise or need help finding the right
                tool for your business? We'd love to hear from you.
              </p>

              <section className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <h2 className="mb-4 text-xl font-semibold">Get in Touch</h2>
                <p className="mb-4 text-zinc-600 dark:text-zinc-400">
                  For general inquiries, partnership opportunities, or feedback,
                  please reach out to us:
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@saaspertise.com"
                    className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    info@saaspertise.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">
                      How do you choose which tools to review?
                    </h3>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                      We focus on tools that are genuinely useful for modern
                      work, prioritizing quality, reliability, and real-world
                      value over marketing hype.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Are your reviews influenced by affiliate partnerships?
                    </h3>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                      No. Our reviews are independent and based on our own
                      testing and research. Affiliate links help support the
                      site but never influence our recommendations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Can I suggest a tool for review?
                    </h3>
                    <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                      Absolutely! We're always looking for great tools to
                      feature. Send us an email with your suggestion.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
