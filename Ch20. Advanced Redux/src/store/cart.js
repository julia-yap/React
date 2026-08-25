import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";

const initialState = {
  items: {},
  totalQauntity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const id = action.payload.id;
      const title = action.payload.title;
      const price = action.payload.price;

      state.totalQauntity++;

      const itemExists = id in state.items;

      if (itemExists) {
        state.items[id].quantity++;
      } else {
        state.items[id] = {
          id,
          title,
          price,
          quantity: 1,
        };
      }
    },
    removeItem(state, action) {
      const id = action.payload.id;
      const itemExists = id in state.items;
      if (itemExists && state.items[id].quantity > 0) {
        state.items[id].quantity--;
        state.totalQauntity--;
      }
    },
  },
});

// Redux toolkit supports action creators returning a function
// When it sees that there is a dispatching of function instead of
// actions, then it will execute the function for you and give the dispatch
// argument automatically, so that we can dispatch again.
export const sendCartData = (cart) => {
  // With Thunk, return a function
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      }),
    );

    const sendRequest = async () => {
      const res = await fetch(
        "https://react-e2f9b-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        },
      );

      if (!res.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Sent!",
          message: "Sent cart data successfully!",
        }),
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data.",
        }),
      );
    }
  };
};
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
