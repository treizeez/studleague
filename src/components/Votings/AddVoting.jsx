import { cloneElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DefaultDialog } from "../../layouts/DefaultDialog";
import { GradientIcons } from "../../styles/GradientIcons";
import HowToVoteRoundedIcon from "@mui/icons-material/HowToVoteRounded";
import {
  Button,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import axios from "axios";
import { api } from "../../constants/api";
import randomColor from "randomcolor";
import { isMobile } from "react-device-detect";

export const AddVoting = ({ button }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState({
    private: true,
    variants: [],
    canVote: [],
  });

  const handleDialog = () => setOpen(!open);

  const me = useSelector((state) => state.user);
  const ref = useSelector((state) => state.ref);

  return (
    me.admin &&
    me.adminRights.includes("votings") && (
      <>
        {cloneElement(button, {
          onClick: handleDialog,
        })}

        <DefaultDialog
          onClick={() => {
            if (!data.title) {
              return setError("Заповніть усі поля");
            }
            if (
              data.variants.map((item) => item.name).filter((name) => !name)
                .length > 0
            ) {
              return setError("Заповніть усі поля");
            }

            if (data.variants.length < 2) {
              return setError("Додайте більше 1 варіанта відповідей");
            }

            if (data.canVote.length === 0) {
              return setError(
                "Оберіть тих, хто може брати участь в опитуванні"
              );
            }

            return axios
              .post(`${api}/voting/newVoting`, {
                myPrivateID: me._privateUID,
                data,
              })
              .then(() => {
                handleDialog();
              })
              .catch((err) => setError(err.response.data));
          }}
          error={error}
          padding={6}
          icon={
            <GradientIcons
              centered
              name="addvote"
              icon={<HowToVoteRoundedIcon />}
              firstColor="#9b59b6"
              secondColor="#3498db"
            />
          }
          handleDialog={handleDialog}
          open={open}
          title="Нове голосування"
        >
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                value={data.private}
                onChange={() => setData({ ...data, private: !data.private })}
              />
            }
            label="Закрите"
          />
          <Typography variant="caption">Може голосувати</Typography>
          <Grid
            container
            flexWrap={isMobile ? "nowrap" : "unset"}
            sx={{
              gap: 1,
              overflow: "auto",
              overflowY: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {ref
              .filter((r) => r.type === "status")
              .map((r) => (
                <Chip
                  key={r._id}
                  variant={data.canVote.includes(r.id) ? "filled" : "outlined"}
                  label={r.name}
                  onClick={() =>
                    setData({
                      ...data,
                      canVote: data.canVote.includes(r.id)
                        ? data.canVote.filter((v) => v !== r.id)
                        : [...data.canVote, r.id],
                    })
                  }
                />
              ))}
          </Grid>
          <TextField
            placeholder="Заголовок"
            fullWidth
            autoComplete="off"
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <TextField
            placeholder="Опис"
            autoComplete="off"
            fullWidth
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
          <TransitionGroup
            style={{ display: "flex", gap: 6, flexDirection: "column" }}
          >
            {data.variants.map((variant, i) => (
              <Collapse key={variant.id}>
                <Grid container alignItems="center" flexWrap="nowrap">
                  <TextField
                    fullWidth
                    placeholder={`Варіант ${i + 1}`}
                    autoComplete="off"
                    onChange={(e) =>
                      setData({
                        ...data,
                        variants: data.variants.map((v) =>
                          v.id === variant.id
                            ? { ...v, name: e.target.value }
                            : v
                        ),
                      })
                    }
                  />
                  <IconButton
                    onClick={() =>
                      setData({
                        ...data,
                        variants: data.variants.filter(
                          (v) => v.id !== variant.id
                        ),
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Collapse>
            ))}
          </TransitionGroup>
          <Button
            variant="contained"
            color="secondary"
            onClick={() =>
              setData({
                ...data,
                variants: [
                  ...data.variants,
                  {
                    id: (Math.random() + 1).toString(36).substring(7),
                    color: randomColor(),
                  },
                ],
              })
            }
          >
            Додати варіант
          </Button>
        </DefaultDialog>
      </>
    )
  );
};
