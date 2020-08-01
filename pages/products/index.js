import { useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//UI Components
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Skeleton from "@material-ui/lab/Skeleton";

//Custom Components
import Link from "../../src/components/Link";
import Layout from "../../src/components/Layout";
import ProductCardItem from "../../src/components/ProductCartItem";

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

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

export default function ProductIndex() {
  const classes = useStyles();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);

  const [openPrice, setOpenPrice] = React.useState(true);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);

  const [priceValue, setPriceValue] = React.useState("all");
  const [advanceProducts, setAdvanceProducts] = React.useState(products.items);

  const handlePriceChange = (event) => {
    setPriceValue(event.target.value);
  };

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

  useEffect(() => {
    switch (priceValue) {
      case "all":
        setAdvanceProducts(products.items);
        break;
      case "10":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              ((100 - product.discount) * product.price) / 100 < 10000000
          )
        );
        break;
      case "10-15":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              10000000 < ((100 - product.discount) * product.price) / 100 &&
              ((100 - product.discount) * product.price) / 100 < 15000000
          )
        );
        break;
      case "15-20":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              15000000 < ((100 - product.discount) * product.price) / 100 &&
              ((100 - product.discount) * product.price) / 100 < 20000000
          )
        );
        break;
      case "20-25":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              20000000 < ((100 - product.discount) * product.price) / 100 &&
              ((100 - product.discount) * product.price) / 100 < 25000000
          )
        );
        break;
      case "25-30":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              25000000 < ((100 - product.discount) * product.price) / 100 &&
              ((100 - product.discount) * product.price) / 100 < 30000000
          )
        );
        break;
      case "30":
        setAdvanceProducts(
          products.items.filter(
            (product) =>
              ((100 - product.discount) * product.price) / 100 > 30000000
          )
        );
        break;
      default:
        break;
    }
  }, [priceValue]);

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
                      value={priceValue}
                      onChange={handlePriceChange}
                    >
                      <FormControlLabel
                        value="all"
                        control={<Radio color="primary" />}
                        label="Tất cả"
                      />
                      <FormControlLabel
                        value="10"
                        control={<Radio color="primary" />}
                        label="Dưới 10 triệu"
                      />
                      <FormControlLabel
                        value="10-15"
                        control={<Radio color="primary" />}
                        label="Từ 10 triệu - 15 triệu"
                      />
                      <FormControlLabel
                        value="15-20"
                        control={<Radio color="primary" />}
                        label="Từ 15 triệu - 20 triệu"
                      />
                      <FormControlLabel
                        value="20-25"
                        control={<Radio color="primary" />}
                        label="Từ 20 triệu - 25 triệu"
                      />
                      <FormControlLabel
                        value="25-30"
                        control={<Radio color="primary" />}
                        label="Từ 25 triệu - 30 triệu"
                      />
                      <FormControlLabel
                        value="30"
                        control={<Radio color="primary" />}
                        label="Trên 30 triệu"
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
                    {categories.items
                      ? categories.items.map((category, index) => (
                          <ListItemLink
                            key={index}
                            href="/categories/[id]"
                            as={`/categories/${category.id}`}
                          >
                            <ListItemText primary={category.name} />
                          </ListItemLink>
                        ))
                      : "Something wrong or no data"}
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
                    {brands.items
                      ? brands.items.map((brand, index) => (
                          <ListItemLink
                            key={index}
                            href="/brands/[id]"
                            as={`/brands/${brand.id}`}
                          >
                            <ListItemText primary={brand.name} />
                          </ListItemLink>
                        ))
                      : "Something wrong or no data"}
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
              {advanceProducts ? (
                advanceProducts.map((product, index) => (
                  <Grid key={index} item xs={6} sm={4} md={3}>
                    {!products.loading ? (
                      <ProductCardItem product={product} index={index} />
                    ) : (
                      <Skeleton variant="rect" height={"30vh"}></Skeleton>
                    )}
                  </Grid>
                ))
              ) : (
                <Skeleton variant="rect" height={"10vh"}></Skeleton>
              )}
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

  checkServerSideCookie(ctx, reduxStore);

  if (ctx.query)
    await dispatch(
      productActions.getAll(
        `?search=${ctx.query.search || ""}&&category=${
          ctx.query.category || ""
        }`
      )
    );
  else await dispatch(productActions.getAll());

  await dispatch(cartActions.getAll(reduxStore.getState().users.token));
  await dispatch(categoryActions.getAll());
  await dispatch(brandActions.getAll());

  return {
    props: { initialReduxState: reduxStore.getState(), title: "Product List" },
  };
}
