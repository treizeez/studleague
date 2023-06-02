import React, { useState } from "react";
import { generateSession } from "../../../utils/generateSession";
import { EnterEmail } from "../EnterEmail";
import { CheckDigits } from "../CheckDigits";
import { NewPassword } from "./NewPassword";
import { GradientIcons } from "../../../styles/GradientIcons";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const ResetPassword = ({ setAuthState, relativeHeader }) => {
  const user = useSelector((state) => state.user);
  const [data, setData] = useState({ email: user?.email ?? "" });
  const [session, setSession] = useState(generateSession());
  const [signUpState, setSignUpState] = useState({
    now: "email",
    prev: "signIn",
  });
  const all = {
    setAuthState,
    setSignUpState,
    data,
    setData,
    session,
    setSession,
    signUpState,
  };

  const screens = [
    {
      path: "email",
      component: (
        <EnterEmail
          header={
            <>
              <GradientIcons
                centered
                icon={<KeyRoundedIcon />}
                name="passwordReset"
                firstColor="#38ada9"
                secondColor="#78e08f"
              />
              <Typography variant="h6">Скидання пароля</Typography>
            </>
          }
          {...all}
          headerLabel="Скидання пароля"
          request="resetPasswordRequest"
        />
      ),
    },
    {
      path: "checkDigits",
      component: (
        <CheckDigits
          {...all}
          request="resetPasswordRequest"
          nextComponent="newPassword"
        />
      ),
    },
    {
      path: "newPassword",
      component: <NewPassword {...all} />,
    },
  ];

  return (
    <>
      {screens.map(
        (screen) =>
          signUpState.now === screen.path && (
            <React.Fragment key={screen.path}>
              {screen.component}
            </React.Fragment>
          )
      )}
    </>
  );
};
