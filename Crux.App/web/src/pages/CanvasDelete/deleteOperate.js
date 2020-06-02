import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { ClickButton } from "components/links";
import { getDelete, DeleteStore } from "stores/delete";

export function DeleteOperate({ logicId, logicKey, children }) {
  const { dispatchDelete } = useContext(DeleteStore);

  function handleDelete() {
    getDelete(dispatchDelete, { id: logicId, logicKey: logicKey });
    navigate("/deleted/" + logicKey);
  }

  function handleCancel() {
    window.history.back();
  }

  return (
    <Box p={1}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6" color="inherit">
            Are you sure you want to delete this?
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={4}>
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
                callback={handleCancel}
                aria="no"
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
