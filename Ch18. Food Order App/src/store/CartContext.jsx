import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Never modify the state object directly
    const updatedItems = [...state.items];

    // Check if item already exists in cart
    const existingItemCartIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id,
    );
    const existingItem = updatedItems[existingItemCartIndex];

    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingItemCartIndex] = updatedItem;
    } else {
      updatedItems.push({
        ...action.items,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    // Never modify the state object directly
    const updatedItems = [...state.items];

    // Check if item already exists in cart
    const existingItemCartIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id,
    );
    const existingItem = updatedItems[existingItemCartIndex];

    if (existingItem.quantity === 1) {
      updatedItems.splice(existingItemCartIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updatedItems[existingItemCartIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function handleAddItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function handleRemoveItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const ctxValue = {
    items: cart.items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}
