import IconButton from "@mui/material/IconButton";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { Stack } from "@mui/system";
import { CreateFilter } from "./CreateFilter";

export const Filter = ({ confirmData }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const handleClick = () => setOpen(!open);

  const filterArray = [
    {
      title: "Університети",
      type: "university",
    },
    {
      title: "Програма",
      type: "program",
    },
    {
      title: "Освітній рівень",
      type: "degree",
    },
  ];

  return (
    <>
      <IconButton onClick={handleClick}>
        <TuneRoundedIcon />
      </IconButton>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClick}>
        <DialogTitle>Фільтр користувачів</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            {filterArray.map((filter) => (
              <CreateFilter
                key={filter.type}
                item={filter}
                data={data}
                setData={setData}
              />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Скасувати</Button>
          <Button
            variant="contained"
            onClick={() => {
              const copy = Object.assign({}, data);
              const keys = Object.keys(copy);

              keys.map((key) => copy[key].length === 0 && delete copy[key]);

              confirmData(copy);
              handleClick();
            }}
          >
            Готово
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
