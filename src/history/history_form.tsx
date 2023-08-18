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
};

const inputStyle: React.CSSProperties = {
  flex: "1",
  marginRight: "8px",
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
