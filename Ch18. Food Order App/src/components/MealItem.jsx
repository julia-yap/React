export default function MealItem({ item }) {
  return (
    <li className="meal-item">
      <article>
        <img alt={item.name} src={`http://localhost:3000/${item.image}`} />
        <div>
          <h3>{item.name}</h3>
          <p className="meal-item-price">{item.price}</p>
          <p className="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actions">
          <button className="button">Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
