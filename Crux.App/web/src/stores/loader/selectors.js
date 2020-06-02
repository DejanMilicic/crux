export const selectLoader = context => {
  const { stateLoader, dispatchLoader } = context;

  const statusLoader = {
    ...stateLoader.status,
    isReady: !stateLoader.status.isLoading && !stateLoader.status.isFailed,
    isRefresh:
      !stateLoader.status.isLoading &&
      !stateLoader.status.isFailed &&
      stateLoader.status.isLoaded &&
      stateLoader.files.length > 0
  };

  return {
    dispatchLoader,
    statusLoader,
    queue: stateLoader.files
  };
};

export const selectGif = context => {
  const { stateLoader, dispatchLoader } = context;

  return {
    dispatchLoader,
    gif: stateLoader.gif
  };
};
