import { throttle } from "@github/mini-throttle";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchSlice } from "../search/search_slice";

const containerStyle: React.CSSProperties = {
  width: "100%",
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

export default function SearchForm() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const throttledSearch = throttle((queryText: string) => {
    dispatch(
      searchSlice.actions.queryStart({
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
        id="search-form-input"
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder=""
        style={inputStyle}
      />
    </div>
  );
}
