import { PageHeader } from "../components/PageHeader";
import { TransparencyBoard } from "../components/TransparencyBoard";

export function FacilitiesPage() {
  return (
    <main id="main">
      <PageHeader
        idx="F"
        kicker="Facilities · Transparency Board"
        titleSans="Facilities &"
        titleSerif="Study Environment."
        lede="Every claim on this page is either confirmed with the library or openly marked as pending verification. Nothing here is padded with assumptions — that's the point."
        meta={
          <>
            <span>15 Confirmed</span>
            <span>1 Pending</span>
          </>
        }
      />
      <TransparencyBoard />
    </main>
  );
}
