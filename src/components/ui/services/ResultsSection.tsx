import ListView from "./ListView";
import GridView from "./GridView";
import MapView from "./MapView";
import NoResults from "./NoResults";
import PaginationBar from "./PaginationBar";

const ResultsSection = ({
  viewMode,
  showNoResults,
  providers = [],
  serviceType,
  clearAllFilters,
  currentPage,
  totalPages,
  onPageChange,
}: any) => {
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
