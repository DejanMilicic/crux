import React from "react";
import { UserStore } from "stores/user";
import Trap from "./Trap";
import { mount } from "enzyme";

describe("<Trap />", () => {
  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
    },
    dispatchUser: jest.fn(),
  };

  it("renders <Trap> with mount - render snapshot", () => {
    const wrapper = mount(
      <UserStore.Provider value={user}>
        <Trap>Content</Trap>
      </UserStore.Provider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
