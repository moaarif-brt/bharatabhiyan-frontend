import { api } from "@/lib/api";

export const fetchProvidersByCategory = (
  categoryId: string,
  serviceTypeId: string
) => {
  return api.get(
    `/services/?categories=${categoryId}&service_types=${serviceTypeId}`
  );
};

export const fetchProvidersByArea = (
  serviceTypeId: string,
  areaId: string
) => {
  return api.get(
    `/providers/by-area/?service_types=${serviceTypeId}&service_areas=${areaId}`
  );
};
