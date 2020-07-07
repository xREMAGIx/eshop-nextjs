import { productActions } from "../../actions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import SwipeableViews from "react-swipeable-views";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import { checkServerSideCookie } from "../../actions/user.actions";
import MainBar from "../../components/Appbar";
import { cartActions, userActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import backendUrl from "../../src/backendUrl";
import Router from "next/router";
import Head from "next/head";
import slugify from "../../src/slugtify";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  boxMargin: {
    margin: "20px 0 20px 0",
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    background: theme.palette.grey[200],
    width: "100%",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  tabRoot: {
    marginTop: "100px",
    backgroundColor: theme.palette.background.paper,
    //width: 500,
    "& .MuiPaper-elevation4": {
      boxShadow: "none",
      backgroundColor: "#fff",
    },
  },
  sectionTitleBar: {
    width: "150px",
    height: "5px",
    margin: "8px 0",
    display: "block",
    backgroundColor: theme.palette.secondary.dark,
  },
  card: {
    margin: "30px 0 30px 0",
  },
  imgGrid: {
    opacity: 0.6,
    "&:hover": {
      opacity: 0.9,
    },
  },
  activeImg: {
    opacity: 1,
  },
  productInfoSection: {
    background: theme.palette.secondary.light,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function createInfoData(name, detail) {
  if (detail) return { name, detail };
  else
    return {
      name: (
        <Typography style={{ fontWeight: "bolder" }} variant="subtitle1">
          {name}
        </Typography>
      ),
    };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Product = () => {
  const classes = useStyles();
  const theme = useTheme();

  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const users = useSelector((state) => state.users);

  const product = products.item;
  var category;
  var brand;
  if (product) {
    category =
      categories.items.find((element) => element.id === product.category) ||
      null;
    brand =
      brands.items.find((element) => element.id === product.brand) || null;
  }

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const [imageMain, setImageMain] = React.useState(
    product && product.images.length > 0
      ? { path: `${backendUrl}/uploads/` + product.images[0].path, index: 0 }
      : null
  );

  var rows;
  product && brand && category
    ? (rows = [
        createInfoData("General"),
        createInfoData("Brand", brand.name),
        createInfoData("Category", category.name),
        createInfoData("Configurations"),
        createInfoData("CPU", product.cpu),
        createInfoData("GPU", product.gpu),
        createInfoData("OS", product.os),
        createInfoData("RAM", product.ram),
        createInfoData("Storage", product.storage),
        createInfoData("New Features", product.newFeature),
        createInfoData("Display"),
        createInfoData("Display", product.display),
        createInfoData("Display Resolution", product.displayResolution),
        createInfoData("Display Screen", product.displayScreen),
        createInfoData("Camera"),
        createInfoData("Camera", product.camera),
        createInfoData("Video", product.video),
        createInfoData("Connectivity"),
        createInfoData("Wifi", product.wifi),
        createInfoData("Bluetooth", product.bluetooth),
        createInfoData("Ports", product.ports),
        createInfoData("Physical details"),
        createInfoData("Size", product.size),
        createInfoData("Weight", product.weight),
        createInfoData("Material", product.material),
        createInfoData("Battery Capacity", product.batteryCapacity),
      ])
    : (rows = []);

  const handleImageChange = (index) => {
    setImageMain({
      path: `${backendUrl}/uploads/` + product.images[index].path,
      index: index,
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleAddToCart = (event) => {
    if (users.token) dispatch(cartActions.addItem(product.id, users.token));
    else Router.push(`/login`);
  };

  return (
    <React.Fragment>
      {/* <Private> */}
      <MainBar />

      {product ? (
        <Container style={{ marginTop: "100px" }} maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              {product.images.length > 0 ? (
                <React.Fragment>
                  <CardMedia
                    className={classes.cardMedia}
                    image={imageMain.path}
                    title={product.productName}
                  />
                  <div className={classes.gridRoot}>
                    <GridList
                      className={classes.gridList}
                      cellHeight={100}
                      cols={4.5}
                    >
                      {product.images.map((tile, index) => (
                        <GridListTile
                          className={clsx(classes.imgGrid, {
                            [classes.activeImg]: index === imageMain.index,
                          })}
                          key={tile._id}
                        >
                          <img
                            src={`${backendUrl}/uploads/` + tile.path}
                            alt={tile.path}
                            onClick={() => handleImageChange(index)}
                          />
                        </GridListTile>
                      ))}
                    </GridList>
                  </div>
                </React.Fragment>
              ) : (
                <Typography>No data</Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h1" variant="h3" gutterBottom>
                {product.productName}
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <Box
                  fontWeight="fontWeightBold"
                  m={1}
                  className={classes.boxMargin}
                >
                  SKU: {product.sku}
                </Box>
              </Typography>

              <Divider />
              {product.discount > 0 ? (
                <Typography variant="h5" gutterBottom>
                  <Box fontWeight={500} m={1} className={classes.boxMargin}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          display="inline"
                          variant="h4"
                          color="primary"
                        >
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
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Typography
                          style={{ textDecoration: "line-through" }}
                          display="inline"
                          variant="h6"
                          color="textSecondary"
                        >
                          {product.price.toLocaleString()} đ
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Typography>
              ) : (
                <Typography variant="h5" gutterBottom>
                  <Box fontWeight={500} m={1} className={classes.boxMargin}>
                    $ {product.price.toLocaleString()}
                  </Box>
                </Typography>
              )}
              <Divider />
              <Button
                style={{ marginTop: "50px" }}
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            </Grid>
          </Grid>

          <div className={classes.tabRoot}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="full width tabs example"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Information" {...a11yProps(1)} />
                <Tab label="Reviews" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
                <Typography variant="body1" component="span">
                  Description: {product.description}
                </Typography>
                <Typography variant="body1" component="span">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majo Rity have be suffered alteration in
                  some form, by injected humou or randomis Rity have be suffered
                  alteration in some form, by injected humou or randomis words
                  which donot look even slightly believable. If you are going to
                  use a passage Lorem Ipsum. rerum blanditiis dolore dignissimos
                  expedita consequatur deleniti consectetur non exercitationem.
                  rerum blanditiis dolore dignissimos expedita consequatur
                  deleniti consectetur non exercitationem.
                </Typography>
              </TabPanel>

              {/* Information Panel */}
              <TabPanel value={value} index={1} dir={theme.direction}>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          {row.detail ? (
                            <React.Fragment>
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="left">{row.detail}</TableCell>
                            </React.Fragment>
                          ) : (
                            <TableCell
                              className={classes.productInfoSection}
                              colSpan={2}
                              component="th"
                              scope="row"
                            >
                              {row.name}
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </div>

          <Typography className={classes.sectionTitle} variant="h5">
            Relate Products
            <span className={classes.sectionTitleBar}></span>
          </Typography>

          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={classes.card}>
                {product.images.length > 0 ? (
                  <CardMedia
                    className={classes.cardMedia}
                    image={`${backendUrl}/uploads/` + product.images[0].path}
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
          </Grid>
        </Container>
      ) : (
        <Typography>Something is not right!!</Typography>
      )}

      {/* </Private> */}
    </React.Fragment>
  );
};

Product.getInitialProps = async (ctx) => {
  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;
  if (token) await ctx.store.dispatch(userActions.getMe(token));
  await ctx.store.dispatch(productActions.getById(ctx.query.id));

  var result = {
    title: ctx.store.getState().products.item.productName,
    description: ctx.store.getState().products.item.description,
    canonical: slugify(ctx.store.getState().products.item.productName),
  };

  return { result };
};

export default Product;
