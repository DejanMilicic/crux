import React from "react";
import { mount } from "enzyme";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import Icon from "@material-ui/core/Icon";
import MenuItem from "@material-ui/core/MenuItem";
import { FavMenu } from "./FavMenu";

describe("<FavMenu />", () => {
  const props = {
    source: "source",
    logicId: "identity-123",
    logicKey: "logicKey"
  };

  const display = { dispatchDisplay: jest.fn() };
  const list = { dispatchList: jest.fn() };

  const Render = (children = <FavMenu {...props} />) => {
    return mount(
      <DisplayStore.Provider value={display}>
        <ListStore.Provider value={list}>{children}</ListStore.Provider>
      </DisplayStore.Provider>
    );
  };

  it("renders <FavMenu> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <FavMenu> with mount - render selected", () => {
    const wrapper = Render(<FavMenu {...props} favourite />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <FavMenu> with mount - simulate click without source", () => {
    const wrapper = Render(<FavMenu {...props} favourite />);
    wrapper.find(MenuItem).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });

  it("renders <FavMenu> with mount - simulate click with list source", () => {
    const wrapper = Render(<FavMenu {...props} favourite source="list" />);
    wrapper.find(MenuItem).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });

  it("renders <FavMenu> with mount - simulate click with display source", () => {
    const wrapper = Render(<FavMenu {...props} favourite source="display" />);
    wrapper.find(MenuItem).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });
});
