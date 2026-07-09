import { useContext } from "react";
import logoImg from "../assets/logo.jpg";

import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function Header({ onCartClick }) {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce((totalCount, item) => {
    return totalCount + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>ReactFood</h1>
      </div>
      <Button textOnly onClick={onCartClick}>Cart ({totalCartItems})</Button>
    </header>
  );
}
