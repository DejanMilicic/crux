import React from "react";
import PropTypes from "prop-types";
import { NotesMenu } from "components/links";

export default function MeetingMenu({ logicKey, model }) {
  return (
    <NotesMenu logicId={model.id} logicKey={logicKey} icon="note">
      {model.noteCount > 0 ? model.noteCount + " " : null}Notes
    </NotesMenu>
  );
}

MeetingMenu.propTypes = {
  logicKey: PropTypes.string.isRequired,
  model: PropTypes.shape({ id: PropTypes.string }).isRequired,
};
