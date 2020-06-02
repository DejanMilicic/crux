import React from "react";
import { act } from "react-dom/test-utils";
import { ModelStore } from "stores/model";
import { RetainStore } from "stores/retain";
import { LoaderStore } from "stores/loader";
import { UserStore } from "stores/user";
import { ProfileInput } from "components/media";
import UserInput from "./userInput";
import { mount } from "enzyme";

describe("<UserInput />", () => {
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
      stored: [{ logicId: "tenant-123-A", logicKey: "user" }]
    },
    dispatchModal: jest.fn()
  };

  const retain = {
    stateRetain: {
      show: true,
      stored: [{ logicId: "identity-123", logicKey: "user" }]
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

  const user = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false
      },
      config: {
        templateView: "list"
      },
      right: {
        canSuperUser: false
      }
    },
    dispatchUser: jest.fn()
  };

  const superuser = {
    stateUser: {
      status: {
        isLoading: false,
        isFailed: false
      },
      config: {
        templateView: "list"
      },
      right: {
        canSuperuser: true,
        canAdmin: true,
        canAuth: true
      }
    },
    dispatchUser: jest.fn()
  };

  const Render = (children = <UserInput {...props} />, defaultUser = user) => {
    return mount(
      <UserStore.Provider value={defaultUser}>
        <LoaderStore.Provider value={loader}>
          <ModelStore.Provider value={model}>
            <RetainStore.Provider value={retain}>
              {children}
            </RetainStore.Provider>
          </ModelStore.Provider>
        </LoaderStore.Provider>
      </UserStore.Provider>
    );
  };

  it("renders <UserInput> with mount - render snapshot canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate upload canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    wrapper
      .find("#profileUpload")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate library canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    wrapper
      .find("#profileLibrary")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change name canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change email canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    wrapper
      .find("#email")
      .find("input")
      .simulate("change", { target: { value: "dave@dave.com" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change pwd canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    wrapper
      .find("#password")
      .find("input")
      .simulate("change", { target: { value: "mySecr3t" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate form submit canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);
    wrapper.find("form").simulate("submit");
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate profile change canvas", () => {
    const wrapper = Render(<UserInput {...props} isDialog={false} />);

    act(() => {
      wrapper
        .find(ProfileInput)
        .props()
        .handleChange({
          id: "profile-123",
          thumbUrl: "http://img.com/img.png"
        });
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate switch change auth canvas", () => {
    const wrapper = Render(
      <UserInput {...props} isDialog={false} />,
      superuser
    );

    act(() => {
      wrapper
        .find("#auth")
        .first()
        .props()
        .handleChange(true);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate switch change admin canvas", () => {
    const wrapper = Render(
      <UserInput {...props} isDialog={false} />,
      superuser
    );

    act(() => {
      wrapper
        .find("#admin")
        .first()
        .props()
        .handleChange(true);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate switch change super canvas", () => {
    const wrapper = Render(
      <UserInput {...props} isDialog={false} />,
      superuser
    );

    act(() => {
      wrapper
        .find("#superuser")
        .first()
        .props()
        .handleChange(true);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - render snapshot dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);
    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate upload dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    wrapper
      .find("#profileUpload")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate library", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    wrapper
      .find("#profileLibrary")
      .first()
      .simulate("click");

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change name", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    wrapper
      .find("#name")
      .find("input")
      .simulate("change", { target: { value: "dave" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change email", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    wrapper
      .find("#email")
      .find("input")
      .simulate("change", { target: { value: "dave@dave.com" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate change pwd dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    wrapper
      .find("#password")
      .find("input")
      .simulate("change", { target: { value: "mySecr3t" } });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate profile change dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);

    act(() => {
      wrapper
        .find(ProfileInput)
        .props()
        .handleChange({
          id: "profile-123",
          thumbUrl: "http://img.com/img.png"
        });
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate switch change auth dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />, superuser);

    act(() => {
      wrapper
        .find("#auth")
        .first()
        .props()
        .handleChange(true);
    });

    expect(wrapper.debug()).toMatchSnapshot();
    expect(wrapper.find(UserInput)).toHaveLength(1);
  });

  it("renders <UserInput> with mount - simulate switch change admin dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />, superuser);

    act(() => {
      wrapper
        .find("#admin")
        .first()
        .props()
        .handleChange(true);
    });
  });

  it("renders <UserInput> with mount - simulate switch change super dialog", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />, superuser);

    act(() => {
      wrapper
        .find("#superuser")
        .first()
        .props()
        .handleChange(true);
    });
  });

  it("renders <UserInput> with mount - simulate form submit", () => {
    const wrapper = Render(<UserInput {...props} isDialog={true} />);
    wrapper.find("form").simulate("submit");
  });
});
