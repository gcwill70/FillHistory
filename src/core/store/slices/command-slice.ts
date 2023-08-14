import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ICommandState = {
  command: string;
};

const initialCommandState: ICommandState = {
  command: "",
};

export const commandSlice = createSlice({
  name: "command",
  initialState: initialCommandState,
  reducers: {
    command(state, action: PayloadAction<string>) {},
  },
});
