import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { BentoFacts } from "./components/BentoFacts";
import { About } from "./components/About";
import { TransparencyBoard } from "./components/TransparencyBoard";
import { Membership } from "./components/Membership";
import { TrustLedger } from "./components/TrustLedger";
import { Gallery } from "./components/Gallery";
import { Location } from "./components/Location";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <CustomCursor />
      <Hero />
      <main id="main">
        <BentoFacts />
        <About />
        <TransparencyBoard />
        <Membership />
        <TrustLedger />
        <Gallery />
        <Location />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
