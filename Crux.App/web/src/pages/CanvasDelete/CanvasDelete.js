import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { CanvasLayout } from "components/furniture";
import { Loader } from "nav";
import { selectDisplay, DisplayStore } from "stores/display";
import { DeleteOperate } from "./deleteOperate";
import { Effect } from "./effect";

export function CanvasDelete({ logicId, logicKey }) {
  const { current, meta } = selectDisplay(
    logicId,
    logicKey,
    useContext(DisplayStore)
  );

  const DisplayComponent = lazy(() =>
    import("logic/" + logicKey + "/" + logicKey + "Display")
  );

  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 }
  });

  return (
    <Suspense fallback={<Loader />}>
      <animated.div style={spring}>
        <CanvasLayout
          icon={meta.icon}
          title={"Delete " + meta.title}
          width={meta.displayWidth}
        >
          <Effect logicId={logicId} logicKey={logicKey}>
            <DisplayComponent model={current} isDialog={false} />
            <DeleteOperate
              logicId={logicId}
              logicKey={logicKey}
              isDialog={false}
            />
          </Effect>
        </CanvasLayout>
      </animated.div>
    </Suspense>
  );
}

CanvasDelete.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string
};
