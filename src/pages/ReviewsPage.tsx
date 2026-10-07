import { PageHeader } from "../components/PageHeader";
import { TrustLedger } from "../components/TrustLedger";

export function ReviewsPage() {
  return (
    <main id="main">
      <PageHeader
        idx="R"
        kicker="Reviews · Trust Ledger"
        titleSans="A Highly Rated"
        titleSerif="Study Space in Namkum."
        lede="Ratings are pulled from public directories — a quiet signal of consistency, not a marketing claim. We don't host or invent reviews."
        meta={
          <>
            <span>Google 4.7 / 5</span>
            <span>Justdial 4.6 / 5</span>
          </>
        }
      />
      <TrustLedger />
    </main>
  );
}
