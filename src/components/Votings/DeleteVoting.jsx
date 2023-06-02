import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";

export const DeleteVoting = ({ button, voting }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    me.admin &&
    me.adminRights.includes("votings") && (
      <>
        {cloneElement(button, { onClick: handleDialog })}
        <DefaultDialog
          error={error}
          padding={6}
          icon={
            <GradientIcons
              centered
              name="deleteVoting"
              icon={<DeleteSweepRoundedIcon />}
              firstColor="#e74c3c"
              secondColor="#c0392b"
            />
          }
          onClick={() =>
            axios
              .delete(`${api}/voting/deleteVoting/${voting._id}`, {
                data: { myPrivateID: me._privateUID },
              })
              .then(() => {
                dispatch({
                  type: "DELETE_VOTING",
                  payload: voting._id,
                });
                handleDialog();
                navigate("/votings");
              })
              .catch((err) => console.log(err))
          }
          handleDialog={handleDialog}
          open={open}
          title="Видалити голосування"
          description="Ви впевнені, що хочете видалити це голосування?"
        />
      </>
    )
  );
};
