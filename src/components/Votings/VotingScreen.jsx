import {
  Alert,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { green, grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { api } from "../../constants/api";
import { BackHeader } from "../../layouts/BackHeader";
import { votingAlgorithm } from "./votingAlgorithm";
import { PieChart } from "react-minimal-pie-chart";
import { FinishVoting } from "./FinishVoting";
import { isMobile } from "react-device-detect";
import { TabPanel } from "../../layouts/TabPanel";
import { Piecharts } from "./Piecharts";
import { Vote } from "./Vote";
import { Statistics } from "./Stats/Statistics";
import { Voted } from "./Voted";
import { CheckIfPrivate } from "./CheckIfPrivate";

export const VotingScreen = () => {
  const me = useSelector((state) => state.user);
  const ref = useSelector((state) => state.ref);
  const { id } = useParams();
  const votings = useSelector((state) => state.votings);
  const voting = votings?.find((v) => v._id === id);
  const theme = useSelector((state) => state.theme);
  const [userStatus, setUserStatus] = useState({});
  const [usersInfo, setUsersInfo] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (voting && !voting.private) {
      axios
        .post(`${api}/voting/getUserInfo`, {
          myPrivateID: me._privateUID,
          votingID: voting._id,
        })
        .then((res) => setUsersInfo(res.data))
        .catch((err) => console.log(err));
    }

    if (voting && voting.private) {
      setUsersInfo(users);
    }
  }, [voting]);

  useEffect(() => {
    const params = { voting, me, setState: setUserStatus };
    ref
      .filter((r) => r.type === "status")
      .map((request) =>
        votingAlgorithm({
          ...params,
          type: request.id,
          status: request.id,
          users: usersInfo,
          ref,
        })
      );
  }, [usersInfo, voting]);

  const [value, setValue] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const allVoted = voting?.variants
    ?.map((variant) => variant?.voted.map((i) => i.id))
    .flat(1);

  const isVoted = allVoted?.includes(me.publicUID);

  useEffect(() => {
    if (!isVoted && !me.adminRights.includes("votings") && !voting?.finished) {
      return setAllowed(false);
    }

    if (me.adminRights.includes("votings")) {
      return setAllowed(true);
    }

    if (isVoted && !voting?.private) {
      return setAllowed(true);
    }

    if (voting?.private && !me.adminRights.includes("votings")) {
      return setAllowed(false);
    }

    if (voting?.finished && !voting?.private) {
      return setAllowed(true);
    }

    return setAllowed(true);
  }, [me, isVoted, voting]);

  return (
    <BackHeader label={voting?.title} loaded={voting}>
      <Stack spacing={2}>
        <div
          style={{
            position: "sticky",
            top: "15px",
            background: theme === "dark" ? "#000" : "#fff",
            zIndex: 1000,
          }}
        >
          <Tabs value={value} onChange={handleChangeTab} variant="scrollable">
            <Tab label="Голосування" />
            <Tab label="Статистика" disabled={!allowed} />
            <Tab label="Проголосували" disabled={!allowed || voting?.private} />
          </Tabs>
        </div>
        <CheckIfPrivate voting={voting} />
        <Typography variant="caption">Можуть голосувати:</Typography>
        <Grid container sx={{ gap: 1 }}>
          {voting?.canVote.map((status) => {
            const exactStatus = ref.find((i) => i.id === status);
            return <Chip key={exactStatus._id} label={exactStatus.name} />;
          })}
        </Grid>
        {voting?.finished && (
          <Typography variant="caption" sx={{ color: green[300] }}>
            Голосування завершено
          </Typography>
        )}
        <TabPanel value={value} index={0}>
          <Vote voting={voting} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {allowed && (
            <Statistics
              voting={voting}
              userStatus={userStatus}
              usersInfo={usersInfo}
              allowed={allowed}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {allowed && <Voted voting={voting} usersInfo={usersInfo} />}
        </TabPanel>
      </Stack>
    </BackHeader>
  );
};
