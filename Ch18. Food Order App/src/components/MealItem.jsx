import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";

import Button from "./UI/Button";
import { CartContext } from "../store/CartContext";

export default function MealItem({ item }) {
  const { items, addItem } = useContext(CartContext);
  return (
    <li className="meal-item">
      <article>
        <img alt={item.name} src={`http://localhost:3000/${item.image}`} />
        <div>
          <h3>{item.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(item.price)}
          </p>
          <p className="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => {addItem(item)}}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
