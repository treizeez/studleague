import { Avatar, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { UserDetails } from "../components/User/UserDetails";

export const ScreenLayout = ({ label, children, button, none }) => {
  const user = useSelector((state) => state.user);
  return (
    <Stack spacing={2} sx={{ padding: isMobile ? 2 : 5 }}>
      <Grid container alignItems="center" sx={{ gap: 2 }}>
        {isMobile && <UserDetails button={<Avatar src={user.userPhoto} />} />}
        <Typography variant="h6">{label}</Typography>
        {button}
      </Grid>
      {none ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
          sx={{ height: "50vh", gap: 2 }}
        >
          <Typography sx={{ color: (theme) => theme.palette.grey[500] }}>
            Тут поки що нічого немає
          </Typography>
        </Grid>
      ) : (
        children
      )}
    </Stack>
  );
};
