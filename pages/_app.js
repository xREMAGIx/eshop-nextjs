import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

function MyApp(props) {
  const { Component, pageProps, store } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
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
        <Provider store={store}>
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
  pageProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withReduxStore(MyApp);
