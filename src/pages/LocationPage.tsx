import { PageHeader } from "../components/PageHeader";
import { Location } from "../components/Location";

export function LocationPage() {
  return (
    <main id="main">
      <PageHeader
        idx="L"
        kicker="Location · Directions"
        titleSans="Find"
        titleSerif="AR Smart Library."
        lede="Your 24/7 study destination at Sadabahar Chowk, Namkum — easy to find, easier to come back to."
        meta={
          <>
            <span>23.35° N / 85.33° E</span>
            <span>Sadabahar Chowk</span>
          </>
        }
      />
      <Location />
    </main>
  );
}
