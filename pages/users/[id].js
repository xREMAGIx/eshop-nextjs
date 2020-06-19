import React, { useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import MainBar from "../../components/Appbar";
import { checkServerSideCookie } from "../../actions/user.actions";
import Footer from "../../components/Footer";
import { userActions, cartActions } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "../../src/Link";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    //minWidth: 700,
  },
  container: {
    marginTop: "64px",
  },
  typography: {
    paddingTop: theme.spacing(2),
    color: theme.palette.primary.main,
    borderBottom: "solid 1px #000",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignItems: "center",
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();
  const { result } = props;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);

  return (
    <React.Fragment>
      <MainBar />
      <Container className={classes.container}></Container>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = async (ctx) => {
  let result;

  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;

  await ctx.store.dispatch(userActions.getById(ctx.query.id));
  result = { ...ctx.store.getState(), title: "UserProfile" };

  return { result };
};

export default UserProfile;
