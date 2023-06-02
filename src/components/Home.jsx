import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import { GradientIcons } from "../styles/GradientIcons";
import { Stack } from "@mui/system";
import { grey } from "@mui/material/colors";
import { ScreenLayout } from "../layouts/ScreenLayout";
import { Voting } from "./Votings/VotingsScreen";

export const Home = () => {
  const user = useSelector((state) => state.user);
  const votings = useSelector((state) => state.votings);
  const liveVotings = votings.filter((voting) => !voting.finished);

  return user?.activated ? (
    <ScreenLayout label="Головна" none={liveVotings.length === 0}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Голосують прямо зараз:
      </Typography>
      <Grid container sx={{ gap: 1 }}>
        {liveVotings.map((voting, key) => (
          <Voting key={key} voting={voting} />
        ))}
      </Grid>
    </ScreenLayout>
  ) : (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100vh" }}
      >
        <Stack spacing={1} sx={{ textAlign: "center" }}>
          <GradientIcons
            icon={<AccessTimeFilledRoundedIcon />}
            name="wait"
            firstColor="#1e3799"
            secondColor="#38ada9"
            size={150}
          />
          <Typography variant="h6">Ваш акаунт не активовано</Typography>
          <Typography variant="caption" sx={{ color: grey[500] }}>
            Вам прийде лист на пошту, коли його активують
          </Typography>
        </Stack>
      </Grid>
    </>
  );
};
