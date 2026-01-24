import { Phone, Mail } from "lucide-react";

interface AuthTabsProps {
  activeTab: "phone" | "email";
  onTabChange: (tab: "phone" | "email") => void;
}

const AuthTabs = ({ activeTab, onTabChange }: AuthTabsProps) => {
  return (
    <div className="tab-container">
      <button
        type="button"
        className={`tab-item ${activeTab === "phone" ? "active" : ""}`}
        onClick={() => onTabChange("phone")}
      >
        <Phone className="w-4 h-4" /> Phone
      </button>
      <button
        type="button"
        className={`tab-item ${activeTab === "email" ? "active" : ""}`}
        onClick={() => onTabChange("email")}
      >
        <Mail className="w-4 h-4" /> Email
      </button>
    </div>
  );
};

export default AuthTabs;
