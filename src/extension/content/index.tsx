import { Store } from "webext-redux";
import { subscribeListeners } from "./listeners";

export * from "./listeners";

(async () => {
  const store = new Store();

  await store.ready();

  subscribeListeners(store);

  // const root = document.createElement("div");
  // root.id = "browser-extension-template";
  // document.body.appendChild(root);

  // ReactDOM.createRoot(root).render(
  //   <Provider store={store as IStore}>
  //     <React.StrictMode>
  //       <App />
  //     </React.StrictMode>
  //   </Provider>
  // );
})();
