import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Router from "next/router";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import "fontsource-lato/latin-400-italic.css"; // Select either normal or italic.
import * as gtag from "../lib/gtag";

function MyApp(props) {
  const { Component, pageProps, store } = props;

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

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  React.useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory((prevHistory) => [...prevHistory, asPath]);
    }
  }, [history, asPath]);

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

  console.log(asPath);

  return (
    <React.Fragment>
      <Head>
        <title>
          {(pageProps && pageProps.result && pageProps.result.title) ||
            "NextJS Page"}
        </title>
        <meta
          name="description"
          content={
            (pageProps && pageProps.result && pageProps.result.description) ||
            "Eshop-NextJS is an eshop page using NextJS, we will bring you best experience on our site. Fast, convient, reliable are our top priority"
          }
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="google-site-verification"
          content="WDzAzOfBEaHVAoZbgV2VjuCC7Qx9QmPlcqBHjHPpPZo"
        />
        <link
          rel="canonical"
          href={`https://eshop-nextjs.xremagix.vercel.app${asPath}`}
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          {loading ? (
            <React.Fragment>
              <LinearProgress color="secondary" />
              <Skeleton variant="rect" height={64} />

              {/* 1.index page */}
              {changingLocation.substring(0, 2) + " " === "/ " && (
                <Container maxWidth="lg">
                  <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={"70vh"} />
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton variant="rect" height={300} />
                    </Grid>
                  </Grid>
                </Container>
              )}
              {/* 2. product detail page */}
              {changingLocation.substring(0, 10) === "/products/" && (
                <Container maxWidth="lg" style={{ marginTop: 30 }}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          height={"50vh"}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          height={"50vh"}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Skeleton
                        animation="wave"
                        variant="rect"
                        height={"30vh"}
                      />
                    </Grid>
                  </Grid>
                </Container>
              )}
              {/* 3. products, categories, brands index page */}
              {changingLocation.substring(0, 10) === "/products" && (
                <Container maxWidth="lg" style={{ marginTop: 30 }}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                      <Skeleton animation="wave" variant="rect" height={100} />
                    </Grid>
                    <Grid item container spacing={3}>
                      <Grid item xs={12} sm={3}>
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          height={"80vh"}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <Skeleton
                          animation="wave"
                          variant="rect"
                          height={"80vh"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              )}

              {(changingLocation.substring(0, 12) === "/categories" ||
                changingLocation.substring(0, 8) === "/brands") && (
                <Container maxWidth="lg" style={{ marginTop: 30 }}>
                  <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                      <Skeleton animation="wave" variant="rect" height={100} />
                    </Grid>
                    <Grid item container spacing={3}>
                      {[...Array(6)].map((x, i) => (
                        <Grid item key={i} xs={12} sm={6}>
                          <Skeleton
                            animation="wave"
                            variant="rect"
                            height={100}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Container>
              )}
            </React.Fragment>
          ) : (
            <Component history={history} {...pageProps} />
          )}
        </Provider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

// export async function getServerSideProps({ Component, ctx }) {
//   let pageProps = {};
//   if (Component.getServerSideProps) {
//     pageProps = await Component.getServerSideProps(ctx);
//   }
//   return { props: pageProps };
// }

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);
