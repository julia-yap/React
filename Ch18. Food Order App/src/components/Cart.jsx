import { useContext, useEffect } from "react";
import { CartContext } from "../store/CartContext";
import CartItem from "./CartItem";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";

export default function Cart({ onClose, onOpenCheckout }) {
    const cartCtx = useContext(CartContext);

    const cartTotal = cartCtx.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0)

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>{cartCtx.items.map(item => <CartItem key={item.id} item={item}/>)}</ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <div className="modal-actions">
                <Button textOnly onClick={onClose}>Close</Button>
                <Button onClick={onOpenCheckout}>Go to Checkout</Button>
            </div>
        </div>
    )
}
