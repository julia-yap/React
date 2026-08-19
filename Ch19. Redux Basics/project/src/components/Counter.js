import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();

  // Pass a function that determines which piece of data we want to extract
  // By using the hook, automatically subscribes to the store
  const counter = useSelector((state) => state.counter);

  const incrementHandler = (amount=1) => {
    dispatch({ type: "inc", amount });
  };

  const decrementHandler = () => {
    dispatch({ type: "dec" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={() => incrementHandler()}>Increment</button>
        <button onClick={() => incrementHandler(5)}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
