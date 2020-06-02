import React from "react";
import * as axios from "axios";
import { DeleteStore } from "stores/delete";
import { mount } from "enzyme";
import { DeleteOperate } from "./DeleteOperate";

jest.mock("axios");

describe("<DeleteOperate />", () => {
  const props = {
    logicId: "identity-123",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const remove = { dispatchDelete: jest.fn() };

  const Render = (
    children = <DeleteOperate {...props}>Test</DeleteOperate>
  ) => {
    return mount(
      <DeleteStore.Provider value={remove}>{children}</DeleteStore.Provider>
    );
  };

  it("renders <DeleteOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(DeleteOperate)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <DeleteOperate> with mount - simulate Yes", () => {
    const wrapper = Render();
    expect(wrapper.find(DeleteOperate)).toHaveLength(1);

    axios.get.mockImplementation(() => Promise.resolve({ data: {} }));

    wrapper
      .find("#yes")
      .hostNodes()
      .simulate("click");

    expect(props.callback).not.toHaveBeenCalled();
  });

  it("renders <DeleteOperate> with mount - simulate No", () => {
    const wrapper = Render();
    expect(wrapper.find(DeleteOperate)).toHaveLength(1);

    wrapper
      .find("#no")
      .hostNodes()
      .simulate("click");

    expect(props.callback).toBeCalled();
  });
});
