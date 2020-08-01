import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

//UI Components
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Alert from "@material-ui/lab/Alert";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

//Social
import {
  FacebookIcon,
  FacebookMessengerIcon,
  ViberIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  ViberShareButton,
} from "react-share";

//Custom component
import Head from "next/head";
import Layout from "../../src/components/Layout";
import Link from "../../src/components/Link";
import ImageZoom from "../../src/components/ZoomImage";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../../src/store";
import {
  productActions,
  categoryActions,
  brandActions,
  cartActions,
  checkServerSideCookie,
} from "../../src/actions";

//Text Editor
import dynamic from "next/dynamic"; // (if using Next.js or use own dynamic loader)
import { convertFromRaw, Editor, EditorState } from "draft-js";

import Divider from "@material-ui/core/Divider";

const SuperEditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const useStyles = makeStyles((theme) => ({
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  tabRoot: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  smallImg: {
    opacity: 0.5,
    width: 64,
    height: 64,
    padding: theme.spacing(1) / 2,
    border: "1px solid #000",
    borderRadius: 10,
    "&:hover": {
      opacity: 1,
    },
  },
  youtubeEmbed: {
    height: "50vh",
  },
  modalYT: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperYT: {
    width: "50vw",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  productInfoSection: {
    background: theme.palette.secondary.light,
    color: "white",
  },
}));

//Function for tab panel
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

//Function for snackbar
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

//Change embed url
function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "error";
  }
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

const Product = () => {
  const classes = useStyles();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.item);
  const category = useSelector((state) => state.categories.items);
  const brand = useSelector((state) => state.brands.items);
  const users = useSelector((state) => state.users);

  let rows;
  product && brand && category
    ? (rows = [
        createInfoData("General"),
        createInfoData(
          "Brand",
          brand.find((element) => element.id === product.brand).name ||
            product.brand
        ),
        createInfoData(
          "Category",
          category.find((element) => element.id === product.category).name ||
            product.category
        ),
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

  const [value, setValue] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [favorite, setFavorite] = React.useState(false);

  const [openFavoriteSnackbar, setOpenFavoriteSnackbar] = React.useState(false);
  const [
    transitionFavoriteSnackbar,
    setTransitionFavoriteSnackbar,
  ] = React.useState(undefined);

  const [openYTModal, setOpenYTModal] = React.useState(false);

  const [editorState, setEditorState] = React.useState(
    product.content
      ? EditorState.createWithContent(
          convertFromRaw(JSON.parse(product.content))
        )
      : EditorState.createEmpty()
  );

  const handleOpenYTModal = () => {
    setOpenYTModal(true);
  };

  const handleCloseYTModal = () => {
    setOpenYTModal(false);
  };

  const onClose = () => {
    setIsActive(false);
  };

  const onZoom = () => {
    setIsActive(true);
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setValue(index);
  };

  const handleOpenFavoriteSnackbar = (Transition) => () => {
    setFavorite(!favorite);
    setTransitionFavoriteSnackbar(() => Transition);
    setOpenFavoriteSnackbar(true);
  };

  const handleCloseFavoriteSnackbar = () => {
    setOpenFavoriteSnackbar(false);
  };

  const handleAddToCart = (event) => {
    if (users.token) dispatch(cartActions.addItem(product.id, users.token));
    else null;
  };

  return (
    <React.Fragment>
      {/* Head */}
      <Head></Head>

      <Layout>
        {/* Snackbars */}
        <Snackbar
          autoHideDuration={1000}
          open={openFavoriteSnackbar}
          onClose={handleCloseFavoriteSnackbar}
          TransitionComponent={transitionFavoriteSnackbar}
          key={
            transitionFavoriteSnackbar ? transitionFavoriteSnackbar.name : ""
          }
        >
          <Alert
            style={{ backgroundColor: "white" }}
            variant="outlined"
            icon={false}
            severity="error"
          >
            {favorite ? "Add to Favorite list" : "Removed from Favorite list"}
          </Alert>
        </Snackbar>

        {/* Breadcrumbs */}
        <Breadcrumbs className={classes.marginY} aria-label="breadcrumb">
          <Link color="inherit" href="/" as={"/"}>
            Home
          </Link>
          <Link
            color="inherit"
            href="/brands/[id]"
            as={`/brands/${product.brand}`}
          >
            {brand.find((element) => element.id === product.brand).name ||
              product.brand}
          </Link>
          <Link
            color="inherit"
            href="/categories/[id]"
            as={`/categories/${product.category}`}
          >
            {category.find((element) => element.id === product.category).name ||
              product.category}
          </Link>
          <Typography color="primary">{product.productName}</Typography>
        </Breadcrumbs>

        {/* Grid for pictures and main info  */}
        <Grid container className={classes.marginY}>
          {/* Pictures */}
          <Grid
            style={{ position: "relative", zIndex: 10 }}
            item
            xs={12}
            md={6}
          >
            <Grid container spacing={2}>
              {/* Side Picture */}
              <Hidden mdDown>
                <Grid
                  item
                  md={2}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <IconButton
                      className={classes.smallImg}
                      aria-label="youtube-modal-btn"
                      onClick={handleOpenYTModal}
                    >
                      <SubscriptionsIcon />
                    </IconButton>
                  </Grid>
                  {product.images.map((image, index) => (
                    <Grid key={index} item>
                      <img
                        className={classes.smallImg}
                        src={`https://nextjs-eshop-backend.herokuapp.com/uploads/${image.path}`}
                        alt="No Data"
                      ></img>
                    </Grid>
                  ))}
                </Grid>
              </Hidden>

              {/* Main Pictures */}
              <Grid
                item
                xs={12}
                md={10}
                container
                justify="center"
                className={classes.zoom}
              >
                <ImageZoom
                  isActive={isActive}
                  imageURL={`https://nextjs-eshop-backend.herokuapp.com/uploads/${product.images[0].path}`}
                  onZoom={onZoom}
                  onClose={onClose}
                  zoomType={mobile ? "click" : "hover"}
                  imageSize={
                    mobile
                      ? { width: "50%", height: "50%" }
                      : { width: 400, height: 400 }
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Product Quick Info and Actions */}
          <Grid item md={6} container spacing={4} direction="column">
            {/* Quick Info */}
            <Grid item>
              <Typography
                variant="h5"
                component="h1"
                //   style={{ wordWrap: "break-word" }}
              >
                {product.productName}
              </Typography>

              {product.discountPrice ? (
                <Grid
                  container
                  className={classes.marginY}
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Typography display="inline" variant="h4" color="primary">
                      <Box display="inline" fontWeight={700} m={1}>
                        {product.discountPrice.toLocaleString()}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      display="inline"
                      variant="h6"
                      color="textSecondary"
                      style={{ textDecoration: "line-through" }}
                    >
                      {product.price.toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="h4" color="primary" gutterBottom>
                  <Box fontWeight={700} m={1}>
                    {product.price.toLocaleString()}
                  </Box>
                </Typography>
              )}

              <Typography variant="body1">SKU: {product.sku}</Typography>
              <Typography variant="body1">
                Category:{" "}
                <Link
                  href="/categories/[id]"
                  as={`/categories/${product.category}`}
                >
                  {category.find((element) => element.id === product.category)
                    .name || product.category}
                </Link>
              </Typography>
              <Typography variant="body1">
                Brand:{" "}
                <Link href="/brands/[id]" as={`/brands/${product.brand}`}>
                  {brand.find((element) => element.id === product.brand).name ||
                    product.brand}
                </Link>
              </Typography>
            </Grid>

            {/* Actions */}
            <Grid item container alignItems="center" spacing={2}>
              <Grid item>
                {users.token ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddToCart}
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Tooltip
                    title={
                      <Typography variant="subtitle1">
                        Please login to continue :(
                      </Typography>
                    }
                    aria-label="cart-no-login"
                    placement="top"
                  >
                    <span>
                      <Button
                        disabled
                        variant="contained"
                        color="secondary"
                        startIcon={<AddShoppingCartIcon />}
                      >
                        Add to cart
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                <IconButton
                  onClick={handleOpenFavoriteSnackbar(TransitionUp)}
                  color="primary"
                  aria-label="favorite"
                >
                  {favorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                </IconButton>
              </Grid>
            </Grid>

            {/* Social media share */}
            <Grid item container alignItems="center" spacing={2}>
              <Typography variant="h6">Share on:</Typography>

              <Grid item>
                <FacebookShareButton
                  url={"https://hangxachtaytunhat.com/"}
                  quote={"Hoang Quan"}
                  style={{ cursor: "pointer" }}
                >
                  <FacebookIcon size={32} borderRadius={10} />
                </FacebookShareButton>
              </Grid>
              <Grid item>
                <FacebookMessengerShareButton
                  url={"https://hangxachtaytunhat.com/"}
                  quote={"Hoang Quan"}
                  style={{ cursor: "pointer" }}
                >
                  <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
              </Grid>
              <Grid item>
                <ViberShareButton
                  url={"https://hangxachtaytunhat.com/"}
                  quote={"Hoang Quan"}
                  style={{ cursor: "pointer" }}
                >
                  <ViberIcon size={32} round />
                </ViberShareButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Product Info Tab Panel */}
        <div className={classes.tabRoot}>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered
              aria-label="full width tabs example"
            >
              <Tab label="Information" {...a11yProps(0)} />
              <Tab label="Detail" {...a11yProps(1)} />
              <Tab label="Reviews" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleTabChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <SuperEditor readOnly toolbarHidden editorState={editorState} />
            </TabPanel>

            {/* Information Table */}
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

        {/* Modal Youtube */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modalYT}
          open={openYTModal}
          onClose={handleCloseYTModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openYTModal}>
            <div className={classes.paperYT}>
              <CardMedia
                className={classes.youtubeEmbed}
                component="iframe"
                alt="Contemplative Reptile"
                src={`https://www.youtube.com/embed/${getId(
                  "https://www.youtube.com/watch?v=hs1HoLs4SD0"
                )}`}
              />
            </div>
          </Fade>
        </Modal>
      </Layout>
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  checkServerSideCookie(ctx, reduxStore);

  await dispatch(cartActions.getAll(reduxStore.getState().users.token));
  await dispatch(productActions.getAll());
  await dispatch(productActions.getById(ctx.query.id));
  await dispatch(categoryActions.getAll());
  await dispatch(brandActions.getAll());

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      title: reduxStore.getState().products.item.productName,
    },
  };
}

export default Product;
