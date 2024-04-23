import { useDispatch, useSelector } from "react-redux";
import { premiumSlice } from "./premium_slice";

const layoutStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const textStyle: React.CSSProperties = {
  fontSize: "15px",
  margin: "0px",
  padding: "0px",
};

const linkStyle: React.CSSProperties = {
  color: "#0073e6",
  cursor: "pointer",
  textDecoration: "underline",
};

function PremiumCtaView() {
  const paid = useSelector((state: any) => state.payment.user.paid);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(premiumSlice.actions.openPage());
  };

  return paid ? (
    <></>
  ) : (
    <div style={layoutStyle}>
      <p style={textStyle}>
        Want to save even more keystrokes?{" "}
        <span style={linkStyle} onClick={handleClick}>
          Get Premium!
        </span>
      </p>
    </div>
  );
}

export default PremiumCtaView;
