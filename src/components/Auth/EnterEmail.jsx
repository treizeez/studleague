import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../../constants/api";
import { AuthFormLayout } from "../../layouts/AuthFormLayout";

export const EnterEmail = ({
  setAuthState,
  data,
  setData,
  session,
  setSignUpState,
  signUpState,
  headerLabel,
  request,
  header,
}) => {
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState();

  const handleConfirmation = () => setConfirmation(!confirmation);
  const navigate = useNavigate();

  return (
    <AuthFormLayout
      onBack={() =>
        setAuthState ? setAuthState(signUpState.prev) : navigate(-1)
      }
      headerLabel={headerLabel}
      header={
        header ? (
          header
        ) : (
          <>
            <Typography variant="caption" sx={{ color: grey[500] }}>
              система голосувань для УСЛ
            </Typography>
            <Typography variant="h6">
              Для продовження введіть свій Email
            </Typography>
          </>
        )
      }
      logoAppear={!header}
      error={error}
    >
      <TextField
        type="email"
        placeholder="Email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (!data.email) {
            return setError("Ви не ввели свій Email!");
          }
          return handleConfirmation();
        }}
      >
        Далі
      </Button>
      <Dialog open={confirmation} onClose={handleConfirmation}>
        <DialogTitle>Ви правильно ввели данні?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Переконайтесь, що дані, введені вами написано правильно, оскільки на
            цю пошту прийде лист з кодом підтвердження:
            <Alert severity="info">{data.email}</Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmation}>Ні</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirmation();
              axios
                .post(`${api}/auth/${request}`, {
                  session,
                  email: data.email,
                })
                .then(
                  (res) =>
                    res.data &&
                    setSignUpState((prev) => ({ now: "checkDigits", prev }))
                )
                .catch((error) => setError(error.response.data));
            }}
          >
            Так
          </Button>
        </DialogActions>
      </Dialog>
    </AuthFormLayout>
  );
};
