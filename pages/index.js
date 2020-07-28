import { useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//UI Components
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardActions from "@material-ui/core/CardActions";
import Carousel from "react-material-ui-carousel";
import Tooltip from "@material-ui/core/Tooltip";

//Custom Components
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";

const useStyles = makeStyles((theme) => ({
  carouselRoot: {
    // width: "500px",
    overflow: "hidden",
  },
  project: {
    position: "relative",
    height: "70vh",
    overflow: "hidden",
    padding: "20px",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      height: "50vh",
    },
  },
  newProductGridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    width: "100%",
    padding: theme.spacing(2),

    /* height */
    "&::-webkit-scrollbar": {
      height: "10px",
    },

    /* Track */
    "&::-webkit-scrollbar-track": {
      background: "#F6E3E3",
    },

    /* Handle */
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.light,
      borderRadius: "25px",
      "&:hover": {
        background: theme.palette.primary.dark,
      },
    },
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  cardRoot: {
    margin: theme.spacing(1),
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
    transition: "opacity 0.1s box-shadow 0.3s linear",
    "& .MuiCardActionArea-root": {
      overflow: "hidden",
    },
    "&:hover": {
      boxShadow: "0 0 11px rgba(0, 170, 178,.7)",

      "& .MuiCardMedia-img": {
        transform: "scale(1.25)",
      },

      "& .MuiCardActions-root": {
        opacity: 1,
      },
    },
  },
  cardMedia: {
    // height: 0,
    //paddingTop: "75%", // 4:3
    transition: "transform 0.2s linear",
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  cardAction: {
    padding: 0,
    opacity: 0.5,
    transition: "opacity 0.5s linear",
    display: "flex",
    justifyContent: "center",
  },
  listItem: {
    maxWidth: "20rem",
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.2em",
    maxHeight: "2.4em",
    textAlign: "justify",
    marginRight: "-1em",
    paddingRight: "1em",
    marginBottom: "0.5em",
    "&&:before": {
      content: '"..."',
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
  },
  sectionTitle: {
    textAlign: "center",
    margin: theme.spacing(4),
    fontWeight: "bold",
  },
  sectionTitleBar: {
    width: "100px",
    height: "5px",
    margin: "8px auto 0",
    display: "block",
    backgroundColor: theme.palette.secondary.main,
  },
}));

function Project(props) {
  const classes = useStyles();
  return (
    <Paper
      className={classes.project}
      style={{
        backgroundColor: props.item.color,
      }}
      elevation={10}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

//Function for long product name
const TooltipDiv = (props) => {
  const divRef = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  useEffect(() => {
    if (
      !allowTooltip &&
      divRef.current.scrollHeight > divRef.current.offsetHeight
    ) {
      setAllowTooltip(true);
    }
  }, []);
  if (allowTooltip) {
    return (
      <Tooltip title={props.text}>
        <Typography variant="h5" ref={divRef} className={props.className}>
          {props.text}
        </Typography>
      </Tooltip>
    );
  }
  return (
    <Typography variant="h5" ref={divRef} className={props.className}>
      {props.text}
    </Typography>
  );
};

const carouselItems = [
  {
    name: "Lear Music Reader",
    description: "A PDF Reader specially designed for musicians.",
    color: "#64ACC8",
  },
  {
    name: "Hash Code 2019",
    description:
      "My Solution on the 2019 Hash Code by Google Slideshow problem.",
    color: "#7D85B1",
  },
  {
    name: "Terrio",
    description: "A exciting mobile game game made in the Unity Engine.",
    color: "#CE7E78",
  },
  {
    name: "React Carousel",
    description: "A Generic carousel UI component for React using material ui.",
    color: "#C9A27E",
  },
];

const tileData = [
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image",
    price: 100000000,
    discountPrice: 90000000,
  },
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image",
    price: 10000000,
    discountPrice: 9000000,
  },
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image",
    price: 1000,
    discountPrice: 900,
  },
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image",
    price: 1000,
  },
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image sajdlkajdlka L ajdlsdlka jklasjdlksajdkla jkasdjlsajdl",
    price: 1000,
    discountPrice: 900,
  },
  {
    img: "https://source.unsplash.com/featured/?{japan}",
    name: "Image",
    price: 1000,
    discountPrice: 900,
  },
];

export default function Index() {
  const classes = useStyles();

  const [autoPlay, setAutoPlay] = useState(true);
  const [timer, setTimer] = useState(500);
  const [animation, setAnimation] = useState("fade");
  const [indicators, setIndicators] = useState(true);
  const [timeout, setTimeout] = useState(200);
  const [navButtonsAlwaysVisible, setNavButtonsAlwaysVisible] = useState(false);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  // const toggleAutoPlay = () => {
  //   setAutoPlay((prevAutoPlay) => !prevAutoPlay);
  // };

  // const toggleIndicators = () => {
  //   setIndicators((prevIndicators) => !prevIndicators);
  // };

  // const toggleNavButtonsAlwaysVisible = () => {
  //   setNavButtonsAlwaysVisible(
  //     (prevNavButtonsAlwaysVisible) => !prevNavButtonsAlwaysVisible
  //   );
  // };

  // const changeAnimation = (event) => {
  //   setAnimation(event.target.value);
  // };

  // const changeTimeout = (event, value) => {
  //   setTimeout(value);
  // };

  return (
    <Layout>
      {/* Main Carousel */}
      <div style={{ marginTop: 30, color: "#494949" }}>
        <Carousel
          className={classes.carouselRoot}
          autoPlay={autoPlay}
          timer={timer}
          animation={animation}
          indicators={indicators}
          timeout={timeout}
          navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        >
          {carouselItems.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>

        {/* Carousel Options */}
        {/* <FormLabel component="legend">Options</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleAutoPlay}
                checked={autoPlay}
                value="autoplay"
                color="primary"
              />
            }
            label="Auto-play"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleIndicators}
                checked={indicators}
                value="indicators"
                color="primary"
              />
            }
            label="Indicators"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={toggleNavButtonsAlwaysVisible}
                checked={navButtonsAlwaysVisible}
                value="indicators"
                color="primary"
              />
            }
            label="NavButtonsAlwaysVisible"
          />

          <FormControlLabel
            control={
              <RadioGroup
                name="animation"
                value={animation}
                onChange={(e) => changeAnimation(e)}
                row
                style={{ marginLeft: "10px" }}
              >
                <FormControlLabel
                  value="fade"
                  control={<Radio color="primary" />}
                  label="Fade"
                />
                <FormControlLabel
                  value="slide"
                  control={<Radio color="primary" />}
                  label="Slide"
                />
              </RadioGroup>
            }
          />

          <FormControlLabel
            control={
              <div style={{ width: 300 }}>
                <Typography id="discrete-slider" gutterBottom>
                  Animation Duration (Timeout) in ms
                </Typography>
                <Slider
                  defaultValue={500}
                  getAriaValueText={() => `${timeout}ms`}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={100}
                  marks
                  min={100}
                  max={2000}
                  onChange={(e, value) => changeTimeout(e, value)}
                />
              </div>
            }
          /> */}
      </div>

      {/* New Product List */}
      <Typography className={classes.sectionTitle} variant="h4">
        New Products
        <span className={classes.sectionTitleBar}></span>
      </Typography>
      <div className={classes.newProductGridListRoot}>
        <GridList
          className={classes.gridList}
          cellHeight="auto"
          cols={mobile ? 1.5 : 4}
          spacing={5}
        >
          {tileData.map((tile, index) => (
            <GridListTile key={index}>
              <Card key={index} variant="outlined" className={classes.cardRoot}>
                <CardActionArea
                  component={Link}
                  href="/products/[id]"
                  as={`/products/${1}`}
                >
                  <CardMedia
                    component="img"
                    height={200}
                    className={classes.cardMedia}
                    image={tile.img}
                    title={tile.name}
                  />
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                  {mobile ? (
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      noWrap={true}
                    >
                      {tile.name}
                    </Typography>
                  ) : (
                    <TooltipDiv text={tile.name} className={classes.listItem} />
                  )}

                  {tile.discountPrice ? (
                    <Grid
                      container
                      direction={mobile ? "column" : "row"}
                      spacing={mobile ? 0 : 2}
                    >
                      <Grid item>
                        <Typography variant="h5" color="primary" component="p">
                          {tile.discountPrice.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{ textDecoration: "line-through" }}
                          variant="subtitle1"
                          color="textSecondary"
                          component="p"
                        >
                          {tile.price.toLocaleString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography variant="h6" color="primary" component="p">
                      {tile.price.toLocaleString()}
                    </Typography>
                  )}
                </CardContent>
                <CardActions
                  className={classes.cardAction}
                  justify="center"
                  spacing={2}
                >
                  <Grid item>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton color="primary" aria-label="favorite">
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Grid>
                </CardActions>
              </Card>
            </GridListTile>
          ))}
        </GridList>
      </div>

      {/* Best Seller List*/}
      <Typography className={classes.sectionTitle} variant="h4">
        Best Sellers
        <span className={classes.sectionTitleBar}></span>
      </Typography>
      <Grid container spacing={mobile ? 0 : 2}>
        {tileData.map((tile, index) => (
          <Grid key={index} item xs={6} sm={4} md={3}>
            <Card
              key={index}
              variant="outlined"
              className={mobile ? null : classes.cardRoot}
            >
              <CardActionArea>
                <CardMedia
                  className={classes.cardMedia}
                  component="img"
                  height={200}
                  image={tile.img}
                  title={tile.name}
                />
              </CardActionArea>
              <CardContent className={classes.cardContent}>
                {mobile ? (
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    noWrap={true}
                  >
                    {tile.name}
                  </Typography>
                ) : (
                  <TooltipDiv text={tile.name} className={classes.listItem} />
                )}

                {tile.discountPrice ? (
                  <Grid
                    container
                    direction={mobile ? "column" : "row"}
                    spacing={mobile ? 0 : 2}
                  >
                    <Grid item>
                      <Typography
                        // variant={mobile ? "h6" : "h5"}
                        variant="h6"
                        color="primary"
                        component="p"
                      >
                        {tile.discountPrice.toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        style={{ textDecoration: "line-through" }}
                        variant={mobile ? "subtitle2" : "subtitle1"}
                        color="textSecondary"
                        component="p"
                      >
                        {tile.price.toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography
                    variant={mobile ? "h6" : "h5"}
                    color="primary"
                    component="p"
                  >
                    {tile.price.toLocaleString()}
                  </Typography>
                )}
              </CardContent>

              <CardActions
                className={classes.cardAction}
                justify="center"
                spacing={2}
              >
                <Grid item>
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton color="primary" aria-label="favorite">
                    <FavoriteBorderIcon />
                  </IconButton>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
