import { IndianRupee } from "lucide-react";

const FeeBadge = () => {
  return (
    <div className="fee-badge">
      <div className="w-11 h-11 rounded-lg gradient-saffron flex items-center justify-center flex-shrink-0">
        <IndianRupee className="w-5 h-5 text-primary-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold text-secondary">
          One-time Registration Fee
        </p>
        <p className="text-[13px] text-muted-foreground">
          ₹100 to activate your account
        </p>
      </div>
    </div>
  );
};

export default FeeBadge;
