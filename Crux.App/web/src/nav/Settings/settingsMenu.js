import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { NavDraw, ClickDraw, ConfigDraw, ResetPwdDraw } from "components/links";
import { setLogout, selectUser, UserStore } from "stores/user";

export function SettingsMenu() {
  const { user, right, dispatchUser } = selectUser(useContext(UserStore));

  return (
    <Box width={250}>
      <List>
        <NavDraw key="user" label="My Details" to={"/edit/user/" + user.id}>
          person
        </NavDraw>
        {right.canAdmin || right.canSuperuser ? (
          <NavDraw
            key="tenant"
            label="My Organisation"
            to={"/edit/tenant/" + user.tenantId}
          >
            business
          </NavDraw>
        ) : null}
        <Divider />
        <ConfigDraw />
        <ResetPwdDraw />
        <Divider />
        {right.canSuperuser ? (
          <NavDraw key="tenantList" label="Organisations" to="/table/tenant">
            domain
          </NavDraw>
        ) : null}
        <ClickDraw
          key="logout"
          label="Logout"
          callback={setLogout}
          dispatch={dispatchUser}
        >
          exit_to_app
        </ClickDraw>
      </List>
      <Divider />
    </Box>
  );
}
