import { lifecycleSlice } from "../../lifecycle-background/lifecycle_slice";
import { store } from "./store";

store.dispatch(lifecycleSlice.actions.initStart());
