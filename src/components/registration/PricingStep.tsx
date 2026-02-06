import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IndianRupee, Tag } from "lucide-react";

interface PricingStepProps {
    selectedServiceTypes: string[]; // comma-separated IDs from serviceDetails.experience
    serviceCosts: { [serviceTypeId: string]: string };
    onChange: (costs: { [serviceTypeId: string]: string }) => void;
    lookups: {
        categories: any[];
        serviceTypes: any[];
    };
}

const PricingStep = ({
    selectedServiceTypes,
    serviceCosts,
    onChange,
    lookups,
}: PricingStepProps) => {
    // Group service types by category
    const groupedServices = useMemo(() => {
        const selected = selectedServiceTypes.filter(Boolean);
        const services = lookups.serviceTypes.filter((st) =>
            selected.includes(String(st.id))
        );

        const grouped: { [categoryName: string]: any[] } = {};
        services.forEach((service) => {
            const category = lookups.categories.find(
                (c) => c.id === service.category
            );
            const categoryName = category?.name || "Other";

            if (!grouped[categoryName]) {
                grouped[categoryName] = [];
            }
            grouped[categoryName].push(service);
        });

        return grouped;
    }, [selectedServiceTypes, lookups]);

    const handlePriceChange = (serviceTypeId: string, value: string) => {
        // Allow only numbers and decimal point
        const sanitized = value.replace(/[^0-9.]/g, "");
        onChange({
            ...serviceCosts,
            [serviceTypeId]: sanitized,
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-foreground">
                        Service Pricing
                    </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                    Set your pricing for each service (optional). You can also discuss pricing directly with customers.
                </p>
            </div>

            {Object.keys(groupedServices).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    No services selected. Please go back and select service types.
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedServices).map(([categoryName, services]) => (
                        <div key={categoryName} className="space-y-3">
                            {/* Category Header */}
                            <div className="flex items-center gap-2 pb-2 border-b border-border">
                                <Tag className="w-4 h-4 text-primary" />
                                <h3 className="font-semibold text-foreground">{categoryName}</h3>
                            </div>

                            {/* Service Type Pricing Inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                                {services.map((service) => (
                                    <div key={service.id} className="space-y-2">
                                        <Label className="text-sm font-normal">
                                            {service.name}
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                ₹
                                            </span>
                                            <Input
                                                type="text"
                                                placeholder="Enter price"
                                                value={serviceCosts[String(service.id)] || ""}
                                                onChange={(e) =>
                                                    handlePriceChange(String(service.id), e.target.value)
                                                }
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                <p className="font-medium mb-1">💡 Pricing Tips:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Set competitive prices based on your experience and market rates</li>
                    <li>You can leave prices blank if you prefer to discuss with customers</li>
                    <li>Prices can be updated anytime from your profile</li>
                </ul>
            </div>
        </div>
    );
};

export default PricingStep;
