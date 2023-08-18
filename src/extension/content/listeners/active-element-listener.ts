import { createStore } from "../../../core";

export let activeElement: HTMLInputElement | HTMLTextAreaElement | undefined;

export function activeElementListener(store: ReturnType<typeof createStore>) {
  document.addEventListener("input", captureElement);
  document.addEventListener("focus", captureElement);
  document.addEventListener("focusin", captureElement);
  document.addEventListener("change", captureElement);
  document.addEventListener("paste", captureElement);
}

function captureElement(event: Event) {
  console.log(`event: ${event.type}`);
  try {
    const element = event.target as HTMLElement;
    console.log(`focusin: ${element.attributes}`);
    if (element.id !== "history-form-input") {
      if (element.nodeName === "INPUT") {
        activeElement = element as HTMLInputElement;
        console.log(`focusin: ${activeElement?.contentEditable}`);
      } else if (element.nodeName === "TEXTAREA") {
        activeElement = element as HTMLTextAreaElement;
        console.log(`focusin: ${activeElement?.contentEditable}`);
      }
    }
  } catch (e) {
    activeElement = undefined;
  }
}
