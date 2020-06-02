import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { DashHead, ShortDayFormat, ShortTimeFormat } from "components/furniture";
import { DisplayLink } from "components/links";
import { ProfilesRow } from "components/media";

export default function AttendanceDash({ list }) {
  return (
    <Box p={1}>
      <Paper>
        <DashHead logicKey="meeting">Your Meetings</DashHead>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          {list.map((line) => (
            <Grid item key={line.dayCode} xs={12} sm={6} md={4} lg={3}>
              <Box p={1} minHeight={150}>
                <ShortDayFormat date={line.when} />
                <Divider />
                {line.data.map((attendance) => (
                  <Fragment key={attendance.id}>
                    <Box p={1} display="flex" flexDirection="row" alignItems="flex-start">
                      <ProfilesRow list={attendance.participants} logicKey="user" />
                      <Box pl={1} display="flex" flexDirection="column" alignItems="flex-start" justify="flex-start">
                        <DisplayLink logicId={attendance.meetingId} logicKey="meeting">
                          <Typography variant="body1" color="textPrimary">
                            {attendance.meetingName}
                          </Typography>
                          <ShortTimeFormat date={attendance.when} />
                        </DisplayLink>
                      </Box>
                    </Box>
                    <Divider />
                  </Fragment>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

AttendanceDash.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      dayCode: PropTypes.number.isRequired,
      when: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          when: PropTypes.string.isRequired,
          participants: PropTypes.array.isRequired,
        })
      ).isRequired,
    }).isRequired
  ).isRequired,
};
