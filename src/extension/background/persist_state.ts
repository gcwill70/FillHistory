import { BackgroundState } from "./store/reducer";

export async function saveState() {
  const state = getState();
  if (!state) {
    return;
  }
  await chrome.storage.local.set({ state });
}

export async function getState(): Promise<BackgroundState | undefined> {
  const res = await chrome.storage.local.get(["state"]);
  const state: BackgroundState = res.state;
  if (!state) {
    return;
  }
  return state;
}
