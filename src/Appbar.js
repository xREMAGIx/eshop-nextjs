import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    zIndex: 5,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

export default function MainBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [openBrands, setOpenBrands] = React.useState(false);

  const { categories, brands } = props;

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
            {/* Menu icon */}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Box style={{ marginRight: "50px" }}>
              <Typography className={classes.title} variant="h6" noWrap>
                Material-UI
              </Typography>
            </Box>

            <Grid container spacing={5}>
              {/* Home button */}
              <Grid item>
                <Button>Home</Button>
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
                    {categories.map((category) => (
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
                    {brands.map((brand) => (
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

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-end"
              spacing={3}
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
              <Grid item>
                <IconButton aria-label="cart">
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton aria-label="user">
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
