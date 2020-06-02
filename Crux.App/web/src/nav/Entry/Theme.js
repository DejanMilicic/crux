import React, { Fragment, Suspense } from "react";
import PropTypes from "prop-types";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";

export function Theme({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: pink,
    },
    typography: {
      useNextVariants: true,
    },
  });

  return (
    <Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
      </ThemeProvider>
    </Fragment>
  );
}

Theme.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
