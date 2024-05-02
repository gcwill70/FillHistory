import { createListenerMiddleware } from "@reduxjs/toolkit";
import { messageSlice } from "../message/message_slice";
import { commandsSlice } from "./commands_slice";

const commandsController = createListenerMiddleware();

commandsController.startListening({
  actionCreator: messageSlice.actions.onMessage,
  effect: (action, api) => {
    console.debug("commands.onMessage (content)", action.payload);
    api.dispatch(
      commandsSlice.actions.command(action.payload["commands/command"])
    );
  },
});

export default commandsController;
