import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import RegistrationStepsSidebar from "@/components/registration/RegistrationStepsSidebar";
import BasicInfoStep from "@/components/registration/BasicInfoStep";
import ServiceDetailsStep from "@/components/registration/ServiceDetailsStep";
import DocumentsStep from "@/components/registration/DocumentsStep";
import ReviewStep from "@/components/registration/ReviewStep";
import CaptainVerificationStep from "@/components/registration/CaptainVerificationStep";
import PaymentStep from "@/components/registration/PaymentStep";
import SuccessStep from "@/components/registration/SuccessStep";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import {
  saveProviderDraft,
  submitProviderProfile,
  fetchProviderProfile,
} from "@/api/provider";
import { buildDraftPayload } from "@/utils/buildDraftPayload";

const ServiceProviderRegistration = () => {
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [profile, setProfile] = useState<any>(null);

  const [basicInfo, setBasicInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [serviceDetails, setServiceDetails] = useState({
    serviceCategory: "",
    serviceDescription: "",
    experience: "",
    availability: [] as string[],
    workingHours: "",
    serviceAreas: "",
  });

  const [documents, setDocuments] = useState({
    idProof: null as File | null,
    addressProof: null as File | null,
    businessLicense: null as File | null,
    certifications: [] as File[],
  });

  /* ---------------- BACKEND DRIVEN STEP RESOLUTION ---------------- */

  const resolveStepFromProfile = (data: any) => {
    switch (data.verification_status) {
      case "DRAFT":
      case "REJECTED":
        return 1;
      case "PENDING_VERIFICATION":
        return 5;
      case "VERIFIED":
        return data.is_paid ? 7 : 6;
      case "ACTIVE":
        return 7;
      default:
        return 1;
    }
  };

  const hydrateProfile = async () => {
    try {
      const res = await fetchProviderProfile();
      const data = res.data.data;
      setProfile(data);
      setCurrentStep(resolveStepFromProfile(data));
    } catch {
      // user has not started registration
    }
  };

  useEffect(() => {
    hydrateProfile();
  }, []);

  /* ---------------- FORM HANDLERS ---------------- */

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo((p) => ({ ...p, [field]: value }));
  };

  const handleServiceDetailsChange = (
    field: string,
    value: string | string[]
  ) => {
    setServiceDetails((p) => ({ ...p, [field]: value }));
  };

  const handleDocumentsChange = (
    field: string,
    value: File | File[] | null
  ) => {
    setDocuments((p) => ({ ...p, [field]: value }));
  };

  /* ---------------- DRAFT SAVE ---------------- */

  const handleNext = async () => {
    try {
      const payload = buildDraftPayload({
        whatsapp_number: basicInfo.phone,
        business_name: basicInfo.businessName,
        business_address: basicInfo.address,

        service_category: serviceDetails.serviceCategory,
        service_description: serviceDetails.serviceDescription,
        experience: serviceDetails.experience,
        service_areas: serviceDetails.serviceAreas,

        ...documents,
      });

      setCurrentStep((s) => s + 1);

    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err.response?.data?.message || "Unable to save draft",
        variant: "destructive",
      });
    }
  };


  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  /* ---------------- FINAL SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast({
        title: "Action required",
        description: "Please accept terms & conditions",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = buildDraftPayload({
        terms_accepted: true, // 🔑 REQUIRED

        whatsapp_number: basicInfo.phone,
        business_name: basicInfo.businessName,
        business_address: basicInfo.address,
        pincode: basicInfo.pincode,

        service_category: serviceDetails.serviceCategory,
        service_description: serviceDetails.serviceDescription,
        experience: serviceDetails.experience,
        service_areas: serviceDetails.serviceAreas,

        ...documents,
      });

      await submitProviderProfile(payload);
      await hydrateProfile();

    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.response?.data?.message,
        variant: "destructive",
      });
    }
  };



  /* ---------------- PAYMENT ---------------- */

  const handlePaymentComplete = async () => {
    await hydrateProfile(); // backend webhook updates status
  };

  /* ---------------- SIDEBAR STEPS ---------------- */

  const steps = [
    {
      number: 1,
      title: "Basic Information",
      subtitle: "Personal & contact details",
      completed: currentStep > 1,
      current: currentStep === 1,
    },
    {
      number: 2,
      title: "Service Details",
      subtitle: "Category & experience",
      completed: currentStep > 2,
      current: currentStep === 2,
    },
    {
      number: 3,
      title: "Documents",
      subtitle: "ID & address proof",
      completed: currentStep > 3,
      current: currentStep === 3,
    },
    {
      number: 4,
      title: "Review & Submit",
      subtitle: "Verify your details",
      completed: currentStep > 4,
      current: currentStep === 4,
    },
    {
      number: 5,
      title: "Captain Verification",
      subtitle: "In-person KYC",
      completed: profile?.verification_status === "VERIFIED",
      current: currentStep === 5,
    },
    {
      number: 6,
      title: "Payment",
      subtitle: "Activate listing",
      completed: profile?.is_paid,
      current: currentStep === 6,
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <RegistrationStepsSidebar steps={steps} />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg p-6">
              {currentStep === 1 && (
                <BasicInfoStep
                  data={basicInfo}
                  onChange={handleBasicInfoChange}
                />
              )}

              {currentStep === 2 && (
                <ServiceDetailsStep
                  data={serviceDetails}
                  onChange={handleServiceDetailsChange}
                />
              )}

              {currentStep === 3 && (
                <DocumentsStep
                  data={documents}
                  onChange={handleDocumentsChange}
                />
              )}

              {currentStep === 4 && (
                <ReviewStep
                  basicInfo={basicInfo}
                  serviceDetails={serviceDetails}
                  documents={documents}
                  termsAccepted={termsAccepted}
                  onTermsChange={setTermsAccepted}
                />
              )}

              {currentStep === 5 && (
                <CaptainVerificationStep
                  status={profile?.verification_status}
                />
              )}

              {currentStep === 6 && (
                <PaymentStep
                  selectedPlan={selectedPlan}
                  onComplete={handlePaymentComplete}
                />
              )}

              {currentStep === 7 && <SuccessStep selectedPlan={selectedPlan} />}

              {currentStep <= 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button onClick={handleNext}>Next</Button>
                  ) : (
                    <Button onClick={handleSubmit}>
                      Submit Registration
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceProviderRegistration;
