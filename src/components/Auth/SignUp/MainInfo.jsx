import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Alert, Button, Grid, TextField, Typography } from "@mui/material";
import { GradientIcons } from "../../../styles/GradientIcons";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";

export const MainInfo = ({ data, setData, setSignUpState }) => {
  const [error, setError] = useState();
  const values = [
    {
      divider: "Персональна інформація",
      placeholder: "Ім'я",
      value: "firstName",
    },
    {
      placeholder: "Прізвище",
      value: "secondName",
    },
    {
      placeholder: "По-батькові",
      value: "middleName",
    },
    {
      placeholder: "Студентський квиток / ЄДРПОУ",
      value: "stNumber",
    },
  ];

  return (
    <AuthFormLayout
      error={error}
      header={
        <>
          <GradientIcons
            centered
            name="generalInfo"
            firstColor="#686de0"
            icon={<AccountCircleRoundedIcon />}
            secondColor="#e056fd"
          />
          <Typography variant="h6">Трішки інформації про вас</Typography>
        </>
      }
    >
      <Alert severity="info">
        У разі відсутності "По-батькові" можна пропустити
      </Alert>
      {values.map((input) => (
        <React.Fragment key={input.value}>
          {input.divider && (
            <Typography variant="caption" sx={{ color: grey[500] }}>
              {input.divider}
            </Typography>
          )}
          <TextField
            placeholder={input.placeholder}
            value={data[input.value] ?? ""}
            onChange={(e) =>
              setData({ ...data, [input.value]: e.target.value })
            }
          />
        </React.Fragment>
      ))}
      <Button
        variant="contained"
        onClick={() => {
          const inputs = values
            .filter((input) => input.value !== "middleName")
            .map((input) => input.value);
          if (inputs.filter((input) => data[input]).length !== inputs.length) {
            return setError("Заповніть усі поля");
          }

          return setSignUpState((prev) => ({
            now: "studInfo",
            prev,
          }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
