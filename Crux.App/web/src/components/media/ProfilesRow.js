import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { DisplayLink } from "components/links";

export function ProfilesRow({ list, logicKey }) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {list &&
        list.map(profile => (
          <DisplayLink key={profile.id} logicId={profile.id} logicKey={logicKey}>
            <Avatar alt={profile.name} src={profile.profileThumbUrl} />
          </DisplayLink>
        ))}
    </Box>
  );
}

ProfilesRow.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileThumbUrl: PropTypes.string.isRequired
    })
  ),
  logicKey: PropTypes.string.isRequired
};
