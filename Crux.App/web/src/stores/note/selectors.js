export const selectNote = (logicId, context) => {
  const { stateNote, dispatchNote } = context;

  const statusNote = {
    ...stateNote.status,
    isReady: !stateNote.status.isLoading && !stateNote.status.isFailed,
    isCurrent: stateNote.display && stateNote.display.id === logicId
  };

  return {
    dispatchNote,
    statusNote,
    notes: stateNote.notes,
    display: stateNote.display
  };
};
