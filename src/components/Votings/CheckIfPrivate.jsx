import { Grid, Typography } from "@mui/material";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";

export const CheckIfPrivate = ({ voting }) => {
  const style = { color: (theme) => theme.palette.grey[500] };

  return (
    <Grid container alignItems="center" sx={{ gap: 1 }}>
      {voting?.private ? (
        <LockRoundedIcon sx={style} />
      ) : (
        <LockOpenRoundedIcon sx={style} />
      )}
      <Typography variant="caption" sx={{ ...style, fontWeight: "bold" }}>
        {voting?.private ? "Закрите голосування" : "Відкрите голосування"}
      </Typography>
    </Grid>
  );
};
