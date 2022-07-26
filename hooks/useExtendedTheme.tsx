import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const extendedThemeConfig: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const fonts = {
  heading: `'Poppins', sans-serif`,
  body: `'Poppins', sans-serif`,
};

const useExtendedTheme = () => {
  const extendedTheme = extendTheme({
    config: extendedThemeConfig,
    fonts,
  });

  return extendedTheme;
};

export default useExtendedTheme;
export { extendedThemeConfig };
