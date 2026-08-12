import { useContext } from "react";
import logoImg from "../assets/logo.jpg";

import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext)

  const totalCartItems = cartCtx.items.reduce((totalCount, item) => {
    return totalCount + item.quantity;
  }, 0);

  function handleOpenCart() {
    userProgressCtx.openCart()
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1>ReactFood</h1>
      </div>
      <Button textOnly onClick={handleOpenCart}>Cart ({totalCartItems})</Button>
    </header>
  );
}
