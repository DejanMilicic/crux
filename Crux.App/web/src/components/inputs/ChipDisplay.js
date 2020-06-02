import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { Display } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

export function ChipDisplay({ logicKey, value, handleChange }) {
  const { dispatchPop } = useContext(PopStore);

  function handleDisplay(line) {
    openDialog(dispatchPop, {
      component: (
        <Display
          logicId={line.id}
          logicKey={logicKey}
          dispatch={dispatchPop}
          callback={closeDialog}
        />
      )
    });
  }

  function handleDelete(index) {
    value.splice(index, 1);
    handleChange(value.splice(0));
  }

  return value.map((line, index) => (
    <Box key={line.id} px={1}>
      <Chip
        label={line.name}
        onClick={() => handleDisplay(line)}
        onDelete={() => handleDelete(index)}
      />
    </Box>
  ));
}

ChipDisplay.propTypes = {
  logicKey: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired
};
