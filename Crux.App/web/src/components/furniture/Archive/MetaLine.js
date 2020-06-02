import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { DisplayLink } from "components/links";

export function MetaLine({ logicId, logicKey, logicIcon, children }) {
  return (
    <DisplayLink color="textSecondary" logicId={logicId} logicKey={logicKey}>
      <Box p={1} display="flex" flexDirection="row" alignItems="center">
        <Box pr={2} display="flex" flexDirection="row" alignItems="center">
          <Icon fontSize="large">{logicIcon}</Icon>
        </Box>
        <Typography variant="button">{children}</Typography>
      </Box>
    </DisplayLink>
  );
}

MetaLine.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  logicIcon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
