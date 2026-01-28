import type { Metadata } from "next";
import fs from "node:fs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";

import { AffiliateLink } from "@/app/components/AffiliateLink";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Container } from "@/app/components/Container";
import { DisclosureBanner } from "@/app/components/DisclosureBanner";
import { products } from "@/app/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

// Disable on-demand generation - only serve pre-generated pages
export const dynamicParams = false;

// Ensure static generation
export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return {};

  const fallbackImage = "/next.svg";
  const requestedImage = (product.image || "").trim() || fallbackImage;
  const publicFilePath = path.join(
    process.cwd(),
    "public",
    requestedImage.replace(/^\//, ""),
  );
  const resolvedImage = fs.existsSync(publicFilePath)
    ? requestedImage
    : fallbackImage;

  return {
    title: `${product.name} Review – SaaSpertise`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} Review`,
      description: product.shortDescription,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound();

  const fallbackImage = "/next.svg";
  const requestedImage = (product.image || "").trim() || fallbackImage;
  const publicFilePath = path.join(
    process.cwd(),
    "public",
    requestedImage.replace(/^\//, ""),
  );
  const resolvedImage = fs.existsSync(publicFilePath)
    ? requestedImage
    : fallbackImage;
  const unoptimized = resolvedImage.endsWith(".svg");
  const categoryLabel =
    {
      desk: "Productivity Hardware",
      productivity: "Workflow & Productivity Tools",
      mobile: "Connectivity & Power",
      remote: "Remote & Mobile Work",
    }[product.category] ?? "Reviews";
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.slug !== product.slug)
    .slice(0, 3);

  return (
    <Container className="py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Reviews", href: "/gear" },
          { label: product.name, current: true },
        ]}
      />
      <DisclosureBanner />
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-10">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={resolvedImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
              unoptimized={unoptimized}
            />
          </div>

          {/* Content */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                Review
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {categoryLabel}
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {product.name}
            </h1>
            {product.priceRange && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Typical price: {product.priceRange}
              </p>
            )}
            <p className="mt-6 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
              {product.longDescription}
            </p>
          </div>

          {/* Quick specs */}
          <section className="rounded-2xl border border-black/[.08] bg-white p-6 dark:border-white/[.145] dark:bg-black">
            <h2 className="text-lg font-semibold">Quick specs</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 text-sm text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-zinc-500">Category</dt>
                <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                  {categoryLabel}
                </dd>
              </div>
              {product.priceRange && (
                <div>
                  <dt className="font-medium text-zinc-500">Price range</dt>
                  <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                    {product.priceRange}
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-medium text-zinc-500">Last updated</dt>
                <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                  {product.updatedAt}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-zinc-500">Best for</dt>
                <dd className="mt-1 text-zinc-900 dark:text-zinc-100">
                  Focused professional workflows
                </dd>
              </div>
            </dl>
          </section>

          {/* Pros / Cons */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold">What we like</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
                {product.pros.map((pro) => (
                  <li key={pro}>{pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold">What to consider</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700 dark:text-zinc-300">
                {product.cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <section className="pt-2">
              <h2 className="text-lg font-semibold">You might also like</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/gear/${item.slug}`}
                    className="rounded-2xl border border-black/[.08] bg-white p-4 text-sm text-zinc-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/[.145] dark:bg-black dark:text-zinc-300"
                  >
                    <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                      {item.name}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                      {item.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky CTA */}
        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-black">
            <div className="text-sm font-medium text-zinc-500">Review summary</div>
            <div className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {product.name}
            </div>
            {product.priceRange && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Typical price: {product.priceRange}
              </p>
            )}
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              Independently reviewed. Updated {product.updatedAt}.
            </p>
            <div className="mt-6">
              <AffiliateLink href={product.affiliateUrl}>
                Check current price →
              </AffiliateLink>
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}

