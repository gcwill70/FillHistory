import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICommandState = {
  command: string | undefined;
};

const initialCommandState: ICommandState = {
  command: undefined,
};

export const commandSlice = createSlice({
  name: "command",
  initialState: initialCommandState,
  reducers: {
    command(state, action: PayloadAction<string>) {},
  },
});
