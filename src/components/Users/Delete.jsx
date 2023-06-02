import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";

export const Delete = ({ button, user }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    !user.admin &&
    me.admin &&
    me.adminRights.includes("updateUsers") && (
      <>
        {cloneElement(button, { onClick: handleDialog })}
        <DefaultDialog
          error={error}
          padding={6}
          icon={
            <GradientIcons
              centered
              name="deleteUser"
              icon={<PersonRemoveAlt1RoundedIcon />}
              firstColor="#e74c3c"
              secondColor="#c0392b"
            />
          }
          onClick={() =>
            axios
              .delete(`${api}/updateUsers/deleteUser/${user.publicUID}`, {
                data: { myPrivateID: me._privateUID },
              })
              .then(() => {
                dispatch({
                  type: "DELETE_USER",
                  payload: user.publicUID,
                });
                handleDialog();
                navigate("/users");
              })
              .catch((err) => setError(err.response.data ?? err.message))
          }
          handleDialog={handleDialog}
          open={open}
          title="Видалити користувача?"
          description="Ви впевнені, що хочете видалити даного користувача?"
        />
      </>
    )
  );
};
