import React from "react";
import { PopStore } from "stores/pop";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { ParticipantsRow } from "./ParticipantsRow";
import { mount } from "enzyme";
import { ProfileCell } from "components/tables";

describe("<ParticipantsRow />", () => {
  const profile = {
    id: "data-1",
    name: "A label",
    profileId: "image-1",
    profileThumbUrl: "https://www.aurl.com/image.png",
    userId: "users-1-A",
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ParticipantsRow logicId={profile.userId} logicKey="user" list={[]} />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <ParticipantsRow> with mount to test - empty", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("renders <ParticipantsRow> with mount to test - single item", () => {
    const wrapper = Render(<ParticipantsRow logicId={profile.userId} logicKey="user" list={[profile]} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
