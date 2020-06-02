import React from "react";
import { ListStore } from "stores/list";
import { PageAction } from "./PageAction";
import { mount } from "enzyme";

describe("<PageAction />", () => {
  const props = {
    logicKey: "meetings",
    list: [],
    params: {},
    dispatchList: jest.fn()
  };

  const startList = {
    stateList: {
      params: { skip: 1 },
      list: { paging: { intervals: 1 } },
      status: { isLoading: false, isFailed: false }
    },
    dispatchList: jest.fn()
  };

  const lastList = {
    stateList: {
      params: { skip: 0 },
      list: { paging: { intervals: 1 } },
      status: { isLoading: false, isFailed: false }
    },
    dispatchList: jest.fn()
  };

  it("renders <PageAction> with mount - render snapshot", () => {
    const wrapper = mount(
      <ListStore.Provider value={startList}>
        <PageAction {...props} />
      </ListStore.Provider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(PageAction)).toHaveLength(1);
  });

  it("renders <PageAction> with mount - simulate click first", () => {
    const wrapper = mount(
      <ListStore.Provider value={startList}>
        <PageAction {...props} />
      </ListStore.Provider>
    );
    wrapper
      .find("#first")
      .first()
      .simulate("click");
    expect(startList.dispatchList).toHaveBeenCalled();
  });

  it("renders <PageAction> with mount - simulate click previous", () => {
    const wrapper = mount(
      <ListStore.Provider value={startList}>
        <PageAction {...props} />
      </ListStore.Provider>
    );
    wrapper
      .find("#previous")
      .first()
      .simulate("click");
    expect(startList.dispatchList).toHaveBeenCalled();
  });

  it("renders <PageAction> with mount - simulate click next", () => {
    const wrapper = mount(
      <ListStore.Provider value={lastList}>
        <PageAction {...props} />
      </ListStore.Provider>
    );
    wrapper
      .find("#next")
      .first()
      .simulate("click");
    expect(lastList.dispatchList).toHaveBeenCalled();
  });

  it("renders <PageAction> with mount - simulate click last", () => {
    const wrapper = mount(
      <ListStore.Provider value={lastList}>
        <PageAction {...props} />
      </ListStore.Provider>
    );
    wrapper
      .find("#last")
      .first()
      .simulate("click");
    expect(lastList.dispatchList).toHaveBeenCalled();
  });
});
