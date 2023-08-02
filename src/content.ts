chrome.runtime.onMessage.addListener(async function (
  message,
  sender,
  sendResponse
) {
  if (message.type === "historyResults") {
    createHistoryWindow(message.results);
  }
});

function createHistoryWindow(historyItems: chrome.history.HistoryItem[]) {
  console.log(`createHistoryWindow`);
  const activeElement = document.activeElement!;
  const overlay =
    document.getElementById("history-window") ?? document.createElement("div");
  overlay.setAttribute("id", "history-window");
  overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 9999;
    `;

  const window = document.createElement("div");
  window.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      width: 400px;
      max-height: 400px;
      overflow-y: auto;
    `;

  // const searchInput = document.createElement("input");
  // searchInput.type = "text";
  // searchInput.placeholder = "Search history";
  // searchInput.style.cssText = `
  //   width: 100%;
  //   padding: 10px;
  //   margin-bottom: 10px;
  //   box-sizing: border-box;
  // `;
  // searchInput.onsubmit = function (event) {
  //   chrome.runtime.sendMessage({
  //     type: "getHistory",
  //     text: event.submitter?.textContent,
  //   });
  //   closeHistoryWindow();
  // };

  const resultsList = document.createElement("ul");
  resultsList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 0;
    `;

  for (let i = 0; i < historyItems.length; ++i) {
    try {
      const content = historyItems[i].url!;
      const listItem = document.createElement("li");
      listItem.textContent = content;
      listItem.style.cssText = `
            padding: 5px;
            cursor: pointer;
            background-color: #f5f5f5;
            margin-bottom: 5px;
            border-radius: 3px;`;

      listItem.addEventListener("click", function (ev) {
        closeHistoryWindow();
        fillTextField(content);
      });
      resultsList.appendChild(listItem);
    } catch (e) {
      console.log(e);
    }
  }

  // window.appendChild(searchInput);
  window.appendChild(resultsList);
  overlay.appendChild(window);
  document.body.appendChild(overlay);

  // Focus on search input
  // searchInput.focus();

  // Close the history window when clicking outside
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeHistoryWindow();
    }
  });

  // Close the history window when pressing Esc key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeHistoryWindow();
    }
  });

  function closeHistoryWindow() {
    overlay.remove();
  }

  function fillTextField(link: string) {
    if (activeElement.nodeName === "INPUT") {
      (activeElement as HTMLInputElement).value = link;
    } else if (activeElement.nodeName === "TEXTAREA") {
      (activeElement as HTMLTextAreaElement).value = link;
    }
  }
}
