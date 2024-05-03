import { createListenerMiddleware } from "@reduxjs/toolkit";
import { messageSlice } from "../message/message_slice";

const commandsController = createListenerMiddleware();

commandsController.startListening({
  actionCreator: messageSlice.actions.onMessage,
  effect: (action, api) => {
    console.debug("commands.onMessage (content)", action.payload);
  },
});

export default commandsController;
