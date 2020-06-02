import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { BigProfile } from "components/media";
import { DisplayLink } from "components/links";

export default function UserDisplay({ model }) {
  return (
    <Box p={1} display="flex" flexDirection="column" alignItems="center">
      <BigProfile id={model.id} name={model.name} profileId={model.profileId} profileThumbUrl={model.profileThumbUrl} />
      <Box pt={2} display="flex" flexDirection="column" alignItems="center">
        <DisplayLink logicId={model.id} logicKey="user">
          <Typography variant="h6" color="textSecondary">
            {model.name}
          </Typography>
        </DisplayLink>
        <Link href={"mailto:" + model.email} underline="none">
          <Typography variant="body1" color="textSecondary">
            {model.email}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

UserDisplay.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileId: PropTypes.string,
    profileThumbUrl: PropTypes.string,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
