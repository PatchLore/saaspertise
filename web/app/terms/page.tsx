import { Container } from "../components/Container";
import Link from "next/link";

export default function TermsPage() {
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
              Terms of Service
            </h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Last updated: January 2026
              </p>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  Acceptance of Terms
                </h2>
                <p>
                  By accessing and using SaaSpertise, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to these terms, please do not use our website.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Use License</h2>
                <p>
                  Permission is granted to temporarily access the materials on
                  SaaSpertise for personal, non-commercial transitory viewing
                  only. This is the grant of a license, not a transfer of
                  title.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Disclaimer</h2>
                <p>
                  The materials on SaaSpertise are provided on an "as is" basis.
                  We make no warranties, expressed or implied, and hereby
                  disclaim all other warranties including, without limitation,
                  implied warranties or conditions of merchantability, fitness
                  for a particular purpose, or non-infringement of intellectual
                  property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Affiliate Links</h2>
                <p>
                  SaaSpertise contains affiliate links. When you purchase through
                  these links, we may earn a commission at no additional cost to
                  you. Our reviews and recommendations are based on our
                  independent research and analysis.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Limitations</h2>
                <p>
                  In no event shall SaaSpertise or its suppliers be liable for
                  any damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out of
                  the use or inability to use the materials on SaaSpertise.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Revisions</h2>
                <p>
                  SaaSpertise may revise these terms of service at any time
                  without notice. By using this website, you are agreeing to be
                  bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Contact Us</h2>
                <p>
                  If you have questions about these Terms of Service, please
                  contact us through our{" "}
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
