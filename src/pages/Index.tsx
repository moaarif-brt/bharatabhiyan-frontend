import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";

import HeroSection from "@/components/ui/home/HeroSection";
import TrustBadges from "@/components/ui/home/TrustBadges";
import QuickLinks from "@/components/ui/home/QuickLinks";
import ServiceCategories from "@/components/ui/home/ServiceCategories";
import HowItWorks from "@/components/ui/home/HowItWorks";
import GovernmentSchemes from "@/components/ui/home/GovernmentSchemes";
import Testimonials from "@/components/ui/home/Testimonials";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSection user={user} />
      <TrustBadges />
      <QuickLinks />
      <ServiceCategories />
      <HowItWorks />
      {/* <GovernmentSchemes /> */}
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
