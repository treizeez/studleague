import {
  Avatar,
  Badge,
  Button,
  ButtonBase,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { cloneElement } from "react";
import { Link, matchPath, useLocation, useParams } from "react-router-dom";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { isMobile } from "react-device-detect";
import BallotRoundedIcon from "@mui/icons-material/BallotRounded";
import { UserDetails } from "./User/UserDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const SideBarLink = ({ label, icon, path }) => {
  const theme = useTheme();
  const location = useLocation();

  const match = location.pathname === `/${path}`;

  return (
    <Link to={path ?? "/"} style={{ width: isMobile ? "100%" : "auto" }}>
      <MenuItem
        selected={match}
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
            sx={{ width: isMobile ? "auto" : "60%", gap: 4 }}
          >
            {cloneElement(icon, {
              style: {
                color: match ? theme.palette.primary[300] : grey[500],
              },
            })}
            {!isMobile && (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: match ? theme.palette.primary[300] : grey[500],
                }}
              >
                {label}
              </Typography>
            )}
          </Grid>
        </Grid>
      </MenuItem>
    </Link>
  );
};

const sideBarLinks = [
  {
    label: "Головна",
    icon: <HomeRoundedIcon />,
    path: "",
  },
  {
    label: "Користувачі",
    icon: <PeopleAltRoundedIcon />,
    path: "users",
    rights: "readUsers",
  },
  {
    label: "Голосування",
    icon: <BallotRoundedIcon />,
    path: "votings",
  },
  {
    label: "Налаштування",
    icon: <SettingsRoundedIcon />,
    path: "settings",
  },
];

export const SideBar = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const ref = useSelector((state) => state.ref);
  const status = ref.find((r) => user.status === r.id)?.name;
  return (
    <Box
      sx={{
        backgroundColor: theme === "dark" ? "#000" : grey[200],
        width: isMobile ? "100%" : 350,
        height: isMobile ? "auto" : "100vh",
        position: isMobile ? "fixed" : "sticky",
        top: isMobile ? "auto" : 0,
        bottom: isMobile ? 0 : "auto",
        boxSizing: "border-box",
        padding: 1,
        zIndex: 1000,
      }}
    >
      <Stack spacing={2}>
        {!isMobile && (
          <Stack spacing={1} sx={{ padding: 5, textAlign: "center" }}>
            <Grid container justifyContent="center">
              <Badge
                color="primary"
                badgeContent="admin"
                overlap="circular"
                invisible={!user?.admin}
              >
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={user?.userPhoto}
                ></Avatar>
              </Badge>
            </Grid>
            <Grid
              container
              flexWrap="nowrap"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {user?.firstName} {user?.middleName}
              </Typography>
              <UserDetails
                button={
                  <IconButton>
                    <ArrowDropDownIcon />
                  </IconButton>
                }
              />
            </Grid>
            <Typography variant="caption" sx={{ color: grey[500] }}>
              {status}
            </Typography>
          </Stack>
        )}
        <Grid
          container
          justifyContent="space-around"
          flexWrap={isMobile ? "nowrap" : "wrap"}
          flexDirection={isMobile ? "row" : "column"}
          sx={{ width: "100%" }}
        >
          {sideBarLinks.map((link) => {
            const component = (
              <SideBarLink
                key={link.path}
                icon={link.icon}
                label={link.label}
                path={link.path}
              />
            );
            return (
              user.activated &&
              (link.rights
                ? user.adminRights.includes(link.rights) && component
                : component)
            );
          })}
        </Grid>
      </Stack>
    </Box>
  );
};
