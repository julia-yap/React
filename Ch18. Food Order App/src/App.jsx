import Header from "./components/Header";
import Meals from "./components/Meals";

import { useState } from "react";

function App() {
  
  const [cart, setCart] = useState();

  return (
    <>
      <Header />
      <Meals />
    </>
  );
}

export default App;
