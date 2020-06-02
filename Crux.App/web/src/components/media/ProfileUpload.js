import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { ProfileBox } from "./ProfileBox";
import { Preview } from "./Preview";
import {
  postFile,
  resetLoader,
  selectLoader,
  LoaderStore
} from "stores/loader";

export function ProfileUpload({ handleChange, handleFile }) {
  const { queue, dispatchLoader, statusLoader } = selectLoader(
    useContext(LoaderStore)
  );

  function handleDrop(file) {
    postFile(dispatchLoader, file);
  }

  useEffect(() => {
    if (statusLoader.isRefresh) {
      const file = queue[0];

      if (file.isLoaded && !file.isLoading) {
        resetLoader(dispatchLoader);
        handleChange({ id: file.id, thumbUrl: file.thumbUrl });
      }
    }
  }, [dispatchLoader, handleChange, statusLoader, queue]);

  return !queue || queue.length === 0 ? (
    <ProfileBox handleFile={handleDrop} />
  ) : (
    <Preview
      key={queue[0].name}
      src={URL.createObjectURL(queue[0].file)}
      file={queue[0]}
      handleFile={handleFile}
      inProgress={queue[0].isLoading}
      isComplete={queue[0].isLoaded}
    />
  );
}

ProfileUpload.propTypes = {
  handleChange: PropTypes.func,
  handleFile: PropTypes.func
};
