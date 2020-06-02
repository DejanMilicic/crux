import React from "react";
import PropTypes from "prop-types";
import Icon from "@material-ui/core/Icon";
import TableCell from "@material-ui/core/TableCell";

export function CheckCell({ value }) {
  return (
    <TableCell>
      <Icon variant="body1">
        {value ? "check_box" : "check_box_outline_blank"}
      </Icon>
    </TableCell>
  );
}

CheckCell.propTypes = {
  value: PropTypes.bool
};
