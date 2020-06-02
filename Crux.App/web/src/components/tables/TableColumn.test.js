import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { TableColumn } from "./TableColumn";
import { mount } from "enzyme";

describe("<TableColumn />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const Render = (children = <TableColumn>Dave</TableColumn>) => {
    return mount(
      <ThemeProvider theme={theme}>
        <table>
          <tbody>
            <tr>{children}</tr>
          </tbody>
        </table>
      </ThemeProvider>
    );
  };

  it("renders <TableColumn> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TableColumn)).toHaveLength(1);
  });
});
