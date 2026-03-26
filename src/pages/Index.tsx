import { Navbar, Footer } from "@/components/NavbarSection";
import { HeroSection } from "@/components/HeroSection";
import {
  TariffsSection,
  FleetSection,
  HowSection,
  AboutSection,
  ContactsSection,
} from "@/components/ContentSections";

export default function Index() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <TariffsSection />
      <FleetSection />
      <HowSection />
      <AboutSection />
      <ContactsSection />
      <Footer />
    </div>
  );
}
