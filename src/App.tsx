import { useEffect } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { FacilitiesPage } from "./pages/FacilitiesPage";
import { MembershipPage } from "./pages/MembershipPage";
import { GalleryPage } from "./pages/GalleryPage";
import { ReviewsPage } from "./pages/ReviewsPage";
import { LocationPage } from "./pages/LocationPage";
import { ContactPage } from "./pages/ContactPage";
import { Link, useRoute } from "./router";

const DEFAULT_TITLE = "AR Smart Library | 24/7 Library in Namkum, Ranchi";

const PAGE_TITLES: Record<string, string> = {
  "/": DEFAULT_TITLE,
  "/about": "About AR Smart Library | 24/7 Study Space in Namkum",
  "/facilities": "Facilities | AR Smart Library Namkum",
  "/membership": "Membership | AR Smart Library Namkum",
  "/gallery": "Gallery | AR Smart Library Namkum",
  "/reviews": "Reviews | AR Smart Library Namkum",
  "/location": "Location & Directions | AR Smart Library Namkum",
  "/contact": "Contact AR Smart Library | 24/7 Library in Namkum",
};

function NotFound() {
  return (
    <main id="main" className="section">
      <div className="container">
        <p className="kicker">
          <span className="k-idx">404</span> Off the map
        </p>
        <h1 className="h2">
          This page isn&rsquo;t <span className="accent serif">in the library.</span>
        </h1>
        <p className="section-lede">
          The page you&rsquo;re looking for doesn&rsquo;t exist — but the library
          itself is open 24 hours, 7 days a week.
        </p>
        <div className="nf-actions">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

function renderPage(path: string) {
  switch (path) {
    case "/":
      return <HomePage />;
    case "/about":
      return <AboutPage />;
    case "/facilities":
      return <FacilitiesPage />;
    case "/membership":
      return <MembershipPage />;
    case "/gallery":
      return <GalleryPage />;
    case "/reviews":
      return <ReviewsPage />;
    case "/location":
      return <LocationPage />;
    case "/contact":
      return <ContactPage />;
    default:
      return <NotFound />;
  }
}

export default function App() {
  const path = useRoute();

  // Route change: reset scroll + update the document title per page.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES[path] ?? DEFAULT_TITLE;
  }, [path]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <CustomCursor />
      <NavBar />
      {/* key={path} remounts the view so the page transition plays */}
      <div key={path} className="page-view">
        {renderPage(path)}
      </div>
      <Footer />
    </>
  );
}
