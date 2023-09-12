import { createSlice } from "@reduxjs/toolkit";

export type LifecycleStatus = "initial" | "loading" | "done" | "error";

export type LifecycleState = {
  init: {
    status: LifecycleStatus;
    dependencies: { loadHistory: LifecycleStatus };
  };
  deinit: {
    status: LifecycleStatus;
    dependencies: {};
  };
};

const initial: LifecycleState = {
  init: {
    status: "initial",
    dependencies: {
      loadHistory: "initial",
    },
  },
  deinit: {
    status: "initial",
    dependencies: {},
  },
};

export const lifecycleSlice = createSlice({
  name: "lifecycle",
  initialState: initial,
  reducers: {
    initStart(state) {
      state.init.status = "loading";
    },
    initHistoryLoading(state) {
      state.init.dependencies.loadHistory = "loading";
    },
    initHistoryLoaded(state) {
      state.init.dependencies.loadHistory = "done";
    },
    initDone(state) {
      state.init.status = "done";
    },
    deinitStart() {},
    deinitDone(state) {
      state.deinit.status = "done";
    },
  },
});
