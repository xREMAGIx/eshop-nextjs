import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { productActions, bannerActions } from "../actions";
import MainBar from "../src/Appbar";
import Carousel from "../src/Carousel";
import NoSsr from "@material-ui/core/NoSsr";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Project(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.imagePaper} elevation={10}>
      {props.item.path && (
        <CardMedia
          className={classes.media}
          image={"http://localhost:5000/uploads/" + props.item.path}
          // title={props.item.name}
        />
      )}
      {props.item.img && (
        <CardMedia
          className={classes.media}
          image={URL.createObjectURL(props.item.img)}
          // title={props.item.name}
        />
      )}
      {/* <Button className={classes.bannerCheckBtn}>Check it out!</Button> */}
    </Paper>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(9, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  newProductsContainer: {
    paddingTop: theme.spacing(8),
    height: "400px",
    paddingBottom: theme.spacing(8),
  },
  card: {
    //height: "100%",

    display: "flex",
    flexDirection: "column",
    "&:hover": {
      "& .MuiCardActions-root": {
        opacity: 1,
        height: "50px",
        // visibility: "visible",
        // opacity: 1,
      },
    },
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  container: { width: "500px" },
  media: {
    backgroundColor: "white",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(115%)",
    },
  },
  imagePaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0, 0),
    position: "relative",
    height: "500px",
    overflow: "hidden",
    // padding: "20px",
    color: "white",
    height: "100vh",
  },
  sectionTitle: {
    textAlign: "center",
    borderBottom: "2px solid #000",
    marginTop: "40px",
  },
  arcticlesRoot: {},
  arcticlesMedia: {
    height: 300,
  },
  arcticlesContainer: {
    // width: "100px",
    // height: "100vw",
    //background: "primary",
    backgroundColor: theme.palette.primary.main,
  },
  arcticlesGrid: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px 0",
  },

  cardActions: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: "opacity 0.5s, height 0.1s linear",

    // visibility: "hidden",
    // opacity: 0,
    // transition: "visibility 0s, opacity 0.5s linear",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const Products = (props) => {
  const classes = useStyles();
  const { result } = props;

  const autoPlay = false;
  const timer = 500;
  const animation = "fade";
  const indicators = true;

  const [value, setValue] = React.useState(0);

  const targetRef = React.useRef();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  // holds the timer for setTimeout and clearInterval
  let movement_timer = null;

  // the number of ms the window size must stay the same size before the
  // dimension state variable is reset
  const RESET_TIMEOUT = 100;

  const changeDimension = () => {
    // For some reason targetRef.current.getBoundingClientRect was not available
    // I found this worked for me, but unfortunately I can't find the
    // documentation to explain this experience

    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight + 50,
      });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    changeDimension();
  }, []);

  // every time the window is resized, the timer is cleared and set again
  // the net effect is the component will only reset after the window size
  // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // redrawing of the component for more complex components such as charts
  if (typeof window !== "undefined") {
    // it's safe to use window now
    window.addEventListener("resize", () => {
      clearInterval(movement_timer);
      movement_timer = setTimeout(changeDimension, RESET_TIMEOUT);
    });
  }

  return (
    <React.Fragment>
      <MainBar
        categories={result.categories.items}
        brands={result.brands.items}
      />

      {/* Simple Carousel */}
      {result.banners.items !== undefined && (
        <Carousel
          style={{ zIndex: -1 }}
          className={classes.imageBanner}
          autoPlay={autoPlay}
          timer={timer}
          animation={animation}
          indicators={indicators}
        >
          {result.banners.items.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      )}

      {/* Arcticles */}
      <Typography className={classes.sectionTitle} variant="h4">
        Features Arcticles
      </Typography>
      <Container className={classes.arcticlesContainer} maxWidth="lg">
        <Grid
          className={classes.arcticlesGrid}
          container
          direction="row"
          spacing={4}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.arcticlesRoot}>
              <CardActionArea>
                <CardMedia
                  className={classes.arcticlesMedia}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
                {/* <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.arcticlesRoot}>
              <CardActionArea>
                <CardMedia
                  className={classes.arcticlesMedia}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.arcticlesRoot}>
              <CardActionArea>
                <CardMedia
                  className={classes.arcticlesMedia}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* New products */}
      <Typography className={classes.sectionTitle} variant="h4">
        New Products
      </Typography>
      <Container className={classes.newProductsContainer} maxWidth="md">
        <Grid container spacing={4}>
          {result.products.items.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                {product.images.length > 0 ? (
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      "http://localhost:5000/uploads/" + product.images[0].path
                    }
                    title="Image title"
                  />
                ) : null}
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.productName}
                  </Typography>
                  <Typography>{product.description}</Typography>
                  <Typography variant="h6">$ {product.price}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <IconButton color="secondary" aria-label="add-to-cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Typography className={classes.sectionTitle} variant="h4">
        Features Sale Product
      </Typography>
      <Container className={classes.arcticlesContainer} maxWidth="lg">
        <Grid
          className={classes.arcticlesGrid}
          container
          direction="row"
          spacing={4}
        >
          <Grid item xs={12} md={8}>
            <Card className={classes.arcticlesRoot}>
              <CardActionArea>
                <CardMedia
                  className={classes.arcticlesMedia}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
                {/* <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className={classes.arcticlesRoot}>
              <CardActionArea>
                <CardMedia
                  className={classes.arcticlesMedia}
                  image="https://source.unsplash.com/random"
                  title="Contemplative Reptile"
                />
                {/* <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Lizard
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent> */}
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Typography className={classes.sectionTitle} variant="h4">
        Products
      </Typography>

      <Container maxWidth="md">
        <div className={classes.tabRoot}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="New Products" {...a11yProps(0)} />
              <Tab label="Best Seller" {...a11yProps(1)} />
              <Tab label="Special Offer" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel className={classes.tabPanel} value={value} index={0}>
            <Grid container spacing={4}>
              {result.products.items.map((product) => (
                <Grid
                  item
                  key={product.id}
                  style={{ height: dimensions.height }}
                  className={classes.productCardGrid}
                  xs={12}
                  sm={6}
                  md={4}
                  //innerRef={ref}
                  //ref={ref}
                >
                  <Card ref={targetRef} className={classes.card}>
                    {product.images.length > 0 ? (
                      <CardMedia
                        className={classes.cardMedia}
                        image={
                          "http://localhost:5000/uploads/" +
                          product.images[0].path
                        }
                        title="Image title"
                      />
                    ) : null}
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.productName}
                      </Typography>
                      <Typography>{product.description}</Typography>
                      <Typography variant="h6">$ {product.price}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <IconButton color="secondary" aria-label="add-to-cart">
                        <AddShoppingCartIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </Container>

      {/* </main> */}

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

Products.getInitialProps = async ({ store }) => {
  let result;
  await store.dispatch(bannerActions.getAll());
  await store
    .dispatch(productActions.getAll())
    .then(() => (result = store.getState()));

  return { result };
};

// export async function getServerSideProps({ store }) {
//   let result;
//   await store
//     .dispatch(productActions.getAll())
//     .then(() => (result = store.getState()));
//   return {
//     props: {
//       products,
//     }, // will be passed to the page component as props
//   };
// }

export default Products;
