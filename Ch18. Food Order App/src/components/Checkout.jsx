import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import { useActionState } from "react";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
//   const [] = useActionState(checkoutAction, {});

  const cartTotal = cartCtx.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  function handleClose() {
    userProgressCtx.closeCheckout();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    console.log(customerData)

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }

  return (
    <Modal
      open={userProgressCtx.userProgress === "checkout"}
      onClose={handleClose}
    >
      <h2>Checkout</h2>
      <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
      <form onSubmit={handleSubmit}>
        <Input type="text" id="name" label="Full Name" />
        <Input type="email" id="email" label="E-Mail Address" />
        <Input type="text" id="street" label="Street" />
        <div className="control-row">
          <Input type="text" id="postal-code" label="Postal Code" />
          <Input type="text" id="city" label="City" />
        </div>
        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </div>
      </form>
    </Modal>
  );
}
