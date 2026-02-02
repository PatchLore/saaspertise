"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        We encountered an error. Please try again or return to the homepage.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
