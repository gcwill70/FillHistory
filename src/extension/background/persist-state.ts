import { RootState } from "../../core/store";

export async function saveState() {
  const state = getState();
  if (!state) {
    return;
  }
  await chrome.storage.local.set({ state });
}

export async function getState(): Promise<RootState | undefined> {
  const res = await chrome.storage.local.get(["state"]);
  const state: RootState = res.state;
  if (!state) {
    return;
  }
  return state;
}
