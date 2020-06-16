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
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Divider from "@material-ui/core/Divider";
import Pagination from "@material-ui/lab/Pagination";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PageviewIcon from "@material-ui/icons/Pageview";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

import { useDispatch, useSelector } from "react-redux";

import Link from "../../src/Link";
import Footer from "../../components/Footer";
import { productActions, bannerActions, cartActions } from "../../actions";
import { checkServerSideCookie } from "../../actions/user.actions";
import MainBar from "../../components/Appbar";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    paddingLeft: theme.spacing(1),
    borderLeftStyle: "solid",
    borderColor: theme.palette.primary.main,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  filterPaper: {
    padding: theme.spacing(1),
  },
  listLink: {
    color: theme.palette.text.primary,
    paddingLeft: theme.spacing(3),
    transition: "padding-left 0.5s",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      paddingLeft: theme.spacing(1),
    },
  },
  cardRoot: {
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: ` 2px 3px 10px ${theme.palette.secondary.main}`,
    },
  },
  iconBtn: {
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quickViewPaper: { width: "80%", padding: theme.spacing(1) },
  addBtn: {
    "&:hover": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const sortOptions = [
  { title: "Newest Items", value: "-createAt" },
  { title: "Price Increase", value: "price" },
  { title: "Price Decrease", value: "-price" },
  { title: "Name A -> Z", value: "name" },
  { title: "Name Z -> A", value: "-name" },
];

function ListItemLink(props) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.listLink} component={Link} {...props} />
  );
}

const Products = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);

  const [openFilterCollapse, setOpenFilterCollapse] = React.useState(false);
  const [priceValue, setPriceValue] = React.useState([0, 100]);
  const [productQV, setProductQV] = React.useState();
  const [openQuickView, setOpenQuickView] = React.useState(false);

  const handleOpenQuickView = (productId) => {
    setOpenQuickView(true);
    setProductQV(products.items.find((x) => x._id === productId));
  };

  const handleCloseQuickView = () => {
    setOpenQuickView(false);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceValue(newValue);
  };

  const handleFilterClick = () => {
    setOpenFilterCollapse(!openFilterCollapse);
  };

  const handleAddToCart = (productId) => {
    dispatch(cartActions.addItem(productId, users.token));
  };

  return (
    <React.Fragment>
      {/* AppBar */}
      <MainBar />

      {/* Main */}
      <Container style={{ marginTop: "64px" }} maxWidth="lg">
        <Typography variant="h3">Products</Typography>
        {/* Search, sort bar */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <Paper>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item sm={1} md={2}>
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={11} sm={11} md={10}>
                    <TextField fullWidth label="Search" />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Paper>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={sortOptions}
                    value={sortOptions[0]}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sort by"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
                <Grid item sm={3}>
                  Showing: 1-9 of {products.items ? products.items.length : 0}{" "}
                  products
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Filter, main product grid */}
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <ListItem button onClick={handleFilterClick}>
              <ListItemText
                primary="Filters"
                secondary="Categories,brands,..."
              />
              {openFilterCollapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              className={classes.marginY}
              in={openFilterCollapse}
              timeout="auto"
              unmountOnExit
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Paper className={classes.filterPaper} elevation={2}>
                    <Typography className={classes.title} variant="h6">
                      Categories
                    </Typography>
                    {categories.items
                      ? categories.items.map((category, index) => (
                          <ListItemLink
                            key={category._id}
                            href="/categories/[id]"
                            as={`/categories/${category._id}`}
                          >
                            <ListItemText
                              key={index}
                              primary={`${category.name}`}
                            />
                          </ListItemLink>
                        ))
                      : null}
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.filterPaper} elevation={2}>
                    <Typography className={classes.title} variant="h6">
                      Brands
                    </Typography>
                    {brands.items
                      ? brands.items.map((brand, index) => (
                          <ListItemLink
                            key={index}
                            href="/brands/[id]"
                            as={`/brands/${brand._id}`}
                          >
                            <ListItemText primary={`${brand.name}`} />
                          </ListItemLink>
                        ))
                      : null}
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper className={classes.filterPaper} elevation={2}>
                    <Typography
                      className={classes.title}
                      variant="h6"
                      gutterBottom
                    >
                      Price
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Your range:
                      <em style={{ paddingLeft: "3em" }}>
                        ${priceValue[0]} - ${priceValue[1]}
                      </em>
                    </Typography>
                    <Slider
                      value={priceValue}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      //getAriaValueText={valuetext}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Grid container spacing={4}>
              {products.items
                ? products.items.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Card className={classes.cardRoot}>
                        <CardActionArea
                          component={Link}
                          href="/products/[id]"
                          as={`/products/${product._id}`}
                        >
                          <CardMedia
                            component="img"
                            width={"100%"}
                            image={
                              "http://localhost:5000/uploads/" +
                              product.images[0].path
                            }
                            title={product.productName}
                          />
                        </CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {product.productName}
                          </Typography>

                          {product.discount > 0 ? (
                            <Grid container alignItems="center" spacing={3}>
                              <Grid item>
                                <Typography variant="h6" color="primary">
                                  $
                                  {(product.price * (100 - product.discount)) /
                                    100}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <Typography
                                  style={{ textDecoration: "line-through" }}
                                  variant="body1"
                                  color="textSecondary"
                                >
                                  ${product.price}
                                </Typography>
                              </Grid>
                            </Grid>
                          ) : (
                            <Typography color="primary">
                              ${product.price}
                            </Typography>
                          )}
                        </CardContent>

                        <CardActions>
                          <Grid container justify="center" spacing={2}>
                            <Grid item>
                              <Tooltip title="Favorite" aria-label="favorite">
                                <IconButton
                                  className={classes.iconBtn}
                                  size="small"
                                >
                                  <FavoriteIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip
                                title="Quick view"
                                aria-label="quick-view"
                                onClick={() => handleOpenQuickView(product._id)}
                              >
                                <IconButton
                                  className={classes.iconBtn}
                                  size="small"
                                >
                                  <PageviewIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              <Tooltip
                                title="Add to cart"
                                aria-label="add-to-cart"
                              >
                                <IconButton
                                  className={classes.iconBtn}
                                  size="small"
                                >
                                  <AddShoppingCartIcon />
                                </IconButton>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))
                : null}
            </Grid>
            <Grid className={classes.marginY} container justify="center">
              <Grid item>
                <Pagination count={10} variant="outlined" color="secondary" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Modal
        open={openQuickView}
        onClose={handleCloseQuickView}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openQuickView}>
          <Paper className={classes.quickViewPaper}>
            {productQV ? (
              <Grid container>
                <Grid item xs={4}>
                  <img
                    width={"100%"}
                    src={
                      "http://localhost:5000/uploads/" +
                      productQV.images[0].path
                    }
                    alt={productQV.productName}
                  ></img>
                </Grid>
                <Grid
                  item
                  style={{ marginLeft: 5 }}
                  xs={8}
                  container
                  direction="column"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="h4">
                      {productQV.productName}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item>
                    {productQV.discount > 0 ? (
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item>
                          <Typography variant="h5" color="primary">
                            $
                            {(productQV.price * (100 - productQV.discount)) /
                              100}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            style={{ textDecoration: "line-through" }}
                            variant="body1"
                            color="textSecondary"
                          >
                            ${productQV.price}
                          </Typography>
                        </Grid>
                      </Grid>
                    ) : (
                      <Typography variant="h5" color="primary">
                        ${productQV.price}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item container alignItems="center" spacing={5}>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        className={classes.addBtn}
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddToCart(productQV._id)}
                      >
                        Add to cart
                      </Button>
                    </Grid>
                    <Grid item>
                      <Link
                        href="/products/[id]"
                        as={`/products/${productQV._id}`}
                      >
                        See all features
                      </Link>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item>
                    <Typography variant="body1">
                      {productQV.description}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Divider />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">Share this product</Typography>
                    <Grid className={classes.social} container spacing={2}>
                      <Grid item>
                        <IconButton
                          aria-label="facebook"
                          className={classes.iconBtn}
                        >
                          <FacebookIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="twitter"
                          className={classes.iconBtn}
                        >
                          <TwitterIcon />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="instagram"
                          className={classes.iconBtn}
                        >
                          <InstagramIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : null}
          </Paper>
        </Fade>
      </Modal>

      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
};

Products.getInitialProps = async (ctx) => {
  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;

  if (ctx.req) {
    console.log("on server, need to copy cookies from req");
  } else {
    console.log("on client, cookies are automatic");
  }

  await ctx.store.dispatch(bannerActions.getAll());
  await ctx.store.dispatch(cartActions.getAll(token));
  await ctx.store.dispatch(productActions.getAll());
};

export default Products;
