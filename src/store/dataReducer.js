import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
};

const dataSlice = createSlice({
  name: "Data",
  initialState,
  reducers: {
    favorite(state, action) {
      state.favorite = [...state.favorite, ...action.payload];
    },
    unFavorite(state, action) {
      state.favorite = state.favorite.filter((v) => v.id !== action.payload);
    },
  },
});

export const { unFavorite, favorite } = dataSlice.actions;
export default dataSlice.reducer;
