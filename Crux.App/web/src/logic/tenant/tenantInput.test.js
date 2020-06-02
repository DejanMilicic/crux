import React from "react";
import { act } from "react-dom/test-utils";
import { ModelStore } from "stores/model";
import { RetainStore } from "stores/retain";
import { LoaderStore } from "stores/loader";
import { ProfileInput } from "components/media";
import TenantInput from "./tenantInput";
import { mount } from "enzyme";

describe("<TenantInput />", () => {
  global.URL.createObjectURL = jest.fn().mockReturnValue("src");

  const props = {
    dispatch: jest.fn(),
    callback: jest.fn()
  };

  const model = {
    stateModel: {
      status: {
        isLoading: false,
        isFailed: false,
        isLoaded: true
      },
      stored: [
        { id: "identity-123", logicId: "tenant-123-A", logicKey: "tenant" }
      ]
    },
    dispatchModal: jest.fn()
  };

  const retain = {
    stateRetain: {
      show: true,
      stored: [
        { id: "identity-123", logicId: "identity-123", logicKey: "user" }
      ]
    },
    dispatchRetain: jest.fn()
  };

  const loader = {
    stateLoader: {
      status: { isLoading: false, isFailed: false },
      files: [
        {
          id: "file-123",
          name: "image.png",
          thumbUrl: "https://img.com/image.png"
        }
      ]
    },
    dispatchLoader: jest.fn()
  };

  const Render = (children = <TenantInput {...props} />) => {
    return mount(
      <LoaderStore.Provider value={loader}>
        <ModelStore.Provider value={model}>
          <RetainStore.Provider value={retain}>{children}</RetainStore.Provider>
        </ModelStore.Provider>
      </LoaderStore.Provider>
    );
  };

  it("renders <TenantInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate upload canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);

    wrapper
      .find("#profileUpload")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate library canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);

    wrapper
      .find("#profileLibrary")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate change name canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate form submit canvas", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - render snapshot dialog", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate upload dialog", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={true} />);

    wrapper
      .find("#profileUpload")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate library dialog", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={true} />);

    wrapper
      .find("#profileLibrary")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate change name dialog", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={true} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate form submit dialog", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={true} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });

  it("renders <TenantInput> with mount - simulate profile change", () => {
    const wrapper = Render(<TenantInput {...props} isDialog={false} />);

    act(() => {
      wrapper
        .find(ProfileInput)
        .props()
        .handleChange({
          id: "identity-123",
          thumbUrl: "http://url.com/img.png"
        });
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(TenantInput)).toHaveLength(1);
  });
});
