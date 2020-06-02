import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import { setForget, endForget, UserStore } from "stores/user";

export function ForgetLink({ on, email, children }) {
  const { dispatchUser } = useContext(UserStore);

  function handleClick(e) {
    e.preventDefault();

    if (on) {
      setForget(dispatchUser);
    } else {
      endForget(dispatchUser, { email });
    }
  }

  return (
    <Box>
      <Link href="#" onClick={handleClick} color="inherit" variant="inherit" underline="none">
        <span>{children}</span>
      </Link>
    </Box>
  );
}

ForgetLink.propTypes = {
  on: PropTypes.bool,
  email: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
