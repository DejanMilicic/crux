import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Selection } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function SelectButton({
  label,
  logicKey,
  handleChange,
  value,
  aria,
  children
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
            <Selection
              dispatch={dispatchPop}
              callback={closeDialog}
              label={label}
              logicKey={logicKey}
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

SelectButton.propTypes = {
  logicKey: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  aria: PropTypes.string.isRequired
};
