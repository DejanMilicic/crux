import React from "react";
import PropTypes from "prop-types";
import { TopBar, Pop, Retain, Welcome } from "nav";
import { Providers } from "./providers";
import { DashStoreProvider } from "stores/dash";

export function Layout({ children }) {
  return (
    <Providers>
      <TopBar />
      <Welcome>
        <DashStoreProvider>{children}</DashStoreProvider>
      </Welcome>
      <Pop />
      <Retain />
    </Providers>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
