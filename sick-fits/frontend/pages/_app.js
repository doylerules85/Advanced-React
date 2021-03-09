import PropTypes from 'prop-types';
import Router from 'next/router';
import NProgress from 'nprogress';
import Page from '../components/Page';

import '../components/styles/nprogress.css';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.any,
};

// get queries from a page level "/products/2" -> query to fetch and show that data
// ctx means context
MyApp.getInitialProps() = async function(Component, ctx){
  let pageProps = {};
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);  
  }
  pageProps.query = ctx.query;
  return {pageProps};
}

export default withData(MyApp);
