import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Payment from "./pages/Payment";
import HowToRegister from "./pages/HowToRegister";
import ForgotPassword from "./pages/ForgotPassword";
import OTPHelp from "./pages/OTPHelp";
import PaymentHelp from "./pages/PaymentHelp";
import FAQs from "./pages/FAQs";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HelpCenter from "./pages/HelpCenter";
import ServiceProviderRegistration from "./pages/ServiceProviderRegistration";
import Services from "./pages/Services";
import AllServices from "./pages/services/AllServices";
import HomeServices from "./pages/services/HomeServices";
import GovernmentServices from "./pages/services/GovernmentServices";
import GovernmentServiceDetails from "./pages/services/GovernmentServiceDetails";
import EmergencyServices from "./pages/services/EmergencyServices";
import HomeServiceTypes from "./pages/services/HomeServiceTypes";
import ServiceProviderListing from "./pages/services/ServiceProviderListing";
import ServiceProviderProfile from "./pages/services/ServiceProviderProfile";
import PostPaymentChoice from "./pages/PostPaymentChoice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
    mutations: {
      retry: false,
    },
  },
});


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<PostPaymentChoice />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/help/how-to-register" element={<HowToRegister />} />
            <Route path="/help/forgot-password" element={<ForgotPassword />} />
            <Route path="/help/otp-not-received" element={<OTPHelp />} />
            <Route path="/help/payment-issues" element={<PaymentHelp />} />
            <Route path="/help/faqs" element={<FAQs />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/service-provider-registration" element={<ServiceProviderRegistration />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/all" element={<AllServices />} />
            <Route path="/services/home/category/:categoryId" element={<HomeServiceTypes />} />
            <Route path="/services/home" element={<HomeServices />} />
            <Route path="/services/home/:serviceType" element={<ServiceProviderListing />} />
            <Route path="/services/home/category/:categoryId/service/:serviceType" element={<ServiceProviderListing />} />
            <Route path="/services/home/:serviceType/provider/:providerId" element={<ServiceProviderProfile />} />
            <Route path="/services/government" element={<GovernmentServices />} />
            <Route path="/services/government/:id" element={<GovernmentServiceDetails />} />
            <Route path="/services/emergency" element={<EmergencyServices />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
