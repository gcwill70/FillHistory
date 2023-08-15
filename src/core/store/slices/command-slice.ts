import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const commandSlice = createSlice({
  name: "command",
  initialState: {},
  reducers: {
    command(state, action: PayloadAction<string>) {},
  },
});
