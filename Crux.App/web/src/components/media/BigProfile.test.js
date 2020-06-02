import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { BigProfile } from "./BigProfile";
import { mount } from "enzyme";

describe("<BigProfile />", () => {
  const props = {
    id: "data-1",
    name: "A label",
    profileId: "image-1",
    profileThumbUrl: "https://www.aurl.com/image.png"
  };

  it("renders <BigProfile> with mount - render snapshot", () => {
    const wrapper = mount(<BigProfile {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(Avatar)).toHaveLength(1);
  });
});
