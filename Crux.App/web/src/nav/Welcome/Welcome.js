import React, { useContext, Suspense, Fragment, useState, lazy } from "react";
import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";
import Container from "@material-ui/core/Container";
import { Loader } from "nav";

import { selectUser, UserStore } from "stores/user";
import StepNav from "./stepNav";

export function Welcome({ children }) {
  const spring = useSpring({
    config: { duration: 750 },
    opacity: 1,
    from: { opacity: 0 }
  });

  const { statusUser } = selectUser(useContext(UserStore));

  const [step, setStep] = useState(1);

  const StepComponent = lazy(() => import("nav/Welcome/step" + step));

  return statusUser.isWelcome ? (
    <Suspense fallback={<Loader />}>
      <animated.div style={spring}>
        <Container maxWidth="md">
          <StepComponent />
          <StepNav handleStep={setStep} step={step} total={3} />
        </Container>
      </animated.div>
    </Suspense>
  ) : (
    <Fragment>{children}</Fragment>
  );
}

Welcome.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
