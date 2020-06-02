import React, { useContext, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { LoaderStatus } from "nav";
import { getNotes, selectNote, NoteStore } from "stores/note";

export function Effect({ logicId, logicKey, children }) {
  const { notes, display, dispatchNote, statusNote } = selectNote(
    logicId,
    useContext(NoteStore)
  );

  useEffect(() => {
    if (statusNote.isReady && !statusNote.isCurrent) {
      getNotes(dispatchNote, { logicId, logicKey });
    }
  }, [dispatchNote, logicId, logicKey, statusNote]);

  return !statusNote.isLoading && display && notes ? (
    <Fragment>{children}</Fragment>
  ) : (
    <LoaderStatus status={statusNote} />
  );
}

Effect.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
