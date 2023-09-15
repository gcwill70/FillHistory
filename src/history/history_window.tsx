import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../core";
import HistoryForm from "./history_form";
import HistoryView from "./history_view";
import { activeElement } from "../extension/content/listeners/active_element_listener";
import { useEffect } from "react";
import { historySlice } from "./history_slice";
import PremiumCtaView from "../premium/premium_cta_view";

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
  padding: "5px",
};

export default function HistoryWindow() {
  const show = useSelector((state: RootState) => state.history.window.show);
  const dispatch = useDispatch();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(historySlice.actions.window(false));
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById("history-form-input");
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
              <HistoryForm />
              <div style={{ marginBottom: "10px" }} />
              <div style={listStyle}>
                <HistoryView />
              </div>
              <PremiumCtaView />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
