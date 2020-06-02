import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { NavLink } from "components/links";

export function NavIcon({ to, color, children }) {
  return (
    <NavLink to={to}>
      <IconButton color={color}>
        <Icon>{children}</Icon>
      </IconButton>
    </NavLink>
  );
}

NavIcon.propTypes = {
  to: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
