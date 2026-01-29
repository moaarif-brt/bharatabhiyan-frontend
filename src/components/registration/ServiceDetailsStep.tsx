import { useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
    serviceCategory: string;      // comma separated category ids
    experience: string;           // comma separated service_type ids
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

  /* ---------------- LOOKUP SYNC ---------------- */

  useEffect(() => {
    onLookupsReady?.({
      categories,
      serviceTypes,
      serviceAreas,
    });
  }, [categories, serviceTypes, serviceAreas, onLookupsReady]);

  /* ---------------- DERIVED DATA ---------------- */

  const selectedCategories = useMemo(() =>
    data.serviceCategory ? data.serviceCategory.split(",").filter(Boolean) : []
    , [data.serviceCategory]);

  const selectedTypes = useMemo(() =>
    data.experience ? data.experience.split(",").filter(Boolean) : []
    , [data.experience]);

  const filteredServiceTypes = useMemo(() => {
    return serviceTypes.filter(
      (t) => selectedCategories.includes(String(t.category))
    );
  }, [serviceTypes, selectedCategories]);

  const selectedAreas = useMemo(() =>
    data.serviceAreas ? data.serviceAreas.split(",").filter(Boolean) : []
    , [data.serviceAreas]);

  /* ---------------- HANDLERS ---------------- */

  const handleCategoryToggle = (categoryId: string) => {
    const idStr = String(categoryId);
    const updated = selectedCategories.includes(idStr)
      ? selectedCategories.filter((id) => id !== idStr)
      : [...selectedCategories, idStr];

    onChange("serviceCategory", updated.join(","));

    // Filter out service types that are no longer valid for the selected categories
    const validTypes = serviceTypes
      .filter(t => updated.includes(String(t.category)))
      .map(t => String(t.id));

    const updatedTypes = selectedTypes.filter(id => validTypes.includes(id));
    onChange("experience", updatedTypes.join(","));
  };

  const handleTypeToggle = (typeId: string, checked: boolean) => {
    const idStr = String(typeId);
    const updated = checked
      ? [...selectedTypes, idStr]
      : selectedTypes.filter((id) => id !== idStr);

    onChange("experience", updated.join(","));
  };

  const handleAreaChange = (areaId: string, checked: boolean) => {
    const idStr = String(areaId);
    const updated = checked
      ? [...selectedAreas, idStr]
      : selectedAreas.filter((id) => id !== idStr);

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
            Service Categories <span className="text-destructive">*</span>
          </h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Select categories you specialize in (multi-select enabled, at least one required)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = iconMap[category.name] || FolderOpen;
            const isSelected = selectedCategories.includes(String(category.id));

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryToggle(category.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all hover:border-primary hover:shadow-md ${isSelected
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-card"
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${isSelected ? "bg-primary" : "bg-primary/10"
                    }`}
                >
                  <Icon
                    className={`h-6 w-6 ${isSelected
                      ? "text-primary-foreground"
                      : "text-primary"
                      }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium text-center ${isSelected ? "text-primary" : "text-foreground"
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
            Service Types <span className="text-destructive">*</span>
          </h3>
        </div>

        <p className="text-sm text-muted-foreground">
          Select all services you provide (at least one required)
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {selectedCategories.length === 0 ? (
            <div className="col-span-full py-4 text-sm text-muted-foreground italic">
              Please select at least one category above to see service types
            </div>
          ) : filteredServiceTypes.length === 0 ? (
            <div className="col-span-full py-4 text-sm text-muted-foreground italic">
              No service types found for the selected categories
            </div>
          ) : (
            filteredServiceTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={selectedTypes.includes(String(type.id))}
                  onCheckedChange={(checked) =>
                    handleTypeToggle(String(type.id), checked as boolean)
                  }
                />
                <Label
                  htmlFor={`type-${type.id}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {type.name}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Service Area */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Service Areas
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
          {serviceAreas.map((area) => (
            <div key={area.id} className="flex items-center space-x-2">
              <Checkbox
                id={`area-${area.id}`}
                checked={selectedAreas.includes(String(area.id))}
                onCheckedChange={(checked) =>
                  handleAreaChange(String(area.id), checked as boolean)
                }
              />
              <Label
                htmlFor={`area-${area.id}`}
                className="text-sm font-normal cursor-pointer"
              >
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
          placeholder="Describe your expertise and what makes your service stand out..."
          rows={5}
          className="resize-none"
        />
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
