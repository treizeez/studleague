import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useSelector } from "react-redux";

export const CreateFilter = ({ item, data, setData }) => {
  const { title, type } = item;

  const me = useSelector((state) => state.user);

  const users = useSelector((state) => state.users);
  const filtered = users.filter((user) => user.publicUID !== me.publicUID);
  const allItems = Array.from(new Set(filtered.map((user) => user[type])));

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{title}</Typography>
      {allItems.map((item, key) => {
        const count = filtered.filter((user) => user[type] === item).length;
        return (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                onChange={() =>
                  setData(() => {
                    const copy = Object.assign({}, data);
                    if (!copy[type]) {
                      copy[type] = [];
                    }

                    if (copy[type].includes(item)) {
                      copy[type] = copy[type].filter((i) => i !== item);
                      return copy;
                    }

                    copy[type].push(item);

                    return copy;
                  })
                }
                checked={data[type]?.includes(item) ?? false}
              />
            }
            label={`${item} (${count})`}
          />
        );
      })}
    </Stack>
  );
};
