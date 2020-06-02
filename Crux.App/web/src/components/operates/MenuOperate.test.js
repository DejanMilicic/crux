import React from "react";
import Icon from "@material-ui/core/Icon";
import { MenuOperate } from "./MenuOperate";
import { mount } from "enzyme";

describe("<MenuOperate />", () => {
  const props = {
    id: "htmlId",
    logicKey: "meetings",
    showInfo: true,
    showCustom: true,
    showFav: true,
    model: {
      id: "meetings-1",
      canEdit: true,
      canDelete: true,
      canFavourite: true,
      favourite: true,
    },
  };

  it("renders <MenuOperate> with mount - render snapshot", () => {
    const wrapper = mount(<MenuOperate {...props} />);
    expect(wrapper.find(Icon)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
