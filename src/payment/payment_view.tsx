import { useDispatch } from "react-redux";
import { paymentSlice } from "./payment-slice";

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const linkStyle: React.CSSProperties = {
  color: "#0073e6",
  textDecoration: "underline",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const link2Style: React.CSSProperties = {
  color: "grey",
  fontSize: "12px",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const spacerStyle: React.CSSProperties = {
  margin: "0 10px",
};

function PaymentView() {
  const dispatch = useDispatch();

  const handleRegister = () => {
    dispatch(paymentSlice.actions.register());
  };

  const handleRestore = () => {
    dispatch(paymentSlice.actions.restore());
  };

  return (
    <div style={rowStyle}>
      <p style={linkStyle} onClick={handleRegister}>
        Get Premium to save even more keystrokes!
      </p>
      <span style={spacerStyle}></span>
      <p style={link2Style} onClick={handleRestore}>
        (Restore Purchase)
      </p>
    </div>
  );
}

export default PaymentView;
