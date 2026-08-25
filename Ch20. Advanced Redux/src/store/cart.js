import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: {}, 
    totalQauntity: 0,
    showCart: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState, 
    reducers: {
        addItem(state, action) {
            const id = action.payload.id;
            const title = action.payload.title;
            const price = action.payload.price;

            state.totalQauntity ++;

            const itemExists = id in state.items;

            if (itemExists) {
                state.items[id].quantity ++;
            } else {
                state.items[id] = {
                    id,
                    title,
                    price, 
                    quantity: 1
                }
            }
        }, 
        removeItem(state, action) {
            const id = action.payload.id;
            const itemExists = id in state.items;
            if (itemExists && state.items[id].quantity > 0) {
                state.items[id].quantity --;
                state.totalQauntity --;
            }
        }, 
        toggleCartDisplay(state) {
            state.showCart = !state.showCart
        }
    }
})

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
