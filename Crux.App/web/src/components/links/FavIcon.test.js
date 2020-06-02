import React from "react";
import { mount } from "enzyme";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { FavIcon } from "./FavIcon";

describe("<FavIcon />", () => {
  const props = {
    source: "source",
    logicId: "identity-123",
    logicKey: "logicKey",
    color: "primary"
  };

  const display = { dispatchDisplay: jest.fn() };
  const list = { dispatchList: jest.fn() };

  const Render = (children = <FavIcon {...props} />) => {
    return mount(
      <DisplayStore.Provider value={display}>
        <ListStore.Provider value={list}>{children}</ListStore.Provider>
      </DisplayStore.Provider>
    );
  };

  it("renders <FavIcon> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <FavIcon> with mount - render selected", () => {
    const wrapper = Render(<FavIcon {...props} favourite />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(1);
  });

  it("renders <FavIcon> with mount - simulate click without source", () => {
    const wrapper = Render(<FavIcon {...props} favourite />);
    wrapper.find(IconButton).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });

  it("renders <FavIcon> with mount - simulate click with list source", () => {
    const wrapper = Render(<FavIcon {...props} favourite source="list" />);
    wrapper.find(IconButton).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });

  it("renders <FavIcon> with mount - simulate click with display source", () => {
    const wrapper = Render(<FavIcon {...props} favourite source="display" />);
    wrapper.find(IconButton).simulate("click");
    expect(display.dispatchDisplay).not.toHaveBeenCalled();
    expect(list.dispatchList).not.toHaveBeenCalled();
  });
});
