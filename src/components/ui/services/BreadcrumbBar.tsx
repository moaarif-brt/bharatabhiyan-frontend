import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BreadcrumbBar = ({ config }: { config: any }) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link to="/services/home" className="text-muted-foreground hover:text-primary">Services</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Link to="/services/home" className="text-muted-foreground hover:text-primary">Home Repairs</Link>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{config.title} in Bhiwadi</span>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbBar;
