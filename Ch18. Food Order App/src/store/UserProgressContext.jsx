import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  userProgress: "",
  openCart: () => {},
  closeCart: () => {},
  openCheckout: () => {},
  closeCheckout: () => {},
});

export default function UserProgressContextProvider({ children }) {
    const [userProgress, setUserProgress] = useState("");

    function openCart() {
        setUserProgress("cart");
    }

    function closeCart() {
        setUserProgress("");
    }

    function openCheckout() {
        setUserProgress("checkout");
    }

    function closeCheckout() {
        setUserProgress("");
    }

    const ctxValue = {
        userProgress,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
    }

    return <UserProgressContext value={ctxValue}>{children}</UserProgressContext>
}
