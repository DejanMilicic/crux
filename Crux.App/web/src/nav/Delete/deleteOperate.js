import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ClickButton } from "components/links";
import { DeleteFinish } from "./DeleteFinish";
import { getDelete, DeleteStore } from "stores/delete";
import { replaceDialog } from "stores/pop";

export function DeleteOperate({
  logicId,
  logicKey,
  callback,
  dispatch,
  children
}) {
  const { dispatchDelete } = useContext(DeleteStore);

  function handleDelete() {
    getDelete(dispatchDelete, {
      id: logicId,
      logicKey: logicKey
    });
    replaceDialog(dispatch, {
      component: (
        <DeleteFinish
          logicKey={logicKey}
          callback={callback}
          dispatch={dispatch}
        />
      )
    });
  }

  return (
    <Box p={1}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Box pb={2}>
            <Typography variant="h6" color="inherit">
              Are you sure you want to delete this?
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4} alignItems="center">
            <Grid item>
              <ClickButton
                id="yes"
                variant="contained"
                color="primary"
                fontSize="small"
                callback={handleDelete}
                aria="yes"
              >
                <Icon fontSize="small">check</Icon>
                <span>&nbsp;yes</span>
              </ClickButton>
            </Grid>
            <Grid item>
              <ClickButton
                id="no"
                variant="contained"
                color="secondary"
                fontSize="small"
                callback={callback}
                dispatch={dispatch}
                aria="No"
              >
                <Icon fontSize="small">cancel</Icon>
                <span>&nbsp;no</span>
              </ClickButton>
            </Grid>
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

DeleteOperate.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
