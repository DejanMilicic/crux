import React, { useContext } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { DashHead, MetaLine } from "components/furniture";
import { selectArchive, ModelStore } from "stores/model";

export function RecentEdit() {
  const { archive } = selectArchive(useContext(ModelStore));

  return (
    <Box p={1}>
      <Paper>
        <DashHead>Recently Edited</DashHead>
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
          {archive.length > 0 ? (
            archive
              .slice(0)
              .reverse()
              .map((line) => (
                <MetaLine key={line.logicId} logicId={line.logicId} logicKey={line.logicKey} logicIcon={line.logicIcon} logicTitle={line.logicTitle}>
                  {line.logicName}
                </MetaLine>
              ))
          ) : (
            <Box p={2}>
              <Typography variant="button">No edits this session</Typography>
            </Box>
          )}
        </Grid>
      </Paper>
    </Box>
  );
}
