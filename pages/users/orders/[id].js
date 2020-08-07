import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

//Custom Components
import Link from "../../../src/components/Link";
import Layout from "../../../src/components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../../../src/store";
import {
  productActions,
  userActions,
  cartActions,
  categoryActions,
  brandActions,
  checkServerSideCookie,
} from "../../../src/actions";

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
  status: {
    color: "#fff",
    textAlign: "center",
    textTransform: "capitalize",
    borderRadius: "25px",
  },
  pendingStatus: {
    backgroundColor: theme.palette.warning.main,
  },
  shippingStatus: {
    backgroundColor: theme.palette.info.main,
  },
  completedStatus: {
    backgroundColor: theme.palette.success.main,
  },
  cancelledStatus: {
    backgroundColor: theme.palette.error.main,
  },
}));

function dateFormat(date) {
  return new Intl.DateTimeFormat("en-GB", {
    second: "numeric",
    minute: "numeric",
    hour: "numeric",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
}

export default function OrderDetail() {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  const order = useSelector((state) => state.users.order);
  const products = useSelector((state) => state.products);

  const [productsInOrder, setProductsInOrder] = React.useState([]);
  useEffect(() => {
    setProductsInOrder(
      order.products.length > 0
        ? order.products.map((element) =>
            Object.assign(
              products.items.find((product) => product.id === element.product),
              { amount: element.amount }
            )
          )
        : []
    );
  }, [order]);

  return (
    <Layout>
      <Container className={classes.container}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="secondary" href="/" as={`/`}>
            Home
          </Link>
          <Link color="secondary" href="/users/profile" as={`/users/profile`}>
            Profile
          </Link>
          <Link color="secondary" href="/users/orders" as={`/users/orders`}>
            Orders History
          </Link>
          <Typography color="textPrimary">Order #{order._id}</Typography>
        </Breadcrumbs>

        {/* Title */}
        <div className={classes.center}>
          <Typography
            className={classes.typography}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Orders Detail
          </Typography>
        </div>

        {/* Orders Table */}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>

                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Discount</TableCell>

                <TableCell align="right">Sum</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                productsInOrder.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <Link href="/products/[id]" as={`/products/${item._id}`}>
                        {item.productName}
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">{item.amount}</TableCell>{" "}
                    <TableCell align="right">{item.discount}%</TableCell>
                    <TableCell align="right">
                      {(
                        ((item.price * (100 - item.discount)) / 100) *
                        item.amount
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell align="right">
                  {order.totalPrice.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  checkServerSideCookie(ctx, reduxStore);

  await dispatch(userActions.getMe(reduxStore.getState().users.token));
  await dispatch(userActions.getOrderDetail(ctx.query.id));
  await dispatch(cartActions.getAll(reduxStore.getState().users.token));
  await dispatch(productActions.getAll());
  await dispatch(categoryActions.getAll());
  await dispatch(brandActions.getAll());

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      title: "Orders Detail",
    },
  };
}
