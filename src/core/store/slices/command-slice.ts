import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Command } from "../../../commands";

export interface SetCommandsPayload {
  commands: Command[];
}

export interface CommandsState {
  commands: Command[];
}

const initialCommandState: CommandsState = {
  commands: [],
};

export const commandSlice = createSlice({
  name: "command",
  initialState: initialCommandState,
  reducers: {
    command(state, action: PayloadAction<string>) {},
    getCommands(state) {},
    setCommands(state, action: PayloadAction<SetCommandsPayload>) {
      state.commands = action.payload.commands;
    },
  },
});
