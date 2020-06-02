import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { PopStore } from "stores/pop";
import AttendanceDash from "./AttendanceDash";
import { mount } from "enzyme";

describe("<AttendanceDash />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    list: [
      {
        dayCode: 20190101,
        when: "2019-01-01",
        data: [
          {
            id: "identity-123",
            participants: [],
            meetingId: "meetings-1-A",
            when: "2019-01-01",
          },
        ],
      },
    ],
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn(),
  };

  const Render = (children = <AttendanceDash {...props} />) => {
    return mount(
      <PopStore.Provider value={pop}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PopStore.Provider>
    );
  };

  it("renders <AttendanceDash> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(AttendanceDash)).toHaveLength(1);
  });
});
