import React from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";

export function Preview({ src, file, handleFile, handleView, inProgress, isComplete }) {
  const useStyles = makeStyles(() => {
    return {
      paper: {
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: 150,
        height: 150,
        margin: 20
      },
      bottomRight: {
        width: 44,
        height: 44,
        right: -100,
        bottom: -100
      }
    };
  });

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      {inProgress ? (
        <CircularProgress />
      ) : isComplete ? (
        <Fab color="secondary" onClick={() => handleView(file.name)} className={classes.bottomRight}>
          <Icon>check</Icon>
        </Fab>
      ) : (
        <Fab color="primary" onClick={() => handleFile(file)} className={classes.bottomRight}>
          <Icon>cloud_upload</Icon>
        </Fab>
      )}
    </Paper>
  );
}

Preview.propTypes = {
  src: PropTypes.string.isRequired,
  file: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  handleFile: PropTypes.func,
  handleView: PropTypes.func,
  inProgress: PropTypes.bool,
  isComplete: PropTypes.bool
};
