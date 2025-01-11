import { createSlice } from "@reduxjs/toolkit";

// Helper functions to handle localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cartItems");
  return cartData ? JSON.parse(cartData) : [];
};

const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(), // Load from localStorage
  },
  reducers: {
    addItems: (state, action) => {
      state.items.push(action.payload);
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    removeItems: (state, action) => {
        // Find the index of the item to remove (first occurrence)
        const itemIndex = state.items.findIndex((item) => item?.id === action.payload.id);
      
        if (itemIndex !== -1) {
          // Remove the item at the found index (only the first occurrence)
          state.items.splice(itemIndex, 1);
          saveCartToLocalStorage(state.items); // Save updated cart to localStorage
        }
      },
    clearItems: (state) => {
      state.items.length = 0;
      saveCartToLocalStorage(state.items); // Save empty cart to localStorage
    },
  },
});

export const { addItems, removeItems, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
