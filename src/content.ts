// Listener for keyboard events
document.addEventListener("keydown", function (event) {
    if (event.target.nodeName === "INPUT" || event.target.nodeName === "TEXTAREA") {
        if (event.key === "." && event.ctrlKey) {
            event.preventDefault();
            chrome.runtime.sendMessage({ type: "getHistory" }, function (response) {
                if (response.type === "historyResults") {
                    createHistoryWindow(response.data);
                }
            });
        }
    }
});

// Create and populate the history window
function createHistoryWindow(historyItems) {
    const overlay = document.createElement("div");
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

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search history";
    searchInput.style.cssText = `
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
    `;

    const resultsList = document.createElement("ul");
    resultsList.style.cssText = `
      list-style: none;
      padding: 0;
      margin: 0;
    `;

    for (const historyItem of historyItems) {
        const listItem = document.createElement("li");
        listItem.textContent = historyItem.title;
        listItem.style.cssText = `
        padding: 5px;
        cursor: pointer;
        background-color: #f5f5f5;
        margin-bottom: 5px;
        border-radius: 3px;
      `;

        listItem.addEventListener("click", function () {
            const link = document.activeElement.value || document.activeElement.textContent;
            fillTextField(link);
            closeHistoryWindow();
        });

        resultsList.appendChild(listItem);
    }

    window.appendChild(searchInput);
    window.appendChild(resultsList);
    overlay.appendChild(window);
    document.body.appendChild(overlay);

    // Focus on search input
    searchInput.focus();

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

    function fillTextField(link) {
        const activeElement = document.activeElement;
        if (activeElement.nodeName === "INPUT" || activeElement.nodeName === "TEXTAREA") {
            activeElement.value = link;
        }
    }
}
