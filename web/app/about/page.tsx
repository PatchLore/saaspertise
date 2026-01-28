import { BackButton } from "../components/BackButton";
import { Container } from "../components/Container";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 dark:bg-black dark:text-zinc-50">
      <main className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <BackButton href="/" />

            <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Build a Smarter SaaS Stack
            </h1>
            <p className="mb-10 text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              Compare tools, productivity hardware, and workflows before you
              commit—so your setup supports focused, reliable work.
            </p>

            <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-base leading-7 text-zinc-700 dark:text-zinc-300">
              <h2 className="mt-0 text-xl font-semibold">About SaaSpertise</h2>
              <p>
                SaaSpertise helps you build a reliable work stack\u2014the
                productivity hardware, tools, and systems you can count on every
                day. We focus on practical recommendations that make modern work
                smoother, faster, and less distracting.
              </p>

              <section>
                <h2 className="mt-8 text-xl font-semibold">Our Mission</h2>
                <p>
                  Our mission is simple: reduce decision fatigue for busy
                  builders. We highlight gear and software that supports deep
                  work, clearer communication, and dependable output\u2014so you
                  can spend less time tweaking your setup and more time doing
                  the work.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  How We Review Tools
                </h2>
                <p>
                  We prioritize real-world use over marketing claims. When we
                  evaluate products, we look at build quality, ergonomics,
                  reliability, setup friction, and how well they fit into common
                  workflows like writing, meetings, travel, and focused
                  execution.
                </p>
                <p>
                  Our recommendations are based on independent research,
                  hands-on experience when possible, and clear criteria. We aim
                  to explain tradeoffs\u2014not just list features\u2014so you can
                  choose what matches your work style.
                </p>
              </section>

              <section>
                <h2 className="mt-8 text-xl font-semibold">
                  Who SaaSpertise Is For
                </h2>
                <p>
                  SaaSpertise is built for SaaS founders, consultants, and
                  remote professionals who care about leverage. If you value
                  calm, repeatable systems and a workspace that helps you stay
                  focused, you\u2019re in the right place.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

