import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../../../tabs";

export interface SetTabPayload {
  tab: Tab;
}

export interface TabsState {
  current: Tab;
}

const initialTabState: TabsState = {
  current: {
    id: -1,
  },
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: initialTabState,
  reducers: {
    setTab(state, action: PayloadAction<SetTabPayload>) {
      state.current = action.payload.tab;
    },
  },
});
