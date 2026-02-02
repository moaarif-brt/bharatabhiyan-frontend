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
import SuccessStep from "@/components/registration/SuccessStep";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

import {
  saveProviderDraft,
  submitProviderProfile,
  fetchProviderProfile,
  fetchServiceCategories,
  fetchServiceTypes,
  fetchServiceAreas,
} from "@/api/provider";
import { buildDraftPayload } from "@/utils/buildDraftPayload";

const ServiceProviderRegistration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("yearly");
  const [profile, setProfile] = useState<any>(null);

  const [lookups, setLookups] = useState({
    cities: [{ id: "1", name: "Bhiwadi" }],
    categories: [] as any[],
    serviceTypes: [] as any[],
    serviceAreas: [] as any[],
  });

  const [basicInfo, setBasicInfo] = useState({
    whatsapp_number: "",
    business_name: "",
    experience: "",
    business_address: "",
    city_id: "",
    pincode: "",
  });

  const [serviceDetails, setServiceDetails] = useState({
    serviceCategory: "",        // category_id
    experience: "",             // service_type_id
    serviceAreas: "",           // comma separated ids
    serviceDescription: "",
    availability: [] as string[],
    workingHours: "",
  });



  const [documents, setDocuments] = useState({
    aadhaar_front: null as File | null,
    aadhaar_back: null as File | null,

    address_proof_type: "",
    address_proof: null as File | null,

    profile_photo: null as File | null,
    skill_certificate: [] as File[],
  });

  const [documentMeta, setDocumentMeta] = useState({
    aadhaar_front_url: "",
    aadhaar_back_url: "",
    address_proof_url: "",
    profile_photo_url: "",
    skill_certificate_url: "",
  });

  /* ---------------- BACKEND DRIVEN STEP RESOLUTION ---------------- */

  const resolveStepFromProfile = (data: any) => {
    if (!data) return 1;

    const hasAllRequired =
      data.whatsapp_number &&
      data.business_name &&
      data.experience &&
      data.business_address &&
      data.city &&
      data.pincode &&
      data.service_category &&
      data.service_type &&
      data.service_description &&
      data.service_areas_list?.length &&
      data.aadhaar_front &&
      data.aadhaar_back &&
      data.address_proof &&
      data.profile_photo;

    switch (data.verification_status) {
      case "DRAFT":
        return hasAllRequired ? 5 : 1;

      case "REJECTED":
        return 5;

      case "PENDING_VERIFICATION":
        return 5;

      case "VERIFIED":
        return 7; // Go to Success if verified

      case "ACTIVE":
        return 7;

      default:
        return 1;
    }
  };

  const hydrateLookups = async (cityId?: string) => {
    try {
      const [catRes, typeRes, areaRes] = await Promise.all([
        fetchServiceCategories(),
        fetchServiceTypes(),
        cityId ? fetchServiceAreas(cityId) : Promise.resolve({ data: { data: [] } }),
      ]);

      setLookups({
        cities: lookups.cities, // already there
        categories: catRes.data.data || [],
        serviceTypes: typeRes.data.data || [],
        serviceAreas: areaRes.data.data || [],
      });
    } catch {
      // silent fail (review page should never crash)
    }
  };


  const hydrateFormsFromProfile = (data: any) => {
    // STEP 1
    setBasicInfo({
      whatsapp_number: data.whatsapp_number || "",
      business_name: data.business_name || "",
      experience: data.experience || "",
      business_address: data.business_address || "",
      city_id: String(data.city || ""),
      pincode: data.pincode || "",
    });

    // STEP 2
    setServiceDetails({
      serviceCategory: String(data.service_category || ""),
      experience: String(data.service_type || ""),
      serviceAreas: data.service_areas_list
        ? data.service_areas_list.map((a: any) => a.id).join(",")
        : "",
      serviceDescription: data.service_description || "",
      availability: data.availability || [],
      workingHours: data.working_hours || "",
    });

    // STEP 3 (FILES — only metadata, NOT File objects)
    setDocuments((prev) => ({
      ...prev,
      address_proof_type: data.address_proof_type || "",
    }));

    setDocumentMeta({
      aadhaar_front_url: data.aadhaar_front || "",
      aadhaar_back_url: data.aadhaar_back || "",
      address_proof_url: data.address_proof || "",
      profile_photo_url: data.profile_photo || "",
      skill_certificate_url: data.skill_certificate || "",
    });


  };

  const handleClearDocumentMeta = (key: string) => {
    setDocumentMeta((p) => ({ ...p, [key]: "" }));
  };

  const hydrateProfile = async () => {
    try {
      const res = await fetchProviderProfile();
      const data = res.data.data;

      setProfile(data);
      hydrateFormsFromProfile(data);
      await hydrateLookups(String(data.city));

      const step = resolveStepFromProfile(data);
      setCurrentStep(step);
    } catch {
      // New user → stay on step 1
      setCurrentStep(1);
    }
  };
  const isDraft = profile?.verification_status === "DRAFT" ||
    profile?.verification_status === "PENDING_VERIFICATION";

  const isLocked = false; // Always editable as requested



  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login?redirect=/service-provider-registration");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      hydrateProfile();
    }
  }, [user]);

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
    // 🔍 STEP VALIDATION
    if (currentStep === 1) {
      if (!basicInfo.whatsapp_number || !basicInfo.business_name || !basicInfo.experience || !basicInfo.city_id || !basicInfo.pincode) {
        toast({
          title: "Missing Information",
          description: "Please fill in all mandatory fields in Basic Information.",
          variant: "destructive",
        });
        return;
      }
    }

    if (currentStep === 2) {
      const hasCategories = serviceDetails.serviceCategory.split(",").filter(Boolean).length > 0;
      const hasSubCategories = serviceDetails.experience.split(",").filter(Boolean).length > 0;

      if (!hasCategories || !hasSubCategories) {
        toast({
          title: "Selection Required",
          description: "Please select at least one Category and at least one Service Type to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const payload = buildDraftPayload({
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
      const fd = new FormData();

      // BASIC INFO
      fd.append("whatsapp_number", basicInfo.whatsapp_number);
      fd.append("business_name", basicInfo.business_name);
      fd.append("experience", basicInfo.experience);
      fd.append("business_address", basicInfo.business_address);
      fd.append("city", basicInfo.city_id);
      fd.append("pincode", basicInfo.pincode);

      // SERVICE
      serviceDetails.serviceCategory.split(",").filter(Boolean).forEach((catId) => {
        fd.append("service_category", catId);
      });
      serviceDetails.experience.split(",").filter(Boolean).forEach((typeId) => {
        fd.append("service_type", typeId);
      });
      fd.append("service_description", serviceDetails.serviceDescription);
      serviceDetails.serviceAreas.split(",").filter(Boolean).forEach((areaId) => {
        fd.append("service_areas", areaId);
      });


      // DOCUMENTS
      if (documents.aadhaar_front)
        fd.append("aadhaar_front", documents.aadhaar_front);

      if (documents.aadhaar_back)
        fd.append("aadhaar_back", documents.aadhaar_back);

      fd.append("address_proof_type", documents.address_proof_type);

      if (documents.address_proof)
        fd.append("address_proof", documents.address_proof);

      if (documents.profile_photo)
        fd.append("profile_photo", documents.profile_photo);

      documents.skill_certificate.forEach((f) =>
        fd.append("skill_certificate", f)
      );

      await submitProviderProfile(fd);
      await hydrateProfile();

    } catch (err: any) {
      toast({
        title: "Submission failed",
        description: err.response?.data?.message || "Server error",
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
      subtitle: "In-person KYC & Payment",
      completed: profile?.verification_status === "VERIFIED" || profile?.verification_status === "ACTIVE",
      current: currentStep === 5,
    },
  ].filter(step => {
    // Hide Captain Verification (Step 5) if already verified or active
    if (step.number === 5 && (profile?.verification_status === "VERIFIED" || profile?.verification_status === "ACTIVE")) {
      return false;
    }
    return true;
  });

  /* ---------------- RENDER ---------------- */

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {user && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <RegistrationStepsSidebar
                  steps={steps}
                  onStepClick={(step) => {
                    if (step < currentStep || (profile && step <= resolveStepFromProfile(profile))) {
                      setCurrentStep(step);
                    }
                  }}
                />
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card border rounded-lg p-6">
                  {currentStep === 1 && !isLocked && (
                    <BasicInfoStep
                      data={basicInfo}
                      onChange={handleBasicInfoChange}
                    />
                  )}

                  {currentStep === 2 && !isLocked && (
                    <ServiceDetailsStep
                      data={serviceDetails}
                      onChange={handleServiceDetailsChange}
                      cityId={basicInfo.city_id}
                      onLookupsReady={(l) =>
                        setLookups((p) => ({ ...p, ...l }))
                      }
                    />
                  )}

                  {currentStep === 3 && !isLocked && (
                    <DocumentsStep
                      data={documents}
                      documentMeta={documentMeta}
                      onChange={handleDocumentsChange}
                      onClearMeta={handleClearDocumentMeta}
                    />
                  )}

                  {currentStep === 4 && (
                    <ReviewStep
                      basicInfo={basicInfo}
                      serviceDetails={serviceDetails}
                      documents={documents}
                      documentMeta={documentMeta}
                      lookups={lookups}
                      readOnly={isDraft}
                      termsAccepted={termsAccepted}
                      onTermsChange={setTermsAccepted}
                    />
                  )}

                  {currentStep === 5 && profile && (
                    <CaptainVerificationStep
                      profile={profile}
                      onViewApplication={() => setCurrentStep(4)}
                      onResubmit={() => setCurrentStep(1)}
                    />
                  )}

                  {currentStep === 7 && <SuccessStep profile={profile} />}

                  {currentStep <= 4 && !isDraft && (
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

                  {currentStep === 4 && isDraft && (
                    <div className="flex justify-end mt-8 pt-6 border-t">
                      <Button onClick={() => setCurrentStep(5)}>
                        Check Application Status
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          )}
        </div>
      </main>



      <Footer />
    </div>
  );
};

export default ServiceProviderRegistration;
