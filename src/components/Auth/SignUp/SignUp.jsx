import { Slide } from "@mui/material";
import React, { useState } from "react";
import { CheckDigits } from "../CheckDigits";
import { Enable2FA } from "./Enable2FA";
import { EnterEmail } from "../EnterEmail";
import { MainInfo } from "./MainInfo";
import { Number } from "./Number";
import { Password } from "./Password";
import { PhotoID } from "./PhotoID";
import { Photos } from "./Photos";
import { Status } from "./Status";
import { StudInfo } from "./StudInfo";

export const SignUp = ({ setAuthState, session, setSession }) => {
  const [signUpState, setSignUpState] = useState({
    now: "email",
    prev: "signIn",
  });

  const [files, setFiles] = useState({});

  const currentYear = new Date().getFullYear();

  const [data, setData] = useState({ admissionYear: currentYear });

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
        <EnterEmail {...all} headerLabel="Новий акаунт" request="putNewEmail" />
      ),
    },
    {
      path: "checkDigits",
      component: (
        <CheckDigits {...all} request="putNewEmail" nextComponent="mainInfo" />
      ),
    },
    { path: "mainInfo", component: <MainInfo {...all} /> },
    { path: "studInfo", component: <StudInfo {...all} /> },
    { path: "status", component: <Status {...all} /> },
    { path: "photos", component: <Photos {...all} setFiles={setFiles} /> },
    { path: "photoID", component: <PhotoID {...all} setFiles={setFiles} /> },
    { path: "password", component: <Password {...all} /> },
    { path: "number", component: <Number {...all} /> },
    {
      path: "enable2FA",
      component: <Enable2FA {...all} files={files} />,
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
