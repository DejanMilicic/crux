import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ProfilesRow } from "components/media";
import { LongDateFormat } from "components/furniture";

export default function MsgDisplay({ model }) {
  return (
    <Grid container spacing={2} direction="column" justify="center" alignItems="flex-start">
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Recipients
        </Typography>
        <ProfilesRow list={model.recipients} logicKey="user" />
      </Grid>
      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Subject
        </Typography>
        <Typography variant="h5" color="textSecondary">
          {model.name}
        </Typography>
      </Grid>

      {model.text ? (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            Message
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {model.text}
          </Typography>
        </Grid>
      ) : null}

      <Grid item>
        <Typography variant="body2" color="textSecondary">
          Sent
        </Typography>
        <LongDateFormat date={model.dateCreated} variant="button" color="textSecondary" />
      </Grid>
    </Grid>
  );
}

MsgDisplay.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    dateCreated: PropTypes.string,
    recipients: PropTypes.array,
  }).isRequired,
};
