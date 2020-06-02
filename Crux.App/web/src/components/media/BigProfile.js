import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles(() => {
  return {
    profile: {
      width: 150,
      height: 150
    }
  };
});

export function BigProfile({ id, name, profileId, profileThumbUrl }) {
  const classes = useStyles();
  return (
    <Avatar
      id={id}
      alt={name}
      key={profileId}
      src={profileThumbUrl}
      className={classes.profile}
    />
  );
}

BigProfile.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  profileId: PropTypes.string,
  profileThumbUrl: PropTypes.string
};
