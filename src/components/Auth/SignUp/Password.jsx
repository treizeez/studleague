import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import { GradientIcons } from "../../../styles/GradientIcons";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import { Button, Typography } from "@mui/material";
import { PasswordTextField } from "../../../layouts/PasswordTextField";
import { useState } from "react";

export const Password = ({ signUpState, setSignUpState, data, setData }) => {
  const [password, setPassword] = useState({});
  const [error, setError] = useState();
  return (
    <AuthFormLayout
      error={error}
      headerLabel="Пароль"
      header={
        <>
          <GradientIcons
            centered
            icon={<KeyRoundedIcon />}
            name="password"
            firstColor="#38ada9"
            secondColor="#78e08f"
          />
          <Typography variant="h6">Придумайте пароль</Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
      <PasswordTextField
        fullWidth
        placeholder="Пароль"
        onChange={(e) => setPassword({ ...password, value: e.target.value })}
      />
      <PasswordTextField
        fullWidth
        placeholder="Повторіть пароль"
        onChange={(e) => setPassword({ ...password, repeat: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (!password.value || !password.repeat) {
            return setError("Заповніть усі поля!");
          }

          if (password.value !== password.repeat) {
            return setError("Паролі не сходяться");
          }

          setData({ ...data, password: password.value });

          return setSignUpState((prev) => ({ now: "number", prev }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
