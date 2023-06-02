import { Container, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { AuthScreen } from "./Auth/AuthScreen";
import { ResetEmail } from "./Auth/ResetEmail/ResetEmail";
import { ResetPassword } from "./Auth/ResetPassword/ResetPassword";
import { Home } from "./Home";
import { Settings } from "./Settings/Settings";
import { SideBar } from "./SideBar";
import { User } from "./Users/User";
import { Users } from "./Users/Users";
import { VotingScreen } from "./Votings/VotingScreen";
import { VotingsScreen } from "./Votings/VotingsScreen";

export const Navigation = () => {
  const user = useSelector((state) => state.user);

  return (
    <Grid
      container
      flexWrap={isMobile ? "unset" : "nowrap"}
      flexDirection={isMobile ? "column-reverse" : "unset"}
      sx={{ gap: 2 }}
    >
      {user && <SideBar />}
      <Box sx={{ width: "100%" }}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <AuthScreen />} />
          {user && user.adminRights.includes("readUsers") && (
            <Route path="/users" element={<Users />} />
          )}
          <Route path="/users/:id" element={<User />} />
          {user && user.activated && (
            <Route path="/votings" element={<VotingsScreen />} />
          )}
          {user && user.activated && (
            <Route path="/votings/:id" element={<VotingScreen />} />
          )}
          {user && user.activated && (
            <Route
              path="/resetpassword"
              element={
                <Grid container alignItems="center" sx={{ minHeight: "100vh" }}>
                  <ResetPassword />
                </Grid>
              }
            />
          )}
          {user && user.activated && (
            <Route
              path="/resetemail"
              element={
                <Grid container alignItems="center" sx={{ minHeight: "100vh" }}>
                  <ResetEmail />
                </Grid>
              }
            />
          )}
          {user && user.activated && (
            <Route path="/settings" element={<Settings />} />
          )}
        </Routes>
      </Box>
    </Grid>
  );
};
