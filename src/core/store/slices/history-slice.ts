import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryItem, HistoryQuery } from "../../../history";

export type HistoryState = {
  items: HistoryItem[];
  selected: number | undefined;
  status: "idle" | "loading" | "error";
  window: { show: boolean };
};

const initialHistoryState: HistoryState = {
  items: [],
  selected: undefined,
  status: "idle",
  window: { show: false },
};

export const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryState,
  reducers: {
    reset(state) {},
    queryStart(state, action: PayloadAction<HistoryQuery>) {
      state.status = "loading";
    },
    queryDone(state, action: PayloadAction<HistoryItem[]>) {
      state.items = action.payload;
      state.status = "idle";
    },
    queryError(state) {
      state.status = "error";
    },
    windowHide(state) {
      state.window.show = false;
    },
    windowToggle(state) {
      state.window.show = !state.window.show;
    },
    selectionReset(state) {
      state.selected = 0;
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
