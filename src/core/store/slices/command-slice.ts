import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICommandPayload {
  command: String;
}

export const commandSlice = createSlice({
  name: "command",
  initialState: undefined,
  reducers: {
    command(state, action: PayloadAction<ICommandPayload>) {},
  },
});
