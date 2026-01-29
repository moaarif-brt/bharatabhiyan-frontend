import { Check, FileText, Image as ImageIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { resolveMediaUrl } from "@/utils/mediaUrl";

const ReviewRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);

const EXPERIENCE_MAP: Record<string, string> = {
  LESS_THAN_1: "Less than 1 year",
  "1_TO_3": "1-3 years",
  "3_TO_5": "3-5 years",
  "5_TO_10": "5-10 years",
  MORE_THAN_10: "More than 10 years",
};

const ADDRESS_PROOF_MAP: Record<string, string> = {
  ELECTRICITY_BILL: "Electricity Bill",
  WATER_BILL: "Water Bill",
  RENT_AGREEMENT: "Rent Agreement",
  PROPERTY_TAX: "Property Tax Receipt",
  BANK_STATEMENT: "Bank Statement",
};


const resolveName = (list: any[], id?: string) =>
  list.find((i) => String(i.id) === String(id))?.name || "—";

const resolveMultiple = (list: any[], ids?: string) =>
  ids
    ? ids
      .split(",")
      .map((id) => resolveName(list, id))
      .join(", ")
    : "—";


const FileRow = ({
  label,
  file,
  url,
}: {
  label: string;
  file?: File | null;
  url?: string;
}) =>
  file || url ? (
    <div className="flex items-center gap-2 text-sm">
      <FileText className="w-4 h-4 text-primary" />
      <span className="flex-1">
        {label}: {file?.name || "Uploaded"}
      </span>

      {url && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-primary underline text-xs hover:text-primary/80 transition-colors">
              View
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
      )}
    </div>
  ) : null;


const ReviewStep = ({
  basicInfo,
  serviceDetails,
  documents,
  documentMeta,
  lookups,
  termsAccepted,
  onTermsChange,
  readOnly = false,
}: any) => {
  return (
    <div className="space-y-6">

      <h2 className="text-lg font-semibold">Review & Submit</h2>

      {/* BASIC INFO */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" /> Basic Information
        </h3>

        <ReviewRow label="WhatsApp" value={basicInfo.whatsapp_number} />
        <ReviewRow label="Business Name" value={basicInfo.business_name} />
        <ReviewRow
          label="Experience"
          value={EXPERIENCE_MAP[basicInfo.experience]}
        />

        <ReviewRow
          label="City"
          value={resolveName(lookups.cities, basicInfo.city_id)}
        />
        <ReviewRow label="Pincode" value={basicInfo.pincode} />
        <ReviewRow label="Address" value={basicInfo.business_address} />
      </div>

      {/* SERVICE DETAILS */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" /> Service Details
        </h3>

        <ReviewRow
          label="Service Category"
          value={resolveMultiple(lookups.categories, serviceDetails.serviceCategory)}
        />
        <ReviewRow
          label="Service Type"
          value={resolveMultiple(lookups.serviceTypes, serviceDetails.experience)}
        />
        <ReviewRow
          label="Service Areas"
          value={resolveMultiple(lookups.serviceAreas, serviceDetails.serviceAreas)}
        />
        <ReviewRow label="Description" value={serviceDetails.serviceDescription} />
      </div>

      {/* DOCUMENTS */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
        <h3 className="font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-green-500" /> Documents
        </h3>

        <FileRow
          label="Aadhaar Front"
          file={documents.aadhaar_front}
          url={documentMeta?.aadhaar_front_url}
        />
        <FileRow
          label="Aadhaar Back"
          file={documents.aadhaar_back}
          url={documentMeta?.aadhaar_back_url}
        />
        <ReviewRow
          label="Address Proof Type"
          value={ADDRESS_PROOF_MAP[documents.address_proof_type]}
        />
        <FileRow
          label="Address Proof"
          file={documents.address_proof}
          url={documentMeta?.address_proof_url}
        />
        <FileRow
          label="Profile Photo"
          file={documents.profile_photo}
          url={documentMeta?.profile_photo_url}
        />

        {documentMeta?.skill_certificate_url && (
          <div className="text-sm">
            <ImageIcon className="inline w-4 h-4 mr-1" />
            Skill Certificate Uploaded
          </div>
        )}

      </div>

      {/* TERMS */}
      <div className="flex items-start gap-3 p-4 border rounded-lg">
        <Checkbox
          checked={readOnly ? true : termsAccepted}
          disabled={readOnly}
          onCheckedChange={(v) => !readOnly && onTermsChange(v as boolean)}
        />

        <Label className="text-sm">
          {readOnly
            ? "You have already confirmed these details"
            : "I confirm all details are correct and agree to Terms & Privacy Policy"}
        </Label>

      </div>
    </div>
  );
};

export default ReviewStep;
