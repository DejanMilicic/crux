export const selectMenu = context => {
  const { stateMenu, dispatchMenu } = context;

  return {
    dispatchMenu,
    burger: stateMenu.burger,
    query: stateMenu.query,
    settings: stateMenu.settings
  };
};
