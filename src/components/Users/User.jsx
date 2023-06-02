import { useParams } from "react-router-dom";
import { BackHeader } from "../../layouts/BackHeader";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { isMobile } from "react-device-detect";
import { blue, grey } from "@mui/material/colors";
import SchoolIcon from "@mui/icons-material/School";
import EmailIcon from "@mui/icons-material/Email";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import ContactEmergencyRoundedIcon from "@mui/icons-material/ContactEmergencyRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { useEffect, useState } from "react";
import { TabPanel } from "../../layouts/TabPanel";
import axios from "axios";
import { api } from "../../constants/api";
import { Buffer } from "buffer";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Activate } from "./Activate";
import { Delete } from "./Delete";
import { SetAdmin } from "./SetAdmin";
import VerifiedIcon from "@mui/icons-material/Verified";
import { UpdateUser } from "../User/UpdateUser";

const ListItemNested = ({ item }) => (
  <ListItem>
    <ListItemAvatar>
      <Avatar>{item.icon}</Avatar>
    </ListItemAvatar>
    <ListItemText primary={item.primary} secondary={item.secondary} />
  </ListItem>
);

const item = (icon, primary, secondary) => ({ icon, primary, secondary });

export const User = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();

  const users = useSelector((state) => state.users);
  const me = useSelector((state) => state.user);

  const user =
    id === me.publicUID ? me : users.find((user) => user?.publicUID === id);

  const ref = useSelector((state) => state.ref);
  const exactStatus = ref.find((r) => r.id === user?.status)?.name;
  const exactRepresentative = ref.find(
    (r) => r.id === user?.representative
  )?.name;

  const [image, setImage] = useState();

  const theme = useTheme();

  const itemsInList = [
    item(<EmailIcon />, "Пошта", user?.email),
    item(<SchoolIcon />, "Університет", user?.university),
    item(<BadgeRoundedIcon />, "Освітній рівень", user?.degree),
    item(<ImportContactsRoundedIcon />, "Програма", user?.program),
    item(<AccessTimeFilledRoundedIcon />, "Рік вступу", user?.admissionYear),
    item(
      <ContactEmergencyRoundedIcon />,
      "Студентський квиток",
      user?.stNumber
    ),
    item(<LocalPhoneRoundedIcon />, "Номер телефону", user?.number),
  ];

  useEffect(() => {
    if (
      (user && me && me.admin && me.adminRights.includes("readUsers")) ||
      user?.publicUID === id
    ) {
      axios
        .post(
          `${api}/usersInfo/getPhotoID`,
          {
            myPrivateID: me._privateUID,
            userID: user.publicUID,
          },
          { responseType: "arraybuffer" }
        )
        .then((res) => {
          const base64 = Buffer.from(res.data).toString("base64");
          setImage("data:;base64," + base64);
        });
    }
  }, [me, user]);

  return (
    <PhotoProvider>
      <BackHeader
        loaded={user}
        label={user && `${user?.secondName} ${user?.firstName}`}
      >
        <Stack spacing={2}>
          <Grid
            container
            alignItems="center"
            sx={{
              gap: 1,
            }}
            flexWrap={isMobile ? "wrap" : "nowrap"}
          >
            <Grid container alignItems="center" sx={{ gap: 2 }}>
              <PhotoView src={user?.userPhoto}>
                <Avatar
                  src={user?.userPhoto}
                  sx={{ width: 100, height: 100 }}
                />
              </PhotoView>
              <Stack>
                <Grid container sx={{ gap: 1 }} alignItems="center">
                  <Typography variant="h6">
                    {user?.secondName} {user?.firstName} {user?.middleName}
                  </Typography>
                  {user?.admin && <VerifiedIcon sx={{ color: blue[500] }} />}
                </Grid>
                <Typography variant="caption" sx={{ color: grey[500] }}>
                  {exactStatus}
                </Typography>
                <Typography variant="caption" sx={{ color: grey[500] }}>
                  Представник {exactRepresentative}
                </Typography>
              </Stack>
            </Grid>
            <Grid
              container
              justifyContent={isMobile ? "center" : "unset"}
              flexWrap="nowrap"
              flexDirection="row"
              sx={{ gap: 1 }}
            >
              <Delete
                user={user}
                button={
                  <Button
                    sx={{ width: isMobile ? "100%" : "auto" }}
                    variant="contained"
                    color="error"
                  >
                    Видалити
                  </Button>
                }
              />
              <Activate
                user={user}
                button={
                  <Button
                    sx={{ width: isMobile ? "100%" : "auto" }}
                    variant="contained"
                  >
                    Активувати
                  </Button>
                }
              />
              <SetAdmin
                user={user}
                button={
                  <Button
                    sx={{ width: isMobile ? "100%" : "auto" }}
                    variant="contained"
                  >
                    Змінити права
                  </Button>
                }
              />
              {user?.publicUID === me.publicUID && (
                <UpdateUser
                  button={
                    <Button
                      sx={{ width: isMobile ? "100%" : "auto" }}
                      variant="contained"
                      color="secondary"
                    >
                      Редагувати
                    </Button>
                  }
                />
              )}
            </Grid>
          </Grid>

          <Tabs
            value={value}
            onChange={handleChange}
            variant={isMobile ? "fullWidth" : "standard"}
          >
            <Tab label="Загальне" />
            <Tab label="Медіа" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {itemsInList.map((item, key) => (
                <ListItemNested key={key} item={item} />
              ))}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PhotoView src={image}>
              <img
                src={image}
                style={{
                  width: 200,
                  cursor: "pointer",
                  borderRadius: theme.shape.borderRadius,
                }}
              />
            </PhotoView>
          </TabPanel>
        </Stack>
      </BackHeader>
    </PhotoProvider>
  );
};
