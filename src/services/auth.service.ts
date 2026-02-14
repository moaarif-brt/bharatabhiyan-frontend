import { api } from "@/lib/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  is_captain?: boolean;
  is_provider?: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerWithEmail = async (payload: RegisterPayload) => {
  const res = await api.post("/auth/register", payload);
  return res.data; // { success, user_id, user }
};

export const createRegistrationPayment = async (userId: number) => {
  const res = await api.post("/payments/registration/create-link", {
    user_id: userId,
  });
  return res.data; // { payment_url, payment_id }
};

export const loginWithEmail = async (payload: LoginPayload) => {
  const res = await api.post("/auth/login", payload);
  return res.data; // { success, user, token }
};
