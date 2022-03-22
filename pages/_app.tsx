import type { AppProps } from 'next/app';
import Layout from '../component/Layout';
import wrapper from '../store/Store';
import GlobalStyle from '../styles/global-styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default wrapper.withRedux(MyApp);
