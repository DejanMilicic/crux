import React from "react";
import PropTypes from "prop-types";
import Rollbar from "rollbar";

export function Errors({ children }) {
  const ErrorContext = React.createContext();

  const rollbar = new Rollbar({
    accessToken: "a481074ac9a94589af8c9ac18bc2d356",
    captureUncaught: true,
    captureUnhandledRejections: true,
    captureIp: true,
    payload: {
      environment: "Crux Client",
    },
  });

  return <ErrorContext.Provider value={rollbar}>{children}</ErrorContext.Provider>;
}

Errors.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
