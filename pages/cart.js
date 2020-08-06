import { useEffect } from "react";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

//Custom Components
import Link from "../src/components/Link";
import Layout from "../src/components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../src/store";
import {
  productActions,
  cartActions,
  checkServerSideCookie,
} from "../src/actions";

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
  return `${num.toLocaleString()}`;
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

export default function Cart() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const users = useSelector((state) => state.users);

  const [formData, setFormData] = React.useState({ phone: "", address: "" });

  const { phone, address } = formData;

  const [productsInCart, setProductsInCart] = React.useState([]);

  //Success Snackbar
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //Error Snackbar
  const [openError, setOpenError] = React.useState(false);
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const invoiceSubtotal = subtotal(productsInCart);
  const invoiceDiscountTotal = discounttotal(productsInCart);
  const invoiceTotal = invoiceSubtotal - invoiceDiscountTotal;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    if (phone === "" || address === "") setOpenError(true);
    else {
      dispatch(cartActions.checkOutCart(users.token, formData));
      setOpen(true);
      setFormData({ phone: "", address: "" });
    }
  };

  useEffect(() => {
    setProductsInCart(
      cart.items
        ? cart.items.map((element) =>
            Object.assign(
              products.items.find((product) => product.id === element.product),
              { amount: element.amount }
            )
          )
        : []
    );
  }, [cart.items]);

  return (
    <Layout>
      {/* Success submit */}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Checkout success!
        </Alert>
      </Snackbar>

      {/* Error */}
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          Please fill all fields required!
        </Alert>
      </Snackbar>

      <Container className={classes.container}>
        <div className={classes.center}>
          <Typography
            className={classes.typography}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Your Cart
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
                  <TableCell align="right">
                    {row.price.toLocaleString()}
                  </TableCell>
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
            <Paper style={{ padding: 30, margin: 10 }} elevation={3}>
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
            <Paper style={{ padding: 30, margin: 10 }} elevation={3}>
              <Typography variant="h6">INFOMATION DETAIL</Typography>
              <Typography gutterBottom>Enter your shipping detail</Typography>
              <TextField
                id="phone-full-width"
                variant="outlined"
                label="Phone"
                fullWidth
                required
                name="phone"
                value={phone}
                margin="normal"
                onChange={(e) => onChange(e)}
              />
              <TextField
                id="address-full-width"
                variant="outlined"
                label="Address"
                fullWidth
                required
                name="address"
                value={address}
                margin="normal"
                onChange={(e) => onChange(e)}
              />
              <Button
                style={{ margin: 10, float: "right" }}
                variant="contained"
                color="secondary"
                onClick={handleCheckout}
              >
                CheckOut
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  checkServerSideCookie(ctx, reduxStore);

  await dispatch(productActions.getAll());

  await dispatch(cartActions.getAll(reduxStore.getState().users.token));

  return { props: { initialReduxState: reduxStore.getState(), title: "Cart" } };
}
