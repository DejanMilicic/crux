import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "@reach/router";
import Link from "@material-ui/core/Link";

export function NavLink(props) {
  return (
    <Link
      variant="inherit"
      component={RouterLink}
      {...props}
      underline="none"
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? "yellow" : "inherit"
          }
        };
      }}
    />
  );
}

NavLink.propTypes = {
  props: PropTypes.shape({})
};
