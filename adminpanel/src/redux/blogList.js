import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Thunk to fetch blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await api.get("/travel-blogs");
  return response.data;
});

// Thunk to delete a blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await api.delete(`/travel-blogs/${id}`);
  return id;
});

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.items = state.items.filter((blog) => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
