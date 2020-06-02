import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Loader, Layout } from "nav";
import { Signin } from "./Signin";
import { Push } from "./Push";
import { Forget } from "./Forget";
import { TwoFactor } from "components/furniture";
import { postReconnect, selectUser, UserStore } from "stores/user";

export function Entry({ children }) {
  const { dispatchUser, user, forgot, statusUser } = selectUser(useContext(UserStore));

  let isVisible = false;

  if (statusUser) {
    if (!statusUser.isLoaded) {
      if (!statusUser.isLoading) {
        let key = localStorage.getItem("key");
        let id = localStorage.getItem("id");
        let verification = localStorage.getItem("verification");
        let expiry = localStorage.getItem("expiry");
        let now = new Date();

        if (expiry && new Date(expiry) < now) {
          localStorage.setItem("verification", "");
          localStorage.setItem("key", "");
          localStorage.setItem("id", "");
          localStorage.setItem("expiry", new Date());
        } else {
          if (key && id && verification) {
            postReconnect(dispatchUser, {
              verification: verification,
              id: id,
              key: key,
            });
          }
        }

        isVisible = true;
      }
    } else {
      isVisible = true;
    }
  }

  return isVisible ? (
    statusUser.isAuth ? (
      statusUser.isTwoFactor ? (
        <TwoFactor />
      ) : (
        <Push user={user}>
          <Layout>{children}</Layout>
        </Push>
      )
    ) : statusUser.isForget ? (
      <Forget forgot={forgot} />
    ) : (
      <Signin />
    )
  ) : (
    <Loader />
  );
}

Entry.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
