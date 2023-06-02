import { createTheme, Grow, Paper, ThemeProvider, Zoom } from "@mui/material";
import { grey, indigo, purple } from "@mui/material/colors";
import { forwardRef } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";

const Transition = forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

export const Theme = ({ children }) => {
  const myTheme = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const theme = createTheme({
    palette: {
      mode: myTheme ?? "light",
      primary: indigo,
      secondary: grey,
    },

    shape: {
      borderRadius: 10,
    },

    shadows: Array(25).fill("none"),

    components: {
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
          },
        },
      },

      MuiDrawer: {
        defaultProps: {
          PaperProps: {
            variant: "outlined",
            elevation: 0,
            sx: {
              borderRadius: "10px",
              margin: 1,
            },
          },
        },
      },

      MuiMenu: {
        defaultProps: {
          PaperProps: {
            variant: "outlined",
            elevation: 0,
          },
        },
      },

      MuiDialog: {
        defaultProps: {
          fullScreen: isMobile,
          TransitionComponent: Transition,
          PaperProps: {
            variant: "outlined",
            elevation: 0,
          },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "12pt",
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          root: {
            "& .MuiTabs-indicator": {
              display: "flex",
              justifyContent: "center",
              height: "3px",
              borderRadius: "20px",
            },
            "& .MuiTabs-indicatorSpan": {
              maxWidth: 40,
              width: "100%",
            },
          },
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&:active": {
              opacity: 0.7,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontWeight: "bold",
            textTransform: "none",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <style>{`html {
        padding-bottom: ${isMobile && user ? "100" : "inherit"}
      } body {background-color: ${
        myTheme === "dark" ? "#000" : "#fff"
      }; color: ${myTheme === "dark" ? "#fff" : "#000"}}`}</style>
      {children}
    </ThemeProvider>
  );
};
