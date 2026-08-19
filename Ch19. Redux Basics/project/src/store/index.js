// import { createStore } from "redux";
import {configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authReducer from "./auth";

// createStore from the Redux package only takes one reducer function
// for the entire store, which clashes with the convienice reduxjs/toolkit
// provides (i.e., won't allow multiple reducers, each for each slice).
const store = configureStore({
  // a configuration object
  // Can pass a single, global, main reducer
  //   reducer: counterSlice.reducer,
  // But with multiple state slices, can create a map of reducers
  // configureStore will merge all reducers behind the scene
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

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
