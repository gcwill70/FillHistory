import { createListenerMiddleware } from "@reduxjs/toolkit";
import { lifecycleSlice } from "../lifecycle-content/lifecycle_slice";

export let activeElement: HTMLInputElement | HTMLTextAreaElement | undefined;

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

const activeElementController = createListenerMiddleware();

activeElementController.startListening({
  actionCreator: lifecycleSlice.actions.initStart,
  effect: (action, api) => {
    document.addEventListener("input", captureElement);
    document.addEventListener("focus", captureElement);
    document.addEventListener("focusin", captureElement);
    document.addEventListener("change", captureElement);
    document.addEventListener("paste", captureElement);
  },
});

export default activeElementController;
