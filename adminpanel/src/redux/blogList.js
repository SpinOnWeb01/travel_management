import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/travel-blogs");
  return response.data;
});

// Async thunk for deleting a blog
export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (id) => {
  await axios.delete(`http://localhost:5000/api/v1/travel-blogs/${id}`);
  return id;
});

const blogList = createSlice({
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

export default blogList.reducer;
