import {
  Alert,
  Button,
  Grid,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import logo from "../../img/logo.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { PasswordTextField } from "../../layouts/PasswordTextField";
import { generateSession } from "../../utils/generateSession";
import { AuthFormLayout } from "../../layouts/AuthFormLayout";

export const SignIn = ({ authState, setAuthState, session }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState();

  const dispatch = useDispatch();

  console.log(data);

  return (
    <>
      <AuthFormLayout error={error} logoAppear>
        <TextField
          fullWidth
          placeholder="Email"
          type="email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <PasswordTextField
          fullWidth
          placeholder="Пароль"
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (!data.email || !data.password) {
              return setError("Заповніть усі поля!");
            }

            return axios
              .post(`${api}/auth/signIn`, {
                email: data.email,
                password: data.password,
                session,
              })
              .then((res) =>
                res?.data?.twoFA
                  ? setAuthState("2FA")
                  : dispatch({ type: "LOGIN", payload: res.data })
              )
              .catch((error) => setError(error.response.data));
          }}
        >
          Увійти
        </Button>
        <Button fullWidth onClick={() => setAuthState("resetPassword")}>
          Забули пароль?
        </Button>
      </AuthFormLayout>
      <Grid
        container
        justifyContent="center"
        sx={{ position: "relative", bottom: 0 }}
      >
        Не маєте акаунту? Ви можете&nbsp;
        <span
          onClick={() => setAuthState("signUp")}
          style={{ color: indigo[300], cursor: "pointer" }}
        >
          створити його
        </span>
      </Grid>
    </>
  );
};
