import React from "react";

//UI Components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

//Custom Components
import Link from "../components/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light" ? "#DFF4F5" : theme.palette.grey[800],
    color: "black",
  },
  divider: {
    backgroundColor: "black",
  },
  text: {
    color: "black",
    display: "block",
  },
  receiveEmail: {
    backgroundColor: "white",
    width: "90%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  sectionTitle: {
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const storeData = [
  {
    name: "Trường Đại Học Công Nghệ Thông Tin - UIT VNU",
    info: "Trường Đại Học Công Nghệ Thông Tin - UIT VNU",
    address: "Khu phố 6, Thủ Đức, Ho Chi Minh City",
    hotline: "02837252002",
    facebook: "https://www.facebook.com/hoangquanhangxachtaytunhat",
    map:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15672.929714852033!2d106.8038081!3d10.8699184!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xafa66f9c8be3c91!2sUniversity%20of%20Information%20Technology%20VNU-HCM!5e0!3m2!1sen!2s!4v1595683436992!5m2!1sen!2s",
    time: "(7:30-18:00)",
  },
  {
    name: "Công ty Công nghệ thông tin Visitek",
    info: "Công ty Công nghệ thông tin Visitek",
    address: "86 Đường số 7, Dự án Center Hills Gò Vấp, Gò Vấp, Hồ Chí Minh",
    hotline: "0567055912",
    facebook: "https://www.facebook.com/profile.php?id=100007162651596",
    map:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15675.128488263985!2d106.67859!3d10.8279789!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x571af5147b007a7!2zQ8O0bmcgdHkgVE5ISCBDw7RuZyBOZ2jhu4cgVGjDtG5nIFRpbiBWaXNpdGVr!5e0!3m2!1sen!2s!4v1595683664879!5m2!1sen!2s",
    time: "(9:00-18:00)",
  },
];

function ListItemLink(props) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.listLink} component={Link} {...props} />
  );
}

function StoreModal(props) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={classes.paper}>
          <React.Fragment>
            <Typography variant="h6" gutterBottom align="center">
              {props.store.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {props.store.address}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Hotline: </strong> {props.store.hotline}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>Facebook: </strong>
              <a href={props.store.facebook}>{props.store.name}</a>
            </Typography>
            <iframe
              src={props.store.map}
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </React.Fragment>
        </div>
      </Fade>
    </Modal>
  );
}

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Footer() {
  const classes = useStyles();

  const [openStoreModal, setOpenStoreModal] = React.useState(false);
  const [activeStore, setActiveStore] = React.useState(0);
  const [receiveEmail, setReceiveEmail] = React.useState("");
  const [transition, setTransition] = React.useState(undefined);
  const [openEmailSnackbar, setOpenEmailSnackbbar] = React.useState(false);

  const handleOpen = (e) => {
    setOpenStoreModal(true);
    setActiveStore(e.currentTarget.getAttribute("value"));
  };

  const handleClose = () => {
    setOpenStoreModal(false);
  };

  const handleEmailSubmit = (Transition) => {
    setTransition(() => Transition);
    setOpenEmailSnackbbar(true);

    setReceiveEmail("");
  };

  const handleEmailSnackbarClose = () => {
    setOpenEmailSnackbbar(false);
  };

  return (
    <React.Fragment>
      <footer className={classes.footer}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Typography
              className={classes.sectionTitle}
              variant="h5"
              gutterBottom
            >
              Eshop-NextJS
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* He thong cua hang */}
                <List component="nav" aria-label="stores">
                  {/* CN HBT */}
                  {storeData.map((store, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        button
                        value={index}
                        onClick={handleOpen}
                        className={classes.listLink}
                      >
                        <ListItemText
                          primary={<strong>{store.info}</strong>}
                          secondary={
                            <React.Fragment>
                              <Typography
                                className={classes.text}
                                variant="subtitle2"
                                component="span"
                              >
                                {store.address}
                              </Typography>
                              <Typography
                                className={classes.text}
                                variant="subtitle2"
                                component="span"
                              >
                                Hotline: {store.hotline} {store.time}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>

                      {index === storeData.length - 1 ? null : (
                        <Divider
                          variant="middle"
                          component="li"
                          className={classes.divider}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>

              {/* Thong tin lien he */}
              <Grid item container xs={12} sm={6} alignItems="center">
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Hỗ trợ:</Box>
                  </Typography>
                  <Typography variant="subtitle1">+123456789</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    <Box fontWeight="fontWeightBold">Ý kiến đóng góp: </Box>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Email: tramdo2806@gmail.com
                  </Typography>
                </Grid>

                {/* Dang ky nhan email khuyen mai */}
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    <Box fontWeight="fontWeightBold">
                      Đăng ký nhận email khuyến mãi:
                    </Box>
                  </Typography>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={receiveEmail}
                    onChange={(e) => setReceiveEmail(e.target.value)}
                    className={classes.receiveEmail}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          color="secondary"
                          onClick={() => handleEmailSubmit(TransitionUp)}
                        >
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  <Snackbar
                    autoHideDuration={3000}
                    open={openEmailSnackbar}
                    onClose={handleEmailSnackbarClose}
                    TransitionComponent={transition}
                    message={`An email has been sent to your mail :)`}
                    key={transition ? transition.name : ""}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography className={classes.sectionTitle} variant="h6">
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
          <Grid item xs={12} sm={6} md={3}>
            <Typography className={classes.sectionTitle} variant="h6">
              Thông tin hỗ trợ
            </Typography>
            <List component="nav" aria-label="info-list">
              <ListItemLink href="/about" as={`/about`}>
                <ListItemText primary="Giới thiệu" />
              </ListItemLink>
              <ListItemLink href="/policies" as={`/policies`}>
                <ListItemText primary="Chính sách Đổi trả & Giao hàng" />
              </ListItemLink>
              <ListItemLink href="/tutorial" as={`/tutorial`}>
                <ListItemText primary="Hướng dẫn mua hàng" />
              </ListItemLink>
            </List>
          </Grid>
        </Grid>
      </footer>

      <StoreModal
        open={openStoreModal}
        handleClose={handleClose}
        store={storeData[activeStore]}
      />
    </React.Fragment>
  );
}
