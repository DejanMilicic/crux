export const selectPop = context => {
  const { statePop, dispatchPop } = context;

  return {
    dispatchPop,
    show: statePop.show,
    current: statePop.current
  };
};
