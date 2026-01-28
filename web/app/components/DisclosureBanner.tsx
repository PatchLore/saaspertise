import Link from "next/link";

type DisclosureBannerProps = {
  text?: string;
  href?: string;
};

export function DisclosureBanner({
  text = "Some links on this page are affiliate links. If you purchase, we may earn a small commission at no extra cost to you.",
  href = "/disclosure",
}: DisclosureBannerProps) {
  return (
    <div className="mt-6 rounded-2xl border border-black/[.08] bg-zinc-50 px-4 py-3 text-sm text-zinc-600 shadow-sm dark:border-white/[.12] dark:bg-white/5 dark:text-zinc-300">
      <span className="mr-2" aria-hidden>
        ℹ️
      </span>
      {text}{" "}
      <Link href={href} className="font-medium text-zinc-900 hover:underline dark:text-zinc-50">
        Learn more
      </Link>
    </div>
  );
}
