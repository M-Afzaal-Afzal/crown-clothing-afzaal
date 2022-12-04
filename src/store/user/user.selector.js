import { createSelector } from "reselect";

const userReducer = (state) => state.user;

export const selectCurrentUser = createSelector([userReducer], (userSlice) => userSlice.currentUser);