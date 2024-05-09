import SearchWindow from "../../search-content/SearchWindow";

const appStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f6f8fa",
  color: "#333",
};

export default function App() {
  return (
    <div style={appStyle}>
      <SearchWindow />
    </div>
  );
}
