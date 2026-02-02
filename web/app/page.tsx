import { SITE_URL } from "@/lib/site";
import HomeClient from "./HomeClient";

export const metadata = {
  alternates: { canonical: SITE_URL },
};

export default function Page() {
  return <HomeClient />;
}
