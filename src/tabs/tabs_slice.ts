import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tab } from ".";

export interface SetTabPayload {
  tab: Tab;
}

export interface TabsState {
  current: Tab;
}

const initial: TabsState = {
  current: {
    id: -1,
  },
};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState: initial,
  reducers: {
    setTab(state, action: PayloadAction<SetTabPayload>) {
      state.current = action.payload.tab;
    },
  },
});
