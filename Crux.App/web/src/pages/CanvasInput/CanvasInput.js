import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import { CanvasLayout } from "components/furniture";
import { Loader } from "nav";
import { Effect } from "./effect";
import { metaFind } from "logic";

export function CanvasInput({ logicId, logicKey }) {
  const meta = metaFind(logicKey);

  const InputComponent = lazy(() =>
    import("logic/" + logicKey + "/" + logicKey + "Input")
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
          title={meta.title}
          width={meta.inputWidth}
        >
          <Effect logicId={logicId} logicKey={logicKey}>
            <InputComponent isDialog={false} />
          </Effect>
        </CanvasLayout>
      </animated.div>
    </Suspense>
  );
}

CanvasInput.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string
};
