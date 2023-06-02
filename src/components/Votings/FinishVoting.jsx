import { cloneElement, useState } from "react";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { GradientIcons } from "../../styles/GradientIcons";
import axios from "axios";
import { api } from "../../constants/api";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

export const FinishVoting = ({ button, voting }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    !voting.finished &&
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
              name="finishVoting"
              icon={<CheckCircleRoundedIcon />}
              firstColor="#16a085"
              secondColor="#2ecc71"
            />
          }
          onClick={() =>
            axios
              .put(`${api}/voting/finishVoting/${voting._id}`, {
                myPrivateID: me._privateUID,
              })
              .then(() => {
                handleDialog();
              })
              .catch((err) => setError(err.response.data))
          }
          handleDialog={handleDialog}
          open={open}
          title="Завершити голосування"
          description="Ви впевнені, що завершити голосування?"
        />
      </>
    )
  );
};
