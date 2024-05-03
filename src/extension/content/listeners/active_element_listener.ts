import { createStore } from "../store";

export let activeElement: HTMLInputElement | HTMLTextAreaElement | undefined;

export function activeElementListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("input", captureElement);
  document.addEventListener("focus", captureElement);
  document.addEventListener("focusin", captureElement);
  document.addEventListener("change", captureElement);
  document.addEventListener("paste", captureElement);
}

function captureElement(event: Event) {
  try {
    const element = event.target as HTMLElement;
    if (element.id !== "search-form-input") {
      if (element.nodeName === "INPUT") {
        activeElement = element as HTMLInputElement;
      } else if (element.nodeName === "TEXTAREA") {
        activeElement = element as HTMLTextAreaElement;
      }
    }
  } catch (e) {
    activeElement = undefined;
  }
}
