import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { sendCartData } from "./store/cart";

let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  // Once Redux updates the store, then write to Firebase => useEffect()
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    // Don't send the initial state to db (unnecessary notification rendering)
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }

    dispatch(sendCartData(cart));
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
