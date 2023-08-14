import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../../../browser";

export interface ISetTabPayload {
  tab: Tab;
}

export interface ITabsState {
  current: Tab;
}

const initialTabState: ITabsState = {
  current: {
    id: -1,
  },
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: initialTabState,
  reducers: {
    setTab(state, action: PayloadAction<ISetTabPayload>) {
      state.current = action.payload.tab;
    },
  },
});
