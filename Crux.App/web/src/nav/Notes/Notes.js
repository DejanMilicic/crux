import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogHead } from "components/furniture";
import { NoteInput } from "./noteInput";
import { NoteList } from "./noteList";
import { NoteTitle } from "./noteTitle";
import { postNote, deleteNote, selectNote, NoteStore } from "stores/note";
import { Effect } from "./effect";

export function Notes({ logicId, logicKey, dispatch, callback }) {
  const { notes, display, dispatchNote } = selectNote(logicId, useContext(NoteStore));

  function handleSubmit(note, counter) {
    postNote(dispatchNote, {
      logicKey,
      model: { text: note, id: logicId, counter },
    });
  }

  function handleDelete(counter) {
    deleteNote(dispatchNote, { logicKey, logicId, counter });
  }

  return (
    <Effect logicId={logicId} logicKey={logicKey}>
      <Dialog
        open={true}
        onClose={() => {
          callback(dispatch);
        }}
        aria-labelledby="form-dialog-title">
        <DialogHead callback={callback} dispatch={dispatch}>
          Notes
        </DialogHead>
        <DialogContent>
          <Box>
            {display ? <NoteTitle>Notes for {display.name}</NoteTitle> : null}
            <NoteInput handleSubmit={handleSubmit} />
            {notes ? <NoteList list={notes.history} handleDelete={handleDelete} /> : null}
          </Box>
        </DialogContent>
      </Dialog>
    </Effect>
  );
}

Notes.propTypes = {
  logicId: PropTypes.string.isRequired,
  logicKey: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};
