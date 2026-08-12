import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

export default function CartItem({ name, quantity, price, onAdd, onRemove }){
    return (
        <div className="cart-item">
            <p>{name} - {quantity} x {currencyFormatter.format(price)}</p>
            <div className="cart-item-actions">
                <button onClick={onRemove}>-</button>
                <p>{quantity}</p>
                <button onClick={onAdd}>+</button>
            </div>
        </div>
    )
}
