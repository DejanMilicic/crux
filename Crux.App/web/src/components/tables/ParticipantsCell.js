import React from "react";
import PropTypes from "prop-types";
import Hidden from "@material-ui/core/Hidden";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { ParticipantsRow } from "components/media";

export function ParticipantsCell({ list }) {
  return (
    <TableCell>
      <Hidden only="xs">
        <ParticipantsRow list={list} />
      </Hidden>
      <Hidden smUp>
        <Typography variant="subtitle1">{list.length}</Typography>
      </Hidden>
    </TableCell>
  );
}

ParticipantsCell.propTypes = {
  list: PropTypes.array.isRequired
};
