import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Picker } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function PickerButton({
  logicKey,
  value,
  handleChange,
  immediateHandle,
  label,
  children,
  aria
}) {
  const { dispatchPop } = useContext(PopStore);

  return (
    <Button
      size="small"
      variant="outlined"
      color="primary"
      aria-label={aria}
      onClick={() => {
        openDialog(dispatchPop, {
          component: (
            <Picker
              logicKey={logicKey}
              label={label}
              dispatch={dispatchPop}
              callback={closeDialog}
              immediateHandle={immediateHandle}
              handleChange={handleChange}
              value={value}
            />
          )
        });
      }}
    >
      <Box px={0.5}>
        <Typography variant="caption">{children}</Typography>
      </Box>
    </Button>
  );
}

PickerButton.propTypes = {
  logicKey: PropTypes.string.isRequired,
  value: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  immediateHandle: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  aria: PropTypes.string.isRequired
};
