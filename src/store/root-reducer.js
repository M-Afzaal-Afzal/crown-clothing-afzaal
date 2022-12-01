import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { categoryReducer } from "./category/category.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  cart: cartReducer,
})