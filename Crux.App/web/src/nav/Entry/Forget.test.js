import React from "react";
import Paper from "@material-ui/core/Paper";
import { UserStore } from "stores/user";
import { Forget } from "./Forget";
import { mount } from "enzyme";

describe("<Forget />", () => {
  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      forgot: { email: "test@test.com" },
    },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Forget />) => {
    return mount(<UserStore.Provider value={user}>{children}</UserStore.Provider>);
  };

  it("renders <Forget> with mount - render snapshot", () => {
    const wrapper = Render(<Forget forgot={{ hasCode: true, hasReply: false }} />);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Forget> with mount - with reply", () => {
    const wrapper = Render(<Forget forgot={{ hasCode: false, hasReply: true }} />);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Forget> with mount - with reset", () => {
    const wrapper = Render(<Forget forgot={{ hasCode: false, hasReply: false }} />);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
