import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "./components/Navigation";
import { api, websocket } from "./constants/api";
import { Theme } from "./styles/MUITheme";
import { useThemeDetector } from "./hooks/useThemeDetector";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Backdrop, CircularProgress } from "@mui/material";

export const App = () => {
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const defaultTheme = useThemeDetector();

  const didUnmount = useRef(false);
  const { lastMessage } = useWebSocket(`${websocket}/api/voting`, {
    shouldReconnect: (closeEvent) => {
      return didUnmount.current === false;
    },
    reconnectAttempts: 10,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (user && navigator.onLine) {
      setLoading(true);
      axios
        .post(`${api}/auth/refreshAuth/`, { myPrivateID: user._privateUID })
        .then((res) => {
          dispatch({ type: "LOGIN", payload: res.data });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          return dispatch({ type: "LOGIN", payload: null });
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    !theme &&
      dispatch({ type: "SET_THEME", payload: defaultTheme ? "dark" : "light" });
  }, []);

  useEffect(() => {
    if (user && user.admin && user.adminRights.includes("readUsers")) {
      axios
        .post(`${api}/usersInfo/getUsers`, {
          myPrivateID: user._privateUID,
        })
        .then((res) => dispatch({ type: "FETCH_USERS", payload: res.data }))
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.activated) {
      axios
        .post(`${api}/voting/allVotings`, { myPrivateID: user._privateUID })
        .then((res) => dispatch({ type: "FETCH_VOTINGS", payload: res.data }))
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      switch (message.action) {
        case "add":
          dispatch({ type: "ADD_VOTINGS", payload: message.payload });

        case "update":
          dispatch({ type: "UPDATE_VOTINGS", payload: message.payload });

        case "delete":
          dispatch({ type: "DELETE_VOTING", payload: message.payload });
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    axios
      .get(`${api}/refs`)
      .then((res) => dispatch({ type: "FETCH_REFS", payload: res.data }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Theme>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navigation />
    </Theme>
  );
};
