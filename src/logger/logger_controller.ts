import { createListenerMiddleware } from "@reduxjs/toolkit";

const loggerController = createListenerMiddleware();

// init
loggerController.startListening({
  predicate: (action) => true,
  effect: async (action, api) => {
    console.debug({ type: action.type, payload: action.payload });
  },
});

export default loggerController;
