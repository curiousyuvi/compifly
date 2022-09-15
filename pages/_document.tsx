import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { extendedThemeConfig } from "../hooks/useExtendedTheme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="h-full w-full m-0 p-0">
        <Head />
        <body className="h-full min-h-screen w-full m-0 p-0 box-border">
          <ColorModeScript
            initialColorMode={extendedThemeConfig.initialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
