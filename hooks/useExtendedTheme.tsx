import {
  extendTheme,
  ThemeConfig,
  ComponentStyleConfig,
} from "@chakra-ui/react";

const Text: ComponentStyleConfig = {
  baseStyle: (props) => ({
    color: props.colorMode === "light" ? "gray.700" : "white",
  }),
};

const Heading: ComponentStyleConfig = {
  baseStyle: (props) => ({
    color: props.colorMode === "light" ? "gray.700" : "white",
  }),
};

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
    components: { Text, Heading },
  });

  return extendedTheme;
};

export default useExtendedTheme;
export { extendedThemeConfig };
