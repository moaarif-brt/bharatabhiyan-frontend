import ListView from "./ListView";
import GridView from "./GridView";
import MapView from "./MapView";
import NoResults from "./NoResults";
import PaginationBar from "./PaginationBar";

import { Skeleton } from "@/components/ui/skeleton";

const ResultsSection = ({
  viewMode,
  showNoResults,
  providers = [],
  serviceType,
  clearAllFilters,
  currentPage,
  totalPages,
  onPageChange,
  loading
}: any) => {

  if (loading) {
    return (
      <main className="flex-1 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg border p-4 flex gap-4">
            <Skeleton className="h-24 w-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </main>
    );
  }

  return (
    <main className="flex-1">
      {showNoResults ? (
        <NoResults clearAllFilters={clearAllFilters} />
      ) : viewMode === "list" ? (
        <ListView
          providers={providers}
          serviceType={serviceType}
        />
      ) : viewMode === "grid" ? (
        <GridView
          providers={providers}
          serviceType={serviceType}
        />
      ) : (
        <MapView providers={providers} />
      )}

      {!showNoResults && totalPages > 1 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </main>
  );
};

export default ResultsSection;
