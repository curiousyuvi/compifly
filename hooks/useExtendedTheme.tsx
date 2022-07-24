import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const extendedThemeConfig: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const useExtendedTheme = () => {
  const extendedTheme = extendTheme({
    config: extendedThemeConfig,
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
  });

  return extendedTheme;
};

export default useExtendedTheme;
export { extendedThemeConfig };
