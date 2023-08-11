import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../core";
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

export default function HistoryView() {
  const { items } = useSelector((state: RootState) => state.history);
  const { id } = useSelector((state: RootState) => state.activeElement);

  return (
    <div id="history-window" style={overlayStyle}>
      <div id="window" style={windowStyle}>
        <ul id="results-list" style={resultsListStyle}>
          {items.map((item: HistoryItem, i: number) => {
            return (
              <li
                style={listItemStyle}
                key={`results-list-${i}`}
                onClick={() => {
                  if (id) {
                    let activeElement = document.getElementById(
                      id
                    ) as HTMLElement;
                    if (activeElement.nodeName === "INPUT") {
                      (activeElement as HTMLInputElement).value = item.url!;
                    } else if (activeElement.nodeName === "TEXTAREA") {
                      (activeElement as HTMLTextAreaElement).value = item.url!;
                    }
                  }
                }}
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
