import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";

import { useState } from "react";

function App() {
  
  const [cart, setCart] = useState({
    count: 0,
    total: 0, 
    items: {}
  });

  function handleAddToCart() {

  }

  return (
    <CartContextProvider>
      <Header />
      <Meals />
    </CartContextProvider>
  );
}

export default App;
