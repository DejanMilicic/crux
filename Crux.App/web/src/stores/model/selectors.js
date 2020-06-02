import { metaFind } from "logic";

export const selectModel = (logicId, logicKey, context) => {
  const meta = metaFind(logicKey);
  const { stateModel, dispatchModel } = context;

  const logic = stateModel.stored.find(e => e.logicKey === logicKey);

  const statusModel = {
    ...stateModel.status,
    isReady: !stateModel.status.isLoading && !stateModel.status.isFailed,
    isEdit: logicId && (!logic || logic.logicId !== logicId),
    isSaved: logic && logic.hasSaved,
    isReset: !logicId && logic && logic.logicId && !logic.hasSaved
  };

  return {
    dispatchModel,
    logic,
    meta,
    statusModel
  };
};

export const generateModel = (logicKey, context, initialModel) => {
  const meta = metaFind(logicKey);
  const { stateModel, dispatchModel } = context;

  const logic = stateModel.stored.find(e => e.logicKey === logicKey);

  const status = {
    ...stateModel.status,
    isReady: !stateModel.status.isLoading && !stateModel.status.isFailed,
    isSaved: logic && logic.hasSaved && logic.logicId
  };

  if (!logic || !logic.model) {
    return {
      dispatchModel,
      status,
      logic: {
        model: { ...initialModel },
        logicKey: logicKey,
        logicIcon: meta.icon,
        logicTitle: meta.title,
        hasChanged: false,
        hasEdit: false
      }
    };
  }

  return {
    dispatchModel,
    logic,
    meta,
    status
  };
};

export const retainModel = (next, context) => {
  const { stateModel, dispatchModel } = context;

  if (next) {
    const logic = stateModel.stored.find(e => e.logicKey === next.logicKey);

    if (logic) {
      return {
        dispatchModel,
        model: logic.model
      };
    }
  }

  return {
    dispatchModel,
    model: null
  };
};

export const selectArchive = context => {
  const { stateModel } = context;

  return {
    archive: stateModel.archive
  };
};
