 [Chrome Web Store](https://chrome.google.com/webstore/detail/fillhistory/nnbagffnngmfbogaajipjmaadglmjgjc)

&nbsp;

https://github.com/gcwill70/FillHistory/assets/25019832/026d6cbc-8c6e-4dc4-b2fc-62675f27d3b5

# Features
* Open/close search window right-click or keyboard shortcut (defaults to `Ctrl+Shift+X`).
* Search through history. Results continuously update as you type.
* Use keyboard arrows to select a result.
* URL is inserted into last text box you selected.

# Tech Stack
* TypeScript
* webpack
* React (ui)
* Redux (state management)
* webext-redux (background and content script state syncing)

# Architecture

## `src/commands`
Stores and updates current command keyboard shortcuts.

## `src/core`
All logic for app infrastructure including Redux store creation.
Includes slice definitions for:
* Selected element on the page
* Last extension command that was dispatched
* History query results
* Lifecycle state for each lifecycle event
* Currently active tab

## `src/extension/background`
Background service worker that executes background browser logic.
Includes:
* Registering listener for `tabs.onActivated` and updating Redux store with active tab.
* Listening for `comands.onCommand` and dispatching actions to Redux store.

## `src/extension/content`
Content script for the extension that:
* Renders the `src/content/App.tsx` React component
* Listens for the `focusin` DOM event to update the currently selected text box in the Redux store.


## `src/history`
All logic to interact with the browser history API:
* Searching history given a query
* `history-controller` middleware that will execute the query and update the results in the store.
* Slice definition:
```typescript
export type HistoryState = {
  items: HistoryItem[];
  status: "idle" | "loading" | "error";
  window: { show: boolean };
};
```

## `src/tabs`
Stores the currently active tab in the Redux store.

# Acknowledgements
Credit to https://github.com/puemos/browser-extension-template for architecture and structure!
