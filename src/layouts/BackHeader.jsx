import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const BackHeader = ({ label, children, loaded }) => {
  const theme = useSelector((state) => state.theme);
  const navigate = useNavigate();
  return (
    <Stack>
      <Grid
        container
        alignItems="center"
        sx={{
          padding: 2,
          position: "sticky",
          top: 0,
          gap: 2,
          backgroundColor: theme === "dark" ? "#000" : "#fff",
          zIndex: 1000,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackRounded fontSize="large" />
        </IconButton>
        <Typography
          noWrap
          sx={{ fontWeight: "bold", width: "60%" }}
          variant="h6"
        >
          {label}
        </Typography>
      </Grid>
      {loaded ? (
        <Box
          sx={{
            position: "relative",
            padding: 3,
            width: isMobile ? "auto" : "min(100% - 10px, 1000px)",
          }}
        >
          {children}
        </Box>
      ) : (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ position: "absolute", height: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      )}
    </Stack>
  );
};
