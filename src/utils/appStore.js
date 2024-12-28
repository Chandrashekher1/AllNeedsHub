import { configureStore } from "@reduxjs/toolkit";
// import Cart from "../Components/Cart";
import cartReducer from "./cartSlice"

const appStore = configureStore(({
    reducer: {
        cart:cartReducer,
    }
}))

export default appStore