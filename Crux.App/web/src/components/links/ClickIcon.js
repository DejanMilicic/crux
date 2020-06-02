import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

export function ClickIcon({ color, fontSize, aria, dispatch, callback, disabled, children }) {
  return (
    <IconButton
      color={color}
      aria-label={aria}
      onClick={() => {
        callback(dispatch);
      }}
      disabled={disabled}>
      <Icon fontSize={fontSize}>{children}</Icon>
    </IconButton>
  );
}

ClickIcon.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number,
  aria: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
