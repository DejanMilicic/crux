import React from "react";
import { PopStore } from "stores/pop";
import { NameCell } from "./NameCell";
import { mount } from "enzyme";

describe("<NameCell />", () => {
  const pop = {
    statePop: { show: false, current: {} },
    dispatchPop: jest.fn(),
  };

  const Render = (
    children = (
      <NameCell logicId="user-27" logicKey="user">
        Dave
      </NameCell>
    )
  ) => {
    return mount(
      <PopStore.Provider value={pop}>
        <table>
          <tbody>
            <tr>{children}</tr>
          </tbody>
        </table>
      </PopStore.Provider>
    );
  };

  it("renders <NameCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(NameCell)).toHaveLength(1);
  });
});
