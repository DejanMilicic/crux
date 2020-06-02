import React from "react";
import { PopStore } from "stores/pop";
import UserDisplay from "./userDisplay";
import { mount } from "enzyme";

describe("<UserDisplay />", () => {
  const props = {
    model: {
      id: "identity-123",
      name: "name",
      profile: "profile-123",
      profileThumbUrl: "https://img.com/img.png",
      email: "email@email.com",
    },
  };

  const pop = {
    statePop: { show: false, current: {} },
    dispatchPop: jest.fn(),
  };

  const Render = (children = <UserDisplay {...props} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <UserDisplay> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserDisplay)).toHaveLength(1);
  });
});
