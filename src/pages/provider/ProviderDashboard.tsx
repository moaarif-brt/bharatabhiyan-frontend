import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { useAuth } from "@/context/AuthContext";
import { fetchProviderProfile, fetchServiceCategories, fetchServiceTypes, fetchServiceAreas, submitProviderProfile } from "@/api/provider";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, User, Briefcase, FileText, X, Save, MapPin, Phone, Mail, Clock, CheckCircle, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import BasicInfoStep from "@/components/registration/BasicInfoStep";
import ServiceDetailsStep from "@/components/registration/ServiceDetailsStep";
import PricingStep from "@/components/registration/PricingStep";
import DocumentsStep from "@/components/registration/DocumentsStep";

const ProviderDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState("basic");

    // Edit State
    const [lookups, setLookups] = useState({
        cities: [{ id: "1", name: "Bhiwadi" }],
        categories: [] as any[],
        serviceTypes: [] as any[],
        serviceAreas: [] as any[],
    });

    const [basicInfo, setBasicInfo] = useState({
        whatsapp_number: "", business_name: "", experience: "", business_address: "", city_id: "", pincode: "",
    });

    const [serviceDetails, setServiceDetails] = useState({
        serviceCategory: "", experience: "", serviceAreas: "", serviceDescription: "", availability: [] as string[], workingHours: "",
    });

    const [serviceCosts, setServiceCosts] = useState<{ [serviceTypeId: string]: string }>({});

    const [documents, setDocuments] = useState({
        aadhaar_front: null as File | null, aadhaar_back: null as File | null,
        address_proof_type: "", address_proof: null as File | null,
        profile_photo: null as File | null, skill_certificate: [] as File[],
    });

    const [documentMeta, setDocumentMeta] = useState({
        aadhaar_front_url: "", aadhaar_back_url: "", address_proof_url: "", profile_photo_url: "", skill_certificate_url: "",
    });

    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
            return;
        }
        if (user) fetchProfile();
    }, [user, authLoading, navigate]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const res = await fetchProviderProfile();
            const data = res.data.data;
            setProfile(data);
            hydrateEditForms(data);
            hydrateLookups(String(data.city));
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const hydrateLookups = async (cityId?: string) => {
        try {
            const [catRes, typeRes, areaRes] = await Promise.all([
                fetchServiceCategories(),
                fetchServiceTypes(),
                cityId ? fetchServiceAreas(cityId) : Promise.resolve({ data: { data: [] } }),
            ]);
            setLookups(prev => ({
                ...prev,
                categories: catRes.data.data || [],
                serviceTypes: typeRes.data.data || [],
                serviceAreas: areaRes.data.data || [],
            }));
        } catch (e) { console.error(e); }
    };

    const hydrateEditForms = (data: any) => {
        setBasicInfo({
            whatsapp_number: data.whatsapp_number || "",
            business_name: data.business_name || "",
            experience: data.experience || "",
            business_address: data.business_address || "",
            city_id: String(data.city || ""),
            pincode: data.pincode || "",
        });

        setServiceDetails({
            serviceCategory: data.categories ? data.categories.map((c: any) => c.id).join(",") : "",
            experience: data.service_types_list ? data.service_types_list.map((st: any) => st.id).join(",") : "",
            serviceAreas: data.service_areas_list ? data.service_areas_list.map((a: any) => a.id).join(",") : "",
            serviceDescription: data.service_description || "",
            availability: data.availability || [],
            workingHours: data.working_hours || "",
        });

        const costsMap: { [key: string]: string } = {};
        (data.service_costs || []).forEach((cost: any) => {
            costsMap[String(cost.service_type_id)] = String(cost.price);
        });
        setServiceCosts(costsMap);

        setDocuments(prev => ({ ...prev, address_proof_type: data.address_proof_type || "" }));
        setDocumentMeta({
            aadhaar_front_url: data.aadhaar_front || "",
            aadhaar_back_url: data.aadhaar_back || "",
            address_proof_url: data.address_proof || "",
            profile_photo_url: data.profile_photo || "",
            skill_certificate_url: data.skill_certificate || "",
        });
    };

    const handleSave = async () => {
        try {
            const fd = new FormData();
            // Basic Info
            Object.entries(basicInfo).forEach(([k, v]) => fd.append(k, v));

            // Service Details
            serviceDetails.serviceCategory.split(",").filter(Boolean).forEach(id => fd.append("service_category", id));
            serviceDetails.experience.split(",").filter(Boolean).forEach(id => fd.append("service_type", id));
            serviceDetails.serviceAreas.split(",").filter(Boolean).forEach(id => fd.append("service_areas", id));
            fd.append("service_description", serviceDetails.serviceDescription);

            // Costs
            const costsArray = Object.entries(serviceCosts)
                .filter(([_, price]) => price && parseFloat(price) > 0)
                .map(([id, price]) => ({ service_type: parseInt(id), price: parseFloat(price) }));
            if (costsArray.length > 0) fd.append('service_costs', JSON.stringify(costsArray));

            // Documents (only append if new file selected)
            if (documents.aadhaar_front) fd.append("aadhaar_front", documents.aadhaar_front);
            if (documents.aadhaar_back) fd.append("aadhaar_back", documents.aadhaar_back);
            if (documents.address_proof) fd.append("address_proof", documents.address_proof);
            if (documents.profile_photo) fd.append("profile_photo", documents.profile_photo);
            documents.skill_certificate.forEach(f => fd.append("skill_certificate", f));
            fd.append("address_proof_type", documents.address_proof_type);

            await submitProviderProfile(fd);
            await fetchProfile();
            setIsEditing(false);
            toast({ title: "Profile Updated", description: "Your changes have been saved successfully." });
        } catch (error: any) {
            toast({
                title: "Update Failed",
                description: error.response?.data?.message || "Could not update profile",
                variant: "destructive"
            });
        }
    };

    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "VERIFIED":
            case "ACTIVE": return "bg-green-500";
            case "REJECTED": return "bg-red-500";
            default: return "bg-yellow-500";
        }
    };

    // Helper to group services by category
    const servicesByCategory = profile?.service_types_list?.reduce((acc: any, service: any) => {
        const cat = service.category__name || "Other";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(service);
        return acc;
    }, {}) || {};

    return (
        <PageLayout
            title="Provider Dashboard"
            subtitle="Manage your profile, services, and verification status"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Provider Dashboard" }]}
        >
            <div className="space-y-6 max-w-6xl mx-auto">
                {/* Header Card with Status */}
                <div className="bg-white rounded-xl border shadow-sm p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border">
                            {profile?.profile_photo ? (
                                <img src={profile.profile_photo} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-8 w-8 text-slate-400" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                {profile?.business_name || user?.name}
                            </h2>
                            <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Phone className="w-3 h-3" /> {profile?.whatsapp_number}
                                </span>
                                <span className="hidden sm:inline text-slate-300">|</span>
                                <Badge className={`${getStatusColor(profile?.verification_status)} hover:${getStatusColor(profile?.verification_status)} capitalize`}>
                                    {profile?.verification_status?.replace(/_/g, " ") || "DRAFT"}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                                    <X className="w-4 h-4 mr-2" /> Cancel
                                </Button>
                                <Button size="sm" onClick={handleSave}>
                                    <Save className="w-4 h-4 mr-2" /> Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </Button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                {isEditing ? (
                    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                        <div className="flex border-b bg-slate-50/50 overflow-x-auto">
                            {['basic', 'services', 'pricing', 'documents'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab
                                        ? 'border-primary text-primary bg-primary/5'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="p-6 md:p-8">
                            {activeTab === 'basic' && (
                                <BasicInfoStep
                                    data={basicInfo}
                                    onChange={(f, v) => setBasicInfo(p => ({ ...p, [f]: v }))}
                                />
                            )}
                            {activeTab === 'services' && (
                                <ServiceDetailsStep
                                    data={serviceDetails}
                                    onChange={(f, v) => setServiceDetails(p => ({ ...p, [f]: v }))}
                                    cityId={basicInfo.city_id}
                                    onLookupsReady={l => setLookups(p => ({ ...p, ...l }))}
                                />
                            )}
                            {activeTab === 'pricing' && (
                                <PricingStep
                                    selectedServiceTypes={serviceDetails.experience.split(',').filter(Boolean)}
                                    serviceCosts={serviceCosts}
                                    onChange={setServiceCosts}
                                    lookups={lookups}
                                />
                            )}
                            {activeTab === 'documents' && (
                                <DocumentsStep
                                    data={documents}
                                    documentMeta={documentMeta}
                                    onChange={(f, v) => setDocuments(p => ({ ...p, [f]: v }))}
                                    onClearMeta={(k) => setDocumentMeta(p => ({ ...p, [k]: "" }))}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Col: Services & Pricing */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Service Categories Card */}
                            <div className="bg-white border rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <Briefcase className="w-5 h-5 text-primary" />
                                    Services Offered
                                </h3>

                                {Object.entries(servicesByCategory).length > 0 ? (
                                    <div className="space-y-6">
                                        {Object.entries(servicesByCategory).map(([category, services]: [string, any]) => (
                                            <div key={category}>
                                                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">
                                                    <span className="w-2 h-2 rounded-full bg-primary/60"></span>
                                                    {category}
                                                </h4>
                                                <div className="flex flex-wrap gap-2 pl-4">
                                                    {services.map((s: any) => (
                                                        <Badge key={s.id} variant="secondary" className="font-normal text-slate-600 bg-slate-100 hover:bg-slate-200">
                                                            {s.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No services listed.</p>
                                )}

                                {profile?.service_description && (
                                    <div className="mt-6 pt-6 border-t">
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">About Services</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            {profile.service_description}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Pricing Card */}
                            <div className="bg-white border rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <FileText className="w-5 h-5 text-primary" />
                                    Service Pricing
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {profile?.service_costs?.map((cost: any) => (
                                        <div key={cost.service_type_id} className="flex justify-between items-center p-3 rounded-lg border bg-slate-50/50">
                                            <span className="text-sm font-medium text-slate-700">
                                                {cost.service_type__name}
                                            </span>
                                            <span className="text-sm font-bold text-primary">₹{cost.price}</span>
                                        </div>
                                    ))}
                                    {(!profile?.service_costs || profile.service_costs.length === 0) && (
                                        <p className="text-sm text-slate-500 italic">No pricing details available.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Col: Info & Areas */}
                        <div className="space-y-6">
                            {/* Basic Details */}
                            <div className="bg-white border rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <User className="w-5 h-5 text-primary" />
                                    Business Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">Location</p>
                                            <p className="text-sm text-slate-600">
                                                {profile?.business_address}<br />
                                                {profile?.city_name}, {profile?.state_name} - {profile?.pincode}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-4 h-4 text-slate-400 mt-1" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-700">Experience</p>
                                            <p className="text-sm text-slate-600">{profile?.experience?.replace(/_/g, " ")} Years</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Areas */}
                            <div className="bg-white border rounded-xl shadow-sm p-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Service Areas
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile?.service_areas_list?.map((area: any) => (
                                        <Badge key={area.id} variant="outline" className="border-slate-200 text-slate-600">
                                            {area.name}
                                        </Badge>
                                    ))}
                                    {(!profile?.service_areas_list || profile.service_areas_list.length === 0) && (
                                        <p className="text-sm text-slate-500 italic">No specific areas listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </PageLayout>
    );
};

export default ProviderDashboard;
