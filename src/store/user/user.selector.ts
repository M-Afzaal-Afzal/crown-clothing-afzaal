import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

const userReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [userReducer],
  (userSlice) => userSlice.currentUser
);
