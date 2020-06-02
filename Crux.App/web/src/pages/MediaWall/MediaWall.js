import React, { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { VisibleLink } from "components/links";
import { Uploader } from "components/media";
import { LoaderStatus } from "nav";
import { postFilter, selectList, ListStore } from "stores/list";
import { selectLoader, LoaderStore } from "stores/loader";

export function MediaWall() {
  const logicKey = "visible";

  const { list, params, dispatchList, statusList } = selectList(logicKey, useContext(ListStore));

  const { statusLoader } = selectLoader(useContext(LoaderStore));

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    if (statusList.isReady && (refresh || !statusList.isCurrent)) {
      postFilter(dispatchList, {
        params: params,
        logicKey: logicKey
      });
      setRefresh(false);
    }
  }, [dispatchList, refresh, params, statusList]);

  useEffect(() => {
    if (statusLoader.isRefresh && refresh) {
      postFilter(dispatchList, {
        params: params,
        logicKey: logicKey
      });
      setRefresh(false);
    }
  }, [dispatchList, refresh, params, statusLoader]);

  function handleChange() {
    setRefresh(true);
  }

  const spring = useSpring({ config: { duration: 750 }, opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring}>
      <Container maxWidth="xl">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Uploader handleChange={handleChange} />
          {statusList.isReady ? (
            <Box width={900} pt={1}>
              <GridList cols={3}>
                {list.data.map(visible => (
                  <GridListTile key={visible.id}>
                    <VisibleLink logicId={visible.id}>
                      <img src={visible.thumbUrl} alt={visible.name} />
                    </VisibleLink>
                  </GridListTile>
                ))}
              </GridList>
            </Box>
          ) : (
            <LoaderStatus status={statusList} />
          )}
        </Box>
      </Container>
    </animated.div>
  );
}
