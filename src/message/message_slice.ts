import { createSlice } from "@reduxjs/toolkit";

export type MessageState = {};

const initial: MessageState = {};

export const messageSlice = createSlice({
  name: "message",
  initialState: initial,
  reducers: {},
});
