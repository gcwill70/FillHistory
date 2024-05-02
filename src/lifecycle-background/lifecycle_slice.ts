import { createSlice } from "@reduxjs/toolkit";

export type LifecycleStatus = "initial" | "loading" | "done" | "error";

export type LifecycleDependency = {
  name: string;
  status: LifecycleStatus;
};

export type LifecycleState = {
  init: {
    status: LifecycleStatus;
    dependencies: LifecycleDependency[];
  };
  deinit: {
    status: LifecycleStatus;
    dependencies: LifecycleDependency[];
  };
};

const initial: LifecycleState = {
  init: {
    status: "initial",
    dependencies: [],
  },
  deinit: {
    status: "initial",
    dependencies: [],
  },
};

export const lifecycleSlice = createSlice({
  name: "lifecycle",
  initialState: initial,
  reducers: {
    initStart(state) {
      state.init.status = "loading";
    },
    initDone(state) {
      state.init.status = "done";
    },
    deinitStart(state) {
      state.deinit.status = "loading";
    },
    deinitDone(state) {
      state.deinit.status = "done";
    },
  },
});
