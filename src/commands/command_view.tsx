import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, commandSlice } from "../core";

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  marginRight: "8px",
};

const shortcutSetStyle: React.CSSProperties = {
  color: "#0073e6",
  textDecoration: "underline",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const shortcutNotSetStyle: React.CSSProperties = {
  color: "red",
  textDecoration: "underline",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

function CommandView() {
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

  let shortcutStyle = shortcutNotSetStyle;
  let shortcutText = "Not Set";
  if (command?.shortcut) {
    shortcutStyle = shortcutSetStyle;
    shortcutText = command.shortcut;
  }

  return (
    <div style={rowStyle}>
      <p style={labelStyle}>Shortcut:</p>
      <span style={shortcutStyle} onClick={handleChangeShortcut}>
        {shortcutText}
      </span>
    </div>
  );
}

export default CommandView;
