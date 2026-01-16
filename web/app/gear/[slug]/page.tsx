import type { Metadata } from "next";
import fs from "node:fs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "node:path";

import { AffiliateLink } from "@/app/components/AffiliateLink";
import { Container } from "@/app/components/Container";
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

  return (
    <Container className="py-12">
      <Link
        href="/gear"
        className="mb-8 inline-block text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Back to all reviews
      </Link>
      <article className="grid grid-cols-1 gap-10 lg:grid-cols-2">
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

          <div className="mt-8">
            <AffiliateLink href={product.affiliateUrl}>
              Check price →
            </AffiliateLink>
          </div>
        </div>
      </article>

      {/* Pros / Cons */}
      <section className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
    </Container>
  );
}

