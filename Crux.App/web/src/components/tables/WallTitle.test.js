import React from "react";
import { MenuStore } from "stores/menu";
import { WallTitle } from "./WallTitle";
import { mount } from "enzyme";

describe("<WallTitle />", () => {
  const props = {
    logicKey: "meetings"
  };

  const menu = { dispatchMenu: jest.fn() };

  const Render = (children = <WallTitle {...props}>Dave</WallTitle>) => {
    return mount(
      <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
    );
  };

  it("renders <WallTitle> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(WallTitle)).toHaveLength(1);
  });
});
