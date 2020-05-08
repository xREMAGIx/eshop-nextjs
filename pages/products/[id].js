import { productActions } from "../../actions";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MainBar from "../../src/Appbar";
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
import PropTypes from "prop-types";

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function Product(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { result } = props;
  console.log(result);
  const product = result.products.item;
  const category = result.categories.items.find(
    (element) => element.id === product.category
  );
  const brand = result.brands.items.find(
    (element) => element.id === product.brand
  );

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <MainBar
        categories={result.categories.items}
        brands={result.brands.items}
      />
      <Container style={{ marginTop: "100px" }} maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            {product.images.length > 0 ? (
              <React.Fragment>
                <CardMedia
                  className={classes.cardMedia}
                  image={
                    "http://localhost:5000/uploads/" + product.images[0].path
                  }
                  title="Image title"
                />
                <div className={classes.gridRoot}>
                  <GridList className={classes.gridList} cols={2.5}>
                    {product.images.map((tile) => (
                      <GridListTile key={tile._id}>
                        <img
                          src={"http://localhost:5000/uploads/" + tile.path}
                          alt={tile.title}
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
              </React.Fragment>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h3" gutterBottom>
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

            <Typography variant="h5" gutterBottom>
              <Box fontWeight={500} m={1} className={classes.boxMargin}>
                Price: $ {product.price.toLocaleString()}
              </Box>
            </Typography>
            <Divider />
            <Button
              style={{ marginTop: "50px" }}
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
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
                There are many variations of passages of Lorem Ipsum available,
                but the majo Rity have be suffered alteration in some form, by
                injected humou or randomis Rity have be suffered alteration in
                some form, by injected humou or randomis words which donot look
                even slightly believable. If you are going to use a passage
                Lorem Ipsum. rerum blanditiis dolore dignissimos expedita
                consequatur deleniti consectetur non exercitationem. rerum
                blanditiis dolore dignissimos expedita consequatur deleniti
                consectetur non exercitationem.
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Typography variant="h6" gutterBottom>
                Category: {category.name}
              </Typography>
              <Divider />
              <Typography variant="h6">Brand: {brand.name}</Typography>
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
                  image={
                    "http://localhost:5000/uploads/" + product.images[0].path
                  }
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
    </React.Fragment>
  );
}

Product.getInitialProps = async ({ store, query }) => {
  console.log(store.getState());

  let result;

  await store.dispatch(productActions.getById(query.id));
  // .then(() => (result = store.getState()));

  result = store.getState();
  return { result };
};
