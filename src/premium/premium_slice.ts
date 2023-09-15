import { createSlice } from "@reduxjs/toolkit";

export interface PremiumState {}

const initial: PremiumState = {};

export const premiumSlice = createSlice({
  name: "premium",
  initialState: initial,
  reducers: {
    openPage(state) {},
  },
});
