import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import { LongDateFormat } from "components/furniture";

export function DateCell({ date }) {
  return (
    <TableCell>
      <LongDateFormat date={date} />
    </TableCell>
  );
}

DateCell.propTypes = {
  date: PropTypes.string.isRequired
};
