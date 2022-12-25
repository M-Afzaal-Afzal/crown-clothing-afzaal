import { ACtionWithPayload, createAction, withMatcher } from "../../utils/reducer.utils";
import { CategoryItem } from "../category/category.types";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      if (cartItem.id === productToAdd.id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const updatedCartItems = cartItems
    .map((cartItem) => {
      if (cartItem.id === cartItemToRemove.id) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1
        };
      }
      return cartItem;
    })
    .filter((cartItem) => cartItem.quantity > 0);

  return updatedCartItems;
};

const clearCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

export type SetIsCartOpen = ACtionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ACtionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const updateIsCartOpen = withMatcher((isOpen: boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen);
});
