import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";

import BreadcrumbBar from "@/components/ui/services/BreadcrumbBar";
import TitleAndViewBar from "@/components/ui/services/TitleAndViewBar";
import ResultsSection from "@/components/ui/services/ResultsSection";

import {
  fetchProvidersByCategory,
  fetchProvidersByArea,
} from "@/api/services";

const ServiceProviderListing = () => {
  // 🔑 PATH PARAMS
  const { serviceType, categoryId } = useParams<{
    serviceType: string;
    categoryId?: string;
  }>();

  // 🔑 QUERY PARAMS
  const [searchParams] = useSearchParams();
  const areaId = searchParams.get("area");

  // ✅ REQUIRED UI STATES
  const [viewMode, setViewMode] = useState<"list" | "grid" | "map">("list");
  const [sortBy, setSortBy] = useState("relevance");

  // ✅ DATA STATES
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNoResults, setShowNoResults] = useState(false);

  const config = {
    title:
      providers.length > 0
        ? providers[0].service_type_name || providers[0].category_name
        : "Service Provider",
    count: providers.length,
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

        // 🔹 FLOW 1: HERO SEARCH
        if (areaId) {
          res = await fetchProvidersByArea(serviceType, areaId);
        }

        // 🔹 FLOW 2: CATEGORY → SERVICE TYPE
        else if (categoryId) {
          res = await fetchProvidersByCategory(categoryId, serviceType);
        }

        else {
          setProviders([]);
          setShowNoResults(true);
          return;
        }

        const data = res?.data?.data?.providers || [];
        setProviders(data);
        setShowNoResults(data.length === 0);

      } catch (err) {
        console.error("Provider fetch failed", err);
        setShowNoResults(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceType, categoryId, areaId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <BreadcrumbBar config={config} />

      <TitleAndViewBar
        config={config}
        viewMode={viewMode}        // ✅ REAL STATE
        setViewMode={setViewMode}  // ✅ REAL SETTER
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <ResultsSection
          viewMode={viewMode}      // ✅ SAME STATE
          showNoResults={showNoResults}
          providers={providers}
          serviceType={serviceType}
          clearAllFilters={() => {}}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ServiceProviderListing;
