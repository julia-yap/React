import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch("http://localhost:3000/meals");
      if (!res.ok) {
        throw new Error("Failed to fetch meals.");
      }
      const data = await res.json();
      setMeals(data);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} item={meal}/>
      ))}
    </ul>
  );
}
