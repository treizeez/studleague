import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AuthFormLayout } from "../../layouts/AuthFormLayout";
import { GradientIcons } from "../../styles/GradientIcons";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { generateSession } from "../../utils/generateSession";
import axios from "axios";
import { api } from "../../constants/api";
import { useState } from "react";

export const CheckDigits = ({
  session,
  data,
  setSession,
  setSignUpState,
  signUpState,
  nextComponent,
  request,
  func,
}) => {
  const [digits, setDigits] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const handleDialog = () => setOpen(!open);

  return (
    <AuthFormLayout
      error={error}
      headerLabel="Перевірка"
      onBack={() => {
        setSession(generateSession());
        setSignUpState(signUpState.prev);
      }}
      header={
        <>
          <GradientIcons
            centered
            icon={<EmailRoundedIcon />}
            name="checkDigits"
            firstColor="#ff9ff3"
            secondColor="#feca57"
          />
          <Typography variant="h6">Перевірте свою пошту</Typography>
          <Alert severity="success">
            Код з підтвердженням успішно надіслано на {data.email}
          </Alert>
        </>
      }
    >
      <TextField
        type="number"
        placeholder="Код"
        onChange={(e) => setDigits(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (!digits) {
            return setError("Ви не ввели код!");
          }

          return axios
            .post(`${api}/auth/checkTempDigits`, { session, digits })
            .then((res) => {
              nextComponent &&
                setSignUpState((prev) => ({ now: nextComponent, prev }));

              func && func();
            })
            .catch((error) => setError(error.response.data));
        }}
      >
        Далі
      </Button>
      <Button
        onClick={() => {
          const newSession = generateSession();
          setSession(newSession);
          axios
            .post(`${api}/auth/${request}`, {
              session: newSession,
              email: data.email,
            })
            .then((res) => res.data && handleDialog())
            .catch((error) => setError(error.response.data));
        }}
      >
        Надіслати листа ще раз
      </Button>
      <Dialog open={open} onClose={handleDialog} fullScreen={false}>
        <DialogTitle>Лист надіслано</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Лист успішно надіслано на email {data.email}. Перевірте "спам",
            можливо лист потрапив туди
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialog}>
            Добре
          </Button>
        </DialogActions>
      </Dialog>
    </AuthFormLayout>
  );
};
