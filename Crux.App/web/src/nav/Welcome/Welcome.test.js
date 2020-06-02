import React from "react";
import Button from "@material-ui/core/Button";
import { UserStore } from "stores/user";
import { Welcome } from "./Welcome";
import { mount } from "enzyme";

describe("<Welcome />", () => {
  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { hasIntro: false },
    },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Welcome>Content</Welcome>) => {
    return mount(<UserStore.Provider value={user}>{children}</UserStore.Provider>);
  };

  it("renders <Welcome> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Welcome)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Welcome> with mount - simulate next", () => {
    const wrapper = Render();

    expect(wrapper.find(Button)).toHaveLength(2);
    wrapper.find(Button).last().simulate("click");
    expect(wrapper.find(Button)).toHaveLength(3);
    wrapper.find(Button).last().simulate("click");
    expect(wrapper.find(Button)).toHaveLength(2);
    wrapper.find(Button).first().simulate("click");
    expect(wrapper.find(Button)).toHaveLength(3);
    wrapper.find(Button).first().simulate("click");
    expect(wrapper.find(Button)).toHaveLength(2);
    wrapper.find(Button).first().simulate("click");
  });
});
