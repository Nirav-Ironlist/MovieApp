import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const status = Object.freeze({
  IDEL: "IDEL",
  LODING: "LODING",
  ERROR: "ERROR",
});
const initialState = {
  status: status.IDEL,
  data: [],
};

const MoviesList = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fatchMoviesList.pending, (state) => {
      state.status = status.LODING;
    });
    builder.addCase(fatchMoviesList.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = status.IDEL;
    });
    builder.addCase(fatchMoviesList.rejected, (state) => {
      state.status = status.ERROR;
    });
  },
});

export default MoviesList.reducer;

export const fatchMoviesList = createAsyncThunk(
  "MoviesList/fetch",
  async (id) => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/find",
      params: { q: id },
      headers: {
        "X-RapidAPI-Key": "dc6234c917msh06b2e86aa1f906cp1a9845jsnd8895412a4bf",
        "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);
