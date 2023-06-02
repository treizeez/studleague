import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";

export const DeleteMe = ({ button }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
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
            name="deleteMe"
            icon={<PersonRemoveRoundedIcon />}
            firstColor="#e74c3c"
            secondColor="#c0392b"
          />
        }
        onClick={() =>
          axios
            .delete(`${api}/updateUsers/deleteMe/${me._privateUID}`)
            .then(() => {
              dispatch({
                type: "RESET_USER",
              });
              handleDialog();
              navigate("/");
            })
            .catch((err) => setError(err.response.data))
        }
        handleDialog={handleDialog}
        open={open}
        title="Видалити акаунт"
        description="Ви впевнені, що хочете видалити свій акаунт?"
      />
    </>
  );
};
