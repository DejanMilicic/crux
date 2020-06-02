import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateTime } from "./DateTime";
import { mount } from "enzyme";

describe("<DateTime />", () => {
  const props = {
    id: "data-1",
    label: "A label",
    handleChange: jest.fn(),
    value: "2015-6-25"
  };

  const Render = (children = <DateTime {...props} />) => {
    return mount(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {children}
      </MuiPickersUtilsProvider>
    );
  };

  it("renders <DateTime> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(2);
  });

  it("renders <DateTime> with mount - render required", () => {
    const wrapper = Render(<DateTime {...props} required />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find("input")).toHaveLength(2);
  });
});
