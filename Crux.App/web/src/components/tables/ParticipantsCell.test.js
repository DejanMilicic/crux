import React from "react";
import { PopStore } from "stores/pop";
import { ParticipantsCell } from "./ParticipantsCell";
import { mount } from "enzyme";

describe("<ParticipantsCell />", () => {
  const props = {
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

  const Render = (children = <ParticipantsCell {...props} />) => {
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

  it("renders <ParticipantsCell> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(ParticipantsCell)).toHaveLength(1);
  });
});
