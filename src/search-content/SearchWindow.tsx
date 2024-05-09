import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PremiumCtaView from "../premium-content/premium_cta_view";
import SearchForm from "./SearchForm";
import { searchSlice } from "../search/search_slice";
import SearchView from "./SearchView";
import { activeElement } from "../active-element-content/active_element_controller";

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
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  borderRadius: "8px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  padding: "20px",
  width: "80%",
  maxWidth: "1000px",
  height: "600px",
  overflowY: "auto",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const listStyle: React.CSSProperties = {
  flex: "1 1 auto",
  overflowY: "auto",
  padding: "5px 0px",
};

export default function SearchWindow() {
  const show = useSelector((state: any) => state.search.window.show);
  const dispatch = useDispatch();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(searchSlice.actions.window(false));
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById("search-form-input");
    if (show && inputElement) {
      inputElement.focus();
    } else {
      activeElement?.focus();
    }
  }, [show]);

  return (
    <div>
      {show && (
        <div style={overlayStyle} onClick={handleOverlayClick}>
          <div style={windowStyle}>
            <div style={containerStyle}>
              <SearchForm />
              <div style={{ marginBottom: "10px" }} />
              <div style={listStyle}>
                <SearchView />
              </div>
              <div style={{ marginBottom: "13px" }} />
              <PremiumCtaView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
