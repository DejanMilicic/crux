import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "@reach/router";

export function NavDraw(props) {
  return (
    <ListItem button component={RouterLink} {...props}>
      <ListItemIcon>
        <Icon>{props.children}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.label} />
    </ListItem>
  );
}

NavDraw.propTypes = {
  props: PropTypes.shape({
    label: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
  })
};
