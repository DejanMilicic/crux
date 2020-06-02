import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Loader } from "nav";

export default function VisibleDisplay({ model }) {
  let visibleType = "ImageFull";

  if (model) {
    if (model.isVideo) {
      visibleType = "VideoFull";
    }

    if (model.isDocument) {
      visibleType = "DocFull";
    }
  }

  const DisplayComponent = lazy(() => import("nav/Visible/" + visibleType));

  return (
    <Suspense fallback={<Loader />}>
      <DisplayComponent
        fullUrl={model.fullUrl}
        id={model.id}
        name={model.name}
      />
    </Suspense>
  );
}

VisibleDisplay.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired
  }).isRequired
};
