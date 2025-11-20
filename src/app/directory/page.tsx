import Link from "next/link";

import { getSupabaseServerClient } from "@/lib/supabase";
import { toSlug } from "@/lib/slug";
import { CompanyCard } from "@/components/CompanyCard";

const PAGE_SIZE = 50;

interface Company {
  name: string;
  website: string;
  category: string;
  description: string;
  logo_url?: string | null;
}

interface DirectoryPageProps {
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
}

function parsePage(value?: string): number {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

async function fetchCompanies(search?: string, category?: string, page = 1) {
  // Check if Supabase is configured before attempting to connect
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase environment variables not configured");
    return { companies: [] as Company[], total: 0 };
  }

  try {
    const supabase = getSupabaseServerClient();

    const offset = (page - 1) * PAGE_SIZE;
    const rangeEnd = offset + PAGE_SIZE - 1;

    let query = supabase
      .from("companies")
      .select("name, website, category, description, logo_url, slug", {
        count: "exact",
        head: false,
      })
      .order("name");

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }
    if (category) {
      query = query.eq("category", category);
    }

    const { data, count, error } = await query.range(offset, rangeEnd);
    if (error) {
      console.error("Supabase query error", error);
      return { companies: [] as Company[], total: 0 };
    }

    return {
      companies: (data ?? []) as Company[],
      total: count ?? 0,
    };
  } catch (err) {
    console.error("Supabase fetch failed", err);
    return { companies: [] as Company[], total: 0 };
  }
}

export default async function DirectoryPage({
  searchParams,
}: DirectoryPageProps) {
  const search = (searchParams.search ?? "").trim() || undefined;
  const category = (searchParams.category ?? "").trim() || undefined;
  const page = parsePage(searchParams.page);

  const { companies, total } = await fetchCompanies(search, category, page);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;

  const fallbackLogo = "https://saaspertise.com/default-logo.png";

  const buildQuery = (params: Record<string, string | number | undefined>) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", String(params.search));
    if (params.category) query.set("category", String(params.category));
    if (params.page) query.set("page", String(params.page));
    return query.toString();
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <form className="grid gap-4 md:grid-cols-3" method="get">
          <div className="md:col-span-2">
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              id="search"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Search by company name"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="search"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={category ?? ""}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All categories</option>
              <option value="AI Tool">AI Tool</option>
              <option value="AI Agent">AI Agent</option>
              <option value="AI Startup">AI Startup</option>
              <option value="SaaS Company">SaaS Company</option>
              <option value="Tech Company">Tech Company</option>
              <option value="Free Developer Resource">
                Free Developer Resource
              </option>
              <option value="YC Company">YC Company</option>
              <option value="YC Startup">YC Startup</option>
            </select>
          </div>

          <div className="md:col-span-3 flex flex-wrap gap-3 text-sm text-gray-600">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Apply filters
            </button>

            {(search || category) && (
              <Link
                href="/directory"
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Clear filters
              </Link>
            )}
          </div>
        </form>
      </section>

      <section className="mb-6 text-sm text-gray-600">
        Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)}{" "}
        of {total.toLocaleString()} companies
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={`${company.name}-${company.website}`}
            name={company.name}
            description={company.description}
            category={company.category}
            logoUrl={company.logo_url}
            website={company.website}
            href={`/directory/${(company.slug && company.slug.trim()) ? company.slug : toSlug(company.name)}`}
          />
        ))}
      </section>

      <nav className="mt-8 flex items-center justify-between text-sm">
        <div>
          {prevPage && (
            <Link
              href={`/directory?${buildQuery({ search, category, page: prevPage })}`}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              ← Previous
            </Link>
          )}
        </div>
        <div className="text-gray-600">
          Page {page} of {totalPages}
      </div>
        <div>
          {nextPage && (
            <Link
              href={`/directory?${buildQuery({ search, category, page: nextPage })}`}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 hover:bg-gray-50"
            >
              Next →
            </Link>
          )}
    </div>
      </nav>
    </main>
  );
}
