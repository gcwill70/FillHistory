import React from "react";
import { HistoryItem } from "./model/history_item";

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: "9999",
};

const windowStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  maxHeight: "400px",
  overflowY: "auto",
};

const resultsListStyle: React.CSSProperties = {
  listStyle: "none",
  padding: "0",
  margin: "0",
};

const listItemStyle: React.CSSProperties = {
  padding: "5px",
  cursor: "pointer",
  backgroundColor: "#f5f5f5",
  marginBottom: "5px",
  borderRadius: "3px",
};

export default function HistoryView(props: {
  items: HistoryItem[];
  onClick: (item: HistoryItem) => void;
}) {
  // const { getItems, items } = useViewModel();

  // useEffect(() => {
  //   getItems({ text: "" });
  // }, []);

  return (
    <div id="history-window" style={overlayStyle}>
      <div id="window" style={windowStyle}>
        <ul id="results-list" style={resultsListStyle}>
          {props.items.map((item: HistoryItem, i: number) => {
            return (
              <li
                style={listItemStyle}
                key={`results-list-${i}`}
                onClick={() => props.onClick(item)}
              >
                {item.url}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
