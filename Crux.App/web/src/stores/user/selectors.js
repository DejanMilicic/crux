export const selectUser = (context) => {
  const { stateUser, dispatchUser } = context;

  const statusUser = {
    ...stateUser.status,
    isReady: !stateUser.status.isLoading && !stateUser.status.isFailed,
    isAuth: stateUser.isAuth,
    isReconnect: stateUser.isReconnect,
    isWelcome: stateUser.config && !stateUser.config.hasIntro,
    isForget: stateUser.isForget,
    isTwoFactor: stateUser.isTwoFactor,
  };

  return {
    dispatchUser,
    user: stateUser.user,
    config: { ...stateUser.config, hasPhone: stateUser.user ? stateUser.user.hasPhone : false },
    right: stateUser.right,
    limit: stateUser.limit,
    forgot: stateUser.forgot,
    signup: stateUser.signup,
    statusUser,
  };
};
