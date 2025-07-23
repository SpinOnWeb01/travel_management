import { create } from "zustand";

type ProfileFormData = {
  firstname: string;
  lastname: string;
  gender: string;
  dateofbirth: string;
  nationality: string;
  address: string;
  email: string;
  phone: string;
};

type ProfileUpdateState = {
  formData: ProfileFormData;
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  setFormData: (data: Partial<ProfileFormData>) => void;
  submitStart: () => void;
  submitSuccess: () => void;
  submitError: (error: string) => void;
  reset: () => void;
};

const useProfileUpdateStore = create<ProfileUpdateState>((set) => ({
  formData: {
    firstname: "",
    lastname: "",
    gender: "",
    dateofbirth: "",
    nationality: "",
    address: "",
    email: "",
    phone: "",
  },
  isSubmitting: false,
  isSuccess: false,
  error: null,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  submitStart: () => set({ isSubmitting: true, isSuccess: false, error: null }),
  submitSuccess: () => set({ isSubmitting: false, isSuccess: true }),
  submitError: (error) => set({ isSubmitting: false, isSuccess: false, error }),
  reset: () =>
    set({
      isSubmitting: false,
      isSuccess: false,
      error: null,
    }),
}));

export default useProfileUpdateStore;
