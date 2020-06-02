import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Selection } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function SelectIcon(props) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <IconButton
      color="inherit"
      onClick={() => {
        openDialog(dispatchPop, {
          component: (
            <Selection
              {...props}
              dispatch={dispatchPop}
              callback={closeDialog}
              isDialog={true}
            />
          )
        });
      }}
    >
      <Icon>{props.children}</Icon>
    </IconButton>
  );
}

SelectIcon.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
