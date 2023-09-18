import { createSlice } from "@reduxjs/toolkit";
import { SearchItem } from "../search/model/search_item";

export type FavoritesState = {
  items: SearchItem[];
};

const initial: FavoritesState = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initial,
  reducers: {},
});
