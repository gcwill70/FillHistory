import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Command } from "../commands/command";

export interface SetCommandsPayload {
  commands: Command[];
}

export interface CommandsState {
  commands: Command[];
}

const initial: CommandsState = {
  commands: [],
};

export const commandsSlice = createSlice({
  name: "commands",
  initialState: initial,
  reducers: {
    command(state, action: PayloadAction<string>) {},
    getCommands(state) {},
    setCommands(state, action: PayloadAction<SetCommandsPayload>) {
      state.commands = action.payload.commands;
    },
  },
});
