import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Delete } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function DeleteIcon(props) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <IconButton
      color={props.color}
      onClick={() => {
        openDialog(dispatchPop, {
          component: (
            <Delete {...props} dispatch={dispatchPop} callback={closeDialog} />
          )
        });
      }}
    >
      <Icon>{props.children}</Icon>
    </IconButton>
  );
}

DeleteIcon.propTypes = {
  color: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
