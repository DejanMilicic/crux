import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

export function ClickButton({ id, variant, color, fontSize, aria, callback, dispatch, children }) {
  return (
    <Button
      id={id}
      variant={variant}
      color={color}
      fontSize={fontSize}
      aria-label={aria}
      onClick={() => {
        callback(dispatch);
      }}>
      {children}
    </Button>
  );
}

ClickButton.propTypes = {
  id: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.string,
  aria: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
