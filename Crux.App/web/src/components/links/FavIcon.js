import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { toggleFav as toggleDisplay, DisplayStore } from "stores/display";
import { toggleFav as toggleList, ListStore } from "stores/list";

export function FavIcon({ source, logicId, logicKey, favourite, color }) {
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
    <IconButton color={color} onClick={handleToggle} aria-label="Favourite">
      {favourite ? <Icon>favorite</Icon> : <Icon>favorite_border</Icon>}
    </IconButton>
  );
}

FavIcon.propTypes = {
  source: PropTypes.string.isRequired,
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  favourite: PropTypes.bool,
  color: PropTypes.string
};
