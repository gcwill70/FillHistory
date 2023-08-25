import { throttle } from "@github/mini-throttle";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core";
import { historySlice } from "../core/store/slices/history-slice";

const containerStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px",
  backgroundColor: "#f6f8fa",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  borderRadius: "5px",
};

const inputStyle: React.CSSProperties = {
  flex: "1",
  padding: "8px",
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "16px",
};

export default function HistoryForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const showWindow = useSelector(
    (state: RootState) => state.history.window.show
  );
  useEffect(() => {
    const inputElement = document.getElementById("history-form-input");
    if (showWindow && inputElement) {
      inputElement.focus();
    }
  }, [showWindow]);

  const throttledSearch = throttle((queryText: string) => {
    dispatch(
      historySlice.actions.queryStart({
        text: queryText,
        maxResults: 250,
        startTime: new Date("2000-01-01T00:00:00Z").getTime(),
      })
    );
  }, 500);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    throttledSearch(newText);
  };

  return (
    <div style={containerStyle}>
      <input
        id="history-form-input"
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Search history"
        style={inputStyle}
      />
    </div>
  );
}
