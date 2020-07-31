import clsx from "clsx";

//UI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Slide from "@material-ui/core/Slide";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import AlertTitle from "@material-ui/lab/AlertTitle";

//Custom Components
import MainListItems from "./ListItemDrawer";
import Link from "./Link";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { productActions, userActions } from "../actions";
import { useEffect } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-block",
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
    width: "6ch",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  popover: {
    pointerEvents: "none",
  },
  popoverPaper: {
    padding: theme.spacing(1),
    pointerEvents: "auto",
    minWidth: 150,
  },
  linkBtn: {
    color: theme.palette.primary.contrastText,
    "&:hover": {
      textDecoration: "none",
    },
  },
  //Login JSS
  modalLogin: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperLogin: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginTop: theme.spacing(8),
    display: "flex",
    maxWidth: "30%",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {},
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menuLinkList: {
    padding: theme.spacing(1),
    transition: "padding-left 0.2s linear",
    "&:hover": {
      paddingLeft: theme.spacing(3),
      textDecoration: "none",
    },
  },
}));

function HoverPopover(props) {
  const classes = useStyles();

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.popoverPaper,
      }}
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{
        onMouseEnter: props.handlePopoverOpen,
        onMouseLeave: props.handlePopoverClose,
      }}
      onClose={props.handlePopoverClose}
      disableRestoreFocus
    >
      {props.children}
    </Popover>
  );
}

export default function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const cart = useSelector((state) => state.cart);

  const [open, setOpen] = React.useState(false);

  const cartPopoverAnchor = React.useRef(null);
  const categoryPopoverAnchor = React.useRef(null);
  const brandPopoverAnchor = React.useRef(null);

  const [openPopover, setOpenPopover] = React.useState({
    cart: false,
    category: false,
    brand: false,
  });

  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const [openSignupModal, setOpenSignupModal] = React.useState(false);

  const [searchString, setSearchString] = React.useState("");

  let searchLink;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = ({ currentTarget }) => {
    setOpenPopover({
      ...openPopover,
      [currentTarget.getAttribute("aria-label")]: true,
    });
  };

  const handlePopoverClose = () => {
    setOpenPopover({
      cart: false,
      category: false,
      brand: false,
    });
  };

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
    setOpenSignupModal(false);
  };

  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  const handleOpenSignupModal = () => {
    setOpenSignupModal(true);
    setOpenLoginModal(false);
  };

  const handleCloseSignupModal = () => {
    setOpenSignupModal(false);
  };

  const handleChangeSearchString = (e) => {
    setSearchString(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      searchLink.click();
    }
  };

  const [anchorElMenuAccount, setAnchorElMenuAccount] = React.useState(null);

  const handleMenuAccountClick = (event) => {
    setAnchorElMenuAccount(event.currentTarget);
  };

  const handleMenuAccountClose = () => {
    setAnchorElMenuAccount(null);
  };

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  //Login Modal

  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const onChangeLogin = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const keyPressed = (e, number) => {
    if (e.key === "Enter") {
      number == 1 ? onLogin(e) : onRegister(e);
    }
  };

  const onLogin = () => {
    if (loginFormData.email === "" || loginFormData.password === "") {
      setErrorOpen(true);
      setErrorMessage("Please fill out all required field");
    } else {
      dispatch(userActions.login(loginFormData));
    }
  };

  //Register Modal
  const [registerFormData, setRegisterFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = registerFormData;

  const onChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const onRegister = async () => {
    console.log(registerFormData);
    // perform all neccassary validations
    if ((name && email && password && confirmPassword) === "") {
      setOpen(true);
      setErrorMessage("Please fill all required field");
    } else if (password.length < 5) {
      setOpen(true);
      setErrorMessage("Password must have more than 5 characters");
    } else if (password !== confirmPassword) {
      setOpen(true);
      setErrorMessage("Password's not match");
    } else {
      dispatch(userActions.register(registerFormData));
    }
  };

  useEffect(() => {
    if (users.error) {
      setErrorOpen(true);
      setErrorMessage(users.error);
    }
  }, [users.error]);

  return (
    <div className={classes.root}>
      {/* Main Appbar */}
      <AppBar>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid
              item
              xs={3}
              sm={8}
              md={6}
              alignItems="center"
              container
              spacing={2}
            >
              <Grid
                style={{ width: "auto" }}
                item
                container
                alignItems="center"
              >
                <Hidden mdUp>
                  <IconButton
                    aria-label="menu"
                    color="inherit"
                    onClick={handleDrawerOpen}
                  >
                    <MenuIcon />
                  </IconButton>
                  <SwipeableDrawer
                    classes={{
                      paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                      ),
                    }}
                    disableBackdropTransition
                    open={open}
                    onClose={handleDrawerClose}
                    onOpen={handleDrawerOpen}
                  >
                    <MainListItems />
                  </SwipeableDrawer>
                </Hidden>

                <Typography
                  className={clsx(classes.title, classes.linkBtn)}
                  component={Link}
                  href="/"
                  as={"/"}
                  variant="h6"
                  noWrap
                >
                  Eshop-NextJS
                </Typography>
              </Grid>
              <Hidden smDown>
                <Button
                  className={classes.linkBtn}
                  component={Link}
                  href="/"
                  as={"/"}
                >
                  Home
                </Button>
                <Button
                  className={classes.linkBtn}
                  component={Link}
                  href="/products"
                  as={"/products"}
                >
                  Product
                </Button>

                {/* Category */}
                <Grid item>
                  <Button
                    ref={categoryPopoverAnchor}
                    aria-label="category"
                    aria-owns={
                      openPopover.category ? "mouse-over-popover" : undefined
                    }
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    color="inherit"
                  >
                    Category
                  </Button>
                  <HoverPopover
                    anchorEl={categoryPopoverAnchor.current}
                    open={openPopover.category}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                  >
                    {categories.items
                      ? categories.items.map((category, index) => (
                          <Link
                            className={classes.menuLinkList}
                            href="/categories/[id]"
                            as={`/categories/${category.id}`}
                            key={index}
                            variant="subtitle1"
                            display="block"
                          >
                            {category.name}
                          </Link>
                        ))
                      : "Something wrong with DB or no data"}
                  </HoverPopover>
                </Grid>
                {/* Brand */}
                <Grid item>
                  <Button
                    ref={brandPopoverAnchor}
                    aria-label="brand"
                    aria-owns={
                      openPopover.brand ? "mouse-over-popover" : undefined
                    }
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    color="inherit"
                  >
                    Brand
                  </Button>
                  <HoverPopover
                    anchorEl={brandPopoverAnchor.current}
                    open={openPopover.brand}
                    handlePopoverOpen={handlePopoverOpen}
                    handlePopoverClose={handlePopoverClose}
                  >
                    {brands.items
                      ? brands.items.map((brand, index) => (
                          <Link
                            className={classes.menuLinkList}
                            href="/categories/[id]"
                            as={`/categories/${brand.id}`}
                            key={index}
                            variant="subtitle1"
                            display="block"
                          >
                            {brand.name}
                          </Link>
                        ))
                      : "Something wrong with DB or no data"}
                  </HoverPopover>
                </Grid>
              </Hidden>
            </Grid>

            <Grid
              item
              xs={9}
              sm={4}
              md={6}
              justify="flex-end"
              alignItems="center"
              container
              spacing={2}
            >
              {/* Search */}
              <Grid item>
                <Hidden smDown>
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
                      onChange={handleChangeSearchString}
                      onKeyDown={onEnterPress}
                    />
                    <Link
                      href={"/products"}
                      as={{
                        pathname: "/products",
                        query: { search: `${searchString}` },
                      }}
                      ref={(link) => {
                        // assigns a reference so we can trigger it later
                        searchLink = link;
                      }}
                    >
                      <Button type="submit">Search</Button>
                    </Link>
                  </div>
                </Hidden>
              </Grid>
              {/* Cart */}
              <Grid item>
                <IconButton
                  ref={cartPopoverAnchor}
                  aria-label="cart"
                  aria-owns={
                    openPopover.cart ? "mouse-over-popover" : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Badge
                    badgeContent={cart ? cart.items.length : 1}
                    color="secondary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <HoverPopover
                  anchorEl={cartPopoverAnchor.current}
                  open={openPopover.cart}
                  handlePopoverOpen={handlePopoverOpen}
                  handlePopoverClose={handlePopoverClose}
                >
                  {/* <div className={classes.cartRoot}> */}
                  <Typography variant="h6">Cart detail: </Typography>
                  {false ? (
                    <React.Fragment>
                      <div className={classes.cartPaper}></div>
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
                </HoverPopover>
              </Grid>
              {/* Login */}
              <Grid item>
                {users.token ? (
                  <React.Fragment>
                    <IconButton
                      aria-label="delete"
                      onClick={handleMenuAccountClick}
                    >
                      <AccountCircleIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorElMenuAccount}
                      keepMounted
                      open={Boolean(anchorElMenuAccount)}
                      onClose={handleMenuAccountClose}
                    >
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenLoginModal}
                  >
                    Login
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Login Modal */}
      <Modal
        aria-labelledby="transition-modal-login"
        aria-describedby="transition-modal-login"
        className={classes.modalLogin}
        open={openLoginModal}
        onClose={handleCloseLoginModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="right" in={openLoginModal} mountOnEnter unmountOnExit>
          <div className={classes.paperLogin}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Collapse className={classes.alertContainer} in={errorOpen}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            </Collapse>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={loginFormData.email}
                onKeyPress={(e) => keyPressed(e, 1)}
                onChange={(e) => onChangeLogin(e)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onKeyPress={(e) => keyPressed(e, 1)}
                value={loginFormData.password}
                onChange={(e) => onChangeLogin(e)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Button onClick={handleOpenSignupModal} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Slide>
      </Modal>

      {/* Signup Modal */}
      <Modal
        aria-labelledby="transition-modal-login"
        aria-describedby="transition-modal-login"
        className={classes.modalLogin}
        open={openSignupModal}
        onClose={handleCloseSignupModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="left" in={openSignupModal} mountOnEnter unmountOnExit>
          <div className={classes.paperLogin}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Collapse className={classes.alertContainer} in={errorOpen}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setErrorOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
              </Alert>
            </Collapse>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onKeyPress={(e) => keyPressed(e)}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onKeyPress={(e) => keyPressed(e)}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    id="password"
                    value={password}
                    onKeyPress={(e) => keyPressed(e)}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onKeyPress={(e) => keyPressed(e)}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onRegister}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={handleOpenLoginModal}>
                    Already have an account? Sign in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Slide>
      </Modal>
    </div>
  );
}
