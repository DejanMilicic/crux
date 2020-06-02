import React from "react";
import { act } from "react-dom/test-utils";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { ModelStore } from "stores/model";
import { RetainStore } from "stores/retain";
import { LoaderStore } from "stores/loader";
import { RefStore } from "stores/ref";
import { PopStore } from "stores/pop";
import { PickerInput } from "components/inputs";
import MsgInput from "./msgInput";
import { mount } from "enzyme";

describe("<MsgInput />", () => {
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
          logicId: "msgs-123-A",
          logicKey: "msg",
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

  const Render = (children = <MsgInput {...props} />, defaultModel = model) => {
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

  beforeEach(() => {
    Date.now = jest.fn(() => new Date(2019, 11, 15, 10, 0, 0).getTime());
  });

  it("renders <MsgInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate change name canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);

    wrapper
      .find("#subject")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate change description canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);

    wrapper
      .find("#message")
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate picker change canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);

    act(() => {
      wrapper.find(PickerInput).props().handleChange([]);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate checkbox private canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);

    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate checkbox forceNotify canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);

    wrapper
      .find('input[type="checkbox"]')
      .last()
      .simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate form submit canvas", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={false} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - render snapshot dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate change name dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);

    wrapper
      .find("#subject")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate change description dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);

    wrapper
      .find("#message")
      .find("textarea")
      .first()
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate picker change dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);

    act(() => {
      wrapper.find(PickerInput).props().handleChange([]);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate checkbox private dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);

    wrapper
      .find('input[type="checkbox"]')
      .first()
      .simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate checkbox forceNotify dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);

    wrapper
      .find('input[type="checkbox"]')
      .last()
      .simulate("change", { target: { checked: true } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });

  it("renders <MsgInput> with mount - simulate form submit dialog", () => {
    const wrapper = Render(<MsgInput {...props} isDialog={true} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(MsgInput)).toHaveLength(1);
  });
});
