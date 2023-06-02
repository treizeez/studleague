import {
  Avatar,
  Badge,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScreenLayout } from "../../layouts/ScreenLayout";
import { TabPanel } from "../../layouts/TabPanel";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { isMobile } from "react-device-detect";
import { generatePath, Link, resolvePath } from "react-router-dom";
import { Activate } from "./Activate";
import { Delete } from "./Delete";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Filter } from "./Filter/Filter";

export const User = ({ user, forbidActions }) => {
  const {
    firstName,
    secondName,
    middleName,
    status,
    userPhoto,
    activated,
    publicUID,
    representative,
    admin,
  } = user;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const me = useSelector((state) => state.user);
  const ref = useSelector((state) => state.ref);
  const exactStatus = ref.find((r) => r.id === status)?.name;
  const exactRepresentative = ref.find((r) => r.id === representative)?.name;

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Activate user={user} button={<MenuItem>Активувати</MenuItem>} />
        <Delete user={user} button={<MenuItem>Видалити</MenuItem>} />
      </Menu>
      <Paper sx={{ padding: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
        >
          <Link
            to={
              me.adminRights.includes("readUsers") &&
              resolvePath(
                generatePath("/users/:id", { id: publicUID }),
                "../../"
              )
            }
          >
            <Grid container alignItems="center" sx={{ gap: 2 }}>
              <Avatar src={userPhoto} />
              <Stack>
                <Grid container alignItems="center" sx={{ gap: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {secondName} {firstName}
                  </Typography>
                  {admin && (
                    <VerifiedIcon sx={{ color: blue[500], fontSize: 14 }} />
                  )}
                </Grid>
                <Typography variant="caption" sx={{ color: grey[500] }}>
                  {exactStatus}
                </Typography>
                <Typography variant="caption" sx={{ color: grey[500] }}>
                  Представник {exactRepresentative}
                </Typography>
              </Stack>
            </Grid>
          </Link>
          {!forbidActions &&
            me &&
            me.admin &&
            me.adminRights.includes("updateUsers") && (
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            )}
        </Grid>
      </Paper>
    </>
  );
};

export const Users = () => {
  const [data, setData] = useState({});
  const users = useSelector((state) => state.users);
  const me = useSelector((state) => state.user);
  const [search, setSearch] = useState("");

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filtered = users
    .filter((user) => {
      return Object.keys(data).reduce((acc, filter) => {
        const filterValues = data[filter];
        const userValue = user[filter];

        const found = filterValues.find((fv) => fv == userValue);

        return acc && found;
      }, true);
    })
    .filter((user) => {
      const fullName =
        `${user.firstName} ${user.secondName} ${user.middleName}`.toLowerCase();
      return fullName.includes(search);
    })
    .filter((user) => user.publicUID !== me.publicUID);

  return (
    <ScreenLayout label="Користувачі">
      <Grid container alignItems="center" flexWrap="nowrap">
        <TextField
          placeholder="Пошук"
          sx={{ width: "100%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Filter confirmData={setData} />
      </Grid>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isMobile ? "fullWidth" : "standard"}
      >
        <Tab label="Активовані" />
        <Tab
          label={
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              sx={{ gap: 1 }}
            >
              Заявки
              <Chip
                size="small"
                label={
                  users.filter((user) => !user.activated).length > 99
                    ? "99+"
                    : users.filter((user) => !user.activated).length
                }
              />
            </Grid>
          }
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Stack spacing={1}>
          {filtered
            .filter((user) => user.activated)
            .map((user) => (
              <User user={user} key={user.publicUID} />
            ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {filtered
          .filter((user) => !user.activated)
          .map((user) => (
            <User user={user} key={user.publicUID} />
          ))}
      </TabPanel>
    </ScreenLayout>
  );
};
