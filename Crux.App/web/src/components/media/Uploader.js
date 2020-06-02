import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DropBox } from "./DropBox";
import { PreviewList } from "./PreviewList";
import {
  queueFiles,
  loadSingle,
  loadAll,
  selectLoader,
  LoaderStore
} from "stores/loader";

export function Uploader({ handleChange }) {
  const { queue, dispatchLoader } = selectLoader(useContext(LoaderStore));

  function handleDrop(files) {
    queueFiles(dispatchLoader, files);
  }

  function handleUpload(file) {
    loadSingle(dispatchLoader, file);
    if (handleChange) {
      handleChange();
    }
  }

  function handleAll() {
    loadAll(dispatchLoader, queue);
    if (handleChange) {
      handleChange();
    }
  }

  return (
    <Fragment>
      <DropBox handleFiles={handleDrop} />
      <PreviewList handleFile={handleUpload} files={queue} />
      {queue.length > 0 ? (
        <Box pb={2}>
          <Button
            id="uploadAll"
            color="primary"
            variant="contained"
            onClick={handleAll}
          >
            Load all Media
          </Button>
        </Box>
      ) : null}
    </Fragment>
  );
}

Uploader.propTypes = {
  handleChange: PropTypes.func.isRequired
};
