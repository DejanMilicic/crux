import React from "react";
import PropTypes from "prop-types";
import { UserStoreProvider } from "stores/user";
import { Theme, Errors } from "nav";

function Trap({ children }) {
  return (
    <Theme>
      <Errors>
        <UserStoreProvider>{children}</UserStoreProvider>
      </Errors>
    </Theme>
  );
}

export default Trap;

Trap.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
