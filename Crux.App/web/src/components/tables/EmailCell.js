import React from "react";
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";

export function EmailCell({ children }) {
  return (
    <TableCell>
      <Link href={"mailto:" + children} underline="none">
        <Typography variant="body1" color="textSecondary">
          {children}
        </Typography>
      </Link>
    </TableCell>
  );
}

EmailCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
