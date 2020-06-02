import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { ProfilesRow } from "components/media";

export function ProfilesCell({ list, logicKey }) {
  return (
    <TableCell>
      <Hidden only="xs">
        <ProfilesRow list={list} logicKey={logicKey} />
      </Hidden>
      <Hidden smUp>
        <Typography variant="subtitle1">{list.length}</Typography>
      </Hidden>
    </TableCell>
  );
}

ProfilesCell.propTypes = {
  list: PropTypes.array.isRequired,
  logicKey: PropTypes.string.isRequired
};
