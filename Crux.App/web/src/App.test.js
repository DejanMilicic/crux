import React from "react";
import ReactDOM from "react-dom";
import { UserStoreProvider } from "stores/user";
import App from "./App";

const user = {
  stateUser: {
    status: { isLoading: false, isFailed: false },
  },
  dispatchUser: jest.fn(),
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <UserStoreProvider user={user}>
      <App>Some Content</App>
    </UserStoreProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
