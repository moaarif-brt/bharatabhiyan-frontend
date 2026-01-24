import { Upload, FileText, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DocumentsStepProps {
  data: {
    idProof: File | null;
    addressProof: File | null;
    businessLicense: File | null;
    certifications: File[];
  };
  onChange: (field: string, value: File | File[] | null) => void;
}

const DocumentsStep = ({ data, onChange }: DocumentsStepProps) => {
  const handleFileChange = (field: string, files: FileList | null, multiple = false) => {
    if (!files) return;
    if (multiple) {
      onChange(field, Array.from(files));
    } else {
      onChange(field, files[0]);
    }
  };

  const removeFile = (field: string) => {
    onChange(field, null);
  };

  const removeCertification = (index: number) => {
    const newCerts = data.certifications.filter((_, i) => i !== index);
    onChange("certifications", newCerts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Documents</h2>
        <p className="text-sm text-muted-foreground">Upload required documents for verification</p>
      </div>

      <div className="space-y-6">
        {/* ID Proof */}
        <div className="space-y-2">
          <Label>ID Proof (Aadhar/PAN/Passport) *</Label>
          {data.idProof ? (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm truncate">{data.idProof.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeFile("idProof")}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("idProof", e.target.files)}
              />
            </label>
          )}
        </div>

        {/* Address Proof */}
        <div className="space-y-2">
          <Label>Address Proof (Utility Bill/Bank Statement) *</Label>
          {data.addressProof ? (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm truncate">{data.addressProof.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeFile("addressProof")}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("addressProof", e.target.files)}
              />
            </label>
          )}
        </div>

        {/* Business License */}
        <div className="space-y-2">
          <Label>Business License (Optional)</Label>
          {data.businessLicense ? (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm truncate">{data.businessLicense.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeFile("businessLicense")}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
              <span className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 5MB)</span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange("businessLicense", e.target.files)}
              />
            </label>
          )}
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <Label>Certifications (Optional)</Label>
          {data.certifications.length > 0 && (
            <div className="space-y-2 mb-2">
              {data.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm truncate">{cert.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeCertification(index)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Click to upload certifications</span>
            <span className="text-xs text-muted-foreground mt-1">Multiple files allowed</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              onChange={(e) => handleFileChange("certifications", e.target.files, true)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default DocumentsStep;
