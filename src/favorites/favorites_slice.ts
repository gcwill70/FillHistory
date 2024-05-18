import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FavoriteItem } from "./favorites.types";

export type FavoritesState = {
  items: FavoriteItem[];
};

const initial: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: "message/favorites",
  initialState: initial,
  reducers: {
    add: (state, action: PayloadAction<FavoriteItem>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<FavoriteItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    restore: (state, action) => {
      state.items = action.payload;
    },
  },
});
