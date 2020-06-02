import React from "react";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { NoteStore } from "stores/note";
import { CloseIcon } from "components/links";
import IconButton from "@material-ui/core/IconButton";
import { Notes } from "./Notes";
import { mount } from "enzyme";

describe("<Notes />", () => {
  const theme = createMuiTheme({ palette: { primary: { main: "#fff" } } });

  const props = {
    logicId: "meeting-123-A",
    logicKey: "meeting",
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const note = {
    stateNote: {
      status: {
        isLoading: false,
        isFailed: false
      },
      display: {
        name: "test"
      },
      notes: {
        history: [
          {
            text: "test",
            authorName: "Dave",
            authorProfileThumbUrl: "https://image.com/img.png",
            counter: 0
          }
        ]
      }
    },
    dispatchNote: jest.fn()
  };

  const Render = (children = <Notes {...props} />) => {
    return mount(
      <ThemeProvider theme={theme}>
        <NoteStore.Provider value={note}>{children}</NoteStore.Provider>
      </ThemeProvider>
    );
  };

  it("renders <Notes> with mount - render snapshot", () => {
    const wrapper = Render();
    expect(wrapper.find(Notes)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Notes> with mount - simulate close", () => {
    const wrapper = Render();

    wrapper
      .find(CloseIcon)
      .find(IconButton)
      .simulate("click");

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Notes)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Notes> with mount - simulate submit", () => {
    const wrapper = Render();

    wrapper
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "my note text" } });

    wrapper.find("form").simulate("submit");

    expect(note.dispatchNote).toHaveBeenCalled();
    expect(wrapper.find(Notes)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Notes> with mount - simulate delete", () => {
    const wrapper = Render();

    wrapper
      .find("li")
      .find("button")
      .simulate("click");

    expect(note.dispatchNote).toHaveBeenCalled();
    expect(wrapper.find(Notes)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("renders <Notes> with mount - simulate close", () => {
    const wrapper = Render();

    act(() => {
      wrapper
        .find(Dialog)
        .props()
        .onClose();
    });

    expect(props.callback).toHaveBeenCalled();
    expect(wrapper.find(Notes)).toHaveLength(1);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
