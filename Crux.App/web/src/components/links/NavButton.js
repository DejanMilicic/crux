import React from "react";
import { Link as RouterLink } from "@reach/router";
import Button from "@material-ui/core/Button";

export function NavButton(props) {
  return <Button component={RouterLink} {...props} />;
}
