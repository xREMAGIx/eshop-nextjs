import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";

import { useDispatch, useSelector } from "react-redux";

import Link from "../../src/Link";
import Footer from "../../components/Footer";
import { cartActions, categoryActions } from "../../actions";
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
  cardRoot: {},
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
  categories: {
    transition: "padding-left 0.5s",
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
      paddingLeft: theme.spacing(3),
    },
  },
}));

const Categories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const brands = useSelector((state) => state.brands);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);

  return (
    <React.Fragment>
      {/* AppBar */}
      <MainBar />

      {/* Main */}
      <Container style={{ marginTop: "64px" }} maxWidth="lg">
        <Typography variant="h3">Categories</Typography>
        {/* Search */}
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Paper>
              <div className={classes.margin}>
                <Grid container justify="center" alignItems="flex-end">
                  <Grid item sm={1}>
                    <SearchIcon />
                  </Grid>
                  <Grid item xs={11} sm={11} md={10}>
                    <TextField fullWidth label="Search" />
                  </Grid>
                </Grid>
              </div>
            </Paper>
          </Grid>
        </Grid>

        {/* Main catergories grid */}
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {categories.items
                ? categories.items.map((category, index) => (
                    <Grid item key={index} xs={12} sm={6}>
                      <Card className={classes.cardRoot}>
                        <CardActionArea
                          className={classes.categories}
                          component={Link}
                          href="/categories/[id]"
                          as={`/categories/${category._id}`}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {category.name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))
                : null}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
      {/* End footer */}
    </React.Fragment>
  );
};

Categories.getInitialProps = async (ctx) => {
  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;

  if (ctx.req) {
    console.log("on server, need to copy cookies from req");
  } else {
    console.log("on client, cookies are automatic");
  }
  await ctx.store.dispatch(cartActions.getAll(token));
  await ctx.store.dispatch(categoryActions.getAll());
};

export default Categories;
