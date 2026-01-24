import {
  FileText,
  Clock,
  XCircle,
  CheckCircle,
} from "lucide-react";

type Status =
  | "DRAFT"
  | "PENDING_VERIFICATION"
  | "REJECTED"
  | "VERIFIED";

const STATUS_CONFIG: Record<
  Status,
  {
    label: string;
    icon: any;
    glow: string;
    bg: string;
    border: string;
    text: string;
    iconColor: string;
  }
> = {
  DRAFT: {
    label: "Draft",
    icon: FileText,
    glow: "bg-gray-400/30",
    bg: "from-gray-100 via-yellow-50 to-gray-200",
    border: "border-gray-300",
    text: "text-gray-800",
    iconColor: "text-gray-700",
  },
  PENDING_VERIFICATION: {
    label: "Pending",
    icon: Clock,
    glow: "bg-amber-400/30",
    bg: "from-amber-100 via-sky-50 to-amber-200",
    border: "border-amber-300",
    text: "text-amber-800",
    iconColor: "text-amber-700",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    glow: "bg-red-400/30",
    bg: "from-red-100 via-rose-50 to-red-200",
    border: "border-red-300",
    text: "text-red-800",
    iconColor: "text-red-700",
  },
  VERIFIED: {
    label: "Verified",
    icon: CheckCircle,
    glow: "bg-green-400/30",
    bg: "from-green-100 via-emerald-50 to-green-200",
    border: "border-green-300",
    text: "text-green-800",
    iconColor: "text-green-700",
  },
};

const StatusStamp = ({ status }: { status: Status }) => {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative">
        {/* Glow */}
        <div
          className={`absolute inset-0 blur-xl rounded-full ${cfg.glow}`}
        />

        {/* Stamp */}
        <div
          className={`
            relative flex items-center gap-2 px-4 py-2 rounded-full
            bg-gradient-to-br ${cfg.bg}
            border ${cfg.border}
            shadow-lg
            backdrop-blur-md
          `}
        >
          <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
          <span
            className={`text-xs font-semibold tracking-widest uppercase ${cfg.text}`}
          >
            {cfg.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusStamp;
