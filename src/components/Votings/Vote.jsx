import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../constants/api";
import { FinishVoting } from "./FinishVoting";
import { isMobile } from "react-device-detect";

export const Vote = ({ voting }) => {
  const me = useSelector((state) => state.user);

  const allVoted = voting?.variants
    ?.map((variant) => variant?.voted.map((i) => i.id))
    .flat(1);

  const [variant, setVariant] = useState();
  const [error, setError] = useState();

  const handleChange = (event) => {
    setVariant(event.target.value);
  };

  useEffect(() => {
    const myChoice = voting?.variants?.find((variant) => {
      const ids = variant?.voted?.map((i) => i.id);
      return ids.includes(me.publicUID);
    });
    if (myChoice) {
      setVariant(myChoice.id);
    }
  }, [me, voting]);

  return (
    <Stack spacing={2}>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {voting?.title}
      </Typography>
      {voting?.description && (
        <Typography variant="body1" sx={{ color: grey[500] }}>
          {voting?.description}
        </Typography>
      )}
      <RadioGroup value={variant ?? ""} onChange={handleChange}>
        {voting?.variants?.map((variant) => (
          <FormControlLabel
            key={variant.id}
            value={variant.id}
            control={
              <Radio
                disabled={
                  allVoted?.includes(me.publicUID) ||
                  voting?.finished ||
                  !voting?.canVote.includes(me.status)
                }
              />
            }
            label={variant.name}
          />
        ))}
      </RadioGroup>
      <Grid
        container
        flexDirection={isMobile ? "column" : "row"}
        sx={{ gap: 1 }}
      >
        <FinishVoting
          voting={voting}
          button={
            <Button variant="contained" color="secondary">
              Завершити голосування
            </Button>
          }
        />
        <Button
          variant="contained"
          disabled={
            allVoted?.includes(me.publicUID) ||
            voting?.finished ||
            !voting?.canVote.includes(me.status)
          }
          onClick={() => {
            if (!variant) {
              return setError("Оберіть варіант");
            }

            setError();
            return axios
              .put(`${api}/voting/vote/${voting?._id}`, {
                myPrivateID: me._privateUID,
                variant,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
        >
          Готово
        </Button>
      </Grid>
    </Stack>
  );
};
