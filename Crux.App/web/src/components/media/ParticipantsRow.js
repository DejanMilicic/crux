import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { DisplayLink } from "components/links";

export function ParticipantsRow({ list }) {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {list &&
        list.map(participant => (
          <DisplayLink key={participant.id} logicId={participant.userId} logicKey="user">
            <Avatar alt={participant.name} src={participant.profileThumbUrl} />
          </DisplayLink>
        ))}
    </Box>
  );
}

ParticipantsRow.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      profileThumbUrl: PropTypes.string.isRequired
    })
  )
};
