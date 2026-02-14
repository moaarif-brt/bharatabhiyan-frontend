import { api, publicApi } from "@/lib/api";

export const saveProviderDraft = (data: FormData) =>
  api.post("/providers/profile", data, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const createRegistrationPayment = async (userId: number) => {
  const res = await api.post("/payments/registration/create-link", {
    user_id: userId,
  });
  return res.data; // { payment_url, payment_id }
};

export const submitProviderProfile = (data: FormData) =>
  api.post("/providers/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const submitProviderApplication = (data: {
  confirm_declaration: boolean;
  accept_terms: boolean;
  consent_kyc: boolean;
}) => api.post("/providers/profile/submit", data);

export const fetchProviderProfile = () =>
  api.get("/providers/profile/me");

export const fetchProviderProfileByUserId = (userId: string | number) =>
  publicApi.post("/providers/profile/me", {
    user_id: userId,
  });

export const fetchServiceCategories = () =>
  publicApi.get("/providers/categories");

export const fetchServiceTypes = () =>
  publicApi.get("/providers/service-types");

export const fetchServiceAreas = (cityId: string) =>
  publicApi.get(`/providers/service-areas?location_id=${cityId}`);

// Captain APIs
export const fetchPendingProviders = () =>
  api.get("/captain/pending-providers/");

export const verifyProvider = (data: FormData) =>
  api.post("/captain/verify-provider/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
