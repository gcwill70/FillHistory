import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ActiveElementState = {
  id: string | undefined;
};

const initialActiveElementState: ActiveElementState = {
  id: undefined,
};

export const activeElementSlice = createSlice({
  name: "activeElement",
  initialState: initialActiveElementState,
  reducers: {
    onChange(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});
