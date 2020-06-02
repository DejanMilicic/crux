import React from "react";
import { PopStore } from "stores/pop";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { ProfilesRow } from "./ProfilesRow";
import { mount } from "enzyme";

describe("<ProfilesRow />", () => {
  const profile = {
    id: "data-1",
    name: "A label",
    profileId: "image-1",
    profileThumbUrl: "https://www.aurl.com/image.png"
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <ProfilesRow list={[]} logicKey="user" />) => {
    return mount(<PopStore.Provider value={pop}>{children}</PopStore.Provider>);
  };

  it("renders <ProfilesRow> with mount to test - empty", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("renders <ProfilesRow> with mount to test - single item", () => {
    const wrapper = Render(<ProfilesRow list={[profile]} logicKey="user" />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
