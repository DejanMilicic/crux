import React from "react";
import { MenuStore } from "stores/menu";
import { TableTitle } from "./TableTitle";
import { mount } from "enzyme";

describe("<TableTitle />", () => {
  const props = {
    logicKey: "meetings"
  };

  const menu = { dispatchMenu: jest.fn() };

  const Render = (children = <TableTitle {...props}>Dave</TableTitle>) => {
    return mount(
      <MenuStore.Provider value={menu}>{children}</MenuStore.Provider>
    );
  };

  it("renders <TableTitle> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TableTitle)).toHaveLength(1);
  });
});
