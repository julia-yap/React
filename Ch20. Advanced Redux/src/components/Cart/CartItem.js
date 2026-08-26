import classes from './CartItem.module.css';
import { useDispatch } from "react-redux";
import { cartActions } from '../../store/cart';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const { id, title, quantity, price } = props;

  const addItemHandler = (id, title, price) => {
    dispatch(cartActions.addItem({ id, title, price }))
  }

  const removeItemHandler = (id) => {
    dispatch(cartActions.removeItem({ id }))
  }
  
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${(price * quantity).toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity ?? 0}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => removeItemHandler(id)}>-</button>
          <button onClick={() => addItemHandler(id, title, price)}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
