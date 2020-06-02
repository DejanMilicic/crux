import React, { useContext } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import { NavDraw } from "components/links";
import { selectUser, UserStore } from "stores/user";
import { metaFind } from "logic";

export function MainMenu({ handleReset }) {
  const meetingMeta = metaFind("meeting");
  const msgMeta = metaFind("msg");
  const visibleMeta = metaFind("visible");
  const userMeta = metaFind("user");
  const { config, right } = selectUser(useContext(UserStore));

  return (
    <Box width={250}>
      <List>
        <NavDraw id="home" key="home" label="Home" to="/">
          home
        </NavDraw>
        <NavDraw id="dash" key="dash" label="Dashboard" to="/dash">
          dashboard
        </NavDraw>
        <Divider />
        <NavDraw id="meetings" key="meetings" onClick={handleReset} label="Meetings" to={"/" + config.templateView + "/meeting"}>
          {meetingMeta.icon}
        </NavDraw>
        <NavDraw id="msgs" key="msgs" onClick={handleReset} label="Messages" to={"/" + config.templateView + "/msg"}>
          {msgMeta.icon}
        </NavDraw>
        <NavDraw id="media" key="media" onClick={handleReset} label="Media" to="/media">
          {visibleMeta.icon}
        </NavDraw>
        {right.canAdmin || right.canSuperuser ? (
          <NavDraw id="users" key="users" onClick={handleReset} label="Users" to={"/" + config.templateView + "/user"}>
            {userMeta.icon}
          </NavDraw>
        ) : null}
      </List>
      <Divider />
    </Box>
  );
}

MainMenu.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
