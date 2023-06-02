import { Button, Typography } from "@mui/material";
import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import { GradientIcons } from "../../../styles/GradientIcons";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import axios from "axios";
import { useState } from "react";
import { api } from "../../../constants/api";
import { useDispatch } from "react-redux";

export const Enable2FA = ({ data, session, files }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const keysToFormData = (twoFa) => {
    const dataCopy = Object.assign({}, data);
    const formData = new FormData();
    formData.append("session", session);
    formData.append("twoFA", twoFa);
    files?.photoID && formData.append("photoID", files.photoID);
    {
      files.userPhoto && formData.append("userPhoto", files.userPhoto);
    }
    Object.keys(dataCopy).map((value) =>
      formData.append(value, dataCopy[value])
    );

    return formData;
  };

  const request = (twoFa) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    setLoading(true);
    return axios
      .post(`${api}/auth/createNewUser`, keysToFormData(twoFa), config)
      .then((res) => {
        setLoading(false);
        return dispatch({ type: "LOGIN", payload: res.data });
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data);
      });
  };

  return (
    <AuthFormLayout
      error={error}
      header={
        <>
          <GradientIcons
            centered
            icon={<VerifiedUserRoundedIcon />}
            name="enable2fa"
            firstColor="#9b59b6"
            secondColor="#3498db"
          />
          <Typography variant="h6">
            Увімкнути двофакторну автентифікацію?
          </Typography>
        </>
      }
    >
      <Button
        disabled={loading}
        variant="contained"
        onClick={() => request(true)}
      >
        Так
      </Button>
      <Button disabled={loading} onClick={() => request(false)}>
        Ні, дякую
      </Button>
    </AuthFormLayout>
  );
};
