import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";

export const Activate = ({ button, user }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    !user.activated &&
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
              name="activate"
              icon={<VerifiedRoundedIcon />}
              firstColor="#16a085"
              secondColor="#2ecc71"
            />
          }
          onClick={() =>
            axios
              .put(`${api}/updateUsers/activateUser/${user.publicUID}`, {
                myPrivateID: me._privateUID,
              })
              .then(() => {
                dispatch({
                  type: "UPDATE_USERS",
                  payload: {
                    id: user.publicUID,
                    data: { activated: true },
                  },
                });
                handleDialog();
              })
              .catch((err) => setError(err.response.data))
          }
          handleDialog={handleDialog}
          open={open}
          title="Активувати користувача?"
          description="Ви впевнені, що хочете активувати цього користувача? Йому прийде лист на пошту"
        />
      </>
    )
  );
};
