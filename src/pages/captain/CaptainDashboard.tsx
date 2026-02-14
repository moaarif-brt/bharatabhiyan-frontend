import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Users,
    MapPin,
    Upload,
    CheckCircle,
    Loader2,
    Phone,
    Briefcase,
    Eye,
    EyeOff
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchPendingProviders, verifyProvider } from "@/api/provider";
import { Badge } from "@/components/ui/badge";

const CaptainDashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [providers, setProviders] = useState<any[]>([]);
    const [stats, setStats] = useState({ count: 0 });

    const [isckptnModalOpen, setIsckptnModalOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<any>(null);
    const [verificationForm, setVerificationForm] = useState({
        captainCode: "",
        image: null as File | null
    });
    const [submitting, setSubmitting] = useState(false);
    const [showCaptainCode, setShowCaptainCode] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) navigate("/login");
        if (user) loadData();
    }, [user, authLoading]);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await fetchPendingProviders();
            if (res.data.success) {
                setProviders(res.data.data);
                setStats({ count: res.data.count });
            }
        } catch (error) {
            console.error("Failed to fetch pending providers", error);
            toast({ title: "Error", description: "Failed to load pending providers", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const handleProceed = (provider: any) => {
        setSelectedProvider(provider);
        setVerificationForm({ captainCode: "", image: null });
        setIsckptnModalOpen(true);
    };

    const handleSubmitVerification = async () => {
        if (!verificationForm.image) {
            toast({ title: "Image Required", description: "Please upload a verification document.", variant: "destructive" });
            return;
        }
        if (!verificationForm.captainCode) {
            toast({ title: "Code Required", description: "Please enter your captain code.", variant: "destructive" });
            return;
        }

        try {
            setSubmitting(true);
            const fd = new FormData();
            fd.append("profile_id", selectedProvider.id);
            fd.append("captain_code", verificationForm.captainCode);
            fd.append("image", verificationForm.image);

            await verifyProvider(fd);

            toast({ title: "Success", description: `Verification submitted for ${selectedProvider.business_name}` });
            setIsckptnModalOpen(false);
            loadData(); // Refresh list
        } catch (error: any) {
            toast({
                title: "Verification Failed",
                description: error.response?.data?.message || "Could not submit verification",
                variant: "destructive"
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <PageLayout
            title={`Welcome, Captain ${user?.name || ""}`}
            subtitle="Verify service providers in your zone"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Captain Dashboard" },
            ]}
            hideSidebar={true}
        >
            <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Pending Requests</p>
                            <p className="text-xl font-bold">{stats.count}</p>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                            <MapPin className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500">Zone</p>
                            <p className="text-xl font-bold">{user?.city || "Bhiwadi"}</p>
                        </div>
                    </div>
                    <div className="bg-white border rounded-xl p-4 flex items-center gap-4 shadow-sm relative group">
                        <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-slate-500">Captain Code</p>
                            <div className="flex items-center gap-2">
                                <p className="text-xl font-bold font-mono">
                                    {showCaptainCode ? (user?.captain_code || "N/A") : "••••••••••"}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setShowCaptainCode(!showCaptainCode)}
                                    className="text-slate-400 hover:text-primary transition-colors focus:outline-none"
                                >
                                    {showCaptainCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-primary"
                            onClick={() => {
                                if (user?.captain_code) {
                                    navigator.clipboard.writeText(user.captain_code);
                                    toast({ title: "Copied!", description: "Captain code copied to clipboard." });
                                }
                            }}
                        >
                            <span className="sr-only">Copy</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-copy"
                            >
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                        </Button>
                    </div>
                </div>

                {/* Verification List */}
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-bold">Pending Verifications</h2>
                            <p className="text-sm text-slate-500">Review provider details and proceed to verify.</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={loadData}>Refresh</Button>
                    </div>

                    {providers.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                            <p>No pending verifications found.</p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-slate-50 text-slate-500 font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Business Name</th>
                                            <th className="px-6 py-4">Provider Name</th>
                                            <th className="px-6 py-4">Services</th>
                                            <th className="px-6 py-4">Contact</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {providers.map((p) => (
                                            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-medium">
                                                    <div>
                                                        {p.business_name}
                                                        <div className="text-xs text-slate-500 font-normal">{p.business_address}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{p.user_name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {p.categories?.slice(0, 2).map((c: any) => (
                                                            <Badge key={c.id} variant="secondary" className="text-xs font-normal">
                                                                {c.name}
                                                            </Badge>
                                                        ))}
                                                        {p.categories?.length > 2 && <Badge variant="outline" className="text-xs">+{p.categories.length - 2}</Badge>}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">
                                                    <div className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3" /> {p.whatsapp_number}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button size="sm" onClick={() => handleProceed(p)}>
                                                        Verify
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile List */}
                            <div className="md:hidden divide-y divide-slate-100">
                                {providers.map((p) => (
                                    <div key={p.id} className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-slate-900">{p.business_name}</h3>
                                                <p className="text-sm text-slate-500">{p.user_name}</p>
                                            </div>
                                            <Badge variant="secondary">{p.city_name}</Badge>
                                        </div>

                                        <div className="flex gap-2 text-xs text-slate-600">
                                            <Briefcase className="w-3 h-3 mt-0.5" />
                                            <span className="truncate max-w-[200px]">
                                                {p.categories?.map((c: any) => c.name).join(", ")}
                                            </span>
                                        </div>

                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                                <Phone className="w-3 h-3" /> {p.whatsapp_number}
                                            </span>
                                            <Button size="sm" onClick={() => handleProceed(p)}>
                                                Verify
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Verification Modal */}
            <Dialog open={isckptnModalOpen} onOpenChange={setIsckptnModalOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Verify Provider</DialogTitle>
                        <DialogDescription>
                            Upload verification photo (e.g., selfie with provider) and enter your captain code for <strong>{selectedProvider?.business_name}</strong>.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="image-upload">Upload Proof Image</Label>
                            <div className="border-2 border-dashed rounded-lg p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer relative group">
                                <input
                                    type="file"
                                    id="image-upload"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={(e) => setVerificationForm({ ...verificationForm, image: e.target.files?.[0] || null })}
                                />
                                <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-primary transition-colors">
                                    <Upload className="w-8 h-8" />
                                    <span className="text-sm font-medium">
                                        {verificationForm.image ? verificationForm.image.name : "Click to upload image"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="captain-code">Captain Code</Label>
                            <Input
                                id="captain-code"
                                placeholder="Enter your unique code"
                                value={verificationForm.captainCode}
                                onChange={(e) => setVerificationForm({ ...verificationForm, captainCode: e.target.value })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsckptnModalOpen(false)} disabled={submitting}>Cancel</Button>
                        <Button onClick={handleSubmitVerification} disabled={submitting}>
                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Submit Verification
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </PageLayout >
    );
};

export default CaptainDashboard;
