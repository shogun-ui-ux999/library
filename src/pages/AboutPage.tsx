import { PageHeader } from "../components/PageHeader";
import { About } from "../components/About";

export function AboutPage() {
  return (
    <main id="main">
      <PageHeader
        idx="A"
        kicker="About"
        titleSans="About"
        titleSerif="AR Smart Library."
        lede="A dedicated 24/7 reading and study space in Namkum, Ranchi."
        meta={
          <>
            <span>Est. 2024</span>
            <span>Namkum · Ranchi</span>
          </>
        }
      />
      <About />
    </main>
  );
}
