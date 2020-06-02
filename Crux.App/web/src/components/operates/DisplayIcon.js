import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Display } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function DisplayIcon(props) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <IconButton
      color={props.color}
      onClick={() => {
        openDialog(dispatchPop, {
          component: (
            <Display {...props} dispatch={dispatchPop} callback={closeDialog} />
          )
        });
      }}
    >
      <Icon>{props.children}</Icon>
    </IconButton>
  );
}

DisplayIcon.propTypes = {
  props: PropTypes.shape({
    color: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  })
};
