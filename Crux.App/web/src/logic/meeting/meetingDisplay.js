import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ParticipantsRow } from "components/media";
import { LongDateFormat } from "components/furniture";

export default function MeetingDisplay({ model }) {
  return (
    <Grid container spacing={2} direction="column" justify="center" alignItems="flex-start">
      <Grid item>
        <Typography variant="body2" color="textPrimary">
          Title
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {model.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textPrimary">
          When
        </Typography>
        <LongDateFormat date={model.when} variant="button" color="textSecondary" />
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textPrimary">
          Attending
        </Typography>
        <ParticipantsRow list={model.participants} />
      </Grid>
      {model.text ? (
        <Grid item>
          <Typography variant="body2" color="textPrimary">
            Description
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {model.text}
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  );
}

MeetingDisplay.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileId: PropTypes.string,
    profileThumbUrl: PropTypes.string,
    when: PropTypes.string,
    participants: PropTypes.array,
  }).isRequired,
};
