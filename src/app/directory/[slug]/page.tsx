import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Image as ImageIcon } from "lucide-react";

import { getSupabaseServerClient } from "@/lib/supabase";
import { toSlug } from "@/lib/slug";

export const dynamic = "force-dynamic";

const FALLBACK_LOGO = "https://saaspertise.com/default-logo.png";

function getClearbitLogo(website: string | null | undefined): string | null {
  if (!website) return null;
  try {
    const url = new URL(website);
    return `https://logo.clearbit.com/${url.hostname}`;
  } catch {
    return null;
  }
}

interface Company {
  name: string;
  website: string;
  category: string;
  description: string;
  logo_url?: string | null;
  created_at?: string | null;
}

interface PageParams {
  slug: Promise<string>;
}

async function loadCompany(slug: string): Promise<Company | null> {
  // Check if Supabase is configured before attempting to connect
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables not configured");
    return null;
  }

  try {
    const supabase = getSupabaseServerClient();

    // Decode the slug in case it was URL encoded
    const decodedSlug = decodeURIComponent(slug).trim();
    const normalizedSlug = decodedSlug.toLowerCase();

    // Strategy 1: Try to find by slug column (most efficient)
    const { data: slugData, error: slugError } = await supabase
      .from("companies")
      .select("name, website, category, description, logo_url, created_at, slug")
      .eq("slug", decodedSlug)
      .limit(1)
      .maybeSingle();

    if (slugData && !slugError) {
      return slugData;
    }

    // Strategy 2: Try case-insensitive slug match
    const { data: slugDataCaseInsensitive } = await supabase
      .from("companies")
      .select("name, website, category, description, logo_url, created_at, slug")
      .ilike("slug", decodedSlug)
      .limit(1)
      .maybeSingle();

    if (slugDataCaseInsensitive) {
      return slugDataCaseInsensitive;
    }

    // Strategy 3: Fetch all companies and match by generated slug from name
    // This is the most reliable fallback if slugs aren't in DB
    const { data: allData, error: allError } = await supabase
      .from("companies")
      .select("name, website, category, description, logo_url, created_at, slug")
      .limit(5000);

    if (allError) {
      console.error("Failed to load companies:", allError.message);
      return null;
    }

    if (!allData || allData.length === 0) {
      console.error("No companies found in database");
      return null;
    }

    // Try to match by generated slug from name (most reliable)
    const matchedByName = allData.find(
      (company) => toSlug(company.name).toLowerCase() === normalizedSlug
    );
    if (matchedByName) {
      return matchedByName;
    }

    // Strategy 4: Try other matching strategies
    const matched =
      // Exact slug match (from DB)
      allData.find((company) => company.slug?.toLowerCase().trim() === normalizedSlug) ??
      // Partial name match (slug might be part of name)
      allData.find((company) => 
        company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedSlug
      ) ??
      null;

    if (!matched) {
      console.error(`❌ Company not found for slug: "${slug}" (decoded: "${decodedSlug}", normalized: "${normalizedSlug}")`);
      console.error(`Total companies in DB: ${allData.length}`);
      if (allData.length > 0) {
        const samples = allData.slice(0, 10).map((c) => ({
          name: c.name,
          dbSlug: c.slug || "(null)",
          generatedSlug: toSlug(c.name),
          matches: toSlug(c.name).toLowerCase() === normalizedSlug,
        }));
        console.error("Sample companies:", JSON.stringify(samples, null, 2));
        console.error(`Looking for slug: "${normalizedSlug}"`);
      }
    }

    return matched;
  } catch (err) {
    console.error("Error loading company:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const slug = await params.slug;
  const company = await loadCompany(slug);
  if (!company) {
    return {};
  }

  return {
    title: `${company.name} | SaaSpertise Directory`,
    description: company.description,
    openGraph: {
      title: `${company.name} | SaaSpertise Directory`,
      description: company.description,
      url: company.website,
      images: company.logo_url ? [company.logo_url] : undefined,
    },
  };
}


export default async function CompanyPage({ params }: { params: PageParams }) {
  // In Next.js 15, params is a Promise and must be awaited
  const slugParam = await params.slug;
  // Decode the slug parameter in case it's URL encoded
  const slug = decodeURIComponent(slugParam);
  const company = await loadCompany(slug);
  if (!company) {
    console.error(`404: Company not found for slug: "${slug}" (original: "${slugParam}")`);
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: company.name,
            url: company.website,
            logo: company.logo_url || FALLBACK_LOGO,
          }),
        }}
      />

      <section className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <div className="w-32 h-32 rounded-xl bg-gray-50 flex items-center justify-center mb-6 overflow-hidden">
            {company.logo_url ? (
              <Image
                src={company.logo_url}
                alt={`${company.name} logo`}
                width={128}
                height={128}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  const clearbit = getClearbitLogo(company.website);
                  if (clearbit) {
                    target.src = clearbit;
                  } else {
                    target.style.display = "none";
                  }
                }}
              />
            ) : company.website ? (
              <Image
                src={getClearbitLogo(company.website) || FALLBACK_LOGO}
                alt={`${company.name} logo`}
                width={128}
                height={128}
                className="w-full h-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <ImageIcon className="w-12 h-12 text-gray-300" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
            <p className="text-sm text-blue-600">{company.category}</p>
          </div>
        </div>

        <p className="mb-6 text-gray-700">{company.description}</p>

        <Link
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Visit Website
        </Link>
      </section>
    </main>
  );
}
