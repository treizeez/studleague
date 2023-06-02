import { AuthFormLayout } from "../../layouts/AuthFormLayout";
import { GradientIcons } from "../../styles/GradientIcons";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import {
  Alert,
  Button,
  Grid,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch } from "react-redux";

export const TwoFA = ({ authState, setAuthState, session }) => {
  const [digits, setDigits] = useState();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  return (
    <AuthFormLayout
      onBack={() => setAuthState("signIn")}
      headerLabel="Авторизація"
      error={error}
      header={
        <>
          <GradientIcons
            centered
            icon={<VerifiedUserRoundedIcon />}
            name="2fa"
            firstColor="#9b59b6"
            secondColor="#3498db"
          />
          <Typography variant="h5">
            Акаунт захищено двофакторною автентифікацією
          </Typography>
          <Typography variant="caption" sx={{ color: grey[500] }}>
            Для продовження введіть код, який прийшов на пошту
          </Typography>
        </>
      }
    >
      <TextField
        value={digits}
        type="number"
        placeholder="Код"
        onChange={(e) => {
          if (e.target.value.length > 4) {
            return null;
          }
          return setDigits(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (digits) {
            axios
              .post(`${api}/auth/checkTempDigits`, { session, digits })
              .then((res) => {
                const sessionID = res.data.session;
                axios
                  .post(`${api}/auth/check2FA`, { session: sessionID })
                  .then((res) => dispatch({ type: "LOGIN", payload: res.data }))
                  .catch((error) => setError(error.response.data));
              })
              .catch((error) => setError(error.response.data));
          } else {
            setError("Ви не ввели код");
          }
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
