/**
 * Company/SaaS Tool type definition
 * Used across the directory for displaying SaaS and AI companies
 */
export interface Company {
  id?: string;
  name: string;
  website: string;
  category: string;
  description: string;
  logo_url?: string | null;
  slug?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}
