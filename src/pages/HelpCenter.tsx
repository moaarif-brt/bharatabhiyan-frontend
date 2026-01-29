import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import {
    UserPlus,
    Key,
    MessageSquare,
    CreditCard,
    HelpCircle,
    Search
} from "lucide-react";

const HelpCenter = () => {
    const helpNodes = [
        { title: "Registration Guide", icon: UserPlus, href: "/help/how-to-register", desc: "Learn how to join as a customer or provider." },
        { title: "Password & Security", icon: Key, href: "/help/forgot-password", desc: "Reset password and secure your account." },
        { title: "OTP Issues", icon: MessageSquare, href: "/help/otp-not-received", desc: "Help with verification codes." },
        { title: "Payment Help", icon: CreditCard, href: "/help/payment-issues", desc: "Billing and registration fee questions." },
        { title: "Common Questions", icon: HelpCircle, href: "/help/faqs", desc: "Browse our frequently asked questions." },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="bg-secondary text-secondary-foreground py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
                        <p className="text-lg opacity-80 mb-8">Search for articles or browse topics below</p>
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search help articles..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-none text-foreground focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helpNodes.map((node) => (
                            <Link
                                key={node.title}
                                to={node.href}
                                className="p-6 bg-card border rounded-xl hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <node.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{node.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{node.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HelpCenter;
