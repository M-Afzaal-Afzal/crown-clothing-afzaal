import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import { CartIcon } from "../../components/cart-icon/cart-icon.component";
import { CartDropdown } from "../../components/cart-dropdown/cart-dropdown.component";

import { LogoContainer, NavigationContainer, NavLinks, NavLink } from "./navigation.styles";
import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { userSignOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";

export const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const isCartOpen = useSelector(selectIsCartOpen);

  const signOut = () => {
    dispatch(userSignOutStart());
  };

  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOut} className="nav-link">
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink className="nav-link" to="/auth">
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  );
};
