import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { DisplayLink } from "components/links";

export function ProfileCell({ logicId, logicKey, thumbUrl, children }) {
  return (
    <TableCell>
      <Box display="flex" flexDirection="row" alignItems="center">
        <DisplayLink logicId={logicId} logicKey={logicKey}>
          <Avatar alt={children} src={thumbUrl} />
        </DisplayLink>
        <Box pl={1}>
          <DisplayLink logicId={logicId} logicKey={logicKey}>
            <Typography variant="body1" color="textSecondary">
              {children}
            </Typography>
          </DisplayLink>
        </Box>
      </Box>
    </TableCell>
  );
}

ProfileCell.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
