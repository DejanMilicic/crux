import React from "react";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Link as RouterLink } from "@reach/router";

export function NavMenu(props) {
  return (
    <MenuItem component={RouterLink} {...props}>
      <ListItemIcon>
        <Icon>{props.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={props.children} />
    </MenuItem>
  );
}
