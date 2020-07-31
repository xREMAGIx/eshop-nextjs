import { useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

//UI Components
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import CardActions from "@material-ui/core/CardActions";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "@material-ui/lab/Skeleton";
import CompareIcon from "@material-ui/icons/Compare";

//Custom Components
import Link from "../components/Link";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../actions";

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    margin: theme.spacing(1),
    borderRadius: "10px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
    transition: "opacity box-shadow 0.1s linear",
    height: "95%",
    minHeight: 310,
    "& .MuiCardActionArea-root": {
      overflow: "hidden",
    },
    "&:hover": {
      boxShadow: "0 0 11px rgba(114, 17, 17,.7)",

      "& .MuiCardMedia-img": {
        transform: "scale(1.25)",
      },

      "& .MuiCardActions-root": {
        opacity: 1,
      },
    },
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0,
    },
  },
  cardRootMobile: {
    height: "95%",
    minHeight: 310,
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0,
    },
  },
  cardMedia: {
    // height: 0,
    //paddingTop: "75%", // 4:3
    transition: "transform 0.2s linear",
  },
  cardContent: {
    padding: theme.spacing(1),
    width: "100%",
  },
  cardAction: {
    padding: 0,
    opacity: 0.5,
    transition: "opacity 0.5s linear",
    display: "flex",
    justifyContent: "center",
  },
  listItem: {
    maxWidth: "100%",
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.2em",
    maxHeight: "2.4em",
    //textAlign: "justify",
    marginRight: "-1em",
    paddingRight: "1em",
    marginBottom: "0.5em",
    "&::before": {
      content: '"..."',
      position: "absolute",
      right: 0,
      bottom: 0,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      right: 0,
      width: "1em",
      height: "1em",
      marginTop: "0.2em",
      background: "white",
    },
  },
  marginY: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
  },
}));

//Function for long product name
const TooltipDiv = (props) => {
  const divRef = useRef(null);
  const [allowTooltip, setAllowTooltip] = useState(false);

  useEffect(() => {
    if (
      !allowTooltip &&
      divRef.current.scrollHeight > divRef.current.offsetHeight
    ) {
      setAllowTooltip(true);
    }
  }, []);
  if (allowTooltip) {
    return (
      <Tooltip title={props.text}>
        <Typography variant="h6">
          <div ref={divRef} className={props.className}>
            {props.text}
          </div>
        </Typography>
      </Tooltip>
    );
  }
  return (
    <Typography variant="h6">
      <div ref={divRef} className={props.className}>
        {props.text}
      </div>
    </Typography>
  );
};

//Card display product
export default function ProductCardItem(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const handleAddToCart = (event) => {
    if (users.token)
      dispatch(cartActions.addItem(props.product.id, users.token));
    else null;
  };

  return (
    <Card
      key={props.index}
      variant="outlined"
      className={mobile ? classes.cardRootMobile : classes.cardRoot}
    >
      <Grid
        container
        style={{ height: "100%" }}
        direction="column"
        justify="space-between"
      >
        <Grid item container>
          <CardActionArea
            component={Link}
            href="/products/[id]"
            as={`/products/${props.product.id}`}
          >
            {props.product.images ? (
              <CardMedia
                className={classes.cardMedia}
                component="img"
                height={150}
                image={`https://nextjs-eshop-backend.herokuapp.com/uploads/${props.product.images[0].path}`}
                title={props.product.name}
                lazy="true"
              />
            ) : (
              <Skeleton variant="rect" height={150} />
            )}
          </CardActionArea>
        </Grid>
        <Grid item container>
          <CardContent className={classes.cardContent}>
            <TooltipDiv
              text={props.product.productName}
              className={classes.listItem}
            />

            {props.product.discount ? (
              <Grid container>
                <Grid item>
                  <Typography variant="h6" color="primary" component="p">
                    {(
                      ((100 - props.product.discount) * props.product.price) /
                      100
                    ).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      textDecoration: "line-through",
                      paddingLeft: theme.spacing(1),
                    }}
                    variant={mobile ? "subtitle2" : "subtitle1"}
                    color="textSecondary"
                    component="p"
                  >
                    {props.product.price.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="h6" color="primary" component="p">
                {props.product.price.toLocaleString()}
              </Typography>
            )}
          </CardContent>
        </Grid>
        <Grid item>
          <CardActions
            className={classes.cardAction}
            justify="center"
            spacing={2}
          >
            <Grid item>
              <IconButton
                color="primary"
                aria-label="add-to-shopping-cart"
                onClick={handleAddToCart}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" aria-label="favorite">
                <FavoriteBorderIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" aria-label="compare">
                <CompareIcon />
              </IconButton>
            </Grid>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
