import React from "react";
import { PopStore } from "stores/pop";
import { ProfileCell } from "./ProfileCell";
import { mount } from "enzyme";

describe("<ProfileCell />", () => {
  const props = {
    logicId: "meetings-1",
    logicKey: "meetings",
    thumbUrl: "https://theurl.com"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ProfileCell {...props}>Dave</ProfileCell>) => {
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

  it("renders <ProfileCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ProfileCell)).toHaveLength(1);
  });
});
