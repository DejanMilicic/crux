import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

export function ClickDraw({ dispatch, callback, label, children }) {
  return (
    <ListItem
      button
      onClick={() => {
        callback(dispatch);
      }}>
      <ListItemIcon>
        <Icon>{children}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}

ClickDraw.propTypes = {
  label: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  callback: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
