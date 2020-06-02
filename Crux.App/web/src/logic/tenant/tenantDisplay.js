import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { BigProfile } from "components/media";

export default function TenantDisplay({ model }) {
  return (
    <Box p={1} display="flex" flexDirection="column" alignItems="center">
      <BigProfile id={model.id} name={model.name} profileId={model.profileId} profileThumbUrl={model.profileThumbUrl} />
      <Typography variant="h6" color="textSecondary">
        {model.name}
      </Typography>
    </Box>
  );
}

TenantDisplay.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileId: PropTypes.string,
    profileThumbUrl: PropTypes.string
  }).isRequired
};
