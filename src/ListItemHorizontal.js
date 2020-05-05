import { Fade, Slide, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  listItemRoot: {
    position: "relative",
    width: "100%",
    //zIndex: -1,
  },
  buttonWrapper: {
    position: "absolute",
    height: "calc(100% - 20px - 10px)",
    backgroundColor: "transparent",
    top: 0,
    "&:hover": {
      "&.button": {
        backgroundColor: "black",
        filter: "brightness(120%)",
        opacity: "0.4",
      },
    },
  },
  button: {
    margin: "0 10px",
    position: "relative",
    top: "calc(50% - 20px)",
    backgroundColor: "#494949",
    color: "white",
    opacity: "0.2 !important",
    fontSize: "30px",
    transition: "200ms",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "black",
      opacity: "0.6 !important",
    },
  },
  next: {
    right: 0,
  },
  prev: {
    left: 0,
  },
  indicators: {
    width: "100%",
    marginTop: "10px",
    textAlign: "center",
  },
  inactiveIndicator: {
    cursor: "pointer",
    transition: "200ms",
    color: "#afafaf",

    fontSize: "14px",
    "&:hover, &:active": {
      color: "#1f1f1f",
    },
  },
  activeIndicator: {
    fontSize: "15px",
    color: "#494949",
  },
  listItem: {
    maxWidth: "80%",
    margin: "auto",
  },
}));

export default function ListItemHorizontal(props) {
  const classes = useStyles();

  const [active, setActive] = React.useState(0);

  const next = (event) => {
    const next = active + 1 > props.children.length - 1 ? 0 : active + 1;
    setActive(next);

    if (event) event.stopPropagation();
  };

  const prev = (event) => {
    const prev = active - 1 < 0 ? props.children.length - 1 : active - 1;
    setActive(prev);

    if (event) event.stopPropagation();
  };

  return (
    <div className={classes.listItemRoot}>
      {Array.isArray(props.children) ? (
        props.children.map((child, index) => {
          return (
            <ListItem
              key={index}
              active={index === active ? true : false}
              child={child}
            />
          );
        })
      ) : (
        <ListItem key={0} active={true} child={props.children} />
      )}

      <div className={`${classes.buttonWrapper} ${classes.next}`}>
        <IconButton
          className={`${classes.button} ${classes.next}`}
          onClick={() => next()}
        >
          <NavigateNextIcon />
        </IconButton>
      </div>

      <div className={`${classes.buttonWrapper} ${classes.prev}`}>
        <IconButton
          className={`${classes.button} ${classes.prev}`}
          onClick={() => prev()}
        >
          <NavigateBeforeIcon />
        </IconButton>
      </div>
    </div>
  );
}

function ListItem(props) {
  const classes = useStyles();
  return (
    <div hidden={!props.active}>
      {/* {props.animation === "slide" ? ( */}
      <Slide direction="left" in={props.active} timeout={200}>
        <div className={classes.listItem}>{props.child}</div>
      </Slide>
      {/* ) : (
        <Fade in={props.active} timeout={500}>
          <div>{props.child}</div>
        </Fade>
      )} */}
    </div>
    // ) : null
  );
}
