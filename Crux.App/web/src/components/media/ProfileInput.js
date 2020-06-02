import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { BigProfile } from "./BigProfile";
import { ProfileUpload } from "./ProfileUpload";
import { ProfileButton } from "components/links";

export function ProfileInput({
  id,
  name,
  profileId,
  profileThumbUrl,
  handleChange,
  handleLibrary
}) {
  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      {profileId ? (
        <Box pr={2}>
          <BigProfile
            id={id}
            name={name}
            profileId={profileId}
            profileThumbUrl={profileThumbUrl}
          />
        </Box>
      ) : null}
      <Box>
        <ProfileUpload id="profileUpload" handleChange={handleChange} />
        <ProfileButton id="profileLibrary" handleClick={handleLibrary}>
          from Media
        </ProfileButton>
      </Box>
    </Grid>
  );
}

ProfileInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  profileThumbUrl: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLibrary: PropTypes.func.isRequired
};
