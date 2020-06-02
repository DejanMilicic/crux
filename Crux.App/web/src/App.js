import React from "react";
import PropTypes from "prop-types";
import { Entry } from "nav";

function App({ children }) {
  return <Entry>{children}</Entry>;
}

export default App;

App.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
