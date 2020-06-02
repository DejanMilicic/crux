import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

export function DloadIcon({ aria, src, fontSize, color }) {
  return (
    <IconButton color={color} aria-label={aria} target="_blank" href={src}>
      <Icon fontSize={fontSize}>cloud_download</Icon>
    </IconButton>
  );
}

DloadIcon.propTypes = {
  aria: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  color: PropTypes.string
};
