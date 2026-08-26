import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitialLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  // Only need to load at the initial load. dispatch doesn't change, so 
  // technically this hook only runs once ... However, we are also triggering
  // http request, as at the end of fetching we replace the cart, whose 
  // state change calls the other useEffect to send cart data 
  // => our solution: add a changed property to cart store
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // Once Redux updates the store, then write to Firebase => useEffect()
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    // Don't send the initial state to db (unnecessary notification rendering)
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }
    
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }    
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
