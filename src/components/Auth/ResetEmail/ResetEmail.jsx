import React, { useState } from "react";
import { generateSession } from "../../../utils/generateSession";
import { EnterEmail } from "../EnterEmail";
import { CheckDigits } from "../CheckDigits";
import { GradientIcons } from "../../../styles/GradientIcons";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import axios from "axios";
import { api } from "../../../constants/api";
import { useNavigate } from "react-router-dom";

export const ResetEmail = ({}) => {
  const [data, setData] = useState({});
  const [session, setSession] = useState(generateSession());
  const [signUpState, setSignUpState] = useState({
    now: "email",
    prev: "",
  });

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const all = {
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
                icon={<EmailRoundedIcon />}
                name="emailReset"
                firstColor="#38ada9"
                secondColor="#78e08f"
              />
              <Typography variant="h6">Змінити пошту</Typography>
            </>
          }
          {...all}
          headerLabel="Змінити пошту"
          request="putNewEmail"
        />
      ),
    },
    {
      path: "checkDigits",
      component: (
        <CheckDigits
          {...all}
          func={() =>
            axios
              .put(`${api}/updateUsers/resetEmail/${me._privateUID}`, {
                session,
              })
              .then((res) => {
                dispatch({ type: "LOGIN", payload: res.data });
                navigate("/");
              })
              .catch((err) => console.log(err))
          }
          request="putNewEmail"
        />
      ),
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
