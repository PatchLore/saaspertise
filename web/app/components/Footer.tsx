import Link from "next/link";

import { Container } from "./Container";

export function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-black/[.08] bg-white/80 py-12 text-sm text-zinc-600 backdrop-blur dark:border-white/[.12] dark:bg-black/40 dark:text-zinc-400"
    >
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Reviews
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/gear" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  All Gear
                </Link>
              </li>
              <li>
                <Link href="/gear" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Productivity Hardware
                </Link>
              </li>
              <li>
                <Link href="/gear" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Workflow Tools
                </Link>
              </li>
              <li>
                <Link href="/gear" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Connectivity
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Compare
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/comparisons"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  All Comparisons
                </Link>
              </li>
              <li>
                <Link
                  href="/comparisons"
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  Landing Page Builders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Learn
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/courses" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Company
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/[.08] pt-6 text-xs text-zinc-500 dark:border-white/[.12] dark:text-zinc-400 sm:flex-row">
          <span>© 2026 SaaSpertise. All rights reserved.</span>
          <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">
            Suggest a tool
          </Link>
        </div>
      </Container>
    </footer>
  );
}
