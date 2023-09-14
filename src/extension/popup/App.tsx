import CommandsView from "../../commands/commands_view";

const appStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  color: "#333",
};

export default function App() {
  return (
    <div style={appStyle}>
      <CommandsView />
    </div>
  );
}
