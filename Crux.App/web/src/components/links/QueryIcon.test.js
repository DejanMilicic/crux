import React from "react";
import { MenuStore } from "stores/menu";
import { QueryIcon } from "./QueryIcon";
import { mount } from "enzyme";

describe("<QueryIcon />", () => {
  const props = {
    logicKey: "logicKey"
  };

  const menu = { dispatchMenu: jest.fn() };

  const Render = (children = <QueryIcon {...props}>test</QueryIcon>) => {
    return mount(
      <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
    );
  };

  it("renders <QueryIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("renders <QueryIcon> with mount - simulate click", () => {
    const wrapper = Render();
    wrapper.find("button").simulate("click");
    expect(menu.dispatchMenu).toHaveBeenCalled();
  });
});
