import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Carousel from "react-multi-carousel";

//UI Components
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//Custom Components
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";
import ProductCardItem from "../src/components/ProductCartItem";

//Redux
import { useSelector } from "react-redux";
import { initializeStore } from "../src/store";
import {
  productActions,
  categoryActions,
  brandActions,
  cartActions,
  checkServerSideCookie,
  bannerActions,
} from "../src/actions";
import { products } from "../src/reducers/products.reducer";

const backend_url = "https://nextjs-eshop-backend.herokuapp.com";

const useStyles = makeStyles((theme) => ({
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

  sectionTitle: {
    textAlign: "center",
    margin: theme.spacing(2),
    fontWeight: "bold",
  },
  sectionTitleBar: {
    width: "100px",
    height: "5px",
    margin: "8px auto 0",
    display: "block",
    backgroundColor: theme.palette.secondary.main,
  },
  marginY: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
  hotDealPaper: {
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.secondary.dark} , ${theme.palette.primary.light})`,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  countdown: {
    display: "inline-block",
    backgroundColor: theme.palette.tertiary.main,
    color: "black",
  },
  imageItem: {
    padding: "10px",
  },
  containerWithDots: {
    marginTop: "20px",
    paddingBottom: "10px",
    maxHeight: "70vh",
  },
  carouselRoot: {
    paddingBottom: theme.spacing(2),
  },
  menuLink: {
    "& .MuiListItem-root": {
      paddingTop: 0,
      paddingBottom: 0,
    },
    "& .MuiLink-underlineHover": {
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
  categoryTitle: {
    backgroundColor: theme.palette.primary.main,

    "& .MuiLink-underlineHover": {
      color: "white",
      fontWeight: 700,
      width: "100%",
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
}));

const Image = ({ url, alt }) => (
  <img
    draggable={false}
    style={{ width: "100%", height: "70vh", position: "relative" }}
    src={url}
    alt={alt}
    lazy="true"
  />
);

function ListItemLink(props) {
  return <ListItem component={Link} {...props} />;
}

function CategorySectionPaper(props) {
  const classes = useStyles();
  const theme = useTheme();

  const products = useSelector((state) => state.products);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper className={classes.marginY} elevation={5}>
      <Grid container direction="column">
        {/* Section Bar */}
        <Grid item container alignItems="center">
          {/* Main category */}
          <Grid item xs={9} sm={4} md={3} container>
            <Grid item xs={12} container className={classes.categoryTitle}>
              <Link
                href={"/categories/[id]"}
                as={`categories/${1}`}
                variant="h5"
                align="center"
              >
                {props.categorygroup.name}
              </Link>
            </Grid>
          </Grid>
          {/* Menu bar */}
          <Grid item xs={3} sm={8} md={9} container alignItems="center">
            {/* Menu bar (desktop) */}
            <Hidden smDown>
              <Grid
                item
                container
                style={{ padding: theme.spacing(1) }}
                justify="space-between"
              >
                <Grid item xs={10} container spacing={2}>
                  {props.categorygroup.children.map((category, index) => (
                    <Grid item key={index}>
                      <Button color="secondary" variant="outlined">
                        {category.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={2} container justify="flex-end">
                  <Button
                    component={Link}
                    href="/products"
                    as={{
                      pathname: "/products",
                      query: { category: `${props.categorygroup.id}` },
                    }}
                    color="secondary"
                  >
                    See more
                  </Button>
                </Grid>
              </Grid>
            </Hidden>
            {/* Menu bar (mobile) */}
            <Hidden mdUp>
              <Grid item container justify="flex-end">
                <div>
                  <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    color="primary"
                    onClick={handleClick}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    elevation={2}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    {props.categorygroup.children.map((category, index) => (
                      <MenuItem key={index} className={classes.menuLink}>
                        <ListItemLink key={index} href="#simple-list">
                          <ListItemText primary={category.name} />
                        </ListItemLink>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>

        <Divider />

        {/* Section main content */}
        <Grid item container>
          {/* Category Banner */}
          {/* <Hidden smDown>
            <Grid item style={{ overflow: "hidden" }} md={3}>
              <img
                height={700}
                src={"https://source.unsplash.com/featured/?{macbook}"}
                alt="No data"
                lazy="true"
              />
            </Grid>
          </Hidden> */}
          {/* List products (max: 8) */}
          <Grid item md={12} container>
            {products.items
              .filter((product) => product.category === props.categorygroup.id)
              .slice(0, 8)
              .map((product, index) => (
                <Grid item key={index} xs={6} sm={4} md={3}>
                  <ProductCardItem product={product} index={index} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

const bannerResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const productResponsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 3,
    partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 2,
    partialVisibilityGutter: 30,
  },
};

const categoryGroup = [
  {
    name: "Laptop",
    id: "5f02ec7732940c0018d17476",
    children: [{ name: "Macbook" }, { name: "Surface" }],
  },
  {
    name: "Accessories",
    id: "5f227c022131720018e38c16",
    children: [{ name: "Apple" }, { name: "Samsung" }],
  },
];

export default function Index() {
  const classes = useStyles();

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const products = useSelector((state) => state.products);
  const banners = useSelector((state) => state.banners);

  return (
    <Layout>
      {/* Main Carousel */}
      <div className={classes.carouselRoot}>
        <Carousel
          responsive={bannerResponsive}
          ssr
          containerClass={classes.containerWithDots}
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
        >
          {banners.items.map((image, index) => {
            return (
              <Image
                key={index}
                url={`${backend_url}/uploads/${image.path}`}
                alt={image}
              />
            );
          })}
        </Carousel>
      </div>
      {/* Hot Deal List */}
      <Paper
        className={clsx(classes.marginY, classes.hotDealPaper)}
        elevation={3}
        color="primary"
      >
        <Typography align="center" variant="h4">
          <Box fontWeight={500}>Hot Deals</Box>
        </Typography>

        <Typography align="center" variant="h6">
          End in{" "}
        </Typography>

        <Grid container>
          {products.items.slice(0, 4).map((product, index) => (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <ProductCardItem product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* New Product List */}
      <Paper className={classes.marginY} elevation={5}>
        <Typography className={classes.sectionTitle} variant="h4">
          New Products
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <div>
          <Carousel
            ssr
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={1000}
            centerMode
            className={classes.carouselRoot}
            containerClass="container"
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            responsive={productResponsive}
            slidesToSlide={1}
            swipeable
          >
            {products.items.map((product, index) => {
              return <ProductCardItem key={index} product={product} />;
            })}
          </Carousel>
        </div>
      </Paper>

      {/* Best Seller List*/}
      <Paper className={classes.marginY} elevation={5}>
        <Typography className={classes.sectionTitle} variant="h4">
          Best Sellers
          <span className={classes.sectionTitleBar}></span>
        </Typography>
        <Grid container>
          {products.items.map((product, index) => (
            <Grid key={index} item xs={6} sm={4} md={3}>
              <ProductCardItem product={product} index={index} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Categories Sections List*/}
      <div className={classes.marginY}>
        {categoryGroup.map((categoryList, index) => (
          <CategorySectionPaper key={index} categorygroup={categoryList} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  checkServerSideCookie(ctx, reduxStore);

  await dispatch(cartActions.getAll(reduxStore.getState().users.token));
  await dispatch(productActions.getAll());
  await dispatch(categoryActions.getAll());
  await dispatch(brandActions.getAll());
  await dispatch(bannerActions.getAll());

  return { props: { initialReduxState: reduxStore.getState() } };
}
