import { useDispatch, useSelector } from "react-redux";
import { RootState, commandSlice } from "../../core";
import { useEffect } from "react";

function App() {
  const command = useSelector((state: RootState) =>
    state.command.commands.find((command) => command.name === "showHistory")
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commandSlice.actions.getCommands());
  }, []);

  const handleChangeShortcut = () => {
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  };

  return (
    <div>
      <p>Shortcut: {command?.shortcut ?? "Not Set"}</p>
      <button onClick={handleChangeShortcut}>Change Shortcut</button>
    </div>
  );
}

export default App;
