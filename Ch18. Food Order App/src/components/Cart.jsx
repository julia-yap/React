import { useContext, useEffect } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import CartItem from "./CartItem";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal
      className="cart"
      open={userProgressCtx.userProgress === "cart"}
      onClose={
        userProgressCtx.userProgress === "cart"
          ? userProgressCtx.closeCart
          : null
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onAdd={() => cartCtx.addItem(item)}
            onRemove={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <div className="modal-actions">
        <Button textOnly onClick={userProgressCtx.closeCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={userProgressCtx.openCheckout}>Go to Checkout</Button>
        )}
      </div>
    </Modal>
  );
}
