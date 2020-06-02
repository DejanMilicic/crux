export const selectDash = (context) => {
  const { stateDash, dispatchDash } = context;

  const statusDash = {
    ...stateDash.status,
    isReady: !stateDash.status.isLoading && !stateDash.status.isFailed,
  };

  return {
    dispatchDash,
    tenant: stateDash.data.tenant,
    meetings: stateDash.data.meetings,
    messages: stateDash.data.messages,
    attendance: stateDash.data.attendance,
    msg: stateDash.data.msg,
    statusDash,
  };
};
