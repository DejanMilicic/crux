import React from "react";
import { DisplayStore } from "stores/display";
import { UserStore } from "stores/user";
import { ModelStore } from "stores/model";
import { ListStore } from "stores/list";
import { PopStore } from "stores/pop";
import { RetainStore } from "stores/retain";
import Box from "@material-ui/core/Box";
import { MediaOperate } from "./MediaOperate";
import { mount } from "enzyme";

describe("<MediaOperate />", () => {
  const props = {
    logicKey: "meetings",
    visible: {
      id: "meetings-1",
      canDelete: true,
      canFavourite: true,
      canList: true,
      favourite: true,
      thumbUrl: "smallurl",
      fullUrl: "fullurl"
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
  const retain = {
    stateRetain: { show: false, stored: [] },
    dispatchRetain: jest.fn()
  };
  const model = { dispatchModel: jest.fn() };
  const list = {
    stateList: {
      status: { isLoading: false, isFailed: false }
    },
    dispatchList: jest.fn()
  };
  const retainAdd = {
    ...retain,
    stateRetain: {
      show: true,
      stored: [{ model: {}, logicKey: "meeting" }]
    }
  };

  const retainEdit = {
    ...retain,
    stateRetain: {
      show: true,
      stored: [{ model: {}, logicKey: "meeting", logicId: "meetings-1" }]
    }
  };

  const retainDialog = {
    ...retain,
    stateRetain: {
      show: true,
      stored: [
        {
          model: {},
          logicKey: "meeting",
          logicId: "meetings-1",
          isDialog: true
        }
      ]
    }
  };

  const modelStored = {
    ...model,
    stateModel: {
      stored: [{ model: {}, logicKey: "meeting", logicId: "meetings-1" }]
    }
  };

  const Render = (
    children = <MediaOperate {...props} />,
    defaultRetain = retain,
    defaultModel = model
  ) => {
    return mount(
      <PopStore.Provider value={pop}>
        <ListStore.Provider value={list}>
          <DisplayStore.Provider value={display}>
            <UserStore.Provider value={user}>
              <RetainStore.Provider value={defaultRetain}>
                <ModelStore.Provider value={defaultModel}>
                  {children}
                </ModelStore.Provider>
              </RetainStore.Provider>
            </UserStore.Provider>
          </DisplayStore.Provider>
        </ListStore.Provider>
      </PopStore.Provider>
    );
  };

  it("renders <MediaOperate> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("renders <MediaOperate> with mount - simulate list", () => {
    const wrapper = Render();
    wrapper.find("#list").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <MediaOperate> with mount - simulate delete", () => {
    const wrapper = Render();
    wrapper.find("#delete").simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <MediaOperate> with mount - simulate select add", () => {
    const wrapper = Render(<MediaOperate {...props} />, retainAdd, modelStored);
    wrapper
      .find("#select")
      .first()
      .simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <MediaOperate> with mount - simulate select edit", () => {
    const wrapper = Render(
      <MediaOperate {...props} />,
      retainEdit,
      modelStored
    );
    wrapper
      .find("#select")
      .first()
      .simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });

  it("renders <MediaOperate> with mount - simulate select dialog", () => {
    const wrapper = Render(
      <MediaOperate {...props} />,
      retainDialog,
      modelStored
    );
    wrapper
      .find("#select")
      .first()
      .simulate("click");
    expect(pop.dispatchPop).toHaveBeenCalled();
  });
});
