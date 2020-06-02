import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { DashHead, LongDateFormat } from "components/furniture";
import { DisplayLink, NavIcon } from "components/links";

export default function MsgDash({ list }) {
  return (
    <Box p={1}>
      <Paper>
        <DashHead logicKey="msg">Recent Messages</DashHead>
        <Box p={1}>
          {list.map((line) => (
            <Box key={line.id} p={1}>
              <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <DisplayLink logicId={line.authorId} logicKey="user">
                      <Avatar alt={line.authorName} src={line.authorProfileThumbUrl} />
                    </DisplayLink>
                    <Box p={1}>
                      <Typography variant="body2" color="textPrimary">
                        {line.name}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="row" alignItems="center">
                    <LongDateFormat date={line.dateModified} />
                    <NavIcon to={"display/msg/" + line.id}>info</NavIcon>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}

MsgDash.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      authorProfileThumbUrl: PropTypes.string,
      dateModified: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
