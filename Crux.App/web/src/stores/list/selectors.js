import { metaFind } from "logic";

export const selectList = (logicKey, context) => {
  const meta = metaFind(logicKey);
  const { stateList, dispatchList } = context;

  const statusList = {
    ...stateList.status,
    isReady: !stateList.status.isLoading && !stateList.status.isFailed,
    isCurrent: stateList.logicKey === logicKey,
    isLoadable: stateList.list && stateList.list.paging && stateList.list.paging.loadable,
  };

  return {
    dispatchList,
    list: stateList.list,
    params: stateList.params,
    meta,
    statusList,
    logicKey: stateList.logicKey,
  };
};

export const selectCurrent = (context) => {
  const { stateList, dispatchList } = context;
  const meta = metaFind(stateList.logicKey);

  const statusList = {
    ...stateList.status,
    isReady: !stateList.status.isLoading && !stateList.status.isFailed,
    isCurrent: true,
    isLoadable: stateList.list && stateList.list.paging && stateList.list.paging.loadable,
  };

  return {
    dispatchList,
    list: stateList.list,
    params: stateList.params,
    meta,
    statusList,
    logicKey: stateList.logicKey,
  };
};
