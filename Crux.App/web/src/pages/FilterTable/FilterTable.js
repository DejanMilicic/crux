import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { Loader } from "nav";
import { TableTitle } from "components/tables";
import { selectList, ListStore } from "stores/list";
import { Effect } from "./effect";

export function FilterTable({ logicKey }) {
  const { list, params, meta } = selectList(logicKey, useContext(ListStore));

  const TableComponent = lazy(() =>
    import("logic/" + logicKey + "/" + logicKey + "Table")
  );

  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 }
  });

  return (
    <Suspense fallback={<Loader />}>
      <animated.div style={spring}>
        <Container maxWidth="xl">
          <Box pt={1}>
            <Box py={2}>
              <TableTitle icon={meta.icon} logicKey={logicKey}>
                {meta.title}s
              </TableTitle>
              <Divider />
            </Box>
            <Paper>
              <Effect logicKey={logicKey}>
                <TableComponent
                  list={list}
                  params={params}
                  logicKey={logicKey}
                />
              </Effect>
            </Paper>
          </Box>
        </Container>
      </animated.div>
    </Suspense>
  );
}

FilterTable.propTypes = {
  logicKey: PropTypes.string
};
