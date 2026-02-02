import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        404 — Page not found
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Go home
      </Link>
    </div>
  );
}
