import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoResults = ({ clearAllFilters }: any) => {
  return (
    <div className="bg-white rounded-xl border p-12 text-center">
      <SearchX className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-foreground mb-2">
        No Providers Found
      </h2>
      <p className="text-muted-foreground mb-6">
        We couldn't find any providers matching your search criteria.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left max-w-md mx-auto mb-6">
        <h3 className="font-semibold mb-3">Try the following:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Remove some filters to broaden your search</li>
          <li>• Check for spelling errors in your search</li>
          <li>• Try a different service category</li>
          <li>• Expand your location to nearby areas</li>
        </ul>
      </div>

      <Button onClick={clearAllFilters} className="bg-primary hover:bg-primary/90">
        Clear All Filters
      </Button>
    </div>
  );
};

export default NoResults;
