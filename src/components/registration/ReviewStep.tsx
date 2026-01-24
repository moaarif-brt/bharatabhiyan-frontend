import { Check, FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ReviewStepProps {
  basicInfo: {
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
  serviceDetails: {
    serviceCategory: string;
    serviceDescription: string;
    experience: string;
    availability: string[];
    workingHours: string;
    serviceAreas: string;
  };
  documents: {
    idProof: File | null;
    addressProof: File | null;
    businessLicense: File | null;
    certifications: File[];
  };
  termsAccepted: boolean;
  onTermsChange: (accepted: boolean) => void;
}

const ReviewStep = ({ basicInfo, serviceDetails, documents, termsAccepted, onTermsChange }: ReviewStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Review & Submit</h2>
        <p className="text-sm text-muted-foreground">Review your information before submitting</p>
      </div>

      {/* Basic Information Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Full Name:</span>
            <span className="ml-2 text-foreground">{basicInfo.fullName || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <span className="ml-2 text-foreground">{basicInfo.email || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Phone:</span>
            <span className="ml-2 text-foreground">{basicInfo.phone || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Business:</span>
            <span className="ml-2 text-foreground">{basicInfo.businessName || "Not provided"}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Address:</span>
            <span className="ml-2 text-foreground">
              {basicInfo.address ? `${basicInfo.address}, ${basicInfo.city}, ${basicInfo.state} - ${basicInfo.pincode}` : "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Service Details Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          Service Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Category:</span>
            <span className="ml-2 text-foreground capitalize">{serviceDetails.serviceCategory || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Experience:</span>
            <span className="ml-2 text-foreground">{serviceDetails.experience || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Working Hours:</span>
            <span className="ml-2 text-foreground">{serviceDetails.workingHours || "Not provided"}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Service Areas:</span>
            <span className="ml-2 text-foreground">{serviceDetails.serviceAreas || "Not provided"}</span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-muted-foreground">Availability:</span>
            <span className="ml-2 text-foreground capitalize">
              {serviceDetails.availability.length > 0 ? serviceDetails.availability.join(", ") : "Not provided"}
            </span>
          </div>
        </div>
      </div>

      {/* Documents Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" />
          Documents Uploaded
        </h3>
        <div className="space-y-2">
          {documents.idProof && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-foreground">ID Proof: {documents.idProof.name}</span>
            </div>
          )}
          {documents.addressProof && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-foreground">Address Proof: {documents.addressProof.name}</span>
            </div>
          )}
          {documents.businessLicense && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-foreground">Business License: {documents.businessLicense.name}</span>
            </div>
          )}
          {documents.certifications.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-foreground">{documents.certifications.length} Certification(s) uploaded</span>
            </div>
          )}
          {!documents.idProof && !documents.addressProof && (
            <span className="text-sm text-muted-foreground">No documents uploaded</span>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3 p-4 bg-card border border-border rounded-lg">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => onTermsChange(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm font-normal cursor-pointer leading-relaxed">
          I hereby declare that all the information provided is true and accurate. I agree to the{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </Label>
      </div>
    </div>
  );
};

export default ReviewStep;
