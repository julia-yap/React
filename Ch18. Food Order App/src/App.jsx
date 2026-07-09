import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/Modal";
import CartContextProvider from "./store/CartContext";

import { useState } from "react";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);

  function handleOpenCart() {
    setCartIsOpen(true);
  }

  function handleCloseCart() {
    setCartIsOpen(false);
  }

  function handleOpenCheckout() {
    handleCloseCart();
    setCheckoutIsOpen(true);
  }

  function handleCloseCheckout() {
    setCheckoutIsOpen(false);
  }

  return (
    <CartContextProvider>
      <Modal open={cartIsOpen}>
        <Cart onClose={handleCloseCart} onOpenCheckout={handleOpenCheckout}/>
      </Modal>
      <Header onCartClick={handleOpenCart}/>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
