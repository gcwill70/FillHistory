import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Command } from ".";

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
  name: "command",
  initialState: initial,
  reducers: {
    command(state, action: PayloadAction<string>) {},
    getCommands(state) {},
    setCommands(state, action: PayloadAction<SetCommandsPayload>) {
      state.commands = action.payload.commands;
    },
  },
});
