import React, { useContext } from "react";
import PropTypes from "prop-types";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import { Display } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function DisplayMenu({ logicId, logicKey, icon, children }) {
  const { dispatchPop } = useContext(PopStore);

  function handleDisplay() {
    openDialog(dispatchPop, { component: <Display logicId={logicId} logicKey={logicKey} dispatch={dispatchPop} callback={closeDialog} /> });
  }

  return (
    <MenuItem onClick={() => handleDisplay()}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={children} />
    </MenuItem>
  );
}

DisplayMenu.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  icon: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
