import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Wrench,
  Zap,
  Droplets,
  Wind,
  Sparkles,
  Paintbrush,
  Hammer,
  Truck,
  FolderOpen,
  Settings,
  MapPin,
  FileText,
} from "lucide-react";
import {
  fetchServiceCategories,
  fetchServiceTypes,
  fetchServiceAreas,
} from "@/api/provider";

interface ServiceDetailsStepProps {
  data: {
    serviceCategory: string;      // category id
    experience: string;           // service_type id
    serviceAreas: string;         // comma separated ids
    serviceDescription: string;
    availability: string[];
    workingHours: string;
  };
  cityId: string;
  onChange: (field: string, value: string | string[]) => void;
  onLookupsReady?: (data: {
    categories: any[];
    serviceTypes: any[];
    serviceAreas: any[];
  }) => void;
}

/* ---------------- ICON MAP ---------------- */

const iconMap: Record<string, any> = {
  "Home Repairs": Wrench,
  Electrical: Zap,
  Plumbing: Droplets,
  "AC & Appliances": Wind,
  Cleaning: Sparkles,
  Painting: Paintbrush,
  Carpentry: Hammer,
  "Packers & Movers": Truck,
};

const ServiceDetailsStep = ({
  data,
  onChange,
  cityId,
  onLookupsReady,
}: ServiceDetailsStepProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [serviceAreas, setServiceAreas] = useState<any[]>([]);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    fetchServiceCategories().then((res) => {
      setCategories(res.data.data || []);
    });

    fetchServiceTypes().then((res) => {
      setServiceTypes(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    if (cityId) {
      fetchServiceAreas(cityId).then((res) => {
        setServiceAreas(res.data.data || []);
      });
    }
  }, [cityId]);

  /* ---------------- LOOKUP SYNC (FIXED) ---------------- */

  useEffect(() => {
    onLookupsReady?.({
      categories,
      serviceTypes,
      serviceAreas,
    });
  }, [categories, serviceTypes, serviceAreas, onLookupsReady]);

  /* ---------------- DERIVED DATA ---------------- */

  const filteredServiceTypes = useMemo(() => {
    return serviceTypes.filter(
      (t) => String(t.category) === String(data.serviceCategory)
    );
  }, [serviceTypes, data.serviceCategory]);

  const selectedAreas = data.serviceAreas
    ? data.serviceAreas.split(",").filter(Boolean)
    : [];

  const handleAreaChange = (areaId: string, checked: boolean) => {
    const updated = checked
      ? [...selectedAreas, areaId]
      : selectedAreas.filter((a) => a !== areaId);

    onChange("serviceAreas", updated.join(","));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">
      {/* Service Category */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Service Category
          </h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Select the primary category for your services
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = iconMap[category.name] || FolderOpen;
            const isSelected =
              String(data.serviceCategory) === String(category.id);

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onChange("serviceCategory", String(category.id));
                  onChange("experience", "");
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-primary hover:shadow-md ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? "bg-primary" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isSelected
                        ? "text-primary-foreground"
                        : "text-primary"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium text-center ${
                    isSelected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {category.name}
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
          <h3 className="text-lg font-semibold text-foreground">
            Service Type
          </h3>
        </div>

        <div className="space-y-2">
          <Label>
            Select Service Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.experience}
            onValueChange={(value) => onChange("experience", value)}
            disabled={!data.serviceCategory}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  data.serviceCategory
                    ? "Select service type"
                    : "Please select a category first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {filteredServiceTypes.map((type) => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
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
          <h3 className="text-lg font-semibold text-foreground">
            Service Area
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {serviceAreas.map((area) => (
            <div key={area.id} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAreas.includes(String(area.id))}
                onCheckedChange={(checked) =>
                  handleAreaChange(String(area.id), checked as boolean)
                }
              />
              <Label className="text-sm font-normal cursor-pointer">
                {area.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            About Your Services
          </h3>
        </div>

        <Textarea
          value={data.serviceDescription}
          onChange={(e) =>
            onChange("serviceDescription", e.target.value)
          }
          rows={5}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
