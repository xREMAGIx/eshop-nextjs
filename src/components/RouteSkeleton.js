import PropTypes from "prop-types";

//UI Components
import Container from "@material-ui/core/Container";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

//Custom Components
import theme from "../store/theme";

export default function RouteSkeleton(props) {
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(props.path);

  function routeDetect(path) {
    let checkPath = path.substring(0, 12);

    //Product detail
    if (checkPath.includes("/products/")) return 3;
    //Product index
    if (checkPath.includes("/products")) return 2;
    //Homepage
    if (checkPath.includes("/")) return 1;
  }

  function renderDesktop(props) {
    let serialNumber = props.path ? routeDetect(props.path) : 0;
    switch (serialNumber) {
      // Home page
      case 1:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"70vh"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"15vh"} />
            </Grid>
          </Grid>
        );

      //Product index
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} container direction="column" spacing={2}>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"30vh"} />
              </Grid>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"20vh"} />
              </Grid>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"20vh"} />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Skeleton animation="wave" variant="rect" height={"85vh"} />
            </Grid>
          </Grid>
        );

      //Product detail page
      case 3:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item container spacing={3}>
              <Grid item xs={12} md={6}>
                <Skeleton animation="wave" variant="rect" height={"50vh"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton animation="wave" variant="rect" height={"50vh"} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton animation="wave" variant="rect" height={"30vh"} />
            </Grid>
          </Grid>
        );

      default:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"70vh"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"15vh"} />
            </Grid>
          </Grid>
        );
    }
  }

  function renderMobile(props) {
    let serialNumber = props.path ? routeDetect(props.path) : 0;
    switch (serialNumber) {
      // Home page
      case 1:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"50vh"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"5vh"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"25vh"} />
            </Grid>
          </Grid>
        );

      //Product index
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item container direction="column" spacing={2}>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"5vh"} />
              </Grid>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"5vh"} />
              </Grid>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"5vh"} />
              </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1}>
              <Grid item>
                <Skeleton animation="wave" variant="rect" height={"7vh"} />
              </Grid>
              <Grid item container spacing={1}>
                <Grid item xs={6} sm={4}>
                  <Skeleton animation="wave" variant="rect" height={"30vh"} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Skeleton animation="wave" variant="rect" height={"30vh"} />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={4}>
                    <Skeleton animation="wave" variant="rect" height={"30vh"} />
                  </Grid>
                </Hidden>
              </Grid>
              <Grid item container spacing={1}>
                <Grid item xs={6} sm={4}>
                  <Skeleton animation="wave" variant="rect" height={"30vh"} />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Skeleton animation="wave" variant="rect" height={"30vh"} />
                </Grid>
                <Hidden xsDown>
                  <Grid item sm={4}>
                    <Skeleton animation="wave" variant="rect" height={"30vh"} />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        );

      //Product detail page
      case 3:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item container spacing={3}>
              <Grid item xs={12} md={6}>
                <Skeleton animation="wave" variant="rect" height={"50vh"} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton animation="wave" variant="rect" height={"50vh"} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Skeleton animation="wave" variant="rect" height={"30vh"} />
            </Grid>
          </Grid>
        );

      default:
        return (
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"70vh"} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rect" height={"15vh"} />
            </Grid>
          </Grid>
        );
    }
  }

  return (
    <React.Fragment>
      <LinearProgress color="secondary" />
      <Skeleton
        variant="rect"
        height={64}
        style={{ marginBottom: theme.spacing(2) }}
      />
      <Container maxWidth="lg">
        {mobile ? renderMobile(props) : renderDesktop(props)}
      </Container>
    </React.Fragment>
  );
}

RouteSkeleton.propTypes = {
  path: PropTypes.elementType.isRequired,
};
