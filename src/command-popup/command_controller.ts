import { createListenerMiddleware } from "@reduxjs/toolkit";
import { commandSlice } from "../command/command_slice";
import { lifecycleSlice } from "../lifecycle-background/lifecycle_slice";

const commandController = createListenerMiddleware();

commandController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    api.dispatch(commandSlice.actions.getCommands());
  },
});

export default commandController;
