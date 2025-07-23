import { create } from 'zustand';

type TourGalleryStore = {
  showGridModal: boolean;
  showSliderModal: boolean;
  currentImage: number;

  openGridModal: () => void;
  closeGridModal: () => void;

  openSliderModal: (index: number) => void;
  closeSliderModal: () => void;

  setCurrentImage: (index: number) => void;
};

export const useTourGalleryStore = create<TourGalleryStore>((set) => ({
  showGridModal: false,
  showSliderModal: false,
  currentImage: 0,

  openGridModal: () => set({ showGridModal: true }),
  closeGridModal: () => set({ showGridModal: false }),

  openSliderModal: (index) => set({ currentImage: index, showSliderModal: true, showGridModal: false }),
  closeSliderModal: () => set({ showSliderModal: false, showGridModal: true }),

  setCurrentImage: (index) => set({ currentImage: index }),
}));
