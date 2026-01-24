import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoStepProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  onChange: (field: string, value: string) => void;
}

const BasicInfoStep = ({ data, onChange }: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Basic Information</h2>
        <p className="text-sm text-muted-foreground">Enter your personal and business details</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            placeholder="Enter your business name"
            value={data.businessName}
            onChange={(e) => onChange("businessName", e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="businessType">Business Type *</Label>
          <Select value={data.businessType} onValueChange={(value) => onChange("businessType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="individual">Individual</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="pvtLtd">Private Limited</SelectItem>
              <SelectItem value="llp">LLP</SelectItem>
              <SelectItem value="proprietorship">Proprietorship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            placeholder="Enter your business address"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Enter city"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Select value={data.state} onValueChange={(value) => onChange("state", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="karnataka">Karnataka</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
              <SelectItem value="gujarat">Gujarat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode *</Label>
          <Input
            id="pincode"
            placeholder="Enter pincode"
            value={data.pincode}
            onChange={(e) => onChange("pincode", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
