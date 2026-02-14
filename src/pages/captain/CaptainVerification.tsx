import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { submitCaptainVerification } from "@/services/captain.service";

const CaptainVerification = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState<any>(null);

    const [captainCode, setCaptainCode] = useState("");
    const [phone, setPhone] = useState("");
    const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
    const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);

    useEffect(() => {
        // Retrieve captain code from session storage
        const storedCode = sessionStorage.getItem("captain_code");
        if (storedCode) {
            setCaptainCode(storedCode);
        } else {
            toast({
                title: "Error",
                description: "Captain code not found. Please login again.",
                variant: "destructive",
            });
            navigate("/login");
        }
    }, [navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!phone || !aadhaarFront || !aadhaarBack || !captainCode) {
            toast({
                title: "Missing Information",
                description: "Please fill all fields and upload documents.",
                variant: "destructive",
            });
            return;
        }

        try {
            setLoading(true);
            const res = await submitCaptainVerification({
                phone,
                aadhaar_front: aadhaarFront,
                aadhaar_back: aadhaarBack,
                captain_code: captainCode,
            });

            setSuccessData(res.data);
            toast({
                title: "Verification Submitted",
                description: "Your documents have been submitted for verification.",
                variant: "default",
            });
        } catch (error: any) {
            console.error("Verification error:", error);
            toast({
                title: "Submission Failed",
                description: error?.response?.data?.message || "Failed to submit documents.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    if (successData) {
        return (
            <PageLayout
                title="Verification Status"
                subtitle="Your application is under review"
                breadcrumbs={[{ label: "Home", href: "/" }, { label: "Verification Status" }]}
            >
                <div className="max-w-md mx-auto mt-10 p-6 bg-card border border-border rounded-lg shadow-sm text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">Verification Pending</h2>
                    <p className="text-muted-foreground mb-6">
                        Thank you, <span className="font-semibold text-foreground">{successData.captain_name}</span>.
                        Your documents have been submitted successfully.
                    </p>

                    <div className="bg-muted/50 p-4 rounded-md text-left text-sm space-y-2 mb-6">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Captain Code:</span>
                            <span className="font-medium">{successData.captain_code}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <span className="font-medium text-yellow-600 dark:text-yellow-400">{successData.verification_status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Submitted:</span>
                            <span className="font-medium">{new Date(successData.submitted_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                        Please wait for admin verification. You will be notified once approved.
                    </p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout
            title="Captain Verification"
            subtitle="Complete your profile to start accepting rides"
            breadcrumbs={[{ label: "Home", href: "/" }, { label: "Verification" }]}
        >
            <div className="max-w-xl mx-auto bg-card border border-border rounded-lg p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Captain Code Display */}
                    <div className="bg-muted/30 p-4 rounded-md flex items-center gap-3 border border-border/50">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <AlertCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Captain Code</p>
                            <p className="text-lg font-mono font-bold text-foreground">{captainCode || "Loading..."}</p>
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your 10-digit mobile number"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            maxLength={10}
                            required
                        />
                    </div>

                    {/* Document Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Aadhaar Card (Front)</label>
                            <div className="border-2 border-dashed border-input hover:border-primary/50 transition-colors rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-muted/5 relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setAadhaarFront)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="w-8 h-8 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground text-center">
                                    {aadhaarFront ? aadhaarFront.name : "Click to upload Front Side"}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Aadhaar Card (Back)</label>
                            <div className="border-2 border-dashed border-input hover:border-primary/50 transition-colors rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer bg-muted/5 relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, setAadhaarBack)}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="w-8 h-8 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground text-center">
                                    {aadhaarBack ? aadhaarBack.name : "Click to upload Back Side"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting Documents...
                            </>
                        ) : (
                            "Submit Verification"
                        )}
                    </button>
                </form>
            </div>
        </PageLayout>
    );
};

export default CaptainVerification;
