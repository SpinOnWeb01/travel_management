import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogs";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
