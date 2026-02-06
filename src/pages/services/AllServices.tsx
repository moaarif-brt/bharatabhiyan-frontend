import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Landmark, FileText, CreditCard, Users, Building2, Scale } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchServiceCategories } from "@/api/provider";
import { fetchGovernmentServices } from "@/api/government";
import { categoryIconMap } from "@/utils/categoryIcons";

const AllServices = () => {
    const [homeServices, setHomeServices] = useState<any[]>([]);
    const [govServices, setGovServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loadAllServices = async () => {
            try {
                setLoading(true);
                setError(false);

                const [homeRes, govRes] = await Promise.all([
                    fetchServiceCategories(),
                    fetchGovernmentServices(),
                ]);

                setHomeServices(homeRes.data.data || []);
                setGovServices(govRes.data || []);
            } catch (err) {
                console.error("Failed to load services", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadAllServices();
    }, []);

    const getGovIcon = (name: string) => {
        const normalized = name.toUpperCase();
        if (normalized.includes("DOCUMENT")) return FileText;
        if (normalized.includes("FINANCIAL")) return CreditCard;
        if (normalized.includes("HOUSING")) return Building2;
        if (normalized.includes("LEGAL")) return Scale;
        if (normalized.includes("EDUCATION")) return FileText;
        if (normalized.includes("HEALTH")) return Users;
        if (normalized.includes("EMPLOYMENT") || normalized.includes("BUSINESS")) return Users;
        if (normalized.includes("TRANSPORT")) return Building2;
        return Landmark;
    };

    const handleRetry = () => {
        window.location.reload();
    };

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-red-500 mb-2">Failed to load services</h2>
                        <p className="text-muted-foreground mb-4">Please try again later.</p>
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                        >
                            Retry
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1">
                {/* Page Header */}
                <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl font-bold text-foreground mb-3">All Services</h1>
                        <p className="text-lg text-muted-foreground">
                            Explore our complete range of home services and government schemes
                        </p>
                    </div>
                </section>

                {/* Home Services Section */}
                <section className="py-16 px-4 bg-background">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Home className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Home Services</h2>
                                <p className="text-muted-foreground">
                                    Find verified professionals for all your home needs
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {homeServices.map((service) => {
                                    const Icon = categoryIconMap[service.icon] || categoryIconMap.Wrench;
                                    return (
                                        <div
                                            key={service.id}
                                            className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                <Icon className="w-7 h-7 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-lg text-foreground mb-2">
                                                {service.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {service.description || "Verified professionals available for this service."}
                                            </p>
                                            <Link
                                                to={`/services/home/category/${service.id}`}
                                                className="text-primary font-medium hover:text-primary/80 inline-flex items-center gap-1 text-sm transition-colors"
                                            >
                                                View Services <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                {/* Government Services Section */}
                <section className="py-16 px-4 bg-muted/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                                <Landmark className="w-6 h-6 text-secondary" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-foreground">Government Services</h2>
                                <p className="text-muted-foreground">
                                    Access government schemes and services easily
                                </p>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} className="h-48 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {govServices.map((service) => {
                                    const Icon = getGovIcon(service.name);
                                    return (
                                        <div
                                            key={service.id}
                                            className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                                        >
                                            <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                                                <Icon className="w-7 h-7 text-secondary" />
                                            </div>
                                            <h3 className="font-semibold text-lg text-foreground mb-2">
                                                {service.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {service.description}
                                            </p>
                                            <Link
                                                to={`/services/government/${service.id}`}
                                                className="text-secondary font-medium hover:text-secondary/80 inline-flex items-center gap-1 text-sm transition-colors"
                                            >
                                                Learn More <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AllServices;
