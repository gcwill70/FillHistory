import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message, MessageResponse } from "./message";

export type MessageState = {};

const initial: MessageState = {};

export const messageSlice = createSlice({
  name: "message",
  initialState: initial,
  reducers: {
    sendMessage(state, action: PayloadAction<Message>) {},
    messageError(state) {},
    onMessage(state, action: PayloadAction<MessageResponse>) {},
  },
});
