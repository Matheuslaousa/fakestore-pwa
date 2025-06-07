import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const itemCount = cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div
      onClick={() => navigate("/cart")}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#f0c14b",
        borderRadius: "50%",
        padding: "10px 15px",
        cursor: "pointer",
        zIndex: 1000,
        fontWeight: "bold"
      }}
    >
      🛒 {itemCount}
    </div>
  );
};

export default CartIcon;
