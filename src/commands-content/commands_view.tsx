import { useSelector } from "react-redux";

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

function CommandsView() {
  const command = useSelector((state: any) =>
    state.commands.commands.find((command: any) => command.name === "search")
  );

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

export default CommandsView;
