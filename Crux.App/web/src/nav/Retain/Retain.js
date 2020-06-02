import React, { useContext } from "react";
import { navigate } from "@reach/router";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import { Modal } from "nav";
import { openDialog, closeDialog, PopStore } from "stores/pop";
import { openRetain, selectRetain, RetainStore } from "stores/retain";

const useStyles = makeStyles(theme => {
  return {
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      left: theme.spacing(2)
    }
  };
});

export function Retain() {
  const classes = useStyles();
  const { show, next, dispatchRetain } = selectRetain(useContext(RetainStore));
  const { dispatchPop } = useContext(PopStore);

  function handleNav() {
    if (show) {
      if (next) {
        if (next.isDialog) {
          openDialog(dispatchPop, {
            component: (
              <Modal
                logicId={next.logicId}
                logicKey={next.logicKey}
                dispatch={dispatchPop}
                callback={closeDialog}
              />
            )
          });
        }

        if (!next.isDialog) {
          if (next.logicId) {
            navigate("/edit/" + next.logicKey + "/" + next.logicId);
          } else {
            navigate("/add/" + next.logicKey);
          }
        }

        openRetain(dispatchRetain, {
          logicId: next.logicId,
          logicKey: next.logicKey
        });
      }
    }
  }

  return show ? (
    <Fab className={classes.fab} color="secondary" onClick={handleNav}>
      <Icon>edit</Icon>
    </Fab>
  ) : null;
}
