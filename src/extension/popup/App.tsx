import CommandsView from "../../command-content/CommandsView";

const appStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f6f8fa",
  color: "#333",
  padding: "10px",
};

export default function App() {
  return (
    <div style={appStyle}>
      <CommandsView />
    </div>
  );
}
