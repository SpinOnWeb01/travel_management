// src/store/categoryBlogStore.ts

import { create } from 'zustand';
import { fetchCategoryWithBlogs } from '@/lib/categoryBlogapi';

type Blog = {
  id: string | number;
  featured_image?: string;
  main_heading: string;
  slug: string;
  meta_description: string;
  location?: string;
  duration?: string;
  category?: string;
  date?: number | string;
  author?: string;
};

type Category = {
  blogs?: Blog[];
};

type CategoryBlogStore = {
  category: Category | null;
  loading: boolean;
  error: string | null;
  fetchCategoryBlogs: (slug: string, baseUrl: string) => Promise<void>;
};

export const useCategoryBlogStore = create<CategoryBlogStore>((set) => ({
  category: null,
  loading: false,
  error: null,

  fetchCategoryBlogs: async (slug, baseUrl) => {
    try {
      set({ loading: true, error: null });
      const data = await fetchCategoryWithBlogs(slug, baseUrl);
      set({ category: data, loading: false });
    } catch (err: any) {
      set({
        error: err?.message || "Something went wrong",
        loading: false,
      });
    }
  },
}));
