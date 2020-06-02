import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export function LoaderStatus({ status }) {
  return <CircularProgress color="secondary" />;
}
