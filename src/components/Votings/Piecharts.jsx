import { Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { PieChart } from "react-minimal-pie-chart";

export const Piecharts = ({ state, label, voting }) => {
  return (
    <Stack>
      <PieChart
        radius={isMobile ? 35 : 40}
        lineWidth={15}
        background={grey[500]}
        animate
        rounded
        data={state.map((variant) => {
          const exactVariant = voting?.variants?.find(
            (v) => v.id === variant.id
          );

          return {
            value: variant.voted,
            color: exactVariant.color,
          };
        })}
      />
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {label}
      </Typography>
      {state.map((variant) => {
        const exactVariant = voting?.variants?.find((v) => v.id === variant.id);

        return (
          <Grid key={variant.id} container alignItems="center" sx={{ gap: 2 }}>
            <div
              style={{
                aspectRatio: "1/1",
                width: 20,
                backgroundColor: exactVariant?.color,
                borderRadius: "100%",
              }}
            ></div>
            <Typography variant="subtitle1">
              {exactVariant?.name} - {Math.round(variant.voted)}%
            </Typography>
          </Grid>
        );
      })}
    </Stack>
  );
};
