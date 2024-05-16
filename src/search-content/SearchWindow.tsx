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
  padding: "20px",
  width: "100%",
  maxWidth: "800px",
  height: "100%",
  maxHeight: "600px",
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ marginBottom: "10px" }}>
                <SearchForm />
              </div>
              <div
                style={{
                  overflowY: "scroll",
                  marginBottom: "13px",
                  flex: "1 1 auto",
                }}
              >
                <SearchView />
              </div>
              <PremiumCtaView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
