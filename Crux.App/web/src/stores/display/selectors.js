import { metaFind } from "logic";

export const selectDisplay = (logicId, logicKey, context) => {
  const meta = metaFind(logicKey);
  const { stateDisplay, dispatchDisplay } = context;

  const logic = stateDisplay.stored.find(e => e.logicKey === logicKey);

  const statusDisplay = {
    ...stateDisplay.status,
    isReady: !stateDisplay.status.isLoading && !stateDisplay.status.isFailed,
    isCurrent: logic ? logic.current && logic.current.id === logicId : false
  };

  return {
    dispatchDisplay,
    current: logic ? logic.current : undefined,
    meta,
    statusDisplay
  };
};

export const selectArchive = context => {
  const { stateDisplay } = context;

  return {
    archive: stateDisplay.archive
  };
};
