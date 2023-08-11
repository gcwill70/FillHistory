import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const commandSlice = createSlice({
  name: "command",
  initialState: undefined,
  reducers: {
    command(state, action: PayloadAction<string>) {},
  },
});
