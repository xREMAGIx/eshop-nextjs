import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#378F81",
      main: "#378F55",
      dark: "##37718F",
    },
    secondary: {
      light: "#37458F",
      main: "#55378F",
      dark: "#81378F",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
