import { configureStore } from "@reduxjs/toolkit";
import MoviesList from './ImbdApiSlice';
const store = configureStore({
  reducer: {
    MoviesList
  },
});
export default store;
