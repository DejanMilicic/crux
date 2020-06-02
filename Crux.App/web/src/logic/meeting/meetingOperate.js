import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { NotesIcon } from "components/links";

export default function MeetingOperate({ logicKey, model, color }) {
  return (
    <Grid item>
      <NotesIcon logicId={model.id} logicKey={logicKey} color={color} />
    </Grid>
  );
}

MeetingOperate.propTypes = {
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string }),
  color: PropTypes.string,
};
