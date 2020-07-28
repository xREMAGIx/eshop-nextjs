import { useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//UI Components
import Typography from "@material-ui/core/Typography";
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
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Checkbox from "@material-ui/core/Checkbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Skeleton from "@material-ui/lab/Skeleton";

//Custom Components
import Link from "../../src/components/Link";
import Layout from "../../src/components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../../src/store";
import { productActions } from "../../src/actions";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  marginY: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  marginAll: {
    margin: theme.spacing(1),
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
      boxShadow: "0 0 11px rgba(114, 17, 17,.7)",

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
  filterCollapse: {
    width: "100%",
    "& .MuiTypography-root": {
      marginRight: "auto",
    },
    "& .MuiSvgIcon-root": {
      margin: theme.spacing(1),
    },
  },
  filterTitle: {
    paddingLeft: theme.spacing(1),
    borderLeftStyle: "solid",
    borderColor: theme.palette.primary.main,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
}));

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

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

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

export default function ProductIndex() {
  const classes = useStyles();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [openPrice, setOpenPrice] = React.useState(true);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);

  const handlePriceClick = () => {
    setOpenPrice(!openPrice);
  };

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };

  const handleBrandClick = () => {
    setOpenBrand(!openBrand);
  };

  const handlePageChange = (event, value) => {
    dispatch(productActions.getAll(`?page=${value}`));
  };

  console.log(products);

  return (
    <Layout>
      <Grid className={classes.marginY} container spacing={1}>
        {/* Categories, brands and filter menu */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={1}>
            {/* Prices */}
            <Grid item xs={12}>
              <Paper>
                <ButtonBase
                  className={classes.filterCollapse}
                  onClick={handlePriceClick}
                >
                  <Typography className={classes.filterTitle} variant="h5">
                    Prices
                  </Typography>

                  {openPrice ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse in={openPrice} timeout="auto" unmountOnExit>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="price-list"
                      name="price-list"
                      defaultValue="all"
                      className={classes.marginAll}
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio color="primary" />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value="500k"
                        control={<Radio color="primary" />}
                        label="Dưới 500k"
                      />
                      <FormControlLabel
                        value="500-1tr"
                        control={<Radio color="primary" />}
                        label="Từ 500k - 1 triệu"
                      />
                      <FormControlLabel
                        value="1-5tr"
                        control={<Radio color="primary" />}
                        label="Từ 1 triệu - 5 triệu"
                      />
                      <FormControlLabel
                        value="5-10tr"
                        control={<Radio color="primary" />}
                        label="Từ 5 triệu - 10 triệu"
                      />
                      <FormControlLabel
                        value="10tr"
                        control={<Radio color="primary" />}
                        label="Từ 10 triệu trở lên"
                      />
                    </RadioGroup>
                  </FormControl>
                </Collapse>
              </Paper>
            </Grid>

            {/* Categories */}
            <Grid item xs={12}>
              <Paper>
                <ButtonBase
                  className={classes.filterCollapse}
                  onClick={handleCategoryClick}
                >
                  <Typography className={classes.filterTitle} variant="h5">
                    Categories
                  </Typography>

                  {openCategory ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse in={openCategory} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink href="#simple-list">
                      <ListItemText primary="Trash" />
                    </ListItemLink>
                    <ListItemLink href="#simple-list">
                      <ListItemText primary="Spam" />
                    </ListItemLink>
                  </List>
                </Collapse>
              </Paper>
            </Grid>

            {/* Brands */}
            <Grid item xs={12}>
              <Paper>
                <ButtonBase
                  className={classes.filterCollapse}
                  onClick={handleBrandClick}
                >
                  <Typography className={classes.filterTitle} variant="h5">
                    Brands
                  </Typography>

                  {openBrand ? <ExpandLess /> : <ExpandMore />}
                </ButtonBase>
                <Collapse in={openBrand} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemLink href="#simple-list">
                      <ListItemText primary="Trash" />
                    </ListItemLink>
                    <ListItemLink href="#simple-list">
                      <ListItemText primary="Spam" />
                    </ListItemLink>
                  </List>
                </Collapse>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        {/* Products List */}
        <Grid item xs={12} md={9}>
          <Paper style={{ padding: 10 }}>
            <Typography className={classes.sectionTitle} variant="h4">
              Product Catalog
              <span className={classes.sectionTitleBar}></span>
            </Typography>

            {/* List items */}
            <Grid container spacing={mobile ? 0 : 2}>
              {products.items.map((product, index) => (
                <Grid key={index} item xs={6} sm={4} md={3}>
                  {!products.loading ? (
                    <Card
                      key={index}
                      variant="outlined"
                      className={mobile ? null : classes.cardRoot}
                    >
                      <CardActionArea
                        component={Link}
                        href="/products/[id]"
                        as={`/products/${product.id}`}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          component="img"
                          height={150}
                          image={
                            "https://source.unsplash.com/featured/?{japan}"
                          }
                          title={product.name}
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
                            {product.productName}
                          </Typography>
                        ) : (
                          <TooltipDiv
                            text={product.productName}
                            className={classes.listItem}
                          />
                        )}

                        {product.discountPrice ? (
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
                                {product.discountPrice.toLocaleString()}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                style={{ textDecoration: "line-through" }}
                                variant={mobile ? "subtitle2" : "subtitle1"}
                                color="textSecondary"
                                component="p"
                              >
                                {product.price.toLocaleString()}
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : (
                          <Typography
                            variant={mobile ? "h6" : "h5"}
                            color="primary"
                            component="p"
                          >
                            {product.price.toLocaleString()}
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
                  ) : (
                    <Skeleton variant="rect" height={"30vh"}></Skeleton>
                  )}
                </Grid>
              ))}
            </Grid>
            {/* Pagination */}
            <div className={classes.center}>
              {!products.loading ? (
                <Pagination
                  showFirstButton
                  showLastButton
                  page={products.pagination.page}
                  count={products.pagination.pageCount}
                  onChange={handlePageChange}
                  color="primary"
                />
              ) : (
                <Skeleton
                  style={{ marginTop: theme.spacing(1) }}
                  variant="rect"
                  height={"5vh"}
                  width={"50vw"}
                ></Skeleton>
              )}
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
}
// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  if (ctx.query.search)
    await dispatch(productActions.getAll(`?search=${ctx.query.search}`));
  else await dispatch(productActions.getAll());

  return { props: { initialReduxState: reduxStore.getState() } };
}
