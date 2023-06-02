import { FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ScreenLayout } from "../../layouts/ScreenLayout";

export const Settings = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <ScreenLayout label="Налаштування">
      <FormControlLabel
        control={
          <Switch
            checked={Boolean(theme === "dark")}
            onChange={() =>
              dispatch({
                type: "SET_THEME",
                payload: theme === "dark" ? "light" : "dark",
              })
            }
          />
        }
        label="Темна тема"
      />
    </ScreenLayout>
  );
};
