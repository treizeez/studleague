import { MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <MenuItem
      onClick={() => {
        dispatch({ type: "RESET_USER" });
        navigate("/");
      }}
    >
      Вийти з акаунту
    </MenuItem>
  );
};
