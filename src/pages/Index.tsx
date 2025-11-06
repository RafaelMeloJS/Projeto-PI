import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection" 
import DemoSection from "@/components/DemoSection"
import FeaturesSection from "@/components/FeaturesSection"
import PricingSection from "@/components/PricingSection"
import PlanComparison from "@/components/PlanComparison"
import AboutSection from "@/components/AboutSection"
import Footer from "@/components/Footer"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <PricingSection />
        <PlanComparison />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
