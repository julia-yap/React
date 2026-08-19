import { createStore } from "redux";


const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "inc") {
    return {
      counter: state.counter + action.amount,
    };
  }

  if (action.type === "dec") {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = createStore(counterReducer);

// Connect the react app to the store so that its components
// can dispatch and listen
export default store;
