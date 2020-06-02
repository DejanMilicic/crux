import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => {
  return {
    dashed: {
      borderStyle: "dashed"
    }
  };
});

export function DropBox({ handleFiles }) {
  const classes = useStyles();

  const onDrop = useCallback(
    files => {
      handleFiles(files);
    },
    [handleFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      width={900}
      height={100}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      m={1}
      p={1}
      borderColor="primary.main"
      borderRadius={2}
      border={2}
      className={classes.dashed}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="subtitle1" color="primary">
            Drop the files here ...
          </Typography>
        ) : (
          <Typography variant="subtitle1" color="primary">
            Drag 'n' drop files here, or click to select files
          </Typography>
        )}
      </Box>
    </Box>
  );
}

DropBox.propTypes = {
  handleFiles: PropTypes.func.isRequired
};
