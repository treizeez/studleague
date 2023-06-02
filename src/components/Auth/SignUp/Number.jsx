import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import { GradientIcons } from "../../../styles/GradientIcons";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const Number = ({ signUpState, setSignUpState, data, setData }) => {
  const [error, setError] = useState();
  return (
    <AuthFormLayout
      error={error}
      headerLabel="Номер телефону"
      header={
        <>
          <GradientIcons
            centered
            icon={<LocalPhoneRoundedIcon />}
            name="number"
            firstColor="#38ada9"
            secondColor="#78e08f"
          />
          <Typography variant="h6">Введіть свій номер телефону</Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
      <TextField
        placeholder="(Не обов'язково)"
        type="number"
        onChange={(e) => setData({ ...data, number: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => setSignUpState((prev) => ({ now: "enable2FA", prev }))}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
