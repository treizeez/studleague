import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { api } from "../../../constants/api";
import { Piecharts } from "../Piecharts";
import { votingAlgorithm } from "../votingAlgorithm";
import { userTypes } from "../VotingScreen";
import { General } from "./General";
import { Ratio } from "./Ratio";

export const Statistics = ({ voting, userStatus, usersInfo }) => {
  const ref = useSelector((state) => state.ref);

  const userTypes = ref.filter((t) => t.type === "status");

  const [variant, setVariant] = useState(userTypes[0]?.id);

  const handleChange = (event) => setVariant(event.target.value);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Детальна статистика
      </Typography>
      <Grid
        container
        justifyContent="center"
        flexDirection={isMobile ? "column" : "unset"}
      >
        {isMobile &&
          userTypes.map((type) => (
            <RadioGroup key={type._id} value={variant} onChange={handleChange}>
              <FormControlLabel
                value={type.id}
                control={<Radio />}
                label={type.name}
              />
            </RadioGroup>
          ))}
        {userTypes.map((type, key) => {
          const component = (
            <Piecharts
              key={key}
              voting={voting}
              label={type.name}
              state={userStatus[type.id]}
            />
          );

          return isMobile
            ? type.id === variant && userStatus[type.id] && component
            : userStatus[type.id] && component;
        })}
      </Grid>
      <Ratio voting={voting} usersInfo={usersInfo} />
      <General voting={voting} usersInfo={usersInfo} />
    </Stack>
  );
};
