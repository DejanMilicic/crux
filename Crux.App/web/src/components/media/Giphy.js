import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getGif, selectGif, LoaderStore } from "stores/loader";

export function Giphy({ tags }) {
  const { gif, dispatchLoader } = selectGif(useContext(LoaderStore));
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (refresh) {
      getGif(dispatchLoader, { tags });
      setRefresh(false);
    }
  }, [dispatchLoader, gif, refresh, tags]);

  return gif && !refresh ? (
    <div>
      <img alt="giphy" src={gif} />
    </div>
  ) : null;
}

Giphy.propTypes = {
  tags: PropTypes.string.isRequired
};
