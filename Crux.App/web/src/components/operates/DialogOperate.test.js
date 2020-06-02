import React from "react";
import { UserStore } from "stores/user";
import { DisplayStore } from "stores/display";
import { ListStore } from "stores/list";
import { PopStore } from "stores/pop";
import Box from "@material-ui/core/Box";
import { DialogOperate } from "./DialogOperate";
import { mount } from "enzyme";

describe("<DialogOperate />", () => {
  const props = {
    logicKey: "meeting",
    model: {
      id: "meetings-1",
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canList: true,
      canCustom: true,
      canFavourite: true,
      favourite: true
    },
    hasNav: true,
    handleNav: jest.fn()
  };

  const user = {
    stateUser: {
      status: { isLoading: false, isFailed: false },
      config: { templateView: "wall" }
    },
    dispatchUser: jest.fn()
  };

  const pop = { dispatchPop: jest.fn() };
  const display = { dispatchDisplay: jest.fn() };

  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false }
    },
    dispatchList: jest.fn()
  };

  const Render = (children = <DialogOperate {...props} />) => {
    return mount(
      <PopStore.Provider value={pop}>
        <ListStore.Provider value={list}>
          <DisplayStore.Provider value={display}>
            <UserStore.Provider value={user}>{children}</UserStore.Provider>
          </DisplayStore.Provider>
        </ListStore.Provider>
      </PopStore.Provider>
    );
  };

  it("renders <DialogOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("renders <DialogOperate> with mount - simulate click add", () => {
    const wrapper = Render();
    wrapper.find("#add").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <DialogOperate> with mount - simulate click edit", () => {
    const wrapper = Render();
    wrapper.find("#edit").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <DialogOperate> with mount - simulate click delete", () => {
    const wrapper = Render();
    wrapper.find("#delete").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <DialogOperate> with mount - simulate click list", () => {
    const wrapper = Render();
    wrapper.find("#list").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <DialogOperate> with mount - simulate click fav", () => {
    const wrapper = Render();
    wrapper.find("#fav").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
