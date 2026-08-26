import { uiActions } from "./ui";
import { cartActions } from "./cart";

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
          body: JSON.stringify({ items: cart.items, totalQauntity: cart.totalQauntity }),
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

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-e2f9b-default-rtdb.firebaseio.com/cart.json",
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await res.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart(cartData));
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch cart data.",
        }),
      );
    }
  };
};
