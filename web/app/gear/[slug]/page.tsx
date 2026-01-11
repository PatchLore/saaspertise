import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AffiliateLink } from "@/app/components/AffiliateLink";
import { Container } from "@/app/components/Container";
import { products } from "@/app/data/products";

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) return {};

  return {
    title: `${product.name} Review – SaaSpertise`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} Review`,
      description: product.shortDescription,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) return notFound();

  return (
    <Container className="py-12">
      <article className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
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

