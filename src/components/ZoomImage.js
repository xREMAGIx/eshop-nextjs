import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

// Link ref: https://learnersbucket.com/examples/react/react-image-zoom/

const useStyles = makeStyles((theme) => ({
  normalImage: {
    cursor: "zoom-in",
    position: "relative",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
  },

  zoomedImage: {
    position: "absolute",
    zIndex: 999,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
  },

  zoomOutCursor: {
    cursor: "zoom-out",
  },

  center: {
    top: "50%;",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  topLeft: {
    top: 0,
    left: "-110%",
  },

  topRight: {
    top: 0,
    left: "110%",
  },

  bottomLeft: {
    bottom: 0,
    left: "-110%",
  },

  bottomRight: {
    bottom: 0,
    left: "110%",
  },
}));

const ImageZoom = (props) => {
  const classes = useStyles();

  const {
    imageURL,
    zoomImageURL,
    placement,
    imageSize,
    zoomedImageSize,
    isActive,
    zoomType,
  } = props;

  let normalImageRef = useRef();
  let zoomedImageRef = useRef();

  //Set the style of normal image
  const normalImageStyle = {
    backgroundImage: `url(${imageURL})`,
    backgroundSize: `${imageSize.width}px ${imageSize.height}px`,
    //backgroundSize: "auto",
    width: `${imageSize.width}px`,
    height: `${imageSize.height}px`,
  };

  //Set the style of zoomed image
  const zoomedImageStyle = {
    backgroundImage: `url(${zoomImageURL || imageURL})`,
    backgroundSize:
      zoomType === "click"
        ? `${zoomedImageSize.width}px ${zoomedImageSize.height}px`
        : `${zoomedImageSize.width * 1.5}px ${zoomedImageSize.height * 1.5}px`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: `${zoomedImageSize.width / 2}px`,
    height: `${zoomedImageSize.height / 2}px`,
  };

  //Show image
  const openZoom = (e) => {
    if (zoomedImageRef.current) {
      moveLens(e);
    }

    const { onZoom } = props;
    onZoom && onZoom();
  };

  //Hide image
  const closeZoom = () => {
    const { onClose } = props;
    onClose && onClose();
  };

  //Get cursor position
  const getCursorPos = (e) => {
    let a,
      x = 0,
      y = 0;
    e = e || window.event;

    /* Get the x and y positions of the image: */
    a = normalImageRef.current.getBoundingClientRect();

    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;

    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x: x, y: y };
  };

  //Focus over the zommed image
  const moveLens = (e) => {
    const viewArea = zoomedImageRef.current;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();

    /* Get the cursor's x and y positions: */
    const { x, y } = getCursorPos(e);

    //Move the zoomed image
    viewArea.style.backgroundPosition = `-${x * 2}px -${y * 2}px`;
  };

  //Set the events based on the type
  const eventType =
    zoomType === "click"
      ? {
          onClick: isActive ? closeZoom : openZoom,
        }
      : {
          onMouseMove: openZoom,
          onMouseLeave: closeZoom,
          onTouchMove: openZoom,
          onTouchEnd: closeZoom,
          onTouchCancel: closeZoom,
        };

  return (
    <>
      {/* Actual Image */}
      <div
        className={clsx(classes.normalImage, {
          [classes.zoomOutCursor]: isActive,
        })}
        style={normalImageStyle}
        ref={normalImageRef}
        {...eventType}
      >
        {/* Zoomed Image View Area */}
        {isActive && (
          <div
            className={clsx(
              classes.zoomedImage,
              zoomType === "click" ? classes.center : classes.topRight
            )}
            style={zoomedImageStyle}
            ref={zoomedImageRef}
          ></div>
        )}
      </div>
    </>
  );
};

// ImageZoom.propTypes = {
//   imageURL: PropTypes.string.isRequired,
//   zoomImageURL: PropTypes.string.isRequired,
//   placement: PropTypes.oneOf([
//     "top-left",
//     "top-right",
//     "bottom-left",
//     "bottom-right",
//     "center",
//   ]).isRequired,
//   imageSize: PropTypes.shape({
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//   }),
//   zoomedImageSize: PropTypes.shape({
//     width: PropTypes.number.isRequired,
//     height: PropTypes.number.isRequired,
//   }),
//   isActive: PropTypes.bool.isRequired,
//   onZoom: PropTypes.func.isRequired,
//   onClose: PropTypes.func.isRequired,
//   zoomType: PropTypes.oneOf(["click", "hover"]).isRequired,
// };

ImageZoom.defaultProps = {
  zoomImageURL: "",
  placement: "topRight",
  imageSize: {
    width: 400,
    height: 400,
  },
  zoomedImageSize: {
    width: 800,
    height: 800,
  },
  isActive: false,
  zoomType: "click",
};

export default ImageZoom;
