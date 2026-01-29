import { api } from "@/lib/api";

export const fetchProvidersByCategory = (
  categoryId: string,
  serviceTypeId: string,
  page: number = 1
) => {
  return api.get(
    `/services/?categories=${categoryId}&service_types=${serviceTypeId}&page=${page}`
  );
};

export const fetchProvidersByArea = (
  serviceTypeId: string,
  areaId: string,
  page: number = 1
) => {
  return api.get(
    `/providers/by-area/?service_types=${serviceTypeId}&service_areas=${areaId}&page=${page}`
  );
};

export const searchProviders = (
  categories?: string,
  serviceTypes?: string,
  serviceAreas?: string,
  page: number = 1
) => {
  let query = `page=${page}`;
  if (categories) query += `&categories=${categories}`;
  if (serviceTypes) query += `&service_types=${serviceTypes}`;
  if (serviceAreas) {
    query += `&service_areas=${serviceAreas}`;
  }

  return api.get(`/providers/by-area/?${query}`);
};
