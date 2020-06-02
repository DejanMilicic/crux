import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { Preview } from "./Preview";

export function PreviewList({ files, handleFile }) {
  return (
    <Box display="flex" flexDirection="row">
      {files.map(file => (
        <Preview key={file.name} src={URL.createObjectURL(file.file)} file={file} handleFile={handleFile} inProgress={file.isLoading} isComplete={file.isLoaded} />
      ))}
    </Box>
  );
}

PreviewList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.shape({}).isRequired,
      name: PropTypes.string.isRequired,
      isLoading: PropTypes.bool.isRequired,
      isLoaded: PropTypes.bool.isRequired
    })
  ).isRequired,
  handleFile: PropTypes.func.isRequired
};
