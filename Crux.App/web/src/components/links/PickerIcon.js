import React, { useContext } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Picker } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function PickerIcon(props) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <React.Fragment>
      <IconButton
        color={props.color}
        onClick={() => {
          openDialog(dispatchPop, {
            component: (
              <Picker
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
    </React.Fragment>
  );
}

PickerIcon.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  color: PropTypes.string
};
