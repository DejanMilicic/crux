import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { NavIcon, QueryIcon } from "components/links";

export function WallTitle({ logicKey, children }) {
  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <QueryIcon logicKey={logicKey}>search</QueryIcon>
        <NavIcon to={"/add/" + logicKey}>add</NavIcon>
      </Grid>
      <Grid item>
        <Typography variant="h4" color="textSecondary">
          {children}
        </Typography>
      </Grid>
      <Grid item>
        <NavIcon to={"/table/" + logicKey}>list</NavIcon>
      </Grid>
    </Grid>
  );
}

WallTitle.propTypes = {
  logicKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
