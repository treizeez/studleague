import { Chip, Grid, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { User } from "../Users/Users";

export const Voted = ({ voting, usersInfo }) => {
  const [search, setSearch] = useState("");
  const theme = useSelector((state) => state.theme);
  const allVoted = voting?.variants
    .map((variant) => variant.voted.map((i) => i.id))
    .flat(1);
  const [status, setStatus] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const ref = useSelector((state) => state.ref);

  return (
    <Stack spacing={2}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Проголосували ({allVoted.length})
      </Typography>
      <TextField
        value={search}
        placeholder="Пошук"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Grid
        container
        flexWrap={isMobile ? "nowrap" : "unset"}
        sx={{
          gap: 2,
          overflow: "auto",
          overflowY: "hidden",
          whiteSpace: "nowrap",
          position: "sticky",
          top: "60px",
          zIndex: 1000,
          background: theme === "dark" ? "#000" : "#fff",
        }}
      >
        {ref
          .filter((item) => item.type === "status")
          .map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              variant={status.includes(item.id) ? "filled" : "outlined"}
              onClick={() =>
                setStatus(() => {
                  const copy = [...status];
                  if (copy.includes(item.id)) {
                    return copy.filter((i) => i !== item.id);
                  }

                  copy.push(item.id);
                  return copy;
                })
              }
            />
          ))}
        {ref
          .filter((item) => item.type === "representative")
          .map((item) => (
            <Chip
              key={item.id}
              label={item.name}
              variant={
                representatives.includes(item.id) ? "filled" : "outlined"
              }
              onClick={() =>
                setRepresentatives(() => {
                  const copy = [...representatives];
                  if (copy.includes(item.id)) {
                    return copy.filter((i) => i !== item.id);
                  }

                  copy.push(item.id);
                  return copy;
                })
              }
            />
          ))}
      </Grid>
      {voting?.variants.map((variant, key) => {
        const filtered = variant.voted
          .filter((voter) => {
            const exactVoter = usersInfo.find((v) => v.publicUID === voter.id);
            const fullName = `${exactVoter?.firstName} ${exactVoter?.secondName} ${exactVoter?.middleName}`;

            return fullName.toLowerCase().includes(search.toLowerCase());
          })
          .filter((voter) => {
            const exactVoter = usersInfo.find((v) => v.publicUID === voter.id);
            return status.length > 0
              ? status.includes(exactVoter?.status)
              : voter;
          })
          .filter((voter) => {
            const exactVoter = usersInfo.find((v) => v.publicUID === voter.id);
            return representatives.length > 0
              ? representatives.includes(exactVoter?.representative)
              : voter;
          });

        return (
          filtered.length > 0 && (
            <Stack spacing={2} key={key}>
              <Grid container sx={{ gap: 2 }} alignItems="center">
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {variant.name}
                </Typography>
                {filtered.length}
              </Grid>
              {filtered.map((voter, key) => {
                const exactVoter = usersInfo.find(
                  (v) => v.publicUID === voter.id
                );
                const date = new Date(voter.date);
                const dateToString = date.toLocaleString("sv");

                return (
                  exactVoter && (
                    <Stack key={key}>
                      <Typography variant="caption">
                        Проголосував(-ла) {dateToString}
                      </Typography>
                      <User forbidActions user={exactVoter} />
                    </Stack>
                  )
                );
              })}
            </Stack>
          )
        );
      })}
    </Stack>
  );
};
