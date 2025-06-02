import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogList";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;
