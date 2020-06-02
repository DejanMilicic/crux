import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getDash, selectDash, DashStore } from "stores/dash";
import { Loader } from "nav";
import { DashTitle, RecentEdit, RecentView } from "components/furniture";
import AttendanceDash from "logic/attendance/AttendanceDash";
import MsgDash from "logic/msg/MsgDash";

export function Home() {
  const { attendance, msg, dispatchDash, statusDash } = selectDash(useContext(DashStore));

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusDash.isReady && refresh) {
      getDash(dispatchDash, { operation: "home", logicKey: "dash" });
      setRefresh(false);
    }
  }, [dispatchDash, refresh, statusDash]);

  const spring = useSpring({ config: { duration: 750 }, opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring}>
      <Container>
        <DashTitle>My Activity</DashTitle>
        {statusDash.isReady && !refresh ? (
          <Grid container>
            <Grid item md={12} lg={8}>
              <AttendanceDash list={attendance} />
              <MsgDash list={msg} />
            </Grid>

            <Grid item md={12} lg={4}>
              <RecentEdit />
              <RecentView />
            </Grid>
          </Grid>
        ) : (
          <Loader />
        )}
      </Container>
    </animated.div>
  );
}
