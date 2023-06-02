import { Divider, Grid, Icon } from "@mui/material";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import React, { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

export const GradientIcons = ({
  name,
  firstColor,
  secondColor,
  icon,
  centered,
  size = 120,
}) => {
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);

    return () => setInProp(false);
  }, []);

  const nodeRef = useRef(null);

  const duration = 300;

  const transitionStyles = {
    entering: { opacity: 1, transform: "scale(1)" },
    entered: { opacity: 1, transform: "scale(1)" },
    exiting: { opacity: 0, transform: "scale(0.5)" },
    exited: { opacity: 0, transform: "scale(0.5)" },
  };

  return (
    <>
      <svg width="0" height="0">
        <linearGradient id={name} x1="100%" y1="100%" x2="0%" y2="0%">
          <stop stopColor={firstColor} offset="0%" />
          <stop stopColor={secondColor} offset="100%" />
        </linearGradient>
      </svg>
      <Grid container justifyContent="center">
        <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
          {(state) =>
            React.cloneElement(icon, {
              style: {
                fill: `url(#${name})`,
                fontSize: size,
                transition: `all ${duration}ms ease-in-out`,
                opacity: 0,
                transform: "scale(0.5)",
                ...transitionStyles[state],
              },
            })
          }
        </Transition>
      </Grid>
    </>
  );
};
