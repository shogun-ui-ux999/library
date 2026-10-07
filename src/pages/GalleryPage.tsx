import { PageHeader } from "../components/PageHeader";
import { Gallery } from "../components/Gallery";

export function GalleryPage() {
  return (
    <main id="main">
      <PageHeader
        idx="G"
        kicker="Gallery · The Concept Space"
        titleSans="The space,"
        titleSerif="in blueprint."
        lede="We'd rather show you an honest blueprint than a borrowed photograph. These plates mark what each corner of the library is for — real photography of the space is coming soon."
        meta={
          <>
            <span>6 Plates</span>
            <span>Photography soon</span>
          </>
        }
      />
      <Gallery />
    </main>
  );
}
