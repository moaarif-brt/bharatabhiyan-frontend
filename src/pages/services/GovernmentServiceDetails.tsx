import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchGovernmentServiceDetails, fetchServiceAnswer } from "@/api/government";
import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ChevronRight, FileText, ArrowRight, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const GovernmentServiceDetails = () => {
    const { id } = useParams();
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [language, setLanguage] = useState("english");

    const { data: response, isLoading, isError } = useQuery({
        queryKey: ["government-service-details", id],
        queryFn: () => fetchGovernmentServiceDetails(id!),
        enabled: !!id,
    });

    const { mutate: getAnswer, isPending: isAiLoading, data: aiData, reset: resetAi } = useMutation({
        mutationFn: ({ questionId, lang }: { questionId: number | string, lang: string }) => fetchServiceAnswer(questionId, lang),
    });

    const handleQuestionClick = (questionId: number, questionText: string) => {
        setSelectedQuestion(questionText);
        setSelectedQuestionId(questionId);
        setLanguage("english"); // Reset language to default on new question
        resetAi();
        setIsDialogOpen(true);
        getAnswer({ questionId, lang: "english" });
    };

    const handleLanguageChange = (lang: string) => {
        if (!selectedQuestionId) return;
        setLanguage(lang);
        resetAi();
        getAnswer({ questionId: selectedQuestionId, lang });
    };

    const details = response?.data;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <div className="container mx-auto px-4 py-8">
                    <Skeleton className="h-8 w-48 mb-6" />
                    <Skeleton className="h-10 w-64 mb-8" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} className="h-32 w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-red-500">Error loading details</h2>
                        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="py-8 px-4 bg-muted/30 border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/services" className="hover:text-primary">Services</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/services/government" className="hover:text-primary">Government Services</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">Service Details</span>
                    </div>

                    <Link to="/services/government" className="inline-flex items-center text-primary text-sm font-medium hover:underline mb-2">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Categories
                    </Link>

                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                        Available Services
                    </h1>
                    <p className="text-muted-foreground mt-1">Select a specific service to proceed</p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {details?.questions && details.questions.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {details.questions.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleQuestionClick(item.id, item.question)}
                                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all hover:border-primary/50 group cursor-pointer"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <FileText className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {item.question}
                                            </h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-4 group-hover:translate-x-1 transition-transform">
                                                View Guide <ArrowRight className="w-4 h-4 ml-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            No specific services found for this category.
                        </div>
                    )}
                </div>
            </section>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <div className="flex items-center justify-between pr-8">
                            <DialogTitle className="flex items-center gap-2 text-xl">
                                <Bot className="w-6 h-6 text-primary" />
                                Service Guide
                            </DialogTitle>

                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant={language === "english" ? "default" : "outline"}
                                    onClick={() => handleLanguageChange("english")}
                                    disabled={isAiLoading}
                                >
                                    English
                                </Button>
                                <Button
                                    size="sm"
                                    variant={language === "hindi" ? "default" : "outline"}
                                    onClick={() => handleLanguageChange("hindi")}
                                    disabled={isAiLoading}
                                >
                                    Hindi
                                </Button>
                            </div>
                        </div>
                        <DialogDescription>
                            Detailed steps and information for: <span className="font-medium text-foreground">{selectedQuestion}</span>
                        </DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="flex-1 mt-4 p-4 border rounded-md bg-muted/20">
                        {isAiLoading ? (
                            <div className="flex flex-col items-center justify-center h-full py-20 space-y-4">
                                <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                <p className="text-muted-foreground animate-pulse">
                                    Fetching guide in {language === "english" ? "English" : "Hindi"}...
                                </p>
                            </div>
                        ) : aiData ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {(() => {
                                        const text = aiData.data.answer;
                                        // Improved Regex to match URLs with multi-part domains (e.g. uidai.gov.in)
                                        const urlRegex = /((?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+\.[a-zA-Z]{2,}(?:\/[^\s]*)?)/g;

                                        const parts = text.split(urlRegex);

                                        return parts.map((part, i) => {
                                            if (part.match(urlRegex)) {
                                                const href = part.startsWith("http") ? part : `https://${part}`;
                                                return (
                                                    <a
                                                        key={i}
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary underline hover:text-primary/80"
                                                    >
                                                        {part}
                                                    </a>
                                                );
                                            }
                                            return part;
                                        });
                                    })()}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                Failed to load guide. Please try again.
                            </div>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default GovernmentServiceDetails;
