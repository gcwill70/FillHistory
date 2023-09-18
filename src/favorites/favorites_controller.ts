import { createListenerMiddleware } from "@reduxjs/toolkit";
import { RootState } from "../core";

const favoritesConroller = createListenerMiddleware<RootState>();

// favoritesConroller.startListening({
//     actionCreator: favoritesConroller.actions.queryStart,
//     effect: (action, api) => {},
// });

export default favoritesConroller;
