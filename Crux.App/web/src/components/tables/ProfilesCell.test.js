import React from "react";
import { PopStore } from "stores/pop";
import { ProfilesCell } from "./ProfilesCell";
import { mount } from "enzyme";

describe("<ProfilesCell />", () => {
  const props = {
    logicKey: "meetings",
    list: [
      {
        id: "identity-123",
        userId: "identity-123",
        name: "name",
        profileThumbUrl: "https://theurl.com"
      }
    ]
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ProfilesCell {...props} />) => {
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

  it("renders <ProfilesCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ProfilesCell)).toHaveLength(1);
  });
});
