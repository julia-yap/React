// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = { counter: 0, showCounter: true };

// createSlice prepares a slice of the global state
// Give the slice a name, set up an initial state, and assign reducers
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Every method automatically receives the current state
    // The methods are called depending on what action triggered them
    // (i.e., no need for if-checks)
    increment(state, action) {
      // Here, we are allowed to mutate the state
      // Redux uses an internal package, which on detection of this
      // kind of code, creates an explicit clone of the existing state,
      // creates a new state object, keeps all the states which are not
      // being editted and overwrites the state in an immutable way
      state.counter += action.payload.amount;
    },
    decrement(state) {
      state.counter--;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// createStore from the Redux package only takes one reducer function
// for the entire store, which clashes with the convienice reduxjs/toolkit
// provides (i.e., won't allow multiple reducers, each for each slice).
const store = configureStore({
  // a configuration object
  // Can pass a single, global, main reducer
  reducer: counterSlice.reducer,
  // But with multiple state slices, can create a map of reducers
  // configureStore will merge all reducers behind the scene
  // reducer: { counter: counterSlice.reducer }
});

// Dispatching actions
export const counterActions = counterSlice.actions;
// slice.actions.reducerMethod returns an action object in shape { type }
// No need to create our own action identifiers

// const counterReducer = (state = initialState, action) => {
//   if (action.type === "inc") {
//     // Redux returns the new snashot (overwrites) and doesn't "merge" previous
//     // and new states. All states should be set and returned in a new object.
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     };

//     // NEVER mutate the existing state. IE, don't do
//     // state.counter ++
//   }

//   if (action.type === "dec") {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     };
//   }

//   if (action.type === "toggle") {
//     return {
//         showCounter: !state.showCounter,
//         counter: state.counter
//     }
//   }

//   return state;
// };

// const store = createStore(counterReducer);

// Connect the react app to the store so that its components
// can dispatch and listen
export default store;
