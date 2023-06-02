import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";
import { GradientIcons } from "../../../styles/GradientIcons";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

export const Photos = ({ setSignUpState, signUpState, setFiles }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState();
  return (
    <AuthFormLayout
      error={error}
      headerLabel="Фото профілю"
      header={
        <>
          <label htmlFor="photo-upload" style={{ cursor: "pointer" }}>
            <Grid container justifyContent="center">
              <Avatar
                src={image && URL.createObjectURL(image)}
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/png, image/gif, image/jpeg"
            id="photo-upload"
            type="file"
            style={{ display: "none" }}
          />
          <Typography variant="h6">Завантажити фото профілю</Typography>
          <Typography
            variant="caption"
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            До додавання фото можна повернутися пізніше
          </Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
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

          image &&
            setFiles((prev) => ({
              ...prev,
              userPhoto: image,
            }));

          return setSignUpState((prev) => ({ now: "photoID", prev }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
