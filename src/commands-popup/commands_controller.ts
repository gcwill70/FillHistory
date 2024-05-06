import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandsSlice } from "../commands/commands_slice";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const commandsController = createListenerMiddleware();

commandsController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    api.dispatch(commandsSlice.actions.getCommands());
  },
});

export default commandsController;
