import { PageHeader } from "../components/PageHeader";
import { Membership } from "../components/Membership";

export function MembershipPage() {
  return (
    <main id="main">
      <PageHeader
        idx="M"
        kicker="Membership · Access Pass"
        titleSans="Membership at"
        titleSerif="AR Smart Library."
        lede="Flexible study plans may be available for students. Contact AR Smart Library for current membership plans, availability and pricing."
        meta={
          <>
            <span>No published pricing</span>
            <span>Call to enquire</span>
          </>
        }
      />
      <Membership />
    </main>
  );
}
