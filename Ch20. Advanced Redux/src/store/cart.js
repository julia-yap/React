import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalQauntity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.totalQauntity = action.payload.totalQauntity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const id = action.payload.id;
      const title = action.payload.title;
      const price = action.payload.price;

      state.totalQauntity++;
      state.changed = true;
      const itemExists = id in state.items;

      if (itemExists) {
        state.items[id].quantity++;
      } else {
        state.items[id] = {
          id,
          title,
          price,
          quantity: 1,
        };
      }
    },
    removeItem(state, action) {
      const id = action.payload.id;
      const itemExists = id in state.items;
      state.changed = true;

      if (itemExists && state.items[id].quantity > 0) {
        if (state.items[id].quantity === 1) {
          delete state.items[id];
        } else {
          state.items[id].quantity--;
        }
        state.totalQauntity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
