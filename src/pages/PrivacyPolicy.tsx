import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8 text-secondary">Privacy Policy</h1>

                <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information Collection</h2>
                        <p>
                            We collect information that you provide directly to us, such as when you create an account, register as a provider, or contact us for support.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use of Information</h2>
                        <p>
                            The information we collect is used to provide, maintain, and improve our services, and to connect customers with service providers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Security</h2>
                        <p>
                            We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground mb-4">4. Sharing of Information</h2>
                        <p>
                            We only share necessary contact information between customers and providers once a service request is initiated.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
