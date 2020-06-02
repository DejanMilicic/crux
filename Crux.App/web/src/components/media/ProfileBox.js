import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => {
  return {
    dashed: {
      borderStyle: "dashed",
      cursor: "pointer"
    }
  };
});

export function ProfileBox({ handleFile }) {
  const classes = useStyles();

  const onDrop = useCallback(
    files => {
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box width={125} height={125} display="flex" flexDirection="column" alignItems="center" borderColor="primary.main" borderRadius={2} border={2} className={classes.dashed}>
      <Box {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} multiple={false} />
        {
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={120} p={2}>
            {isDragActive ? <Typography variant="caption">Drop the file here ...</Typography> : <Typography variant="caption">Drag or select a profile image</Typography>}
          </Box>
        }
      </Box>
    </Box>
  );
}

ProfileBox.propTypes = {
  handleFile: PropTypes.func.isRequired
};
