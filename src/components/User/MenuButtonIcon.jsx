import { useTheme } from "@emotion/react";
import { Grid, MenuItem, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { cloneElement } from "react";
import { isMobile } from "react-device-detect";

export const MenuButtonIcon = ({ icon, label, onClick }) => {
  const theme = useTheme();

  return (
    <MenuItem
      onClick={onClick}
      selected
      sx={{
        borderRadius: `${theme.shape.borderRadius}px`,
      }}
    >
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ gap: 2, padding: 1 }}
      >
        <Grid
          container
          alignItems="center"
          flexWrap="nowrap"
          sx={{ width: "auto", gap: 2 }}
        >
          {cloneElement(icon, {
            style: {
              color: theme.palette.primary[300],
            },
          })}
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary[300],
            }}
          >
            {label}
          </Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
};
