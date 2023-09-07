import CommandsView from "../../commands/commands_view";

const appStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f6f8fa",
  color: "#333",
};

export default function App() {
  return (
    <div style={appStyle}>
      <CommandsView />
    </div>
  );
}
