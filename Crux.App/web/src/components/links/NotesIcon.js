import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Notes } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function NotesIcon({ logicId, logicKey, color }) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <IconButton
      color={color}
      onClick={() => {
        openDialog(dispatchPop, {
          component: <Notes logicId={logicId} logicKey={logicKey} dispatch={dispatchPop} callback={closeDialog} />,
        });
      }}>
      <Icon>note</Icon>
    </IconButton>
  );
}

NotesIcon.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  color: PropTypes.string,
};
