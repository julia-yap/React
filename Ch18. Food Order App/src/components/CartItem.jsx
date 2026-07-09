import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function CartItem({ item }){
    const cartCtx = useContext(CartContext);

    return (
        <div className="cart-item">
            <p>{item.name} - {item.quantity} x {currencyFormatter.format(item.price)}</p>
            <div className="cart-item-actions">
                <button onClick={() => {cartCtx.removeItem(item.id)}}>-</button>
                <p>{item.quantity}</p>
                <button onClick={() => {cartCtx.addItem(item)}}>+</button>
            </div>
        </div>
    )
}
