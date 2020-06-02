import React from "react";
import { LineChart } from "recharts";
import { DayLine } from "./DayLine";
import { mount } from "enzyme";

describe("<DayLine />", () => {
  const props = {
    data: []
  };

  it("renders <DeleteIcon> with mount - render snapshot", () => {
    const wrapper = mount(<DayLine {...props} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(LineChart)).toHaveLength(1);
  });
});
