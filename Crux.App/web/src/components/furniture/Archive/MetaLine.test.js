import React from "react";
import { mount } from "enzyme";
import Icon from "@material-ui/core/Icon";
import { DisplayLink } from "components/links";
import { PopStore } from "stores/pop";
import { MetaLine } from "./MetaLine";

describe("<MetaLine />", () => {
  const props = {
    logicId: "users-1234",
    logicKey: "user",
    logicIcon: "person",
  };

  const pop = { dispatchPop: jest.fn() };

  const Render = (children = <MetaLine {...props} />, defaultPop = pop) => {
    return mount(<PopStore.Provider value={defaultPop}>{children}</PopStore.Provider>);
  };

  it("renders <MetaLine> with mount - render snapshot", () => {
    const wrapper = Render();

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(DisplayLink)).toHaveLength(1);
    expect(wrapper.find(Icon)).toHaveLength(1);
  });
});
