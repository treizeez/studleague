import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Grow,
  Slide,
  Typography,
  Zoom,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";

export const DefaultDialog = (props) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(false);
  }, [props]);

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={props.handleDialog}
      open={props.open}
    >
      {
        <Slide in={scrolled} direction="down">
          <DialogTitle>{props.title}</DialogTitle>
        </Slide>
      }
      <DialogContent
        onScroll={(e) => {
          if (e.target.scrollTop <= 3) {
            return setScrolled(false);
          }

          return setScrolled(true);
        }}
        sx={{ padding: props.padding ?? "auto", position: "relative" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ height: !scrolled ? "100%" : "auto" }}
        >
          <Grid item sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <Grow in={!scrolled}>
                <div>
                  {props.icon && (
                    <>
                      {props.icon}
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {props.title}
                      </Typography>
                    </>
                  )}
                  {props.description && props.icon && (
                    <DialogContentText sx={{ textAlign: "center" }}>
                      {props.description}
                    </DialogContentText>
                  )}
                </div>
              </Grow>
              {props.error && <Alert severity="error">{props.error}</Alert>}
              {props.children}
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.back ? props.onBack : props.handleDialog}
          variant="contained"
          color="secondary"
        >
          {props.back ? "Назад" : "Скасувати"}
        </Button>
        <Button
          onClick={props.back ? props.onNext : props.onClick}
          variant="contained"
        >
          {props.back ? "Далі" : "Готово"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
