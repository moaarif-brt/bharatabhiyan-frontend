import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoStepProps {
  data: {
    whatsapp_number: string;
    business_name: string;
    experience: string; // 🔑 backend enum
    business_address: string;
    city_id: string;
    pincode: string;
  };
  onChange: (field: string, value: string) => void;
}

/* ---------------- EXPERIENCE OPTIONS (BACKEND ALIGNED) ---------------- */

const EXPERIENCE_OPTIONS = [
  { value: "LESS_THAN_1", label: "Less than 1 year" },
  { value: "1_TO_3", label: "1-3 years" },
  { value: "3_TO_5", label: "3-5 years" },
  { value: "5_TO_10", label: "5-10 years" },
  { value: "MORE_THAN_10", label: "More than 10 years" },
];

const cities = [
  { id: "1", name: "Bhiwadi" },
];

const BasicInfoStep = ({ data, onChange }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Basic Information
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your business and contact details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp Number */}
        <div className="space-y-2">
          <Label>WhatsApp Number *</Label>
          <Input
            placeholder="Enter WhatsApp number"
            value={data.whatsapp_number}
            onChange={(e) =>
              onChange("whatsapp_number", e.target.value)
            }
          />
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <Label>Business Name *</Label>
          <Input
            placeholder="Enter business name"
            value={data.business_name}
            onChange={(e) =>
              onChange("business_name", e.target.value)
            }
          />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <Label>Experience *</Label>
          <Select
            value={data.experience}
            onValueChange={(value) =>
              onChange("experience", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label>City *</Label>
          <Select
            value={data.city_id}
            onValueChange={(value) =>
              onChange("city_id", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Business Address */}
        <div className="space-y-2 md:col-span-2">
          <Label>Business Address *</Label>
          <Input
            placeholder="Enter business address"
            value={data.business_address}
            onChange={(e) =>
              onChange("business_address", e.target.value)
            }
          />
        </div>

        {/* Pincode */}
        <div className="space-y-2">
          <Label>Pincode *</Label>
          <Input
            placeholder="Enter pincode"
            value={data.pincode}
            onChange={(e) =>
              onChange("pincode", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
