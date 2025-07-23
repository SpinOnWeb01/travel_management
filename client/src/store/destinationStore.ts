// src/store/destinationStore.ts

import { create } from 'zustand';
import { fetchDestinationsFromAPI } from '@/lib/destinationApi';

type Destination = {
  id: number;
  name: string;
  image: string;
  category_slug: string;
};

type DestinationStore = {
  heading: string;
  subtitle: string;
  destinations: Destination[];
  loading: boolean;
  fetchDestinations: () => Promise<void>;
};

export const useDestinationStore = create<DestinationStore>((set) => ({
  heading: "Popular Destinations Outside India",
  subtitle: "Best Places for you",
  destinations: [],
  loading: true,

  fetchDestinations: async () => {
    set({ loading: true });
    const data = await fetchDestinationsFromAPI();
    set({ destinations: data, loading: false });
  },
}));
