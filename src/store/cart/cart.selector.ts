import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

// Step 1 - select the reducer slice - cart slice in this case
const selectCartReducer = (state: RootState): CartState => state.cart;

// Step 2 - create selectors accordingly
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

// Step 3 - if a input selector depends upon the previous cartSelector, we can use that as we're using in this case
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);
