import { AnyAction } from "redux";
import { setCartItems, updateIsCartOpen } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: []
};

export const cartReducer = (state = INITIAL_STATE, action: AnyAction): CartState => {
  const { payload } = action;

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: payload
    };
  }

  if (updateIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: payload
    };
  }

  return state;
};
