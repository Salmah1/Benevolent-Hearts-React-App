import Hero from "../components/Hero";
import Campaign from "../components/Campaign";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Contact from "../components/Contact";

function HomeScreen() {
  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* SERVICES SECTION */}
      <Services />

      {/* WHY CHOOSE US SECTION */}
      <WhyUs />

      {/* COMMUNITY IMPACT SECTION */}
      <Campaign />

      {/* CONTACT SECTION */}
      <Contact />
    </>
  );
}

export default HomeScreen;
