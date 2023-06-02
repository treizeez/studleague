import {
  Avatar,
  Button,
  Fab,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ScreenLayout } from "../../layouts/ScreenLayout";
import AddIcon from "@mui/icons-material/Add";
import { AddVoting } from "./AddVoting";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BallotIcon from "@mui/icons-material/Ballot";
import { Stack } from "@mui/system";
import { green, grey } from "@mui/material/colors";
import { DeleteVoting } from "./DeleteVoting";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { CheckIfPrivate } from "./CheckIfPrivate";
import { useState } from "react";

export const Voting = ({ voting }) => {
  const { title, description, _id, createdAt, variants, finished } = voting;

  const sec = Date.parse(createdAt);
  const date = new Date(sec).toLocaleString("sv");

  const allVoted = variants?.map((variant) => variant?.voted).flat(1).length;

  return (
    <Paper
      variant="outlined"
      sx={{
        padding: 3,
        width: isMobile ? "100%" : 500,
        boxSizing: "border-box",
      }}
    >
      <Stack spacing={2}>
        <CheckIfPrivate voting={voting} />
        <Grid container justifyContent="space-between" flexWrap="nowrap">
          <Grid container alignItems="center" sx={{ gap: 1 }}>
            <BallotIcon sx={{ color: grey[500] }} />
            <Typography variant="caption" sx={{ color: grey[500] }}>
              {date}
            </Typography>
          </Grid>
          <DeleteVoting
            voting={voting}
            button={
              <Button variant="contained" color="error">
                Видалити
              </Button>
            }
          />
        </Grid>
        <Link to={`/votings/${_id}`}>
          <Typography
            noWrap
            variant="h6"
            sx={{ fontWeight: "bold", width: "90%" }}
          >
            {title}
          </Typography>
          {finished && (
            <Typography
              variant="caption"
              sx={{ color: green[500], fontWeight: "bold" }}
            >
              Голосування завершено
            </Typography>
          )}
          &nbsp;
          {description && (
            <Typography
              variant="caption"
              sx={{ color: grey[500], width: "100%" }}
            >
              {description}
            </Typography>
          )}
        </Link>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PeopleAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Проголосувало всього"
            secondary={`${allVoted} осіб`}
          />
        </ListItem>
      </Stack>
    </Paper>
  );
};

export const VotingsScreen = () => {
  const votings = useSelector((state) => state.votings);
  const reversed = [...votings].reverse();
  const [search, setSearch] = useState("");

  return (
    <>
      {isMobile && (
        <AddVoting
          button={
            <Fab
              color="primary"
              sx={{ position: "fixed", bottom: 75, right: 25 }}
            >
              <AddIcon />
            </Fab>
          }
        />
      )}
      <ScreenLayout
        label="Голосування"
        none={votings.length === 0}
        button={
          !isMobile && (
            <AddVoting
              button={<Button variant="contained">Нове голосування</Button>}
            />
          )
        }
      >
        <TextField
          value={search}
          placeholder="Пошук"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container sx={{ gap: 2 }}>
          {reversed
            .filter((voting) =>
              voting.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((voting) => (
              <Voting key={voting._id} voting={voting} />
            ))}
        </Grid>
      </ScreenLayout>
    </>
  );
};
