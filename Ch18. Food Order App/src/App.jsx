import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Modal from "./components/UI/Modal";
import CartContextProvider from "./store/CartContext";

import { useState } from "react";
import UserProgressContext from "./store/UserProgressContext";
import UserProgressContextProvider from "./store/UserProgressContext";
import Checkout from "./components/Checkout";

function App() {

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
