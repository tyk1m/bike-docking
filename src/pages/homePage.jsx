import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import HowItWorks from "../components/howItWorks";
import WhyBikeDock from "../components/whyBikeDock";
import CTA from "../components/CTA";
import Footer from "../components/footer";
import { useIntersectionReveal } from "../hooks/useIntersectionReveal";
function HomePage() {
  const pageRef = useIntersectionReveal();

  return (
    <div ref={pageRef}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhyBikeDock />
      <CTA />
      <Footer />
    </div>
  );
}
export default HomePage;
