import { metaFind } from "logic";

export const selectRef = (logicKey, context) => {
  const meta = metaFind(logicKey);
  const { stateRef, dispatchRef } = context;

  const logic = stateRef.stored.find(e => e.logicKey === logicKey);

  if (logic) {
    return {
      dispatchRef,
      logic,
      meta,
      statusRef: {
        ...logic.status,
        isReady: !logic.status.isLoading && !logic.status.isFailed
      }
    };
  } else {
    return {
      dispatchRef,
      logic: null,
      meta,
      statusRef: {
        isLoaded: false,
        isLoading: false,
        isFailed: false,
        loadedText: ""
      }
    };
  }
};
