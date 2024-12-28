import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items:[]
    },
    reducers: {
        addItems: (state,action) => {
            state.items.push(action.payload)
        },
        removeItems: (state,action) => {
            state.items = state.items.filter(item => item?.id !== action?.payload.id)
            
        },
        clearItems: (state) => {
            state.items.length = 0
        }
    }
})

export const {addItems,removeItems,clearItems} = cartSlice.actions

export default cartSlice.reducer