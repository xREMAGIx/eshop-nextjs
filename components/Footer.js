import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

import { makeStyles } from "@material-ui/core/styles";
import Link from "../src/Link";
import NormalLink from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  title: {
    paddingLeft: theme.spacing(1),
    borderLeftStyle: "solid",
    borderColor: theme.palette.primary.main,
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
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
  social: {
    marginTop: theme.spacing(2),
  },
  contactField: {
    margin: theme.spacing(1),
    backgroundColor: "#fff",
  },
  btnSubmit: {
    margin: theme.spacing(1),
  },
}));

function ListItemLink(props) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.listLink} component={Link} {...props} />
  );
}

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container direction="row" justify="center" spacing={1}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title} variant="h6">
                Eshop - NextJS
              </Typography>
              <Typography variant="body1">
                Eshop-NextJS is an E-commerce web app built with{" "}
                <strong>NextJS</strong>.
              </Typography>
              <Typography variant="body1">
                Include <strong>Google Analytics, Search Console</strong> and
                support some simple rich results
              </Typography>
              <Typography variant="body1" align="center">
                <NormalLink href={"https://admin-page.xremagix.vercel.app/"}>
                  Link to Admin page
                </NormalLink>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Project made by students from UIT VNU-HCM
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography className={classes.title} variant="h6">
                Shopping
              </Typography>
              <List component="nav" aria-label="shopping-list">
                <ListItemLink href="/products" as={`/products`}>
                  <ListItemText primary="Products" />
                </ListItemLink>
                <ListItemLink href="/categories" as={`/categories`}>
                  <ListItemText primary="Categories" />
                </ListItemLink>
                <ListItemLink href="/brands" as={`/brands`}>
                  <ListItemText primary="Brands" />
                </ListItemLink>
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography className={classes.title} variant="h6">
                Account
              </Typography>
              <List component="nav" aria-label="account-list">
                <ListItemLink href="/account">
                  <ListItemText primary="My account" />
                </ListItemLink>
                <ListItemLink href="/cart">
                  <ListItemText primary="Cart" />
                </ListItemLink>
                <ListItemLink href="/orders">
                  <ListItemText primary="Orders" />
                </ListItemLink>
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography className={classes.title} variant="h6">
                Get in touch
              </Typography>
              <TextField
                fullWidth
                id="name-contactfield"
                aria-label="name-textfield"
                className={classes.contactField}
                label="Your name"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="email-contactfield"
                aria-label="email-textfield"
                className={classes.contactField}
                label="Your email"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="message-contactfield"
                aria-label="message-textfield"
                className={classes.contactField}
                label="Your message"
                variant="outlined"
                multiline
                rows={4}
              />
              <Button
                className={classes.btnSubmit}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Grid
                className={classes.social}
                container
                justify="center"
                spacing={2}
              >
                <Grid item>
                  <IconButton aria-label="facebook" color="primary">
                    <FacebookIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="twitter" color="primary">
                    <TwitterIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton aria-label="instagram" color="primary">
                    <InstagramIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
