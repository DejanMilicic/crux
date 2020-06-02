import React from "react";
import { MainMenu } from "./mainMenu";
import Box from "@material-ui/core/Box";
import { UserStore } from "stores/user";
import { mount } from "enzyme";

describe("<MainMenu />", () => {
  const props = { handleReset: jest.fn() };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { templateView: "wall" },
      right: { canAdmin: false, canSuperuser: false }
    },
    dispatchUser: jest.fn()
  };

  const Render = (children = <MainMenu {...props} />) => {
    return mount(
      <UserStore.Provider value={user}>{children}</UserStore.Provider>
    );
  };

  it("renders <MainMenu> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
