import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsOfService = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-secondary">Terms of Service</h1>

                <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using BharatAbhiyan, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Service Description</h2>
                        <p>
                            BharatAbhiyan provides a platform to connect users with verified local service providers. While we verify providers through our Captain KYC process, we do not directly provide the services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                        <p>
                            Users are responsible for maintaining the confidentiality of their accounts and for all activities that occur under their account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Provider Verification</h2>
                        <p>
                            Our verification process is intended to increase trust, but we recommend users exercise their own judgment when hiring providers.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
