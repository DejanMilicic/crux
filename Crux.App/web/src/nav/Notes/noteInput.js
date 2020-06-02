import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { LongText, Save } from "components/inputs";

export function NoteInput({ handleSubmit }) {
  const [note, setNote] = useState("");
  const [counter] = useState(0);

  function handleSave(e) {
    e.preventDefault();

    if (validateForm()) {
      handleSubmit(note, counter);
    }
  }

  function validateForm() {
    return note.length > 0;
  }

  return (
    <form onSubmit={handleSave}>
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <LongText handleChange={setNote} value={note} label="note" id="note" rows={4} autoFocus required />
        <Save disabled={!validateForm()}>Save</Save>
      </Box>
    </form>
  );
}

NoteInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};
