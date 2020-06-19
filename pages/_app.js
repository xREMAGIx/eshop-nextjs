import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Router from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function MyApp(props) {
  const { Component, pageProps, store } = props;

  console.log(pageProps);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  // Router.onRouteChangeStart = () => {
  //   setLoading(true);
  // };

  // Router.onRouteChangeComplete = () => {
  //   setLoading(false);
  // };

  // Router.onRouteChangeError = () => {
  //   setLoading(false);
  // };

  return (
    <React.Fragment>
      <Head>
        <title>
          {(pageProps.result && pageProps.result.title) || "NextJS Page"}
        </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Provider store={store}>
          {loading && (
            <Modal
              open={loading}
              disablePortal
              disableEnforceFocus
              disableAutoFocus
              style={{
                display: "flex",
                // alignItems: "center",
                justifyContent: "center",
              }}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
              <CircularProgress color="secondary" />
            </Modal>
          )}
          <Component {...pageProps} />
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
