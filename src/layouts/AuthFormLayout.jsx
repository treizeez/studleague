import {
  Alert,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import logo from "../img/logo.svg";
import { cloneElement, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";

export const AuthFormLayout = ({
  children,
  onBack,
  logoAppear,
  header,
  error,
  headerLabel,
}) => {
  const duration = 200;
  const [inProp, setInProp] = useState(false);

  useEffect(() => {
    setInProp(true);

    return () => setInProp(false);
  }, []);

  const nodeRef = useRef(null);

  const transitionStyles = {
    entering: { opacity: 0, transform: "translateX(100%)" },
    entered: { opacity: 1, transform: "translateX(0)" },
    exiting: { opacity: 0, transform: "translateX(100%)" },
    exited: { opacity: 0, transform: "translateX(100%)" },
  };

  const textTransitionStyles = {
    entering: { opacity: 0, transform: "translateY(-10%)" },
    entered: { opacity: 1, transform: "translateY(0)" },
    exiting: { opacity: 0, transform: "translateY(-100%)" },
    exited: { opacity: 0, transform: "translateY(-100%)" },
  };

  return (
    <>
      {onBack && (
        <Grid
          container
          justifyContent="left"
          sx={{
            position: "fixed",
            top: 0,
            padding: 2,
            zIndex: 999,
          }}
        >
          <Grid container alignItems="center" sx={{ gap: 2 }}>
            <IconButton
              onClick={onBack}
              sx={{ position: "relative", zIndex: 1000 }}
            >
              <ArrowBackRoundedIcon fontSize="large" />
            </IconButton>
            {headerLabel && (
              <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
                {(state) => (
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="h6"
                    style={{
                      transition: `all ${duration}ms cubic-bezier(.05, .1, .1, 1)`,
                      opacity: 0,
                      transform: "translateX(-10%)",
                      ...textTransitionStyles[state],
                    }}
                  >
                    {headerLabel}
                  </Typography>
                )}
              </Transition>
            )}
            <Divider />
          </Grid>
        </Grid>
      )}
      <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
        {(state) => (
          <Container maxWidth="sm">
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ padding: isMobile ? 2 : 8 }}
              style={{
                transition: `all ${duration}ms cubic-bezier(.05, .1, .1, 1)`,
                opacity: 0,
                transform: "translateX(60%)",
                ...transitionStyles[state],
              }}
            >
              <Stack spacing="10" sx={{ textAlign: "center", width: "100%" }}>
                {logoAppear && (
                  <>
                    <Grid container justifyContent="center">
                      <img src={logo} alt="logo" style={{ width: 50 }} />
                    </Grid>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      StudLeague
                    </Typography>
                  </>
                )}
                {header}
                {error && <Alert severity="error">{error}</Alert>}
                {children}
              </Stack>
            </Grid>
          </Container>
        )}
      </Transition>
    </>
  );
};
