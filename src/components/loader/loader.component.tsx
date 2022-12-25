import React from "react";
import { SpinnerOverlay, SpinnerContainer } from "./loader.styles";

export const Loader = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};
