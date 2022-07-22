import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import useExtendedTheme from "../hooks/useExtendedTheme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  const extendedTheme = useExtendedTheme();
  return (
    <Layout>
      <ChakraProvider theme={extendedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Layout>
  );
}

export default MyApp;
