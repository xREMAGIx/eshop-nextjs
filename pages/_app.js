import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider } from "react-redux";
import Router from "next/router";

//UI Components
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

//Custom Components
import theme from "../src/store/theme";
import { useStore } from "../src/store";
import RouteSkeleton from "../src/components/RouteSkeleton";

export default function App(props) {
  const { Component, pageProps } = props;
  const store = useStore(pageProps.initialReduxState);

  const [loading, setLoading] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const asPath = props.router.asPath;
  const [changingLocation, setChangingLocation] = React.useState();

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  //Handle Route change and Google Analytic(will add later)
  React.useEffect(() => {
    const handleRouteChange = (url) => {
      // gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  //Function for simple history, will optimize later
  React.useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory((prevHistory) => [...prevHistory, asPath]);
    }
  }, [history, asPath]);

  //Router change
  Router.onRouteChangeStart = (url) => {
    setChangingLocation(url);
    setLoading(true);
  };

  Router.onRouteChangeComplete = () => {
    setLoading(false);
  };

  Router.onRouteChangeError = () => {
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Provider store={store}>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {loading ? (
            <RouteSkeleton
              path={changingLocation ? changingLocation : asPath}
            />
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeProvider>
      </Provider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
