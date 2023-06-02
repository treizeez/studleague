import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import { GradientIcons } from "../../../styles/GradientIcons";
import ArtTrackRoundedIcon from "@mui/icons-material/ArtTrackRounded";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

export const PhotoID = ({ signUpState, setSignUpState, setFiles }) => {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  const [agreement, setAgreement] = useState(false);

  return (
    <AuthFormLayout
      error={error}
      headerLabel="Студентський квиток"
      header={
        <>
          <GradientIcons
            centered
            icon={<ArtTrackRoundedIcon />}
            name="photoid"
            firstColor="#1e3799"
            secondColor="#38ada9"
          />
          <Typography variant="h6">Студентський квиток</Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
      <Button>
        <label htmlFor="id-upload" style={{ cursor: "pointer" }}>
          Завантажити фото
        </label>
      </Button>
      <input
        onChange={(e) => setImage(e.target.files[0])}
        type="file"
        accept="image/png, image/gif, image/jpeg"
        id="id-upload"
        style={{ display: "none" }}
      />
      {image && (
        <Grid container justifyContent="center">
          <img
            src={image && URL.createObjectURL(image)}
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
              width: "300px",
              borderRadius: theme.shape.borderRadius,
            }}
          />
        </Grid>
      )}
      <FormControlLabel
        control={
          <Checkbox
            checked={agreement}
            onChange={() => setAgreement(!agreement)}
          />
        }
        label="Згода на обробку персональних даних"
      />
      <Button
        variant="contained"
        onClick={() => {
          if (
            image &&
            image.type !== "image/png" &&
            image.type !== "image/gif" &&
            image.type !== "image/jpeg"
          ) {
            return setError("Можна обирати тільки фото!");
          }

          if (!agreement) {
            return setError("Ви не надали згоду на обробку персональних даних");
          }

          image && setFiles((prev) => ({ ...prev, photoID: image }));

          return setSignUpState((prev) => ({ now: "password", prev }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
