import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import useExtendedTheme from "../hooks/useExtendedTheme";
import "@fontsource/poppins";
import Head from "next/head";
import UserProvider from "../providers/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const extendedTheme = useExtendedTheme();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <ChakraProvider theme={extendedTheme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
