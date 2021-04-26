import { ChakraProvider } from "@chakra-ui/react";
import { SSRCookies, SSRKeycloakProvider } from '@react-keycloak/ssr';
import cookie from 'cookie';
import type { IncomingMessage } from 'http';
import type { AppContext, AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { Header, Layout } from '../components';


const keycloakCfg = {
  url: 'http://localhost:8080/auth',
  realm: 'Test',
  clientId: 'react-test',
}

interface InitialProps {
  cookies: unknown
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps?.dehydratedState}>
        <ChakraProvider>
          <SSRKeycloakProvider
            keycloakConfig={keycloakCfg}
            persistor={SSRCookies(cookies)}
          >
            <Layout>
              <Header />
              <Component {...pageProps} />
            </Layout>
          </SSRKeycloakProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  return {
    cookies: parseCookies(context?.ctx?.req),
  }
}

export default MyApp
