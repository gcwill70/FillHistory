import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Command } from "../../../browser";

export interface ICommandPayload {
  command: Command;
}

export interface ICommandState {
  current: Command;
}

const initialConfigState: ICommandState = {
  current: {
    type: "",
  },
};

export const commandSlice = createSlice({
  name: "command",
  initialState: initialConfigState,
  reducers: {
    setCommand(state, action: PayloadAction<ICommandPayload>) {
      state.current = action.payload.command;
    },
  },
});
