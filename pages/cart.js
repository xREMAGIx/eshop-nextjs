import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MainBar from "../components/Appbar";
import { checkServerSideCookie } from "../actions/user.actions";
import Footer from "../components/Footer";
import { productActions, cartActions } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "../src/Link";

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

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function subtotal(items) {
  return items
    .map(({ price, amount }) => price * amount)
    .reduce((sum, i) => sum + i, 0);
}

function discounttotal(items) {
  return items
    .map(({ price, discount }) => (price * discount) / 100)
    .reduce((sum, i) => sum + i, 0);
}

const Cart = (props) => {
  const classes = useStyles();
  const { result } = props;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);

  const [productsInCart, setProductsInCart] = React.useState([]);

  const invoiceSubtotal = subtotal(productsInCart);
  const invoiceDiscountTotal = discounttotal(productsInCart);
  const invoiceTotal = invoiceSubtotal - invoiceDiscountTotal;

  useEffect(() => {
    setProductsInCart(
      cart.items &&
        cart.items.products !== null &&
        cart.items.products !== undefined
        ? cart.items.products.map((element) =>
            Object.assign(
              products.items.find((product) => product.id === element.product),
              { amount: element.amount }
            )
          )
        : []
    );
  }, [cart.items]);

  return (
    <React.Fragment>
      <MainBar />
      <Container className={classes.container}>
        <div className={classes.center}>
          <img
            style={{ width: "20%" }}
            src="/images/animation-vector-shopping-6.png"
            alt="Cart"
          ></img>
          <Typography className={classes.typography} variant="h3" gutterBottom>
            Cart
          </Typography>
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center" colSpan={3}>
                  Details
                </TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Action</TableCell>
                <TableCell>Desc</TableCell>
                <TableCell align="center">Qty.</TableCell>
                <TableCell align="right">Unit</TableCell>
                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsInCart.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        dispatch(cartActions.deleteItem(row.id, users.token))
                      }
                    >
                      x
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link href="/products/[id]" as={`/products/${row.id}`}>
                      {row.productName}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() =>
                        dispatch(cartActions.subtractItem(row.id, users.token))
                      }
                    >
                      -
                    </Button>
                    {row.amount}
                    <Button
                      onClick={() =>
                        dispatch(cartActions.addItem(row.id, users.token))
                      }
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                  <TableCell align="right">
                    {ccyFormat(priceRow(row.amount, row.price))}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell rowSpan={3} colSpan={2} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceSubtotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Discount total</TableCell>
                <TableCell align="right">
                  {ccyFormat(invoiceDiscountTotal)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Grid className={classes.marginY} container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper style={{ padding: 30 }} elevation={3}>
              <Typography variant="h6">COUPON DISCOUNT</Typography>
              <Typography gutterBottom>
                Enter your coupon code if you have one!
              </Typography>
              <TextField
                id="standard-full-width"
                placeholder="Enter your code here"
                fullWidth
                margin="normal"
              />
            </Paper>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={6}
            direction="row"
            justify="flex-end"
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(cartActions.checkOutCart(users.token))}
              >
                CheckOut
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
};

Cart.getInitialProps = async (ctx) => {
  let result;

  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;

  await ctx.store.dispatch(cartActions.getAll(token));
  await ctx.store
    .dispatch(productActions.getAll())
    .then(() => (result = { ...ctx.store.getState(), title: "Cart" }));

  return { result };
};

export default Cart;
