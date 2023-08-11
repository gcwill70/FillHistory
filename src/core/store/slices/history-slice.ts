import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HistoryItem, HistoryQuery } from "../../../history";

export type IHistoryState = {
  items: HistoryItem[];
  status: "idle" | "loading" | "error";
};

const initialHistoryState: IHistoryState = {
  items: [],
  status: "idle",
};

export const historySlice = createSlice({
  name: "history",
  initialState: initialHistoryState,
  reducers: {
    queryStart: (state, action: PayloadAction<HistoryQuery>) => {
      state.status = "loading";
    },
    queryDone: (state, action: PayloadAction<HistoryItem[]>) => {
      state.items = action.payload;
      state.status = "idle";
    },
    queryError: (state) => {
      state.status = "error";
    },
  },
});
