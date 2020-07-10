import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
import Tooltip from "@material-ui/core/Tooltip";
import RestoreIcon from "@material-ui/icons/Restore";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import RedeemIcon from "@material-ui/icons/Redeem";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  productActions,
  bannerActions,
  postActions,
  categoryActions,
  cartActions,
} from "../actions";
import MainBar from "../components/Appbar";
import Carousel from "../components/Carousel";
import Link from "../src/Link";
import { useSelector } from "react-redux";
import { checkServerSideCookie, userActions } from "../actions/user.actions";
import Footer from "../components/Footer";
import slugtify from "../src/slugtify";
import backendUrl from "../src/backendUrl";
import Head from "next/head";

function Project(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.imagePaper} elevation={10}>
      {props.item.path && (
        <CardMedia
          className={classes.media}
          image={`${backendUrl}/uploads/` + props.item.path}
          // title={props.item.name}
        />
      )}
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
  card: {
    //height: "100%",
    display: "flex",
    flexDirection: "column",

    "&:hover": {
      boxShadow: "5px 10px 18px #888888",
      "& .MuiCardActions-root": {
        opacity: 1,
      },
    },
  },
  cardActions: {
    height: "50px",
    opacity: 0,
    overflow: "hidden",
    transition: "opacity 0.5s, height 0.1s linear",
    [theme.breakpoints.down("xs")]: {
      opacity: 1,
    },
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
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
    //height: "500px",
    overflow: "hidden",
    // padding: "20px",
    color: "white",
    height: "70vh",
  },
  sectionTitle: {
    textAlign: "center",
    margin: "50px",
    fontWeight: "bold",
  },
  sectionTitleBar: {
    width: "100px",
    height: "5px",
    margin: "8px auto 0",
    display: "block",
    backgroundColor: theme.palette.secondary.dark,
  },
  arcticlesRoot: {
    margin: theme.spacing(1),
  },
  arcticlesMedia: {
    height: 300,
  },
  arcticlesContainer: {
    backgroundColor: theme.palette.primary.light,
  },
  arcticlesGrid: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px 0",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    "& .MuiAppBar-colorPrimary": {
      color: "#000",
      backgroundColor: theme.palette.background.paper,
    },
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },
  },
  tabPanel: {
    backgroundColor: theme.palette.background.paper,
  },
  newProductList: {
    height: "320px",
  },
  productname: {
    maxWidth: "20rem",
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.2em",
    maxHeight: "2.4em",
    marginRight: "-1em",
    paddingRight: "2em",
    marginBottom: "1em",
    "&&:before": {
      paddingRight: theme.spacing(2),
      content: '"....."',
      position: "absolute",
      right: 0,
      bottom: 0,
    },
    "&&:after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1em",
      height: "1em",
      marginTop: "0.2em",
      background: "white",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "none",
      maxHeight: "none",
      "&&:before": { content: '""' },
    },
  },
  services: {
    padding: theme.spacing(1),
  },
}));

const TooltipDiv = (props) => {
  const divRef = React.useRef(null);
  const [allowTooltip, setAllowTooltip] = React.useState(false);
  React.useEffect(() => {
    if (
      !allowTooltip &&
      divRef.current.scrollHeight > divRef.current.offsetHeight
    ) {
      setAllowTooltip(true);
    }
  }, []);
  if (allowTooltip) {
    return (
      <Tooltip title={<Typography>{props.text}</Typography>}>
        <div ref={divRef} className={props.className}>
          {props.text}
        </div>
      </Tooltip>
    );
  }
  return (
    <div ref={divRef} className={props.className}>
      {props.text}
    </div>
  );
};

const Home = () => {
  const classes = useStyles();

  const autoPlay = false;
  const timer = 500;
  const animation = "fade";
  const indicators = true;

  const products = useSelector((state) => state.products);
  const banners = useSelector((state) => state.banners);
  const posts = useSelector((state) => state.posts);

  // const sortedNewProduct = products.items
  //   ? products.items
  //       .slice()
  //       .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
  //   : [];

  // const arraySplitted = splitArray(sortedNewProduct, 4);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // //const dispatch = useDispatch();

  // const targetRef = React.useRef();
  // const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  // // holds the timer for setTimeout and clearInterval
  // let movement_timer = null;

  // // the number of ms the window size must stay the same size before the
  // // dimension state variable is reset
  // const RESET_TIMEOUT = 100;

  // const changeDimension = () => {
  //   // For some reason targetRef.current.getBoundingClientRect was not available
  //   // I found this worked for me, but unfortunately I can't find the
  //   // documentation to explain this experience

  //   if (targetRef.current) {
  //     setDimensions({
  //       width: targetRef.current.offsetWidth,
  //       height: targetRef.current.offsetHeight + 50,
  //     });
  //   }
  // };

  // React.useEffect(() => {
  //   changeDimension();
  // }, []);

  // // every time the window is resized, the timer is cleared and set again
  // // the net effect is the component will only reset after the window size
  // // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
  // // redrawing of the component for more complex components such as charts
  // if (typeof window !== "undefined") {
  //   // it's safe to use window now
  //   window.addEventListener("resize", () => {
  //     clearInterval(movement_timer);
  //     movement_timer = setTimeout(changeDimension, RESET_TIMEOUT);
  //   });
  // }

  return (
    <React.Fragment>
      {/* Head for rich results */}
      <Head>
        <script type="application/ld+json">
          {`{
        "@context": "https://schema.org",
        "@type": "Store",
        "image": [
          "https://lh5.googleusercontent.com/p/AF1QipOyZ-7bJLhzviudOvLYPWErA9gYZZPgW7iOzIK2=w408-h272-k-no",
          "https://upload.wikimedia.org/wikipedia/commons/0/0d/Image002-600x338.jpg"
        ],
        "@id": "https://eshop-nextjs.xremagix.vercel.app",
        "name": "Eshop-NextJS",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Khu pho 6, Thu Đuc",
          "addressLocality": "Ho Chi Minh",
          "addressRegion": "HCM",
          "postalCode": "70000",
          "addressCountry": "VN"
        },
        "review": {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "4",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Remagi"
          }
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.870034,
          "longitude": 106.803797
        },
        "telephone": "+1234",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "9:00",
            "closes": "21:00"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday","Sunday"],
            "opens": "16:00",
            "closes": "23:00"
          } 
        ]
       
      }`}
        </script>
      </Head>

      {/* <Private> */}
      <MainBar />

      <Container maxWidth="lg">
        {/* Simple Carousel */}
        {banners.items !== undefined && (
          <Carousel
            style={{ zIndex: -1 }}
            autoPlay={autoPlay}
            timer={timer}
            animation={animation}
            indicators={indicators}
          >
            {banners.items.map((item, index) => {
              return <Project item={item} key={index} />;
            })}
          </Carousel>
        )}

        {/* About Company */}
        <Typography variant="h3" component="h1" align="center" color="primary">
          Eshop-NextJS
        </Typography>
        <Typography align="center" variant="h6" gutterBottom>
          We will bring you best experience when shopping in our Eshop.
        </Typography>
        <Grid style={{ marginTop: 20 }} container>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.services}
            container
          >
            <Grid item xs={3} alignItems="center" justify="center" container>
              <RestoreIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="primary">
                FREE return
              </Typography>
              <Typography variant="subtitle1">
                We accept return within 7 days.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.services}
            container
          >
            <Grid item xs={3} alignItems="center" justify="center" container>
              <LocalShippingIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="primary">
                FREE shipping
              </Typography>
              <Typography variant="subtitle1">
                Products will be delivered to you within 2-3 days.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.services}
            container
          >
            <Grid item xs={3} alignItems="center" justify="center" container>
              <ContactSupportIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="primary">
                24/7 support
              </Typography>
              <Typography variant="subtitle1">
                Contact us immediately via Facebook or telephone.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className={classes.services}
            container
          >
            <Grid item xs={3} alignItems="center" justify="center" container>
              <RedeemIcon fontSize="large" color="primary" />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h6" color="primary">
                Lots of prizes every month
              </Typography>
              <Typography variant="subtitle1">
                We give you multiple coupon codes and prizes.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Arcticles */}
        <Typography className={classes.sectionTitle} variant="h4">
          Feature Arcticles
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <Container className={classes.arcticlesContainer} maxWidth="lg">
          <Grid className={classes.arcticlesGrid} container direction="row">
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.arcticlesRoot}>
                <CardActionArea>
                  <CardMedia
                    className={classes.arcticlesMedia}
                    image="https://source.unsplash.com/featured/?{recycle},{paper}"
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
                    image="https://source.unsplash.com/featured/?{recycle},{paper}"
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
                    image="https://source.unsplash.com/featured/?{recycle},{paper}"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* New products
        <Typography className={classes.sectionTitle} variant="h4">
          New Products
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <Container className={classes.newProductsContainer} maxWidth="lg">
          <ListItemHorizontal style={{ zIndex: -1 }}>
            {arraySplitted.map((product, index) => {
              return <GridList product={product} key={index} />;
            })}
          </ListItemHorizontal>
        </Container> */}

        {/* Feature Sale Products */}
        <Typography className={classes.sectionTitle} variant="h4">
          Feature Sale Products
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <Container className={classes.arcticlesContainer} maxWidth="lg">
          <Grid className={classes.arcticlesGrid} container direction="row">
            <Grid item xs={12} md={8}>
              <Card className={classes.arcticlesRoot}>
                <CardActionArea>
                  <CardMedia
                    className={classes.arcticlesMedia}
                    image="https://source.unsplash.com/featured/?{recycle},{paper}"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={classes.arcticlesRoot}>
                <CardActionArea>
                  <CardMedia
                    className={classes.arcticlesMedia}
                    image="https://source.unsplash.com/featured/?{recycle},{paper}"
                    title="Contemplative Reptile"
                  />
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>

        {/* Products */}
        <Typography className={classes.sectionTitle} variant="h4">
          Products
          <span className={classes.sectionTitleBar}></span>
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
                {products.items
                  ? products.items.map((product) => (
                      <Grid
                        item
                        key={product.id}
                        className={classes.productCardGrid}
                        xs={12}
                        sm={6}
                        md={4}
                        //innerRef={ref}
                        //ref={ref}
                      >
                        <Card className={classes.card}>
                          <CardActionArea
                            component={Link}
                            naked
                            href={`/products/[slug]?id=${product.id}`}
                            as={`/products/${slugtify(
                              product.productName
                            )}?sku=${product.sku}&&id=${product.id}`}
                          >
                            {product.images.length > 0 ? (
                              <CardMedia
                                style={{ display: "flex", width: "100%" }}
                              >
                                <img
                                  style={{ margin: "0 auto" }}
                                  loading="lazy"
                                  src={
                                    `${backendUrl}/uploads/` +
                                    product.images[0].path
                                  }
                                  alt={product.productName}
                                  height={150}
                                  //width={"100%"}
                                ></img>
                              </CardMedia>
                            ) : null}
                          </CardActionArea>
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              <TooltipDiv
                                text={product.productName}
                                className={classes.productname}
                              />
                            </Typography>
                            {product.discount > 0 ? (
                              <React.Fragment>
                                <Typography variant="h6" color="primary">
                                  {(
                                    (product.price * (100 - product.discount)) /
                                    100
                                  ).toLocaleString()}{" "}
                                  <div
                                    style={{
                                      display: "inline",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    đ
                                  </div>
                                </Typography>
                                <Typography
                                  style={{ textDecoration: "line-through" }}
                                  display="inline"
                                  variant="subtitle1"
                                  color="textSecondary"
                                >
                                  {product.price.toLocaleString()} đ
                                </Typography>
                              </React.Fragment>
                            ) : (
                              <Typography variant="h6" color="primary">
                                {product.price.toLocaleString()}{" "}
                                <div
                                  style={{
                                    display: "inline",
                                    textDecoration: "underline",
                                  }}
                                >
                                  đ
                                </div>
                              </Typography>
                            )}
                          </CardContent>
                          <CardActions className={classes.cardActions}>
                            <Button size="small" color="primary">
                              View
                            </Button>
                            <IconButton
                              color="secondary"
                              aria-label="add-to-cart"
                            >
                              <AddShoppingCartIcon />
                            </IconButton>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  : null}
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

        {/* Posts */}
        <Typography className={classes.sectionTitle} variant="h4">
          Posts
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {posts.items
              ? posts.items.map((post) => (
                  <Grid
                    item
                    key={post.id}
                    className={classes.productCardGrid}
                    xs={12}
                    sm={6}
                    //innerRef={ref}
                    //ref={ref}
                  >
                    <Card className={classes.card}>
                      <CardActionArea
                        component={Link}
                        href="/posts/[id]"
                        as={`/posts/${post.id}`}
                      >
                        {post.images.length > 0 ? (
                          <CardMedia
                            className={classes.cardMedia}
                            image={
                              `${backendUrl}/uploads/` + product.images[0].path
                            }
                            title="Image title"
                          />
                        ) : null}
                        <CardContent className={classes.cardContent}>
                          <Typography variant="h5"> {post.title}</Typography>

                          {/* <Typography>{post.content}</Typography> */}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              : null}
          </Grid>
        </Container>
      </Container>
      {/* </main> */}

      {/* Footer */}
      <Footer />
      {/* </Private> */}
    </React.Fragment>
  );
};

Home.getInitialProps = async (ctx) => {
  var result;

  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;
  if (token) {
    await ctx.store.dispatch(userActions.getMe(token));
    await ctx.store.dispatch(cartActions.getAll(token));
  }

  if (ctx.req) {
    console.log("on server, need to copy cookies from req");
  } else {
    console.log("on client, cookies are automatic");
  }

  await ctx.store.dispatch(bannerActions.getAll());
  await ctx.store.dispatch(postActions.getAll());
  await ctx.store.dispatch(categoryActions.getAll());

  await ctx.store
    .dispatch(productActions.getAll())
    .then(() => (result = ctx.store.getState()));

  return { result };
};

export default Home;
