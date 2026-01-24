import { create } from "zustand";

type RegistrationState = {
  currentStep: number;
  profile: any;
  setStep: (step: number) => void;
  setProfile: (data: any) => void;
};

export const useProviderRegistration = create<RegistrationState>((set) => ({
  currentStep: 1,
  profile: null,
  setStep: (step) => set({ currentStep: step }),
  setProfile: (data) => set({ profile: data }),
}));
