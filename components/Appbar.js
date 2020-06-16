import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Hidden from "@material-ui/core/Hidden";
import Popover from "@material-ui/core/Popover";
import clsx from "clsx";
import ButtonBase from "@material-ui/core/ButtonBase";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { fade, makeStyles } from "@material-ui/core/styles";
import Link from "../src/Link";
import { useDispatch, useSelector } from "react-redux";
import {
  userActions,
  productActions,
  bannerActions,
  categoryActions,
} from "../actions";
import { useEffect } from "react";
import { cartService } from "../services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    zIndex: 5,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: theme.palette.common.white,
    "&:hover": {
      textDecoration: "none",
    },
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  menuListItem: {
    width: "150px",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    pointerEvents: "auto",
  },
  cartRoot: {
    flexGrow: 1,
  },
  cartPaper: {
    // padding: theme.spacing(2),
    // margin: "auto",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    maxHeight: "200px",
    overflow: "auto",
  },
  cartImage: {
    width: 64,
    height: 64,
  },
  cartImg: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Mainbar(props) {
  const classes = useStyles();

  const [openCartPopover, setOpenCartPopover] = React.useState(false);

  const popoverAnchor = React.useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openBrands, setOpenBrands] = React.useState(false);

  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);

  const [productsInCart, setProductsInCart] = React.useState([]);

  useEffect(() => {
    console.log(cart.items.products);
    setProductsInCart(
      cart.items.products !== undefined &&
        cart.items.products !== null &&
        products.items
        ? cart.items.products.map((element) =>
            Object.assign(
              products.items.find((product) => product.id === element.product),
              { amount: element.amount }
            )
          )
        : []
    );
  }, [cart.items, products.items]);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.logout());
  };

  const handlePopoverOpen = ({ currentTarget }) => {
    setOpenCartPopover(true);
  };

  const handlePopoverClose = ({ currentTarget }) => {
    setOpenCartPopover(false);
  };

  const handleCategoriesClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenCategories(true);
  };

  const handleBrandsClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenBrands(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenCategories(false);
    setOpenBrands(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Hidden mdUp>
              {/* Menu icon */}
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Box style={{ marginRight: "50px" }}>
              <Typography
                className={clsx(classes.title, classes.link)}
                component={Link}
                href="/"
                as={`/`}
                variant="h6"
                noWrap
              >
                Material-UI
              </Typography>
            </Box>

            <Hidden smDown>
              <Grid container spacing={5}>
                {/* Home button */}
                <Grid item>
                  <Button component={Link} href="/" as={`/`}>
                    Home
                  </Button>
                </Grid>

                {/* Categories menu */}
                <Grid item>
                  <div>
                    <Button
                      aria-owns={openCategories ? "category-menu" : null}
                      aria-haspopup="true"
                      onClick={(e) => handleCategoriesClick(e)}
                      onMouseOver={(e) => handleCategoriesClick(e)}
                    >
                      Categories
                    </Button>
                    <Menu
                      id="category-menu"
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      open={openCategories}
                      onClose={() => handleClose()}
                      MenuListProps={{ onMouseLeave: handleClose }}
                    >
                      {categories.items.map((category) => (
                        <MenuItem
                          className={classes.menuListItem}
                          key={category.id}
                          onClick={() => handleClose()}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </Grid>

                {/* Brands menu */}
                <Grid item>
                  <div>
                    <Button
                      aria-owns={openBrands ? "brand-menu" : null}
                      aria-haspopup="true"
                      onClick={(e) => handleBrandsClick(e)}
                      onMouseOver={(e) => handleBrandsClick(e)}
                    >
                      Brands
                    </Button>
                    <Menu
                      id="brand-menu"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      anchorEl={anchorEl}
                      getContentAnchorEl={null}
                      open={openBrands}
                      onClose={() => handleClose()}
                      MenuListProps={{ onMouseLeave: handleClose }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                    >
                      {brands.items.map((brand) => (
                        <MenuItem
                          className={classes.menuListItem}
                          key={brand.id}
                          onClick={() => handleClose()}
                        >
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                </Grid>
              </Grid>
            </Hidden>

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              spacing={4}
            >
              {/* Search bar */}
              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>

              {/* User space */}
              {/* Cart Button */}
              <Grid item>
                <IconButton
                  ref={popoverAnchor}
                  aria-label="cart"
                  aria-owns={openCartPopover ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Badge
                    badgeContent={
                      productsInCart
                        ? productsInCart
                            .map((e) => e.amount)
                            .reduce((sum, current) => sum + current, 0)
                        : null
                    }
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={openCartPopover}
                  anchorEl={popoverAnchor.current}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    onMouseEnter: handlePopoverOpen,
                    onMouseLeave: handlePopoverClose,
                  }}
                  onClose={handlePopoverClose}
                  disableRestoreFocus
                >
                  {/* <div className={classes.cartRoot}> */}
                  <Typography variant="h6">Cart detail: </Typography>
                  {productsInCart && productsInCart.length > 0 ? (
                    <React.Fragment>
                      <div className={classes.cartPaper}>
                        {productsInCart.map((element, index) => (
                          <Grid
                            key={index}
                            container
                            style={{ marginBottom: 10 }}
                          >
                            <Grid item style={{ paddingRight: 10 }}>
                              <ButtonBase
                                className={classes.cartImage}
                                component={Link}
                                href="/products/[id]"
                                as={`/products/${element.id}`}
                              >
                                <img
                                  src={
                                    "http://localhost:5000/uploads/" +
                                    element.images[0].path
                                  }
                                  alt={element.productName}
                                  className={classes.cartImg}
                                  alt="complex"
                                />
                              </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                              <Grid
                                item
                                container
                                direction="column"
                                justify="center"
                                //alignItems="center"
                              >
                                <Grid item xs={12}>
                                  <Typography
                                    gutterBottom
                                    variant="body1"
                                    component={Link}
                                    href="/products/[id]"
                                    as={`/products/${element.id}`}
                                  >
                                    {element.productName}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="subtitle1">
                                  ${element.price}
                                </Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Typography variant="caption">
                                  Quantity: {element.amount}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Button>Delete</Button>
                        </Grid>
                        <Grid item>
                          <Button
                            className={classes.link}
                            variant="contained"
                            color="primary"
                            component={Link}
                            href="/cart"
                          >
                            View Cart
                          </Button>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ) : (
                    "There's nothing in cart"
                  )}
                </Popover>
              </Grid>

              {/* Account Button */}
              <Grid item>
                <IconButton aria-label="acount-icon" onClick={() => logout()}>
                  <AccountCircleIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}
