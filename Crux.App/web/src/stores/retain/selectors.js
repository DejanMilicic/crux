export const selectRetain = context => {
  const { stateRetain, dispatchRetain } = context;

  return {
    dispatchRetain,
    hasNext: stateRetain.stored.length > 0,
    show: stateRetain.show && stateRetain.stored.length > 0,
    next: stateRetain.stored.length > 0 ? stateRetain.stored[0] : null
  };
};
