import {
  List,
  LayoutGrid,
  MapPin,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TitleAndViewBar = ({
  config,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
}: {
  config: {
    title: string;
    count?: number;
  };
  viewMode: "list" | "grid" | "map";
  setViewMode: any;
  sortBy: string;
  setSortBy: any;
}) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {config.title}s in{" "}
              <span className="text-primary">Bhiwadi</span>
            </h1>

            <p className="text-muted-foreground text-sm">
              {config.count === 0
                ? "No verified service providers found"
                : `Showing ${config.count} verified service provider${
                    config.count > 1 ? "s" : ""
                  }`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 flex items-center gap-1.5 text-sm ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "bg-white text-foreground hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
                List
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 flex items-center gap-1.5 text-sm border-l ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "bg-white text-foreground hover:bg-gray-50"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Grid
              </button>
              {/* <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-2 flex items-center gap-1.5 text-sm border-l ${
                  viewMode === "map"
                    ? "bg-primary text-white"
                    : "bg-white text-foreground hover:bg-gray-50"
                }`}
              >
                <MapPin className="w-4 h-4" />
                Map
              </button> */}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Relevance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleAndViewBar;
