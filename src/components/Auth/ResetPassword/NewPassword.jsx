import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { api } from "../../../constants/api";
import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import { PasswordTextField } from "../../../layouts/PasswordTextField";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NewPassword = ({ session }) => {
  const [password, setPassword] = useState({});
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AuthFormLayout
      error={error}
      header={
        <>
          <Typography variant="h6">Придумайте новий пароль</Typography>
        </>
      }
    >
      <PasswordTextField
        placeholder="Новий пароль"
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      <PasswordTextField
        placeholder="Повторіть пароль"
        onChange={(e) => setPassword({ ...password, repeat: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (!password.value || !password.repeat) {
            return setError("Заповніть усі поля");
          }
          if (password.value !== password.repeat) {
            return setError("паролі не сходяться");
          }

          return axios
            .post(`${api}/auth/resetPassword`, {
              session,
              password: password.value,
            })
            .then((res) => {
              res.data && dispatch({ type: "LOGIN", payload: res.data });
              navigate("/");
            })
            .catch((err) => setError(err.response.data));
        }}
      >
        Готово
      </Button>
    </AuthFormLayout>
  );
};
