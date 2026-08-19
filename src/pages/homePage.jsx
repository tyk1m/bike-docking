import Navbar from "../components/navbar";
import Hero from "../components/hero";
import HowItWorks from "../components/howItWorks";
import WhyBikeDock from "../components/whyBikeDock";
import CTA from "../components/CTA";
import Footer from "../components/footer";
function HomePage() {
  return (
    <div>
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
