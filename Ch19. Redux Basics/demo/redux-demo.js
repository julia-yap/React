// Import Redux
const redux = require("redux");

// Reducer function called by the Redux library
// Input: old state, dispatched action
// Output: new state object
// Pure function, meaning it does not produce any side effects
// (e.g., http request, write to / fetch from  local storage)
// Pass a fallback default value for state for the very first call
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "inc") {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type == "dec") {
    return {
        counter: state.counter - 1,
    };
  }

  return state;
};

// Create store
// Intake a reducer function because store needs to know which
// reducer is responsible for changing that store
// Note: Initializing the store does not trigger the subscription function
const store = redux.createStore(counterReducer);

// Subscription function triggers whenever the state changes
const counterSubscriber = () => {
  // Gives the latest snapshot of the state after update
  const latestState = store.getState();
  console.log(latestState);
};

// Let store know of subscriptions. Redux calls it automatically
// whenever data changes.
store.subscribe(counterSubscriber);

// Dispatch an action
// Calls the reducer function to run
store.dispatch({ type: "inc" });
store.dispatch({ type: "dec" })
