import React, { useEffect } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MainBar from "../src/Appbar";
import { checkServerSideCookie } from "../actions/user.actions";
import {
  productActions,
  bannerActions,
  postActions,
  userActions,
  cartActions,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Link from "../src/Link";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const TAX_RATE = 0.1;

const useStyles = makeStyles((theme) => ({
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
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function subtotal(items) {
  console.log(items);
  return items
    .map(({ price, amount }) => price * amount)
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

  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;

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
        <Typography className={classes.typography} variant="h4" gutterBottom>
          Cart
        </Typography>
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
                <TableCell>Tax</TableCell>
                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                  0
                )} %`}</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(cartActions.checkOutCart(users.token))}
        >
          CheckOut
        </Button>
      </Container>
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
    .then(() => (result = ctx.store.getState()));

  return { result };
};

export default Cart;
