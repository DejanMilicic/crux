import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { DashTitle } from "components/furniture";
import { UsageDisplay, DayLine, LineDisplay } from "components/stats";
import { Loader } from "nav";
import { getDash, selectDash, DashStore } from "stores/dash";

export function Dash() {
  const { tenant, meetings, messages, dispatchDash, statusDash } = selectDash(useContext(DashStore));

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusDash.isReady && refresh) {
      getDash(dispatchDash, { operation: "stats", logicKey: "dash" });
      setRefresh(false);
    }
  }, [dispatchDash, refresh, statusDash]);

  const spring = useSpring({ config: { duration: 750 }, opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring}>
      <Container>
        <DashTitle>Dashboard</DashTitle>
        {statusDash.isReady && !refresh ? (
          <Grid container>
            <Grid item md={12} lg={6}>
              <UsageDisplay legend="Storage" usage={tenant.fileMB} total={tenant.limitMB}>
                File Storage
              </UsageDisplay>
            </Grid>

            <Grid item md={12} lg={6}>
              <UsageDisplay legend="Users" usage={tenant.userCount} total={tenant.userLimit}>
                User Licenses
              </UsageDisplay>
            </Grid>

            <Grid item lg={12}>
              <LineDisplay title="Meeting Frequency">
                <DayLine data={meetings} />
              </LineDisplay>
            </Grid>

            <Grid item lg={12}>
              <LineDisplay title="Message Frequency">
                <DayLine data={messages} />
              </LineDisplay>
            </Grid>
          </Grid>
        ) : (
          <Loader />
        )}
      </Container>
    </animated.div>
  );
}
