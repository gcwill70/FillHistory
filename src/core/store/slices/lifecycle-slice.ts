import { createSlice } from "@reduxjs/toolkit";

export type LifecycleStatus = "initial" | "loading" | "done" | "error";

export type LifecycleState = {
  init: {
    status: LifecycleStatus;
    dependencies: { reload: LifecycleStatus };
  };
  deinit: {
    status: LifecycleStatus;
    dependencies: {};
  };
};

const initialLifecycleState: LifecycleState = {
  init: {
    status: "initial",
    dependencies: {
      reload: "done", // disable reloading on startup
    },
  },
  deinit: {
    status: "initial",
    dependencies: {},
  },
};

export const lifecycleSlice = createSlice({
  name: "lifecycle",
  initialState: initialLifecycleState,
  reducers: {
    initStart() {},
    initReloading(state) {
      state.init.dependencies.reload = "loading";
    },
    initReloaded(state) {
      state.init.dependencies.reload = "done";
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
