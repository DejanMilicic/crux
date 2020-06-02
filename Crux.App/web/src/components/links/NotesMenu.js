import React, { useContext } from "react";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Notes } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function NotesMenu({ logicId, logicKey, icon, children }) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <MenuItem
      onClick={() => {
        openDialog(dispatchPop, {
          component: <Notes logicId={logicId} logicKey={logicKey} dispatch={dispatchPop} callback={closeDialog} />,
        });
      }}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={children} />
    </MenuItem>
  );
}
