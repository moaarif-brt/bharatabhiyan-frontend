import { api } from "@/lib/api"; // axios instance with auth interceptor

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

export const fetchProviderProfile = () =>
  api.get("/providers/profile/me");

export const fetchProviderProfileByUserId = (userId: string | number) =>
  api.post("/providers/profile/me", {
    user_id: userId,
  });



export const fetchServiceCategories = () =>
  api.get("/providers/categories");

export const fetchServiceTypes = () =>
  api.get("/providers/service-types");

export const fetchServiceAreas = (cityId: string) =>
  api.get(`/providers/service-areas?location_id=${cityId}`);

