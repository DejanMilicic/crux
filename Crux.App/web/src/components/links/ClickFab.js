import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

export function ClickFab({
  color,
  fontSize,
  aria,
  dispatch,
  callback,
  children
}) {
  return (
    <Fab
      size={fontSize}
      color={color}
      aria-label={aria}
      onClick={() => {
        callback(dispatch);
      }}
    >
      <Icon fontSize={fontSize}>{children}</Icon>
    </Fab>
  );
}

ClickFab.propTypes = {
  color: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  aria: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
