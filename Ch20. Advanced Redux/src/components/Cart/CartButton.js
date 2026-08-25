import classes from './CartButton.module.css';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from '../../store/ui';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItemCount = useSelector((state) => state.cart.totalQauntity)

  const toggleCartDisplayHandler = () => {
    dispatch(uiActions.toggleCartDisplay())
  }

  return (
    <button className={classes.button} onClick={toggleCartDisplayHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItemCount}</span>
    </button>
  );
};

export default CartButton;
