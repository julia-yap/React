import MealItem from "./MealItem";
import { useHttp } from "../hooks/useHttp.js";

// Passing {} directly to useHttp hook results in the infinite
// recreation of the plain javascript object, hence infinite calls to the hook.
// Define it outside.
const requestConfig = {};

export default function Meals() {
  const {
    data: meals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // Since request takes some time, meals is undefined initially.
  // Remember, isLoading changes within the useEffect call, which 
  // is after the component renders. It's crucial to pass in an 
  // initialData value to useHttp hook.
  if (isLoading) {
    return <p>Fetching meals...</p>
  }

  return (
    <ul id="meals">
      {meals.map((meal) => (
        <MealItem key={meal.id} item={meal} />
      ))}
    </ul>
  );
}
