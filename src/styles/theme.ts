import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontFamilySanFrancisco: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "San Francisco Display", "San Francisco", "Helvetica Neue", sans-serif',
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default theme;
