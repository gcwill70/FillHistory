import { Middleware } from "@reduxjs/toolkit";
import { commandSlice } from "../store";

export const historyCommandController: Middleware = (store) => (next) => (
  action
) => {
  if (commandSlice.actions.command.match(action)) {
    const command = action.payload.command;
    if (command === "showHistory") {
    }
  }
  return next(action);
};
