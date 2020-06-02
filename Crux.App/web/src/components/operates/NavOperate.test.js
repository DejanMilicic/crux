import React from "react";
import { ListStore } from "stores/list";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { NavOperate } from "./NavOperate";
import { mount } from "enzyme";

describe("<NavOperate />", () => {
  const props = {
    id: "htmlId",
    logicId: "meetings-1",
    logicKey: "meeting",
    hasNav: true,
    handleNav: jest.fn(),
  };

  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false },
      list: {
        data: [{ id: "meetings-0" }, { id: "meetings-1" }, { id: "meetings-2" }],
        paging: { loadable: true },
      },
      logicKey: "meeting",
    },
    dispatchList: jest.fn(),
  };

  const Render = (children = <NavOperate {...props} />) => {
    return mount(<ListStore.Provider value={list}>{children}</ListStore.Provider>);
  };

  it("renders <NavOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Icon)).toHaveLength(2);
  });

  it("renders <NavOperate> with mount - simulate back click", () => {
    const wrapper = Render();
    wrapper.find("#back").find(IconButton).simulate("click");
    expect(props.handleNav).toHaveBeenCalled();
  });

  it("renders <NavOperate> with mount - simulate forward click", () => {
    const wrapper = Render();
    wrapper.find("#forward").find(IconButton).simulate("click");
    expect(props.handleNav).toHaveBeenCalled();
  });
});
