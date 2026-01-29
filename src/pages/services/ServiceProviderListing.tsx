import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";

import TitleAndViewBar from "@/components/ui/services/TitleAndViewBar";
import ResultsSection from "@/components/ui/services/ResultsSection";

import {
  fetchProvidersByCategory,
  fetchProvidersByArea,
  searchProviders,
} from "@/api/services";
import {
  fetchServiceTypes,
  fetchServiceAreas,
} from "@/api/provider";
import SearchFilterBar from "@/components/ui/services/SearchFilterBar";

const ServiceProviderListing = () => {
  // 🔑 PATH PARAMS
  const { serviceType, categoryId } = useParams<{
    serviceType: string;
    categoryId?: string;
  }>();

  const navigate = useNavigate();

  // 🔑 QUERY PARAMS
  const [searchParams] = useSearchParams();
  const areaId = searchParams.get("area"); // Legacy single area
  const serviceTypesParam = searchParams.get("service_types"); // Multi-select
  const categoriesParam = searchParams.get("categories"); // Category-wide
  const areasParam = searchParams.get("service_areas"); // Multi-select areas
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  // ✅ REQUIRED UI STATES
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [sortBy, setSortBy] = useState("relevance");

  // ✅ DATA STATES
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ LOOKUP DATA
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // ✅ FILTER STATES (INTERNAL)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const config = {
    title:
      serviceType === "search"
        ? "Search Results"
        : providers.length > 0
          ? providers[0].service_type_name || providers[0].category_name
          : "Service Provider",
    count: providers.length,
  };

  /* ---------- LOAD SEARCH DATA ---------- */
  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [typeRes, areaRes] = await Promise.all([
          fetchServiceTypes(),
          fetchServiceAreas("1"),
        ]);
        setServiceTypes(typeRes.data.data || []);
        setLocations(areaRes.data.data || []);
      } catch (err) {
        console.error("Filter lookup load failed", err);
      }
    };
    loadLookups();
  }, []);

  /* ---------- SYNC INTERNAL STATE FROM URL ---------- */
  useEffect(() => {
    // 1. Prioritize service_types from URL search params (Flow 3)
    if (serviceTypesParam) {
      setSelectedTypes(serviceTypesParam.split(","));
    }
    // 2. Fallback to serviceType from path if not "search" (Flow 1/2)
    else if (serviceType && serviceType !== "search") {
      setSelectedTypes([serviceType]);
    }
    else {
      setSelectedTypes([]);
    }

    setSelectedAreas(areasParam ? areasParam.split(",") : []);
  }, [serviceTypesParam, areasParam, serviceType]);

  const handleSearchUpdate = () => {
    let query = "";
    const types = selectedTypes.length > 0 ? selectedTypes.join(",") : "";
    const areas = selectedAreas.length > 0 ? selectedAreas.join(",") : "";

    if (types) query += `service_types=${types}`;
    if (areas) {
      if (query) query += `${query ? "&" : ""}service_areas=${areas}`;
    }

    // Always switch to the generic "search" route when using the multi-select filter bar
    navigate(`/services/home/search?${query}&page=1`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    navigate(`${location.pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);

        if (!serviceType) {
          setProviders([]);
          setShowNoResults(true);
          return;
        }

        let res;

        // 🔹 FLOW 3: MULTI-SELECT SEARCH (Sync with all possible params)
        if (serviceTypesParam || areasParam || categoriesParam) {
          res = await searchProviders(
            categoriesParam || "",
            serviceTypesParam || "",
            areasParam || "",
            currentPage
          );
        }

        // 🔹 FLOW 1: HERO SEARCH (Legacy Single)
        else if (areaId && serviceType && serviceType !== "search") {
          res = await fetchProvidersByArea(serviceType, areaId, currentPage);
        }

        // 🔹 FLOW 2: CATEGORY → SERVICE TYPE
        else if (categoryId && serviceType && serviceType !== "search") {
          res = await fetchProvidersByCategory(categoryId, serviceType, currentPage);
        }

        else {
          setProviders([]);
          setShowNoResults(true);
          return;
        }

        const data = res?.data?.data?.providers || [];
        setProviders(data);
        setShowNoResults(data.length === 0);
        setTotalPages(res?.data?.data?.pagination?.total_pages || 1);

      } catch (err) {
        console.error("Provider fetch failed", err);
        setShowNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceType, categoryId, areaId, categoriesParam, areasParam, currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />


      <SearchFilterBar
        categories={serviceTypes}
        areas={locations}
        selectedCategories={selectedTypes}
        selectedAreas={selectedAreas}
        onCategoryChange={setSelectedTypes}
        onAreaChange={setSelectedAreas}
        onSearch={handleSearchUpdate}
      />

      <TitleAndViewBar
        config={config}
        viewMode={viewMode}        // ✅ REAL STATE
        setViewMode={setViewMode}  // ✅ REAL SETTER
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ResultsSection
          viewMode={viewMode}
          showNoResults={showNoResults}
          providers={providers}
          serviceType={serviceType}
          clearAllFilters={() => {
            setSelectedTypes([]);
            setSelectedAreas([]);
            navigate("/services/home/search?page=1");
          }}
          loading={loading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ServiceProviderListing;
