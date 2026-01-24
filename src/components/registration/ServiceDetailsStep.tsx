import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Wrench, Zap, Droplets, Wind, Sparkles, Paintbrush, Hammer, Truck, FolderOpen, Settings, MapPin, FileText } from "lucide-react";

interface ServiceDetailsStepProps {
  data: {
    serviceCategory: string;
    serviceDescription: string;
    experience: string;
    availability: string[];
    workingHours: string;
    serviceAreas: string;
  };
  onChange: (field: string, value: string | string[]) => void;
}

const serviceCategories = [
  { id: "home-repairs", label: "Home Repairs", icon: Wrench },
  { id: "electrical", label: "Electrical", icon: Zap },
  { id: "plumbing", label: "Plumbing", icon: Droplets },
  { id: "ac-appliances", label: "AC & Appliances", icon: Wind },
  { id: "cleaning", label: "Cleaning", icon: Sparkles },
  { id: "painting", label: "Painting", icon: Paintbrush },
  { id: "carpentry", label: "Carpentry", icon: Hammer },
  { id: "packers-movers", label: "Packers & Movers", icon: Truck },
];

const serviceTypes: Record<string, { value: string; label: string }[]> = {
  "home-repairs": [
    { value: "general-repairs", label: "General Repairs" },
    { value: "door-window", label: "Door & Window Repairs" },
    { value: "furniture-repair", label: "Furniture Repair" },
  ],
  "electrical": [
    { value: "electrician-general", label: "Electrician - General" },
    { value: "wiring", label: "Wiring & Installation" },
    { value: "appliance-repair", label: "Appliance Repair" },
  ],
  "plumbing": [
    { value: "plumber-general", label: "Plumber - General" },
    { value: "pipe-fitting", label: "Pipe Fitting" },
    { value: "bathroom-fitting", label: "Bathroom Fitting" },
  ],
  "ac-appliances": [
    { value: "ac-service", label: "AC Service & Repair" },
    { value: "refrigerator", label: "Refrigerator Repair" },
    { value: "washing-machine", label: "Washing Machine Repair" },
  ],
  "cleaning": [
    { value: "home-cleaning", label: "Home Cleaning" },
    { value: "deep-cleaning", label: "Deep Cleaning" },
    { value: "office-cleaning", label: "Office Cleaning" },
  ],
  "painting": [
    { value: "interior-painting", label: "Interior Painting" },
    { value: "exterior-painting", label: "Exterior Painting" },
    { value: "waterproofing", label: "Waterproofing" },
  ],
  "carpentry": [
    { value: "furniture-making", label: "Furniture Making" },
    { value: "wood-work", label: "Wood Work" },
    { value: "cabinet-making", label: "Cabinet Making" },
  ],
  "packers-movers": [
    { value: "local-shifting", label: "Local Shifting" },
    { value: "intercity-moving", label: "Intercity Moving" },
    { value: "office-relocation", label: "Office Relocation" },
  ],
};

const serviceAreas = [
  { id: "sector-1-10", label: "Sector 1-10" },
  { id: "sector-11-20", label: "Sector 11-20" },
  { id: "sector-21-30", label: "Sector 21-30" },
  { id: "riico-industrial", label: "RIICO Industrial Area" },
  { id: "ashiana-town", label: "Ashiana Town" },
  { id: "imt-manesar", label: "IMT Manesar Road" },
];

const ServiceDetailsStep = ({ data, onChange }: ServiceDetailsStepProps) => {
  const handleAreaChange = (areaId: string, checked: boolean) => {
    const currentAreas = data.serviceAreas ? data.serviceAreas.split(",").filter(Boolean) : [];
    const newAreas = checked
      ? [...currentAreas, areaId]
      : currentAreas.filter((a) => a !== areaId);
    onChange("serviceAreas", newAreas.join(","));
  };

  const selectedAreas = data.serviceAreas ? data.serviceAreas.split(",").filter(Boolean) : [];
  const availableServiceTypes = data.serviceCategory ? serviceTypes[data.serviceCategory] || [] : [];

  return (
    <div className="space-y-8">
      {/* Service Category */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Service Category</h3>
        </div>
        <p className="text-sm text-muted-foreground">Select the primary category for your services</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isSelected = data.serviceCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onChange("serviceCategory", category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-primary hover:shadow-md ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                  isSelected ? "bg-primary" : "bg-primary/10"
                }`}>
                  <Icon className={`h-6 w-6 ${isSelected ? "text-primary-foreground" : "text-primary"}`} />
                </div>
                <span className={`text-sm font-medium text-center ${isSelected ? "text-primary" : "text-foreground"}`}>
                  {category.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Service Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Service Type</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceType">Select Service Type <span className="text-destructive">*</span></Label>
          <Select 
            value={data.experience} 
            onValueChange={(value) => onChange("experience", value)}
            disabled={!data.serviceCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder={data.serviceCategory ? "Select service type" : "Please select a category first"} />
            </SelectTrigger>
            <SelectContent>
              {availableServiceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Service Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Service Area</h3>
        </div>
        
        <div className="space-y-2">
          <Label>Areas You Serve <span className="text-destructive">*</span></Label>
          <p className="text-sm text-muted-foreground">Select all areas in Bhiwadi where you can provide services</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
            {serviceAreas.map((area) => (
              <div key={area.id} className="flex items-center space-x-2">
                <Checkbox
                  id={area.id}
                  checked={selectedAreas.includes(area.id)}
                  onCheckedChange={(checked) => handleAreaChange(area.id, checked as boolean)}
                />
                <Label htmlFor={area.id} className="text-sm font-normal cursor-pointer">
                  {area.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Your Services */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">About Your Services</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceDescription">Description <span className="text-destructive">*</span></Label>
          <p className="text-sm text-muted-foreground">Write a brief description of your services (minimum 50 characters)</p>
          <Textarea
            id="serviceDescription"
            placeholder="Describe your services, experience, and what makes you stand out..."
            value={data.serviceDescription}
            onChange={(e) => onChange("serviceDescription", e.target.value)}
            rows={5}
            className="resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
