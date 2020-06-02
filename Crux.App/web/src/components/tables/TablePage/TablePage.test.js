import React from "react";
import { ListStore } from "stores/list";
import { TablePage } from "./TablePage";
import { mount } from "enzyme";

describe("<TablePage />", () => {
  const props = {
    take: 10,
    total: 30,
    skip: 1
  };

  const list = {
    stateList: {
      params: { skip: 0 },
      list: { paging: { intervals: 1 } },
      status: { isLoading: false, isFailed: false }
    },
    dispatchList: jest.fn()
  };

  it("renders <TablePage> with mount to test", () => {
    const wrapper = mount(
      <ListStore.Provider value={list}>
        <table>
          <TablePage {...props} />
        </table>
      </ListStore.Provider>
    );
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TablePage)).toHaveLength(1);
  });
});
