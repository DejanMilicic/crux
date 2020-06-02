import React, { useContext } from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { toggleFav as toggleDisplay, DisplayStore } from "stores/display";
import { toggleFav as toggleList, ListStore } from "stores/list";

export function FavMenu({ source, logicId, logicKey, favourite }) {
  const { dispatchDisplay } = useContext(DisplayStore);
  const { dispatchList } = useContext(ListStore);

  function handleToggle() {
    if (source === "display") {
      toggleDisplay(dispatchDisplay, {
        logicId: logicId,
        logicKey: logicKey,
        favourite: favourite
      });
    }
    if (source === "list") {
      toggleList(dispatchList, {
        logicId: logicId,
        logicKey: logicKey,
        favourite: favourite
      });
    }
  }

  return (
    <MenuItem onClick={handleToggle} aria-label="Favourite">
      <ListItemIcon>
        {favourite ? <Icon>favorite</Icon> : <Icon>favorite_border</Icon>}
      </ListItemIcon>
      <ListItemText primary="Favourite" />
    </MenuItem>
  );
}

FavMenu.propTypes = {
  source: PropTypes.string.isRequired,
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  favourite: PropTypes.bool
};
