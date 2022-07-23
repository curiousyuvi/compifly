import {
  ComponentStyleConfig,
  extendTheme,
  ThemeConfig,
  useColorModeValue,
} from "@chakra-ui/react";

const extendedThemeConfig: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const useExtendedTheme = () => {
  const Input: ComponentStyleConfig = {
    defaultProps: {
      fontSize: "2xl",
    },
  };

  const extendedTheme = extendTheme({
    config: extendedThemeConfig,
    fonts: {
      heading: `'Poppins', sans-serif`,
      body: `'Poppins', sans-serif`,
    },
    components: {
      Input,
    },
  });

  return extendedTheme;
};

export default useExtendedTheme;
export { extendedThemeConfig };
