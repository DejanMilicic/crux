import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { DisplayLink } from "components/links";

export function NameCell({ logicId, logicKey, children }) {
  return (
    <TableCell>
      <DisplayLink logicId={logicId} logicKey={logicKey}>
        <Typography variant="body1" color="textSecondary">
          {children}
        </Typography>
      </DisplayLink>
    </TableCell>
  );
}

NameCell.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
