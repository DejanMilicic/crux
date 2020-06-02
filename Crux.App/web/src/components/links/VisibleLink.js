import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Link from "@material-ui/core/Link";
import { Visible } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";

const useStyles = makeStyles(() => {
  return {
    hover: {
      cursor: "pointer"
    }
  };
});

export function VisibleLink({ logicId, children }) {
  const classes = useStyles();
  const { dispatchPop } = useContext(PopStore);

  function handleVisible() {
    openDialog(dispatchPop, { component: <Visible logicId={logicId} dispatch={dispatchPop} callback={closeDialog} /> });
  }

  return (
    <Link onClick={() => handleVisible()} underline="none" className={classes.hover}>
      {children}
    </Link>
  );
}

VisibleLink.propTypes = {
  logicId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
