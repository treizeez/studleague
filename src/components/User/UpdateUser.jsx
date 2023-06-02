import { cloneElement, useEffect, useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import { GradientIcons } from "../../styles/GradientIcons";
import { Avatar, Button, FormControlLabel, Grid, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { MenuButtonIcon } from "./MenuButtonIcon";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import axios from "axios";
import { api } from "../../constants/api";
import { Link } from "react-router-dom";
import { DeleteMe } from "./DeleteMe";

export const UpdateUser = ({ button, menuClose }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const user = useSelector((state) => state.user);
  const [image, setImage] = useState();

  const [data, setData] = useState({
    twoFA: user?.twoFA,
  });

  const formData = new FormData();

  const handleDialog = () => setOpen(!open);

  const dispatch = useDispatch();

  return (
    <>
      {cloneElement(button, { onClick: handleDialog })}
      <DefaultDialog
        error={error}
        padding={6}
        icon={
          <GradientIcons
            centered
            name="updateUser"
            icon={<EditRoundedIcon />}
            firstColor="#16a085"
            secondColor="#2ecc71"
          />
        }
        handleDialog={handleDialog}
        open={open}
        title="Редагувати інформацію"
        description="Ви можете змінити певну інформацію про себе:"
        onClick={() => {
          if (
            image &&
            image.type !== "image/png" &&
            image.type !== "image/gif" &&
            image.type !== "image/jpeg"
          ) {
            return setError("Можна обирати тільки фото!");
          }

          formData.append("twoFA", data.twoFA);
          image && formData.append("userPhoto", image);
          const config = {
            headers: { "content-type": "multipart/form-data" },
          };
          return axios
            .put(
              `${api}/updateUsers/updateMe/${user?._privateUID}`,
              formData,
              config
            )
            .then((res) => dispatch({ type: "LOGIN", payload: res.data }))
            .catch((err) => console.log(err));
        }}
      >
        <Grid container justifyContent="center">
          <label htmlFor="userPhoto" style={{ cursor: "pointer" }}>
            <Avatar
              src={image ? URL.createObjectURL(image) : user?.userPhoto}
              sx={{ width: 150, height: 150 }}
            />
          </label>
          <input
            id="userPhoto"
            type="file"
            accept="image/png, image/gif, image/jpeg"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Grid>
        <FormControlLabel
          control={
            <Switch
              checked={data?.twoFA}
              onChange={() => setData({ ...data, twoFA: !data.twoFA })}
            />
          }
          label="Двофакторна автентифікація"
        />
        <Link to="/resetemail">
          <MenuButtonIcon
            label="Змінити пошту"
            icon={<EmailRoundedIcon />}
            onClick={() => {
              handleDialog();
              menuClose && menuClose();
            }}
          />
        </Link>
        <Link to="/resetpassword">
          <MenuButtonIcon
            label="Змінити пароль"
            onClick={() => {
              handleDialog();
              menuClose && menuClose();
            }}
            icon={<KeyRoundedIcon />}
          />
        </Link>
        <DeleteMe
          button={
            <Button variant="contained" color="error">
              Видалити акаунт
            </Button>
          }
        />
      </DefaultDialog>
    </>
  );
};
