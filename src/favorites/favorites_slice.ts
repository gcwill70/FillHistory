import { createSlice } from "@reduxjs/toolkit";
import { remove } from "../utils/array";

export type FavoriteItem = {
  url?: string;
};

export type FavoritesState = {
  items: FavoriteItem[];
};

const initial: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initial,
  reducers: {
    add: (state, action) => {
      state.items.push(action.payload);
    },
    remove: (state, action) => {
      remove(state.items, action.payload);
    },
    restore: (state, action) => {
      state.items = action.payload;
    },
  },
});
