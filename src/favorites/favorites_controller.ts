import { createListenerMiddleware } from "@reduxjs/toolkit";

const favoritesConroller = createListenerMiddleware();

// favoritesConroller.startListening({
//     actionCreator: favoritesConroller.actions.queryStart,
//     effect: (action, api) => {},
// });

export default favoritesConroller;
