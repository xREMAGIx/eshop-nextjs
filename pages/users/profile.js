import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

//UI Components
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

//Custom Components
import Link from "../../src/components/Link";
import Layout from "../../src/components/Layout";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { initializeStore } from "../../src/store";
import {
  productActions,
  userActions,
  cartActions,
  categoryActions,
  brandActions,
  checkServerSideCookie,
} from "../../src/actions";
import { Button } from "@material-ui/core";

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
    marginBottom: theme.spacing(2),
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

export default function Profile() {
  const classes = useStyles();

  //Redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  //Profile functions
  const { name, phone, address } = user;
  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleUpdateProfile = () => {
    console.log(formData);
  };

  const onProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Container className={classes.container}>
        {/* Breadcrumb */}
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="secondary" href="/" as={`/`}>
            Home
          </Link>
          <Typography color="textPrimary">Profile</Typography>
        </Breadcrumbs>

        {/* Title */}
        <div className={classes.center}>
          <Typography
            className={classes.typography}
            variant="h3"
            component="h1"
            gutterBottom
          >
            Profile
          </Typography>
        </div>

        {/* User Info */}
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item xs={12} sm={9} md={6} container>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={name}
              name="name"
              onChange={onProfileChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={9} md={6} container>
            <TextField
              fullWidth
              variant="outlined"
              label="Phone"
              value={phone}
              name="phone"
              onChange={onProfileChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={9} md={6} container>
            <TextField
              fullWidth
              variant="outlined"
              label="Address"
              value={address}
              name="address"
              onChange={onProfileChange}
            ></TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={6}
            container
            justify="center"
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                href="/users/orders"
                as={`/users/orders`}
              >
                Orders History
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProfile}
              >
                Update
              </Button>
            </Grid>
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

  await dispatch(userActions.getMe(reduxStore.getState().users.token));
  await dispatch(cartActions.getAll(reduxStore.getState().users.token));
  await dispatch(productActions.getAll());
  await dispatch(categoryActions.getAll());
  await dispatch(brandActions.getAll());

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      title: "Profile",
    },
  };
}
