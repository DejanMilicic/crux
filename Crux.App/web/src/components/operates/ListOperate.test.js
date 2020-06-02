import React from "react";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { PopStore } from "stores/pop";
import { ListOperate } from "./ListOperate";
import { mount } from "enzyme";

describe("<ListOperate />", () => {
  const props = {
    logicKey: "meetings",
    model: {
      id: "meetings-1",
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canList: true,
      canCustom: true,
      canFavourite: true,
      favourite: true,
    },
    showInfo: true,
  };

  const pop = { dispatchPop: jest.fn() };
  const display = { dispatchDisplay: jest.fn() };

  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false },
    },
    dispatchList: jest.fn(),
  };

  const Render = (children = <ListOperate {...props} />) => {
    return mount(
      <PopStore.Provider value={pop}>
        <ListStore.Provider value={list}>
          <DisplayStore.Provider value={display}>{children}</DisplayStore.Provider>
        </ListStore.Provider>
      </PopStore.Provider>
    );
  };

  it("renders <ListOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
