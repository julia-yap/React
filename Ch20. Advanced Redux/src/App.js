import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui";

let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  // Once Redux updates the store, then write to Firebase => useEffect()
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.setNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        }),
      );

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

      // Show notification at the start and finish of the request.
      // Manage this state with Redux.
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "Sent!",
          message: "Sent cart data successfully!",
        }),
      );
    };

    // Don't send the initial state to db (unnecessary notification rendering)
      if (isInitialLoad) {
        isInitialLoad = false;
        return;
      }

    // Handles any types of error that happens anywhere
    sendCartData().catch((error) => {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error!",
          message: "Failed to send cart data.",
        }),
      );
    });
  }, [cart, dispatch]);
  // Add dispatch() to dependeny. React Redux will ensure the function never
  // changes and there will be no call raised by dispatch.

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
