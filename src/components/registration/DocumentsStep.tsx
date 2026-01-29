import { Upload, FileText, X, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resolveMediaUrl } from "@/utils/mediaUrl";

interface DocumentsStepProps {
  data: {
    aadhaar_front: File | null;
    aadhaar_back: File | null;

    address_proof_type: string;
    address_proof: File | null;

    profile_photo: File | null;
    skill_certificate: File[];
  };

  documentMeta: {
    aadhaar_front_url?: string;
    aadhaar_back_url?: string;
    address_proof_url?: string;
    profile_photo_url?: string;
    skill_certificate_url?: string;
  };

  onChange: (field: string, value: any) => void;
  onClearMeta?: (key: string) => void;
}

const ADDRESS_PROOF_TYPES = [
  { value: "ELECTRICITY_BILL", label: "Electricity Bill" },
  { value: "WATER_BILL", label: "Water Bill" },
  { value: "RENT_AGREEMENT", label: "Rent Agreement" },
  { value: "PROPERTY_TAX", label: "Property Tax Receipt" },
  { value: "BANK_STATEMENT", label: "Bank Statement" },
];

/* ---------------- UI ATOMS ---------------- */

const FileBox = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => (
  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
    <FileText className="w-5 h-5 text-primary" />
    <span className="flex-1 text-sm truncate">{file.name}</span>
    <Button variant="ghost" size="sm" onClick={onRemove}>
      <X className="w-4 h-4" />
    </Button>
  </div>
);


const UploadedPreview = ({
  label,
  url,
  onReplace,
}: {
  label: string;
  url?: string;
  onReplace: () => void;
}) =>
  url ? (
    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
      <div className="flex items-center gap-2 text-sm">
        <FileText className="w-4 h-4 text-primary" />
        <span>{label} uploaded</span>

        <Dialog>
          <DialogTrigger asChild>
            <button className="inline-flex items-center gap-1 text-primary underline hover:text-primary/80 transition-colors">
              View <ExternalLink className="w-3 h-3" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none sm:max-w-4xl">
            <DialogHeader className="sr-only">
              <DialogTitle>{label} Preview</DialogTitle>
            </DialogHeader>
            <div className="relative flex items-center justify-center p-4">
              <img
                src={resolveMediaUrl(url)}
                alt={label}
                className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Button size="sm" variant="outline" onClick={onReplace}>
        Replace
      </Button>
    </div>
  ) : null;

const UploadBox = ({
  onChange,
  multiple = false,
  disabled = false,
}: {
  onChange: (files: FileList | null) => void;
  multiple?: boolean;
  disabled?: boolean;
}) => (
  <label
    className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors
      ${disabled
        ? "cursor-not-allowed opacity-50 bg-muted"
        : "cursor-pointer hover:bg-muted/50 border-border"
      }
    `}
  >
    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
    <span className="text-sm text-muted-foreground">
      {disabled
        ? "Select address proof type first"
        : "Click to upload or drag & drop"}
    </span>

    <input
      type="file"
      className="hidden"
      multiple={multiple}
      accept=".pdf,.jpg,.jpeg,.png"
      disabled={disabled}
      onChange={(e) => onChange(e.target.files)}
    />
  </label>
);

/* ---------------- MAIN COMPONENT ---------------- */

const DocumentsStep = ({
  data,
  documentMeta,
  onChange,
  onClearMeta,
}: DocumentsStepProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Documents</h2>

      {/* Aadhaar Front */}
      <div className="space-y-2">
        <Label>Aadhaar Front *</Label>

        {data.aadhaar_front ? (
          <FileBox
            file={data.aadhaar_front}
            onRemove={() => onChange("aadhaar_front", null)}
          />
        ) : (
          <>
            <UploadedPreview
              label="Aadhaar Front"
              url={documentMeta.aadhaar_front_url}
              onReplace={() => {
                onClearMeta?.("aadhaar_front_url");
                onChange("aadhaar_front", null);
              }}
            />
            {!documentMeta.aadhaar_front_url && (
              <UploadBox
                onChange={(files) =>
                  onChange("aadhaar_front", files?.[0] || null)
                }
              />
            )}
          </>
        )}
      </div>

      {/* Aadhaar Back */}
      <div className="space-y-2">
        <Label>Aadhaar Back *</Label>

        {data.aadhaar_back ? (
          <FileBox
            file={data.aadhaar_back}
            onRemove={() => onChange("aadhaar_back", null)}
          />
        ) : (
          <>
            <UploadedPreview
              label="Aadhaar Back"
              url={documentMeta.aadhaar_back_url}
              onReplace={() => {
                onClearMeta?.("aadhaar_back_url");
                onChange("aadhaar_back", null);
              }}
            />
            {!documentMeta.aadhaar_back_url && (
              <UploadBox
                onChange={(files) =>
                  onChange("aadhaar_back", files?.[0] || null)
                }
              />
            )}
          </>
        )}
      </div>

      {/* Address Proof Type */}
      <div className="space-y-2">
        <Label>Address Proof Type *</Label>
        <Select
          value={data.address_proof_type}
          onValueChange={(v) => {
            onChange("address_proof_type", v);
            onChange("address_proof", null);
            onClearMeta?.("address_proof_url");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select address proof type" />
          </SelectTrigger>
          <SelectContent>
            {ADDRESS_PROOF_TYPES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Address Proof */}
      <div className="space-y-2">
        <Label>Address Proof *</Label>

        {data.address_proof ? (
          <FileBox
            file={data.address_proof}
            onRemove={() => onChange("address_proof", null)}
          />
        ) : (
          <>
            <UploadedPreview
              label="Address Proof"
              url={documentMeta.address_proof_url}
              onReplace={() => {
                onClearMeta?.("address_proof_url");
                onChange("address_proof", null);
              }}
            />
            {!documentMeta.address_proof_url && (
              <UploadBox
                disabled={!data.address_proof_type}
                onChange={(files) =>
                  onChange("address_proof", files?.[0] || null)
                }
              />
            )}
          </>
        )}
      </div>

      {/* Profile Photo */}
      <div className="space-y-2">
        <Label>Profile Photo *</Label>

        {data.profile_photo ? (
          <FileBox
            file={data.profile_photo}
            onRemove={() => onChange("profile_photo", null)}
          />
        ) : (
          <>
            <UploadedPreview
              label="Profile Photo"
              url={documentMeta.profile_photo_url}
              onReplace={() => {
                onClearMeta?.("profile_photo_url");
                onChange("profile_photo", null);
              }}
            />
            {!documentMeta.profile_photo_url && (
              <UploadBox
                onChange={(files) =>
                  onChange("profile_photo", files?.[0] || null)
                }
              />
            )}
          </>
        )}
      </div>

      {/* Skill Certificate */}
      <div className="space-y-2">
        <Label>Skill Certificate (Optional)</Label>

        {documentMeta.skill_certificate_url && (
          <UploadedPreview
            label="Skill Certificate"
            url={documentMeta.skill_certificate_url}
            onReplace={() => onClearMeta?.("skill_certificate_url")}
          />
        )}

        {data.skill_certificate.map((file, idx) => (
          <FileBox
            key={idx}
            file={file}
            onRemove={() =>
              onChange(
                "skill_certificate",
                data.skill_certificate.filter((_, i) => i !== idx)
              )
            }
          />
        ))}

        <UploadBox
          multiple
          onChange={(files) =>
            onChange("skill_certificate", files ? Array.from(files) : [])
          }
        />
      </div>
    </div>
  );
};

export default DocumentsStep;
