import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

// createSlice prepares a slice of the global state
// Give the slice a name, set up an initial state, and assign reducers
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
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

// Dispatching actions
export const counterActions = counterSlice.actions;
// slice.actions.reducerMethod returns an action object in shape { type }
// No need to create our own action identifiers
export default counterSlice.reducer;
