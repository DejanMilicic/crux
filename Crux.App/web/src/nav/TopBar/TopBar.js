import React, { useContext, Fragment } from "react";
import { useSpring, animated } from "react-spring";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ClickIcon } from "components/links";
import { Burger, Settings, Query } from "nav";
import { openBurger, openSettings, MenuStore } from "stores/menu";

export function TopBar() {
  const { dispatchMenu } = useContext(MenuStore);

  const spring = useSpring({ config: { duration: 250 }, opacity: 1, from: { opacity: 0 } });

  return (
    <Fragment>
      <Burger />
      <animated.div style={spring}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid container direction="row" justify="space-between">
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  <ClickIcon aria="menu" color="inherit" callback={openBurger} dispatch={dispatchMenu}>
                    menu
                  </ClickIcon>
                  <Typography variant="h6" color="inherit">
                    Crux
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <ClickIcon aria="settings" color="inherit" callback={openSettings} dispatch={dispatchMenu}>
                  settings
                </ClickIcon>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </animated.div>
      <Settings />
      <Query />
    </Fragment>
  );
}
