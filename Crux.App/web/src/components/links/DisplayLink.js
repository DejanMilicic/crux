import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import { Display } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

const useStyles = makeStyles(() => {
  return {
    hover: {
      cursor: "pointer"
    }
  };
});

export function DisplayLink({ logicId, logicKey, color, children }) {
  const classes = useStyles();
  const { dispatchPop } = useContext(PopStore);

  function handleDisplay() {
    openDialog(dispatchPop, { component: <Display logicId={logicId} logicKey={logicKey} dispatch={dispatchPop} callback={closeDialog} /> });
  }

  return (
    <Link color={color} onClick={() => handleDisplay()} underline="none" className={classes.hover}>
      {children}
    </Link>
  );
}

DisplayLink.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
