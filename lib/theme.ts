import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#BAF0E2",
    },
  },
  typography: {
    fontFamily: "'Overpass', 'sans-serif'",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: ["Overpass", "sans-serif"],
          borderRadius: 0,
          "&.MuiButton-contained": {
            backgroundColor: "#BAF0E2",
          },
          boxShadow: "none",
        },
      },
    },
  },
});
