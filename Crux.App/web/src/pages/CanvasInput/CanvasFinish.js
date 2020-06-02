import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import Grid from "@material-ui/core/Grid";
import { CanvasLayout } from "components/furniture";
import { CanvasOperate } from "components/operates";
import { Giphy } from "components/media";
import { Loader } from "nav";
import { selectDisplay, DisplayStore } from "stores/display";
import { Pickup } from "./pickup";

export function CanvasFinish({ logicId, logicKey }) {
  const { current, statusDisplay, meta } = selectDisplay(logicId, logicKey, useContext(DisplayStore));

  let model = {
    id: logicId,
    canAdd: false,
    canEdit: false,
    canDelete: false,
    canList: false,
    canCustom: false,
    canFavourite: false,
    favourite: false,
  };

  if (statusDisplay.isCurrent) {
    model = current;
  }

  if (statusDisplay.isFailed) {
    model.canEdit = true;
    model.canList = true;
  }

  const FinishComponent = lazy(() => import("logic/" + logicKey + "/" + logicKey + "Finish"));

  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <Suspense fallback={<Loader />}>
      <animated.div style={spring}>
        <CanvasLayout icon={meta.icon} title={meta.title} width={meta.inputWidth}>
          <Grid container direction="column" alignItems="center">
            <Giphy tags="thumbsup" />
            <Pickup logicId={logicId} logicKey={logicKey}>
              <FinishComponent logicId={logicId} display={current} />
              <CanvasOperate source="display" logicKey={logicKey} model={model} showEdit showDelete showCustom showFav />
            </Pickup>
          </Grid>
        </CanvasLayout>
      </animated.div>
    </Suspense>
  );
}

CanvasFinish.propTypes = {
  logicId: PropTypes.string,
  logicKey: PropTypes.string,
};
