import React, { useContext } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import { Config } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function ConfigDraw() {
  const { dispatchPop } = useContext(PopStore);

  return (
    <ListItem
      button
      onClick={() => {
        openDialog(dispatchPop, { component: <Config dispatch={dispatchPop} callback={closeDialog} /> });
      }}>
      <ListItemIcon>
        <Icon>settings</Icon>
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
  );
}
