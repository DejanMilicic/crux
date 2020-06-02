import React from "react";
import Paper from "@material-ui/core/Paper";
import { UserStore } from "stores/user";
import { Signup } from "./Signup";
import { mount } from "enzyme";

describe("<Signup />", () => {
  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      signup: {
        tenantId: "",
        tenantName: "",
        entryKey: "",
      },
    },
    dispatchUser: jest.fn(),
  };

  const tenant = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      signup: {
        tenantId: "identity-123-A",
        tenantName: "Client Name",
        entryKey: "ABC",
      },
    },
    dispatchUser: jest.fn(),
  };

  const Render = (children = <Signup />, defaultUser = user) => {
    return mount(<UserStore.Provider value={defaultUser}>{children}</UserStore.Provider>);
  };

  it("renders <Signup> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Signup> with mount - with Entry Key", () => {
    const wrapper = Render(<Signup />, tenant);
    expect(wrapper.find(Paper)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Signup> with mount - simulate Signup click", () => {
    const wrapper = Render(<Signup />, tenant);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Signup> with mount - simulate full submission", () => {
    const wrapper = Render(<Signup />);

    wrapper
      .find("#email")
      .first()
      .simulate("change", { target: { value: "test@test.com" } });

    wrapper
      .find("#name")
      .first()
      .simulate("change", { target: { value: "dave" } });

    wrapper
      .find("#pwd")
      .first()
      .simulate("change", { target: { value: "password" } });

    wrapper
      .find("#tenant")
      .first()
      .simulate("change", { target: { value: "dave" } });

    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Signup> with mount - simulate full submission with tenant", () => {
    const wrapper = Render(<Signup />, tenant);

    wrapper
      .find("#email")
      .first()
      .simulate("change", { target: { value: "test@test.com" } });

    wrapper
      .find("#name")
      .first()
      .simulate("change", { target: { value: "dave" } });

    wrapper
      .find("#pwd")
      .first()
      .simulate("change", { target: { value: "password" } });

    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
