import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { CanvasLayout } from "components/furniture";
import { CanvasOperate } from "components/operates";
import { Loader } from "nav";
import { selectDisplay, DisplayStore } from "stores/display";
import { Effect } from "./effect";

export function CanvasDisplay({ logicId, logicKey }) {
  const { current, meta } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  const DisplayComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Display"));

  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <Suspense fallback={<Loader />}>
      <animated.div style={spring}>
        <Effect logicId={logicId} logicKey={logicKey}>
          <CanvasLayout icon={meta.icon} title={meta.title} width={meta.displayWidth}>
            <DisplayComponent model={current} isDialog={false} />
            <CanvasOperate source="display" logicKey={logicKey} model={current} showEdit showDelete showCustom showFav />
          </CanvasLayout>
        </Effect>
      </animated.div>
    </Suspense>
  );
}

CanvasDisplay.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string,
};
