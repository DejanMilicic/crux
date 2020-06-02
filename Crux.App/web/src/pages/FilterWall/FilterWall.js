import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import Masonry from "react-masonry-css";
import { useSpring, animated } from "react-spring";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { CanvasOperate } from "components/operates";
import { WallTitle } from "components/tables";
import { Loader } from "nav";
import { selectList, ListStore } from "stores/list";
import { Brick } from "./brick";
import { Effect } from "./effect";
import { LoadButton } from "./loadButton";
import "./masonry.css";

export function FilterWall({ logicKey }) {
  const { list, meta } = selectList(logicKey, useContext(ListStore));

  const DisplayComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Display"));

  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={spring}>
      <Container maxWidth="xl">
        <Box p={{ xs: 1, sm: 2 }}>
          <WallTitle icon={meta.icon} logicKey={logicKey}>
            {meta.title}s
          </WallTitle>
        </Box>
        <Divider />
        <Suspense fallback={<Loader />}>
          <Effect logicKey={logicKey}>
            <Masonry
              breakpointCols={{
                default: 6,
                2050: 5,
                1700: 4,
                1350: 3,
                1000: 2,
                650: 1,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column">
              {list.data.map((line) => (
                <Brick logicId={line.id} key={line.id}>
                  <DisplayComponent model={line} />
                  <CanvasOperate source="list" logicKey={logicKey} model={line} showEdit showDelete showCustom showFav />
                </Brick>
              ))}
            </Masonry>
            <LoadButton logicKey={logicKey} />
          </Effect>
        </Suspense>
      </Container>
    </animated.div>
  );
}

FilterWall.propTypes = {
  logicKey: PropTypes.string,
};
