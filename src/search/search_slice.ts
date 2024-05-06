import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SearchItem, SearchQuery } from "./search.types";

export type SearchState = {
  items: SearchItem[];
  selected: number | undefined;
  status: "idle" | "loading" | "error";
  window: { show: boolean };
};

const initial: SearchState = {
  items: [],
  selected: undefined,
  status: "idle",
  window: { show: false },
};

export const searchSlice = createSlice({
  name: "message/search",
  initialState: initial,
  reducers: {
    reset(state) {},
    queryStart(state, action: PayloadAction<SearchQuery>) {
      state.status = "loading";
    },
    queryDone(state, action: PayloadAction<SearchItem[]>) {
      state.items = action.payload;
      state.status = "idle";
      state.selected = 0;
    },
    queryError(state) {
      state.status = "error";
    },
    window(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.window.show = action.payload;
      } else {
        state.window.show = !state.window.show;
      }
    },
    selectionIncrement(state) {
      if (state.items.length > 0) {
        if (
          state.selected === undefined ||
          state.selected >= state.items.length
        ) {
          state.selected = 0;
        } else {
          state.selected = (state.selected + 1) % state.items.length;
        }
      }
    },
    selectionDecrement(state) {
      if (state.items.length > 0) {
        if (state.selected) {
          state.selected =
            (state.selected - 1 + state.items.length) % state.items.length;
        } else {
          state.selected = state.items.length - 1;
        }
      }
    },
  },
});
