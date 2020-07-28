import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00AAB2",
    },
    secondary: {
      main: "#B20800",
    },
    tertiary: {
      main: "#B20800",
    },
  },
  status: {
    danger: "#aabbcc",
  },
  background: {
    default: "#F4E3E3",
  },
});

theme = responsiveFontSizes(theme);

export default theme;
