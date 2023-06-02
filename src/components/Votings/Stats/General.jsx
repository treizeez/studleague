import { useTheme } from "@emotion/react";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { votingAlgorithm } from "../votingAlgorithm";

export const General = ({ voting, usersInfo }) => {
  const [general, setGeneral] = useState();
  const theme = useTheme();
  const me = useSelector((state) => state.user);
  const ref = useSelector((state) => state.ref);

  useEffect(() => {
    const params = { voting, me, setState: setGeneral };
    ref &&
      votingAlgorithm({
        ...params,
        type: "state",
        users: usersInfo,
        status: "",
        ref,
      });
  }, [usersInfo, voting, ref]);

  return (
    <Stack spacing={3}>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Загальна статистика
      </Typography>
      {general?.state.map((variant) => {
        const exactVoting = voting.variants.find((v) => v.id === variant.id);

        return (
          <Stack key={variant.id}>
            <Typography sx={{ width: "90%" }} variant="h6" noWrap>
              {exactVoting.name}
            </Typography>
            <Grid
              key={variant.id}
              container
              alignItems="center"
              sx={{ gap: 2 }}
            >
              <div
                style={{
                  width: `${variant.voted}%`,
                  height: 5,
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: exactVoting.color,
                  fontWeight: "bold",
                  transition: "all 0.2s ease-out",
                }}
              ></div>
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                {Math.floor(variant.voted)}%
              </Typography>
            </Grid>
          </Stack>
        );
      })}
    </Stack>
  );
};
