import React from "react";
import { act } from "react-dom/test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ModelStore } from "stores/model";
import { RetainStore } from "stores/retain";
import { LoaderStore } from "stores/loader";
import { RefStore } from "stores/ref";
import { PopStore } from "stores/pop";
import { PickerInput, SelectInput, SelectRef } from "components/inputs";
import MeetingInput from "./meetingInput";
import { mount } from "enzyme";

describe("<MeetingInput />", () => {
  const props = {
    dispatch: jest.fn(),
    callback: jest.fn(),
  };

  const model = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      stored: [
        {
          logicId: "meetings-123-A",
          logicKey: "meeting",
          model: {
            id: "meetings-123-A",
            authorId: "authors-1",
            authorName: "dave",
            attendees: [],
            when: "2025-01-01",
          },
        },
      ],
    },
    dispatchModal: jest.fn(),
  };

  const existing = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true,
      },
      stored: [
        {
          logicId: "meetings-123-A",
          logicKey: "meeting",
          model: {
            id: "meetings-123-A",
            authorId: "authors-1",
            authorName: "dave",
            attendees: [],
            when: "2025-01-01",
          },
        },
      ],
    },
    dispatchModal: jest.fn(),
  };

  const retain = {
    stateRetain: {
      show: true,
      stored: [
        {
          logicId: "identity-123",
          logicKey: "user",
        },
      ],
    },
    dispatchRetain: jest.fn(),
  };

  const loader = {
    stateLoader: {
      status: { isLoading: false, isFailed: false },
      files: [
        {
          id: "file-123",
          name: "image.png",
          thumbUrl: "https://img.com/image.png",
        },
      ],
    },
    dispatchLoader: jest.fn(),
  };

  const ref = {
    stateRef: {
      status: {
        isLoading: false,
        isFailed: false,
      },
      stored: [{ id: "identity-123", name: "name" }],
    },
    dispatchRef: jest.fn(),
  };

  const pop = {
    statePop: {},
    dispatchPop: jest.fn(),
  };

  const Render = (children = <MeetingInput {...props} />, defaultModel = model) => {
    return mount(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <PopStore.Provider value={pop}>
          <RefStore.Provider value={ref}>
            <LoaderStore.Provider value={loader}>
              <ModelStore.Provider value={defaultModel}>
                <RetainStore.Provider value={retain}>{children}</RetainStore.Provider>
              </ModelStore.Provider>
            </LoaderStore.Provider>
          </RefStore.Provider>
        </PopStore.Provider>
      </MuiPickersUtilsProvider>
    );
  };

  it("renders <MeetingInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change name canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change description canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    wrapper
      .find("#description")
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change when canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    act(() => {
      wrapper.find("#when").props().handleChange("2019-01-01");
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate select ref canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    act(() => {
      wrapper.find(SelectRef).props().handleChange("meetingTypes-1");
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate picker change canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    act(() => {
      wrapper.find(PickerInput).props().handleChange([]);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate select input canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />, existing);

    act(() => {
      wrapper.find(SelectInput).props().handleChange({
        id: "author-1",
        name: "dave",
      });
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate checkbox private canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);

    wrapper.find('input[type="checkbox"]').simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate form submit canvas", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={false} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - render snapshot dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change name dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change description dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    wrapper
      .find("#description")
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate change when dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    act(() => {
      wrapper.find("#when").props().handleChange("2019-01-01");
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate select ref dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    act(() => {
      wrapper.find(SelectRef).props().handleChange("meetingTypes-1");
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate select input dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />, existing);

    act(() => {
      wrapper.find(SelectInput).props().handleChange({
        id: "author-1",
        name: "dave",
      });
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate picker change dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    act(() => {
      wrapper.find(PickerInput).props().handleChange([]);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate checkbox private dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);

    wrapper.find('input[type="checkbox"]').simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });

  it("renders <MeetingInput> with mount - simulate form submit dialog", () => {
    const wrapper = Render(<MeetingInput {...props} isDialog={true} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MeetingInput)).toHaveLength(1);
  });
});
