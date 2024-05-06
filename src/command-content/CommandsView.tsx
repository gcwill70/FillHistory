import { useSelector } from "react-redux";

export default function CommandsView() {
  const command = useSelector((state: any) =>
    state.commands.commands.find((command: any) => command.name === "search")
  );

  const handleChangeShortcut = () => {
    chrome.tabs.create({ url: "chrome://extensions/shortcuts" });
  };

  return (
    <div className="flex flex-row align-center">
      <p className="mr-2">Shortcut:</p>
      <span
        className={`underline cursor-pointer whitespace-nowrap ${
          command?.shortcut ? "text-blue-500" : "text-red-500"
        }`}
        onClick={handleChangeShortcut}
      >
        {command?.shortcut || "Not Set"}
      </span>
    </div>
  );
}
