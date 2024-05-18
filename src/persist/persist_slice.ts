import { createSlice } from "@reduxjs/toolkit";

export const persistSlice = createSlice({
  name: "message/persist",
  initialState: {},
  reducers: {
    save() {},
    restore() {},
    sync() {},
  },
});
