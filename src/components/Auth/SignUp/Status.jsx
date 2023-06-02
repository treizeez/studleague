import { AuthFormLayout } from "../../../layouts/AuthFormLayout";
import { GradientIcons } from "../../../styles/GradientIcons";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Status = ({ setSignUpState, signUpState, data, setData }) => {
  const [error, setError] = useState();
  const ref = useSelector((state) => state.ref);
  console.log(data?.representative);

  return (
    <AuthFormLayout
      error={error}
      headerLabel="Статус"
      header={
        <>
          <GradientIcons
            centered
            icon={<BadgeRoundedIcon />}
            name="status"
            firstColor="#e056fd"
            secondColor="#f0932b"
          />
          <Typography variant="h6">Ще декілька кроків</Typography>
        </>
      }
      onBack={() => setSignUpState(signUpState.prev)}
    >
      <FormControl fullWidth>
        <InputLabel>Статус</InputLabel>
        <Select
          value={data?.status ?? ""}
          label="Статус"
          onChange={(e) => setData({ ...data, status: e.target.value })}
        >
          {ref
            .filter((t) => t.type === "status")
            .map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Представник</InputLabel>
        <Select
          value={data?.representative ?? ""}
          label="Представник"
          onChange={(e) => setData({ ...data, representative: e.target.value })}
        >
          {ref
            .filter((t) => t.type === "representative")
            .map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => {
          if (!data.status) {
            return setError("Оберіть статус!");
          }

          return setSignUpState((prev) => ({ now: "photos", prev }));
        }}
      >
        Далі
      </Button>
    </AuthFormLayout>
  );
};
