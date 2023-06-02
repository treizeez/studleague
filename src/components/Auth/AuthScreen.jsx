import { Grid, Paper } from "@mui/material";
import { SignIn } from "./SignIn";
import { isMobile } from "react-device-detect";
import React, { useState } from "react";
import { SignUp } from "./SignUp/SignUp";
import { TwoFA } from "./TwoFA";
import { generateSession } from "../../utils/generateSession";
import { ResetPassword } from "./ResetPassword/ResetPassword";

export const AuthScreen = () => {
  const [authState, setAuthState] = useState("signIn");
  const [session, setSession] = useState(generateSession());

  console.log(session);

  React.useEffect(() => {
    if (authState !== "2FA") {
      setSession(generateSession());
    }
  }, [authState]);

  const all = { setAuthState, session, setSession };
  const screens = [
    {
      path: "signIn",
      component: <SignIn {...all} />,
    },
    {
      path: "signUp",
      component: <SignUp {...all} />,
    },
    {
      path: "resetPassword",
      component: <ResetPassword {...all} />,
    },
    {
      path: "2FA",
      component: <TwoFA {...all} />,
    },
  ];

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        square={isMobile}
        variant="outlined"
        sx={{
          position: "relative",
          width: 500,
          height: isMobile ? "100vh" : "auto",
          padding: isMobile ? "inherit" : 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflowX: "hidden",
          border: isMobile && "none",
          background: isMobile && "none",
        }}
      >
        {screens.map(
          (screen) =>
            authState === screen.path && (
              <React.Fragment key={screen.path}>
                {screen.component}
              </React.Fragment>
            )
        )}
      </Paper>
    </Grid>
  );
};
