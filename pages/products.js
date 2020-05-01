import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { productActions, bannerActions } from "../actions";
import MainBar from "../src/Appbar";
import Carousel from "../src/Carousel";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Project(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.imagePaper} elevation={10}>
      {props.item.path && (
        <CardMedia
          className={classes.media}
          image={"http://localhost:5000/uploads/" + props.item.path}
          // title={props.item.name}
        />
      )}
      {props.item.img && (
        <CardMedia
          className={classes.media}
          image={URL.createObjectURL(props.item.img)}
          // title={props.item.name}
        />
      )}
      {/* <Button className={classes.bannerCheckBtn}>Check it out!</Button> */}
    </Paper>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(9, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  container: { width: "500px" },
  media: {
    backgroundColor: "white",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    transition: "300ms",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(115%)",
    },
  },
  imagePaper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 0, 0),

    position: "relative",
    height: "500px",
    overflow: "hidden",
    // padding: "20px",
    color: "white",
  },
  sectionTitle: {
    textAlign: "center",
    borderBottom: "2px solid #000",
  },
}));

const Products = (props) => {
  const classes = useStyles();
  const { result } = props;
  console.log(result);

  const autoPlay = false;
  const timer = 500;
  const animation = "fade";
  const indicators = true;

  return (
    <React.Fragment>
      <CssBaseline />

      <MainBar
        categories={result.categories.items}
        brands={result.brands.items}
      />
      {/* <main> */}
      {/* Hero unit
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Album layout
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Something short and leading about the collection below—its
                contents, the creator, etc. Make it short and sweet, but not too
                short so folks don&apos;t simply skip over it entirely.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Main call to action
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      Secondary action
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div> */}

      {/* Simple Carousel */}
      {result.banners.items !== undefined && (
        <Carousel
          style={{ zIndex: -1 }}
          className={classes.imageBanner}
          autoPlay={autoPlay}
          timer={timer}
          animation={animation}
          indicators={indicators}
        >
          {result.banners.items.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
        </Carousel>
      )}

      {/* Main services */}
      <Typography className={classes.sectionTitle} variant="h5">
        Features Arcticles
      </Typography>
      <Grid container direction="row">
        <Grid item xs={12} md={4}></Grid>
      </Grid>

      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {result.products.items.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
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
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* </main> */}
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
};

Products.getInitialProps = async ({ store }) => {
  let result;
  await store.dispatch(bannerActions.getAll());
  await store
    .dispatch(productActions.getAll())
    .then(() => (result = store.getState()));

  return { result };
};

// export async function getServerSideProps({ store }) {
//   let result;
//   await store
//     .dispatch(productActions.getAll())
//     .then(() => (result = store.getState()));
//   return {
//     props: {
//       products,
//     }, // will be passed to the page component as props
//   };
// }

export default Products;
