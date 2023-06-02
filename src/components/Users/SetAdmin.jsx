import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const SetAdmin = ({ button, user }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const [updateUser, setUpdatedUser] = useState(user);

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const allRights = [
    {
      label: "Бачити інформацію про користувачів",
      id: "readUsers",
    },
    {
      label: "Оновлювати користувачів",
      id: "updateUsers",
    },
    {
      label: "Керувати голосуваннями",
      id: "votings",
    },
    {
      label: "Надавати іншим користувачам права",
      id: "setAdmins",
    },
  ];

  return (
    me?.admin &&
    me?.adminRights.includes("setAdmins") &&
    user.activated &&
    user.publicUID !== me?.publicUID && (
      <>
        {cloneElement(button, { onClick: handleDialog })}
        <DefaultDialog
          error={error}
          padding={6}
          icon={
            <GradientIcons
              centered
              name="setAdmin"
              icon={<AdminPanelSettingsRoundedIcon />}
              firstColor="#38ada9"
              secondColor="#78e08f"
            />
          }
          onClick={() =>
            axios
              .put(`${api}/updateUsers/setAdmin/${user.publicUID}`, {
                adminState: updateUser.adminRights.length > 0 ? true : false,
                adminRights: updateUser.adminRights,
                myPrivateID: me._privateUID,
              })
              .then(() => {
                dispatch({
                  type: "UPDATE_USERS",
                  payload: {
                    id: user.publicUID,
                    data: {
                      admin: updateUser.adminRights.length > 0 ? true : false,
                      adminRights: updateUser.adminRights,
                    },
                  },
                });
                handleDialog();
              })
              .catch((err) => setError(err.response.data ?? err.message))
          }
          handleDialog={handleDialog}
          open={open}
          title="Надати адмінські права"
          description="Ви можете надати наступні права користувачу:"
        >
          <FormGroup>
            {allRights.map((right, key) => (
              <FormControlLabel
                key={key}
                checked={updateUser.adminRights.includes(right.id)}
                control={<Checkbox />}
                label={right.label}
                onChange={() =>
                  setUpdatedUser(() => {
                    const copy = Object.assign({}, updateUser);
                    if (copy.adminRights.includes(right.id)) {
                      copy.adminRights = copy.adminRights.filter(
                        (id) => id !== right.id
                      );
                      return copy;
                    }

                    copy.adminRights.push(right.id);

                    return copy;
                  })
                }
              />
            ))}
          </FormGroup>
        </DefaultDialog>
      </>
    )
  );
};
