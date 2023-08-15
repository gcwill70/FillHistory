import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CommandState = {
  command: string | undefined;
};

const initialCommandState: CommandState = {
  command: undefined,
};

export const commandSlice = createSlice({
  name: "command",
  initialState: initialCommandState,
  reducers: {
    command(state, action: PayloadAction<string>) {},
  },
});
