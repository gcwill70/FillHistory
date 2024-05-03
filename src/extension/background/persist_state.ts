export async function saveState() {
  const state = getState();
  if (!state) {
    return;
  }
  await chrome.storage.local.set({ state });
}

export async function getState(): Promise<any> {
  const res = await chrome.storage.local.get(["state"]);
  return res.statete;
}
