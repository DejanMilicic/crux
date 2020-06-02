import React from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { CanvasLayout } from "components/furniture";
import { CanvasOperate } from "components/operates";
import { Giphy } from "components/media";
import { metaFind } from "logic";

export function CanvasDeleted({ logicKey }) {
  const meta = metaFind(logicKey);
  const model = {
    id: "",
    canAdd: true,
    canEdit: false,
    canDelete: false,
    canList: true,
    canCustom: false,
    canFavourite: false,
  };

  const spring = useSpring({ config: { duration: 750 }, opacity: 1, from: { opacity: 0 } });

  return (
    <animated.div style={spring}>
      <CanvasLayout icon={meta.icon} title={meta.title} width={meta.displayWidth}>
        <Grid container direction="column" alignItems="center">
          <Giphy tags="lose" />
          <Typography variant="h6" color="textPrimary">
            The {meta.title} has been deleted
          </Typography>
          <CanvasOperate source="display" logicKey={logicKey} model={model} showEdit showDelete showCustom showFav />
        </Grid>
      </CanvasLayout>
    </animated.div>
  );
}

CanvasDeleted.propTypes = {
  logicKey: PropTypes.string,
};
